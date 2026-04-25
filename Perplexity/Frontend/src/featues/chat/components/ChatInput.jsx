import React, { useState } from 'react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-[#1a1a1f] bg-[#0a0a0f] p-4">
      <div className="max-w-4xl mx-auto flex gap-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask anything..."
          rows="3"
          disabled={isLoading}
          className="flex-1 p-3 border border-[#1a1a1f] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20d9d2] resize-none disabled:bg-[#0a0a0f] disabled:cursor-not-allowed text-sm md:text-base bg-[#0f0f14] text-[#e8e8f0] placeholder-[#60606a]"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !message.trim()}
          className="self-end px-4 py-2 bg-[#20d9d2] text-[#0a0a0f] rounded-lg hover:bg-[#1ac4b9] disabled:bg-[#40404a] disabled:cursor-not-allowed transition-colors duration-200 font-semibold md:px-6"
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </div>
      <p className="text-xs text-[#60606a] mt-2 ml-0">
        Shift + Enter for new line
      </p>
    </div>
  );
};

export default ChatInput;
