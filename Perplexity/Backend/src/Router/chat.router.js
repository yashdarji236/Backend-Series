import {Router} from 'express';
import { SendMessage , GetChat , GetMessages, DeleteChat ,StreamMessage } from '../controller/chat.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = Router()
router.post('/message' , authMiddleware  , SendMessage )
router.get('/stream', authMiddleware, StreamMessage)  
router.get('/' , authMiddleware , GetChat)
router.get('/:chatId/messages' , authMiddleware , GetMessages)
router.delete('/:chatId/delete' , authMiddleware ,DeleteChat )


export default router