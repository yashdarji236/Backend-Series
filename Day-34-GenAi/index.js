import readline from 'readline'
import { ChatGoogle } from "@langchain/google";
import 'dotenv/config'
import {HumanMessage} from 'langchain'

const model = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_AI_API
});

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
async function main() {
    while (true) {
        const userInput = await ask("You: ");
        messages.push(new HumanMessage(userInput))
        if (userInput.toLowerCase() === "exit") {
            rl.close();
            break;
        }

        const res = await model.invoke(messages);
        messages.push(res)
        console.log("AI:", res.content); // use content not text
    }
}

main();