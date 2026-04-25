import { ChatMistralAI } from '@langchain/mistralai'
import {HumanMessage , SystemMessage , AIMessage} from 'langchain'
import {ChatGoogleGenerativeAI} from '@langchain/google-genai'

const GeminiModel = new ChatGoogleGenerativeAI({
  model: 'gemini-2.5-flash-lite',
  apiKey: process.env.GEMINI_AI_API
})

const MistralModel = new ChatMistralAI({
  model: 'mistral-small-latest',
  apiKey: process.env.MISTRAL_API_KEY
})

export async function GenerateResponce(messages){
  const res = await GeminiModel.invoke(messages.map(msg=>{
    if(msg.role == 'user'){
      return new HumanMessage(msg.content)
    }else if(msg.role == 'ai'){
      return new AIMessage(msg.content)
    }
  }))

  return res.text
}


export async function GeneratetheTitle(message){
  const res = await MistralModel.invoke([
    new SystemMessage(`You are a helpful assistant that generates a title for a given message. The title should be concise and capture the essence of the message.
      
      user will provide you with first message of conversation and you will generate a title for that conversation. The title should be 2 - 4 words and should be relevant , engaging giving users a quick understanding of the conversation.
      `),
    new HumanMessage(`Generate a title for first : ${message}`)
    
  ])

  return res.text
}