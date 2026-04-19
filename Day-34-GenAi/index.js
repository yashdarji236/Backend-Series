import readline from 'readline'
import 'dotenv/config'
import { HumanMessage } from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { Sendemail } from './mail.services.js';
import { ChatMistralAI } from "@langchain/mistralai"
import * as z from 'zod'
import { tavily } from '@tavily/core'



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

function TavilyTool() {
    return tool(
        async ({ query }) => {
            console.log("Tavily Tool received query:", query);
            try {
                const client = tavily({ apiKey: process.env.TAVILY_API_KEY });
                const response = await client.search(query);
                console.log("Tavily Tool response:", response.results[0]?.content);
                return response.answer || response.results[0]?.content || "No answer found.";
            } catch (err) {
                console.error("Tavily Tool error:", err.message);
                return `Error querying Tavily: ${err.message}`;
            }
        },

        {
            name: "Tavily_Tool",
            description:
                "Use this tool to answer questions about current events or real-time information. Input is a 'query' string. Output should be the most relevant answer from Tavily's search results.",
            schema: z.object({
                query: z.string().min(1, "Query cannot be empty"),
            }),
        }
    );
}
const tavilyTool = TavilyTool();
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
    tools: [emailTool, tavilyTool], // 👈 Add tavilyTool here
    messageModifier: `You are a helpful assistant with two capabilities:
  1. EMAIL: Send emails using Email_Tool.
     - NEVER call Email_Tool without a valid recipient email address.
     - If the user hasn't provided an email, ASK for it first.
     - Only call the tool once you have: a valid 'to' email, a 'subject', and 'html' content.
  2. SEARCH: Use Tavily_Tool to answer questions about current events or real-time information.`
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
        console.log("AI:", res); // use content not text
    }
}

main();