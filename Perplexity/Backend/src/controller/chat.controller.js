import { GenerateResponce } from "../services/ai.service.js";


export async function SendMessage(req, res) {
    const { message } = req.body;
    const result = await GenerateResponce(message)
    res.json({
        aiMessage:result   
    })
    
}