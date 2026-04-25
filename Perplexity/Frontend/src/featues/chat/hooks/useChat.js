import {initSocketConnection} from '../service/chat.service';
import {sendMessage , getMessages , getChat , deleteChat} from '../service/chat.api';
import { useDispatch, useSelector } from 'react-redux';
import {setLoading , setChats , setCurrentChatId ,setError  ,createChat , addMessage } from '../store/chatSlice';
export const useChat = () => {
    const dispatch = useDispatch();
    async function handleSendMessage({message, chatId}) {
     try{
          dispatch(setLoading(true));
       const data = await sendMessage(message, chatId);
       const {chat , aiMessage} = data;
       dispatch(createChat({chatId:chat._id, title:chat.title}))
       dispatch(setCurrentChatId(chat._id))
       dispatch(addMessage({chatId:chat._id, content:message, role:'user'}))
       dispatch(addMessage({chatId:chat._id, content:aiMessage.content, role:'assistant'}))
     }catch(error){
        dispatch(setError(error.message || 'Failed to send message'));
     }finally{
        dispatch(setLoading(false));
     }
    }
    return {
        initSocketConnection,
        sendMessage:handleSendMessage,
        getMessages,
        getChat,
        deleteChat,
        createChat,
        addMessage

    }
}

    