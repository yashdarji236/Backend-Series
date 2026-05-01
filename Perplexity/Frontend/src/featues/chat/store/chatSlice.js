import { createSlice } from "@reduxjs/toolkit";


const chatSlice = createSlice({
    name:"chat",
    initialState:{
        chats:{},
        currentChatId:null,
        isLoading:false,
        error:null
    },
    reducers:{
        createChat:(state,action)=>{
            const {chatId, title} = action.payload
            state.chats[chatId] = {
                id:chatId,
                title,
                messages:[],
                lastUpdated:Date.now()
            }
        },
        addMessage:(state,action)=>{
            const {chatId, content, role} = action.payload
            state.chats[chatId].messages.push({
                content,
                role
            })
        },
            
        setChats:(state,action)=>{
            state.chats = action.payload
        },
        setCurrentChatId:(state,action)=>{
            state.currentChatId = action.payload
        },
        setLoading:(state,action)=>{
            state.isLoading = action.payload
        },
        setError:(state,action)=>{
            state.error = action.payload
        },
        // In your chatSlice reducers:

setStreaming: (state, action) => {
  state.streaming = action.payload;
},

setToolStatus: (state, action) => {
  state.toolStatus = action.payload; // e.g. "Searching: web_search"
},

updateStreamChunk: (state, action) => {
  const { chatId, content } = action.payload;
  const chat = state.chats[chatId];
  if (!chat) return;
  const messages = chat.messages;
  const last = messages.at(-1);
  // If last message is an in-progress ai stream, update it
  if (last?.role === 'ai' && last?.streaming) {
    last.content = content;
  } else {
    messages.push({ role: 'ai', content, streaming: true, id: Date.now() });
  }
},

finalizeMessage: (state, action) => {
  const { chatId, content, role } = action.payload;
  const messages = state.chats[chatId]?.messages;
  if (!messages) return;
  const last = messages.at(-1);
  if (last?.streaming) {
    last.content = content;
    delete last.streaming; // mark as done
  }
},
    
    }
})

export const {setChats,setCurrentChatId,setLoading,setError , createChat , addMessage , setStreaming , setToolStatus , updateStreamChunk , finalizeMessage} = chatSlice.actions

export default chatSlice.reducer