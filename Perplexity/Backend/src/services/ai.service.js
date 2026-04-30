import { ChatMistralAI } from '@langchain/mistralai'
import { HumanMessage, SystemMessage, AIMessage , tool , createAgent} from 'langchain'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'
import * as zod from 'zod'
import {internetSearch} from './internet.service.js'

const GeminiModel = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash-lite',
  apiKey: process.env.GEMINI_AI_API
})

const MistralModel = new ChatMistralAI({
  model: 'mistral-small-latest',
  apiKey: process.env.MISTRAL_API_KEY,
  streaming: true,
})
const SearchInternerTool = tool(
  internetSearch,
  {
    name: 'SearchInternet',
    description: 'Use this tool to get the latest information about a topic from the internet.',
    schema: zod.object({
      query: zod.string().describe('The search query to find information about a topic.'),
    }),
  }
)
const Agent = createAgent({
  model: MistralModel,
  tools: [SearchInternerTool],
})
export async function GenerateResponce(messages) {
  try {
    console.log(`🤖 Processing ${messages.length} messages for AI response...`);

    // Map and filter messages properly
    const mappedMessages = messages.map(msg => {
      if (!msg || !msg.content) return null;

      if (msg.role === 'user') {
        return new HumanMessage(msg.content);
      } else if (msg.role === 'ai') {
        return new AIMessage(msg.content);
      }
      return null;
    }).filter(msg => msg !== null);

    if (mappedMessages.length === 0) {
      throw new Error("No valid messages to process");
    }

    console.log(` Converted ${mappedMessages.length} messages for AI`);
    const res = await Agent.invoke({ messages: [
      new SystemMessage(`You are a helpful assistant , your name is Perplexity developed By Yash that provides accurate and concise answers to user queries. Use the SearchInternet tool to get the latest information when needed.`),
      ...mappedMessages
    ] });

if (!res || !res.messages || res.messages.length === 0) {
  throw new Error("AI returned empty response");
}             

return res.messages.at(-1)?.content || "No response";
  } catch (error) {
    console.error(' Error in GenerateResponce:', error.message);
    throw error;
  }
}


export async function GeneratetheTitle(message) {
  try {
    if (!message || !message.trim()) {
      throw new Error("Message cannot be empty for title generation");
    }

    console.log(`📝 Generating title for: "${message.substring(0, 50)}..."`);
    const res = await MistralModel.invoke([
      new SystemMessage(`You are a helpful assistant that generates a title for a given message. The title should be concise and capture the essence of the message.
      
      user will provide you with first message of conversation and you will generate a title for that conversation. The title should be 2 - 4 words and should be relevant , engaging giving users a quick understanding of the conversation.`),
      new HumanMessage(`Generate a title for first : ${message}`)
    ]);

    if (!res || !res.text) {
      throw new Error("Title generation returned empty response");
    }

    console.log(`✅ Title generated: "${res.text}"`);
    return res.text;
  } catch (error) {
    console.error('❌ Error in GeneratetheTitle:', error.message);
    throw error;
  }
}
