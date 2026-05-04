import { ChatMistralAI } from '@langchain/mistralai'
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages'
import { tool } from '@langchain/core/tools'
import { createReactAgent } from '@langchain/langgraph/prebuilt'
import * as zod from 'zod'
import { internetSearch } from './internet.service.js'

const MistralModel = new ChatMistralAI({
  model: 'mistral-small-latest',
  apiKey: process.env.MISTRAL_API_KEY,
  streaming: true, // ✅ Keep streaming true on the model
})

const SearchInternetTool = tool(
  async ({ query }) => {
    const result = await internetSearch(query)
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
  llm: MistralModel,
  tools: [SearchInternetTool],
})
const agentConfig = {
  recursionLimit: 10  // max 10 steps total
}
const SYSTEM_PROMPT = `You are a helpful assistant named Perplexity developed by Yash.
Today's date is ${new Date().toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}.

STRICT RULES:
- Use the SearchInternet tool MAXIMUM 1 time per response
- After getting search results, immediately answer the user — do NOT search again
- Never say "I cannot access real-time data" — use the tool instead
- Be concise and accurate`

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
        streamMode: 'messages' ,
        recursionLimit: 10 // ✅ This streams token-by-token chunks
      }
    )

    let fullContent = ''

    for await (const [chunk, metadata] of stream) {
      // Filter only final AI response chunks, skip tool call chunks
      const isAIChunk = chunk?.constructor?.name === 'AIMessageChunk'
      const isFinalNode = metadata?.langgraph_node === 'agent'
      const hasText = typeof chunk?.content === 'string' && chunk.content.length > 0

      if (isAIChunk && isFinalNode && hasText && !chunk?.tool_call_chunks?.length) {
        fullContent += chunk.content
        onChunk(chunk.content) // 🔁 Send each token to caller
      }
    }

    console.log('✅ Streaming complete')
    return fullContent

  } catch (error) {
    console.error('❌ Error in GenerateResponceStream:', error.message)
    throw error
  }
}


// ✅ Non-streaming fallback (useful for title gen, testing etc.)
export async function GenerateResponce(messages) {
  let fullContent = ''
  await GenerateResponceStream(messages, (chunk) => {
    fullContent += chunk
  })
  return fullContent || "No response"
}


export async function GeneratetheTitle(message) {
  try {
    if (!message?.trim()) throw new Error("Message cannot be empty")

    console.log(`📝 Generating title for: "${message.substring(0, 50)}..."`)

    const res = await MistralModel.invoke([
      new SystemMessage(`Generate a 2-4 word title for a conversation based on the user's first message. 
        Be concise, relevant, and engaging.`),
      new HumanMessage(`First message: ${message}`)
    ])

    const title = Array.isArray(res.content)
      ? res.content.map(c => c.text ?? c).join('')
      : res.content

    console.log(`✅ Title generated: "${title}"`)
    return title

  } catch (error) {
    console.error('❌ Error in GeneratetheTitle:', error.message)
    throw error
  }
}