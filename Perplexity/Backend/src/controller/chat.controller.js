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
        chat: chatId || chat._id,
        content: message,
        role: 'user'
    })



    const messages = await messageModel.find({ chat: chatId || chat._id })
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


export async function GetChat(req,res){
    const user = req.user;
    const chats = await chatModel.find({user:user.id})
    if(!chats){
        return res.status(401).json({
            message:"No chats found"
        })
    }   
    res.status(200).json({
        message:"Chats found",
        chats
    })

}


export async function GetMessages(req, res) {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}

export async function DeleteChat(req,res){
    const {chatId} = req.params
    const chat = await chatModel.findOne({
        _id:chatId,
        user:req.user.id
    })
    if(!chat){
        return res.status(404).json({
            message:"Chat is not found!"
        })
    }
    await messageModel.deleteMany({chat:chatId})
    return res.status(200).json({
        message:"chat is successfully deleted!"
    })
}