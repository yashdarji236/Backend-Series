import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/* ─── Icons ─────────────────────────────────────────────────────── */
const Icons = {
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Library: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 6 4 14" /><path d="M12 6v14" /><path d="M8 8v12" /><path d="M4 4v16" />
    </svg>
  ),
  Computer: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  ),
  Spaces: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path><polyline points="14 2 14 8 20 8"></polyline><path d="M2 15h10"></path><path d="m9 18 3-3-3-3"></path>
    </svg>
  ),
  Customize: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  ),
  History: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><polyline points="12 7 12 12 15 15"></polyline>
    </svg>
  ),
  Logo: () => (
    <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#e8e8f0" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 .188a.5.5 0 0 1 .503.5V4.03l3.022-2.92.059-.048a.51.51 0 0 1 .49-.054.5.5 0 0 1 .306.46v3.247h1.117l.1.01a.5.5 0 0 1 .403.49v5.558a.5.5 0 0 1-.503.5H12.38v3.258a.5.5 0 0 1-.312.462.51.51 0 0 1-.55-.11l-3.016-3.018v3.448c0 .275-.225.5-.503.5a.5.5 0 0 1-.503-.5v-3.448l-3.018 3.019a.51.51 0 0 1-.548.11.5.5 0 0 1-.312-.463v-3.258H2.503a.5.5 0 0 1-.503-.5V5.215l.01-.1c.047-.229.25-.4.493-.4H3.62V1.469l.006-.074a.5.5 0 0 1 .302-.387.51.51 0 0 1 .547.102l3.023 2.92V.687c0-.276.225-.5.503-.5M4.626 9.333v3.984l2.87-2.872v-4.01zm3.877 1.113 2.871 2.871V9.333l-2.87-2.897zm3.733-1.668a.5.5 0 0 1 .145.35v1.145h.612V5.715H9.201zm-9.23 1.495h.613V9.13c0-.131.052-.257.145-.35l3.033-3.064h-3.79zm1.62-5.558H6.76L4.626 2.652zm4.613 0h2.134V2.652z"/>
  </svg>
  <span className="text-[15px] font-medium text-[#e8e8f0] tracking-wide">perplexity</span>
</div>
  ),
  SidebarCollapse: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line>
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  ),
  Microphone: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  Audio: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6v12M8 10v4M16 10v4" />
    </svg>
  )
}

const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)
  const isLoading = useSelector((state) => state.chat.isLoading)
  const user = useSelector((state) => state.auth.user)
  const chatContainerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    chat.initSocketConnection()
    chat.handleGetChat()
  }, [])

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chats, currentChatId])

  const focusSearch = () => {
    setTimeout(() => {
      inputRef.current?.focus()
    }, 50)
  }

  // Focus input when currentChatId changes (e.g., starting a new thread)
  useEffect(() => {
    if (!currentChatId) {
      focusSearch()
    }
  }, [currentChatId])

  const handleSubmitMessage = (event) => {
    event?.preventDefault()
    const trimmedMessage = chatInput.trim()
    if (!trimmedMessage) return

    chat.sendMessage({ message: trimmedMessage, chatId: currentChatId })
    setChatInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitMessage()
    }
  }

  const openChat = (chatId) => {
    chat.setCurrentChatId(chatId)
    setSidebarOpen(false)
  }

  const startNewThread = () => {
    chat.setCurrentChatId(null)
    setSidebarOpen(false)
    setTimeout(focusSearch, 0)
  }

  const currentMessages = chats[currentChatId]?.messages || []
  const hasMessages = currentMessages.length > 0

  return (
    <div className="flex h-screen w-screen bg-[#191a1a] text-[#e8e8f0] font-sans overflow-hidden relative">

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-[260px] bg-[#202222] flex flex-col transition-transform duration-300 lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4 px-4 pt-4">
          <div className="flex items-center gap-2">
            <Icons.Logo />
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="text-[#a0a0a0] hover:text-[#e8e8f0] transition-colors p-1 rounded-md hover:bg-[#303232] hidden lg:block"
            title="Collapse sidebar"
            aria-label="Collapse sidebar"
          >
            <Icons.SidebarCollapse />
          </button>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="text-[#a0a0a0] hover:text-[#e8e8f0] transition-colors p-1 rounded-md hover:bg-[#303232] lg:hidden"
            title="Close sidebar"
            aria-label="Close sidebar"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* New Button */}
        <div className="px-3 mb-4 mt-2">
          <div
            onClick={() => startNewThread()}
            className="flex items-center justify-between px-4 py-2.5 bg-[#303232] hover:bg-[#3a3c3c] text-[#e8e8f0] rounded-full cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2">
              <Icons.Plus />
              <span className="text-sm font-medium">New</span>
            </div>
          </div>
        </div>

       

        {/* History Section */}
        <div className="flex-1 mt-6 overflow-y-auto custom-scrollbar px-3">
          <div className="flex items-center gap-3 px-3 py-2 text-[#a0a0a0] mb-1">
            <Icons.History />
            <span className="text-sm font-medium">History</span>
          </div>
          <div className="space-y-0.5">
            {Object.values(chats).reverse().map((chat, index) => (
              <div
                key={chat.id || index}
                onClick={() => openChat(chat.id)}
                className={`
                  px-3 py-2.5 text-[13px] rounded-lg cursor-pointer transition-all truncate
                  ${chat.id === currentChatId ? 'bg-[#303232] text-[#e8e8f0]' : 'text-[#a0a0a0] hover:text-[#e8e8f0] hover:bg-[#303232]'}
                `}
              >
                {chat.title || 'Untitled Chat'}
              </div>
            ))}
          </div>
        </div>

        {/* Footer Area */}
        <div className="mt-auto px-3 pb-4">
          <div className="mb-2">
           
          </div>
          <button className="w-full flex items-center justify-between px-2 py-2 hover:bg-[#303232] rounded-lg transition-all text-left">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-[#4CAF50] rounded-full flex items-center justify-center text-xs font-medium text-white">
                {user?.username?.[0]?.toUpperCase() || 'Y'}
              </div>
              <span className="text-sm font-medium truncate text-[#e8e8f0]">{user?.username || 'User'}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0a0a0" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-[#191a1a] overflow-hidden">

       

        {/* Mobile Top Bar */}
        <header className="flex lg:hidden items-center justify-between px-4 h-14 border-b border-[#303030]">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="text-[#a0a0a0] hover:text-[#e8e8f0] transition-colors p-1 rounded-md hover:bg-[#303232]"
            title="Open sidebar"
            aria-label="Open sidebar"
          >
            <Icons.Menu />
          </button>
          <div className="flex-1 text-center font-medium text-sm">perplexity</div>
          <div className="w-9 h-9" />
        </header>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-4 py-8 lg:px-12 flex flex-col items-center scroll-smooth"
        >
          {!hasMessages ? (
            <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
              
              <h1 className="text-4xl lg:text-5xl mb-10 tracking-tight text-[#e8e8f0]">
                perplexity
              </h1>
              
              {/* Input Area Centered when empty */}
              <div className="w-full max-w-3xl mx-auto">
                <form
                  onSubmit={handleSubmitMessage}
                  className="bg-[#202222] border border-[#404040] rounded-2xl p-3 flex flex-col gap-2 focus-within:border-[#606060] transition-all shadow-lg"
                >
                  <textarea
                    ref={inputRef}
                    autoFocus
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask anything..."
                    rows={1}
                    className="w-full bg-transparent border-none outline-none resize-none px-2 py-2 text-[16px] placeholder-[#808080] text-[#e8e8f0] min-h-[48px] max-h-60"
                  />
                  <div className="flex items-center justify-between px-1 mt-2">
                    <div className="flex items-center gap-2">
                      <button type="button" className="text-[#a0a0a0] hover:text-[#e8e8f0] transition-colors p-1 bg-transparent hover:bg-[#303232] rounded-md">
                        <Icons.Plus />
                      </button>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#303232] text-[#e8e8f0] text-sm cursor-pointer hover:bg-[#3a3c3c] transition-colors">
                         <Icons.Computer />
                         <span>Computer</span>
                         <span className="text-[#a0a0a0] ml-1">+</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-[#a0a0a0] hover:text-[#e8e8f0] text-sm cursor-pointer transition-colors px-2 py-1 rounded-md hover:bg-[#303232]">
                        <span>Model</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                      </div>
                      <button type="button" className="text-[#a0a0a0] hover:text-[#e8e8f0] transition-colors p-1.5 bg-transparent hover:bg-[#303232] rounded-full">
                        <Icons.Microphone />
                      </button>
                      <button
                        type="submit"
                        disabled={!chatInput.trim()}
                        className="w-9 h-9 ml-1 bg-[#e8e8f0] disabled:bg-[#303232] rounded-full flex items-center justify-center text-black disabled:text-[#a0a0a0] transition-all"
                      >
                        {chatInput.trim() ? <Icons.Send /> : <Icons.Audio />}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-4xl flex flex-col gap-10 pb-32 pt-16">
              {currentMessages.map((message, index) => (
                <div
                  key={message.id || index}
                  className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
                >
                  {message.role === 'user' ? (
                    <div className="max-w-[85%] bg-[#303232] rounded-2xl px-5 py-3 shadow-sm">
                      <h2 className="text-[16px] leading-relaxed text-[#e8e8f0]">
                        {message.content}
                      </h2>
                    </div>
                  ) : (
                    <div className="w-full max-w-3xl space-y-4">
                      <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#202222] prose-pre:border prose-pre:border-[#404040] prose-pre:rounded-xl max-w-none text-[#e8e8f0] text-[15px]">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className='mb-4 last:mb-0'>{children}</p>,
                            ul: ({ children }) => <ul className='mb-4 list-disc pl-5'>{children}</ul>,
                            ol: ({ children }) => <ol className='mb-4 list-decimal pl-5'>{children}</ol>,
                            code: ({ children }) => <code className='rounded bg-[#303232] px-1.5 py-0.5 text-sm font-mono'>{children}</code>,
                            pre: ({ children }) => <pre className='mb-4 overflow-x-auto rounded-xl bg-[#202222] p-4 border border-[#404040]'>{children}</pre>,
                            table: ({ children }) => (
                              <div className="overflow-x-auto mb-6 mt-2 rounded-lg border border-[#404040]">
                                <table className="w-full border-collapse text-sm text-left">
                                  {children}
                                </table>
                              </div>
                            ),
                            thead: ({ children }) => <thead className="bg-[#303232] text-[#e8e8f0] uppercase text-xs">{children}</thead>,
                            tbody: ({ children }) => <tbody className="divide-y divide-[#404040]">{children}</tbody>,
                            tr: ({ children }) => <tr className="hover:bg-[#202222] transition-colors">{children}</tr>,
                            th: ({ children }) => <th className="px-5 py-4 font-semibold tracking-wider border-b border-[#404040]">{children}</th>,
                            td: ({ children }) => <td className="px-5 py-4 text-[#d0d0d0] leading-relaxed border-b border-[#404040] last:border-0">{children}</td>,
                            h1: ({ children }) => <h1 className="text-2xl font-bold mb-4 mt-6 text-[#e8e8f0] border-b border-[#404040] pb-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xl font-bold mb-3 mt-5 text-[#e8e8f0] border-b border-[#404040] pb-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-lg font-bold mb-2 mt-4 text-[#e8e8f0]">{children}</h3>,
                            blockquote: ({ children }) => <blockquote className="border-l-4 border-[#606060] pl-4 py-1 italic mb-4 text-[#a0a0a0] bg-[#202222] rounded-r-lg">{children}</blockquote>,
                          }}
                          remarkPlugins={[remarkGfm]}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <div className="flex flex-col items-start animate-in fade-in duration-300">
                  <div className="w-full max-w-3xl space-y-4">
                    <div className="p-2 flex gap-1.5 items-center">
                      <div className="w-2 h-2 bg-[#a0a0a0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-[#a0a0a0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-[#a0a0a0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sticky Input Area (Only when there are messages) */}
        {hasMessages && (
          <div className="w-full max-w-3xl mx-auto px-4 pb-6 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#191a1a] via-[#191a1a]/95 to-transparent pt-10">
            <form
              onSubmit={handleSubmitMessage}
              className="bg-[#202222] border border-[#404040] rounded-2xl p-3 flex flex-col gap-2 focus-within:border-[#606060] transition-all shadow-lg"
            >
              <textarea
                ref={inputRef}
                autoFocus
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a follow up..."
                rows={1}
                className="w-full bg-transparent border-none outline-none resize-none px-2 py-2 text-[16px] placeholder-[#808080] text-[#e8e8f0] min-h-[48px] max-h-60"
              />
              <div className="flex items-center justify-between px-1 mt-2">
                <div className="flex items-center gap-2">
                  <button type="button" className="text-[#a0a0a0] hover:text-[#e8e8f0] transition-colors p-1 bg-transparent hover:bg-[#303232] rounded-md">
                    <Icons.Plus />
                  </button>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#303232] text-[#e8e8f0] text-sm cursor-pointer hover:bg-[#3a3c3c] transition-colors">
                     <Icons.Computer />
                     <span>Computer</span>
                     <span className="text-[#a0a0a0] ml-1">+</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[#a0a0a0] hover:text-[#e8e8f0] text-sm cursor-pointer transition-colors px-2 py-1 rounded-md hover:bg-[#303232]">
                    <span>Model</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                  <button type="button" className="text-[#a0a0a0] hover:text-[#e8e8f0] transition-colors p-1.5 bg-transparent hover:bg-[#303232] rounded-full">
                    <Icons.Microphone />
                  </button>
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    className="w-9 h-9 ml-1 bg-[#e8e8f0] disabled:bg-[#303232] rounded-full flex items-center justify-center text-black disabled:text-[#a0a0a0] transition-all"
                  >
                    {chatInput.trim() ? <Icons.Send /> : <Icons.Audio />}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </main>

      <style>{`
       .custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #2a2b4b; border-radius: 10px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #353737; }
      `}</style>
    </div>
  )
}

export default Dashboard