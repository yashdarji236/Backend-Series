import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';

const ChatArea = ({ messages, isLoading, currentChatId }) => {
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Empty state
  if (!currentChatId && messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0a0f] to-[#10101a] p-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#e8e8f0] mb-4">
            What can I help you with?
          </h1>
          <p className="text-[#a0a0a8] text-sm md:text-base mb-8 max-w-md">
            Ask me anything - search the web, analyze information, or help with writing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md">
            {[
              'Search the web',
              'Write an essay',
              'Code a project',
              'Plan a trip',
            ].map((suggestion) => (
              <button
                key={suggestion}
                className="p-3 bg-[#0f0f14] border border-[#1a1a1f] rounded-lg hover:bg-[#1a1a1f] hover:border-[#20d9d2] transition-colors duration-200 text-sm font-medium text-[#20d9d2]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#0a0a0f] to-[#10101a] p-4 md:p-6 flex flex-col">
      <div className="flex-1 flex flex-col justify-start max-w-4xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="text-center text-[#60606a] mt-8">
            <p>Start a conversation by sending a message</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <MessageBubble
            key={index}
            message={msg}
            isUser={msg.sender === 'user'}
          />
        ))}

        {isLoading && (
          <div className="flex justify-start mb-4 px-2 w-full">
            <div className="bg-[#1a1a1f] rounded-lg rounded-bl-none px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-[#20d9d2] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#20d9d2] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#20d9d2] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
};

export default ChatArea;
