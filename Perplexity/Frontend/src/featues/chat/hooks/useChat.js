import { initSocketConnection } from '../service/chat.service';
import { sendMessage, getMessages, getChat, deleteChat } from '../service/chat.api';
import { useDispatch, useSelector } from 'react-redux';
import {
  setLoading, setChats, setCurrentChatId, setError,
  createChat, updateStreamChunk, finalizeMessage,
  addMessage, setToolStatus, setStreaming
} from '../store/chatSlice';

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
  try {
    if (chatId) {
      dispatch(addMessage({ chatId, content: message, role: 'user' }));
    }

    dispatch(setLoading(true));
    dispatch(setStreaming(true));
    dispatch(setToolStatus(null));

    const data = await sendMessage(message, chatId);
    const { chat, AiMessage } = data;

    let resolvedChatId = chatId;

    if (!chatId && chat) {
      resolvedChatId = chat._id;
      dispatch(createChat({ chatId: chat._id, title: chat.title }));
      dispatch(setCurrentChatId(chat._id));
      dispatch(addMessage({ chatId: chat._id, content: message, role: 'user' }));
    }

    // ✅ Simulate streaming word by word
    if (AiMessage?.content) {
      const words = AiMessage.content.split(' ');
      let buffer = '';

      // Push a blank streaming message first
      dispatch(addMessage({ chatId: resolvedChatId, content: '', role: 'ai', streaming: true }));

      for (const word of words) {
        buffer += (buffer ? ' ' : '') + word;
        dispatch(updateStreamChunk({ chatId: resolvedChatId, content: buffer }));
        await new Promise(res => setTimeout(res, 50)); 
      }

      // Finalize
      dispatch(finalizeMessage({ chatId: resolvedChatId, content: buffer, role: 'ai' }));
    }

  } catch (error) {
    dispatch(setError(error.message || 'Failed to send message'));
  } finally {
    dispatch(setLoading(false));
    dispatch(setStreaming(false));
    dispatch(setToolStatus(null));
  }
}
  async function handleGetChat() {
    try {
      dispatch(setLoading(true));
      const data = await getChat();

      if (data.chats) {
        const chatsObj = {};
        for (const chat of data.chats) {
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
    dispatch(setCurrentChatId(chatId));
  }

  return {
    initSocketConnection,
    sendMessage: handleSendMessage,
    getMessages,
    handleGetChat,
    deleteChat,
    handleOpenChat,
    createChat,
    addMessage,
    setCurrentChatId: (id) => dispatch(setCurrentChatId(id))
  };
};