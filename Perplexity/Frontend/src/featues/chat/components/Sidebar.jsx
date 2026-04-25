import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChatId } from '../store/chatSlice';

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { chatHistory, currentChatId } = useSelector(state => state.chat);
  const [hoveredId, setHoveredId] = useState(null);

  const handleSelectChat = (chatId) => {
    dispatch(setCurrentChatId(chatId));
    onClose(); // Close sidebar on mobile after selection
  };

  const handleNewChat = () => {
    dispatch(setCurrentChatId(null));
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-[#0a0a0f] border-r border-[#1a1a1f] z-50 transform transition-transform duration-300 lg:relative lg:translate-x-0 lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#1a1a1f]">
          <button
            onClick={handleNewChat}
            className="w-full px-4 py-2 text-left font-semibold text-[#20d9d2] hover:bg-[#1a1a1f] rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto">
          {chatHistory && chatHistory.length > 0 ? (
            <div className="p-2">
              {chatHistory.map((chat) => (
                <div
                  key={chat.id}
                  onMouseEnter={() => setHoveredId(chat.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleSelectChat(chat.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors duration-200 group relative ${
                    currentChatId === chat.id
                      ? 'bg-[#1a1a1f]'
                      : 'hover:bg-[#1a1a1f]'
                  }`}
                >
                  <p className="text-sm text-[#e8e8f0] truncate">
                    {chat.title || 'New Chat'}
                  </p>
                  <p className="text-xs text-[#60606a] mt-1">
                    {new Date(chat.createdAt).toLocaleDateString()}
                  </p>
                  {hoveredId === chat.id && (
                    <button className="absolute right-2 top-2 p-1 text-[#60606a] hover:text-red-500">
                      <span className="text-lg">×</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-[#60606a] text-sm">
              No chats yet. Start a new conversation!
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1a1a1f] text-xs text-[#60606a]">
          <p>© Perplexity AI</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
