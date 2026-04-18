import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_AI_API
});


export async function testAi() {
    model.invoke("What is the price of BMW m4?").then((res)=>{
            console.log(res.text);
            
    })
}