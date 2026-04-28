import {initSocketConnection} from '../service/chat.service';
import {sendMessage , getMessages , getChat , deleteChat} from '../service/chat.api';
import { useDispatch, useSelector } from 'react-redux';
import {setLoading , setChats , setCurrentChatId ,setError  ,createChat , addMessage } from '../store/chatSlice';
export const useChat = () => {
    const dispatch = useDispatch();
    async function handleSendMessage({message, chatId}) {
     try{
        // 1. Immediately add user message to state
        const tempChatId = chatId || 'temp-' + Date.now();
        if (!chatId) {
           // We don't have a chatId yet, so we can't perfectly add it to a specific chat
           // but we can show it in the UI or wait for the chat creation.
           // However, for immediate feedback, let's just proceed to API call but set loading.
        } else {
           dispatch(addMessage({chatId, content: message, role: 'user'}))
        }
        
        dispatch(setLoading(true));
        const data = await sendMessage(message, chatId);
        
        // Backend returns: { chat, title, userMessage, AiMessage }
        const { chat , AiMessage } = data;
        
        // If it was a new chat, create it and add the user message now
        if (!chatId && chat) {
            dispatch(createChat({chatId: chat._id, title: chat.title}))
            dispatch(setCurrentChatId(chat._id))
            dispatch(addMessage({chatId: chat._id, content: message, role: 'user'}))
        }

        // Add AI message
        dispatch(addMessage({chatId: chat?._id || chatId, content: AiMessage.content, role: 'ai'}))
      }catch(error){
         dispatch(setError(error.message || 'Failed to send message'));
      }finally{
         dispatch(setLoading(false));
      }
    }
    async function handleGetChat() {
        try {
            dispatch(setLoading(true));
            const data = await getChat();
            // Backend returns: { message: "Chats found", chats: [...] }
            if (data.chats) {
                const chatsObj = {};
                for (const chat of data.chats) {
                    // Fetch messages for each chat if not provided
                    const msgData = await getMessages(chat._id);
                    chatsObj[chat._id] = {
                        id: chat._id,
                        title: chat.title,
                        messages: msgData.messages || []
                    };
                }
                dispatch(setChats(chatsObj));
            }
        } catch (error) {
            dispatch(setError(error.message || 'Failed to fetch chats'));
        } finally {
            dispatch(setLoading(false));
        }
    }
    async function handleOpenChat(chatId) {
        dispatch(setCurrentChatId(chatId))
    }
    return {
        initSocketConnection,
        sendMessage:handleSendMessage,
        getMessages,
        handleGetChat,
        deleteChat,
        handleOpenChat,
        createChat,
        addMessage,
        setCurrentChatId: (id) => dispatch(setCurrentChatId(id))
    }
}

    