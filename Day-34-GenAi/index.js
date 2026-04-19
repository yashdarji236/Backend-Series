import readline from 'readline'

import 'dotenv/config'
import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { Sendemail } from './mail.services.js';
import { ChatMistralAI } from "@langchain/mistralai"

import * as z from 'zod'
const emailTool = tool(
  async ({ to, subject, html }) => {
    console.log("Tool Input received:", JSON.stringify({ to, subject, html }));

    // Extra safety check before calling Sendemail
    if (!to || typeof to !== 'string' || !to.includes('@')) {
      return `Error: Invalid or missing recipient email. Received: ${JSON.stringify(to)}`;
    }

    try {
      const result = await Sendemail({ to, subject, html });
      return result;
    } catch (err) {
      console.error("Email send failed:", err.message);
      return `Error sending email: ${err.message}`;
    }
  },
  {
    name: "Email_Tool",
    description:
      "Send an email to a recipient. You MUST extract a valid email address for 'to', provide a subject string, and an html body string. Do NOT call this tool unless you have a real email address.",
    schema: z.object({
      to: z.string().email("Must be a valid email address"),
      subject: z.string().min(1, "Subject cannot be empty"),
      html: z.string().min(1, "HTML body cannot be empty"),
    }),
  }
);

const model = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
    // other params...
})

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Convert question to promise
function ask(question) {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
}
const messages = []
const agent = createReactAgent({
  llm: model,
  tools: [emailTool],
  messageModifier: `You are an email assistant. 
  IMPORTANT RULES:
  - NEVER call Email_Tool without a valid recipient email address (e.g. user@example.com).
  - If the user hasn't provided an email address, ASK for it first.
  - Only call the tool once you have: a valid 'to' email, a 'subject', and 'html' content.`
});
async function main() {
    while (true) {
        const userInput = await ask("You: ");
        messages.push(new HumanMessage(userInput))
        if (userInput.toLowerCase() === "exit") {
            rl.close();
            break;
        }

        const res = await agent.invoke({
            messages

        });
        messages.push(res.messages[res.messages.length - 1]) // push AI response to messages
        console.log("AI:", res.messages[res.messages.length - 1].content); // use content not text
    }
}

main();