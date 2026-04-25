import { GenerateResponce, GeneratetheTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js";
import messageModel from "../models/message.model.js";


export async function SendMessage(req, res) {
    const { message, chat: chatId } = req.body;



    let chat = null;
    let title = null;
    if (!chatId) {
        title = await GeneratetheTitle(message)
        chat = await chatModel.create({
            user: req.user.id,
            title
        })
    }
    const userMessage = await messageModel.create({
        chat:chatId || chat._id,
        content: message,
        role: 'user'
    })



    const messages = await messageModel.find({ chat: chatId })
    const result = await GenerateResponce(messages)
    console.log(messages);
    
    const AiMessage = await messageModel.create({
        chat: chatId || chat._id,
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