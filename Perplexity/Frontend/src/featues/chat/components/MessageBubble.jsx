import React from 'react';

const MessageBubble = ({ message, isUser }) => {
  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fadeIn px-2`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg ${
          isUser
            ? 'bg-[#20d9d2] text-[#0a0a0f] rounded-br-none font-semibold'
            : 'bg-[#1a1a1f] text-[#e8e8f0] rounded-bl-none'
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed break-words">
          {message.content}
        </p>
        <p className={`text-xs mt-2 ${isUser ? 'text-[#0a0a0f] opacity-70' : 'text-[#60606a]'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
