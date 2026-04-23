import { GenerateResponce, GeneratetheTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";


export async function SendMessage(req, res) {
    const { message } = req.body;
    const title = await GeneratetheTitle(message)
    console.log("Generated Title:", title);
    const result = await GenerateResponce(message)

    const chat = await chatModel.create({
        user: req.user.id,
        title
    })
    const userMessage = await messageModel.create({
        chat:chat._id,
        content: message,
        role: 'user'
    })
    const AiMessage = await messageModel.create({
        chat: chat._id,
        content: result,
        role: 'ai'
    })

    res.status(201).json({
        chat,
        title,
        userMessage,
        AiMessage
    })

}