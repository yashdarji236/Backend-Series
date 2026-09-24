import 'dotenv/config'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import { ChatMistralAI } from '@langchain/mistralai'
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages'
import { tool } from '@langchain/core/tools'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import * as zod from 'zod'
import { internetSearch } from './internet.service.js'

// Primary model: Gemini 2.5 Flash
const getLlmModel = () => {
  if (process.env.GEMINI_AI_API) {
    return new ChatGoogleGenerativeAI({
      model: 'gemini-2.5-flash',
      apiKey: process.env.GEMINI_AI_API,
    })
  }
  return new ChatMistralAI({
    model: 'mistral-small-latest',
    apiKey: process.env.MISTRAL_API_KEY,
    streaming: true,
  })
}

const llm = getLlmModel()

const SearchInternetTool = tool(
  async (input) => {
    const result = await internetSearch(input)
    return typeof result === 'string' ? result : JSON.stringify(result)
  },
  {
    name: 'SearchInternet',
    description: 'Use this tool to get the latest information about a topic from the internet.',
    schema: zod.object({
      query: zod.string().describe('The search query to find information about a topic.'),
    }),
  }
)

const Agent = createReactAgent({
  llm,
  tools: [SearchInternetTool],
})

const SYSTEM_PROMPT = `You are a helpful assistant named asknova developed by Yash.
Today's date is ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}.

STRICT RULES:
- Call SearchInternet tool MAXIMUM ONCE per response, then stop and answer
- After receiving search results, you MUST write your final answer immediately
- NEVER call the search tool a second time
- NEVER call any tool after receiving results
- Just answer directly using what you already know or one search`

// ✅ Streaming version — pass a callback that receives each chunk
export async function GenerateResponceStream(messages, onChunk) {
  try {
    console.log(`🤖 Streaming response for ${messages.length} messages...`)

    const mappedMessages = messages.map(msg => {
      if (!msg?.content) return null
      if (msg.role === 'user') return new HumanMessage(msg.content)
      if (msg.role === 'ai') return new AIMessage(msg.content)
      return null
    }).filter(Boolean)

    if (mappedMessages.length === 0) throw new Error("No valid messages to process")

    const stream = await Agent.stream(
      {
        messages: [new SystemMessage(SYSTEM_PROMPT), ...mappedMessages]
      },
      {
        streamMode: 'messages',
        recursionLimit: 10
      }
    )

    let fullContent = ''

    for await (const [chunk, metadata] of stream) {
      const isAIChunk = chunk?.constructor?.name === 'AIMessageChunk' || chunk?._getType?.() === 'ai'
      let textContent = ''
      if (typeof chunk?.content === 'string') {
        textContent = chunk.content
      } else if (Array.isArray(chunk?.content)) {
        textContent = chunk.content.map(c => c.text || c).join('')
      }

      const hasText = textContent.length > 0

      if (isAIChunk && hasText && !chunk?.tool_call_chunks?.length && !chunk?.tool_calls?.length) {
        fullContent += textContent
        if (onChunk) onChunk(textContent)
      }
    }

    console.log('✅ Streaming complete')
    return fullContent

  } catch (error) {
    console.error('❌ Error in GenerateResponceStream:', error.message)
    throw error
  }
}

// ✅ Non-streaming response generator
export async function GenerateResponce(messages) {
  let fullContent = ''
  await GenerateResponceStream(messages, (chunk) => {
    fullContent += chunk
  })
  return fullContent || "No response"
}

export async function GeneratetheTitle(message) {
  try {
    if (!message?.trim()) return "New Chat"

    console.log(`📝 Generating title for: "${message.substring(0, 50)}..."`)

    const res = await llm.invoke([
      new SystemMessage(`Generate a 2-4 word title for a conversation based on the user's first message. Output ONLY the title text without quotes.`),
      new HumanMessage(`First message: ${message}`)
    ])

    const title = Array.isArray(res.content)
      ? res.content.map(c => c.text ?? c).join('')
      : res.content

    const cleanedTitle = String(title).trim().replace(/^["']|["']$/g, '') || "New Chat"
    console.log(`✅ Title generated: "${cleanedTitle}"`)
    return cleanedTitle

  } catch (error) {
    console.error('❌ Error in GeneratetheTitle:', error.message)
    return "New Chat"
  }
}