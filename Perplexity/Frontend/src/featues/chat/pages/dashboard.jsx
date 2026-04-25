import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useChat } from '../hooks/useChat';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import ChatInput from '../components/ChatInput';


const Dashboard = () => {
  const chat = useChat();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const chats = useSelector(state => state.chat.chats);
  const currentChatId = useSelector(state => state.chat.currentChatId || null);
  const isLoading = useSelector(state => state.chat.isLoading);
  useEffect(() => {
    chat.initSocketConnection();
    
    
  }, []);

  return (
    <main className="h-screen bg-[#0a0a0f] flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="border-b border-[#1a1a1f] bg-[#0a0a0f] px-4 py-3 flex items-center justify-between lg:justify-start gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 hover:bg-[#1a1a1f] rounded-lg transition-colors duration-200 text-[#e8e8f0]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <h1 className="text-lg md:text-xl font-semibold text-[#e8e8f0]">
            Perplexity AI
          </h1>

          {user && (
            <div className="ml-auto flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                <div className="w-8 h-8 bg-[#20d9d2] rounded-full flex items-center justify-center text-[#0a0a0f] text-sm font-semibold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-[#a0a0a8]">{user.name}</span>
              </div>
              <button className="p-2 hover:bg-[#1a1a1f] rounded-lg transition-colors duration-200 text-[#e8e8f0]">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
          )}
        </header>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Area */}
          <ChatArea
            messages={chats[currentChatId]?.messages || []}
            isLoading={isLoading}
            currentChatId={currentChatId}
          />

          {/* Chat Input */}
          <ChatInput
            onSendMessage={chat.sendMessage}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
