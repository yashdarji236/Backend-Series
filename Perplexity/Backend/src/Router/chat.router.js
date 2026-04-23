import {Router} from 'express';
import { SendMessage } from '../controller/chat.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const router = Router()
router.post('/message' , authMiddleware  , SendMessage )



export default router