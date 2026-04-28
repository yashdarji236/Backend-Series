import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

/* ─── Icons ─────────────────────────────────────────────────────── */
const Icons = {
  Plus: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-7-7v14" />
    </svg>
  ),
  Library: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m16 6 4 14" /><path d="M12 6v14" /><path d="M8 8v12" /><path d="M4 4v16" />
    </svg>
  ),
  Send: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 12 7-7 7 7" /><path d="M12 19V5" />
    </svg>
  ),
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  AI: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
      <path d="M12 6a6 6 0 0 0-6 6c0 3.31 2.69 6 6 6s6-2.69 6-6c0-3.31-2.69-6-6-6z" />
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
    <div className="flex h-screen w-screen bg-[#0a0a0f] text-[#e8e8f0] font-['Sora'] overflow-hidden relative">

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-[100] w-[260px] bg-[#0a0a0f] border-r border-white/10 p-6 flex flex-col transition-transform duration-300 lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-7 h-7 bg-[#20d9d2]/10 border border-[#20d9d2]/20 rounded-lg flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#20d9d2" strokeWidth="2.5" />
              <path d="M20 20l-3-3" stroke="#20d9d2" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">perplexity</span>
        </div>



        {/* Navigation */}
        <nav className="space-y-1">
          <div
            onClick={() => { }}
            className="flex items-center gap-3 px-3 py-2.5 text-[#e8e8f0]/40 hover:text-[#e8e8f0] hover:bg-white/5 rounded-lg cursor-pointer transition-all"
          >
            <Icons.Library />
            <span className="text-sm font-medium">Library</span>
          </div>
        </nav>

        {/* History Section */}
        <div className="flex-1 mt-8 overflow-y-auto custom-scrollbar">
          <div className="text-[11px] uppercase tracking-widest text-[#e8e8f0]/30 px-3 mb-4">Recently Viewed</div>
          <div className="space-y-1">
            {Object.values(chats).reverse().map((chat , index) => (
              <div
                key={chat.id || index}
                onClick={() => openChat(chat.id)}
                className={`
                  px-3 py-1.5 text-sm rounded-lg cursor-pointer transition-all truncate
                  ${chat.id === currentChatId ? 'text-[#20d9d2] bg-[#20d9d2]/10' : 'text-[#e8e8f0]/40 hover:text-[#e8e8f0] hover:bg-white/5'}
                `}
              >
                {chat.title || 'Untitled Chat'}
              </div>
            ))}
          </div>
        </div>

        {/* Profile Footer */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-all text-left">
            <div className="w-6 h-6 bg-[#4a5568] rounded-full flex items-center justify-center text-[10px] font-bold">
              {user?.username?.[0]?.toUpperCase() || 'U'}
            </div>
            <span className="text-sm font-medium truncate">{user?.username || 'User'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative bg-[#0a0a0f] overflow-hidden">

        {/* Ambient Glows */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#20d9d2]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#20d9d2]/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Mobile Top Bar */}
        <header className="flex lg:hidden items-center px-6 h-14 border-b border-white/5">
          <button onClick={() => setSidebarOpen(true)} className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-all">
            <Icons.Menu />
          </button>
          <div className="flex-1 text-center font-semibold text-sm">perplexity</div>
        </header>

        {/* Chat Area */}
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto px-6 py-10 lg:px-12 flex flex-col items-center scroll-smooth"
        >
          {!hasMessages ? (
            <div className="flex-1 flex flex-col items-center justify-center -mt-20 text-center max-w-2xl w-full">
              <h1 className="font-['DM_Serif_Display'] text-4xl lg:text-6xl mb-12 tracking-tight">
                Where knowledge begins
              </h1>
            </div>
          ) : (
            <div className="w-full max-w-4xl flex flex-col gap-10">
              {currentMessages.map((message, index) => (
                <div
                  key={message.id || index}
                  className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-center'} animate-in fade-in slide-in-from-bottom-2 duration-500`}
                >
                  {message.role === 'user' ? (
                    <div className="max-w-[85%] bg-white/5 border border-white/10 rounded-2xl px-6 py-4 shadow-sm">
                      <h2 className="font-['DM_Serif_Display'] text-xl lg:text-2xl leading-snug text-right">
                        {message.content}
                      </h2>
                    </div>
                  ) : (
                    <div className="w-full max-w-3xl space-y-4">
                      <div className="flex items-center gap-2 text-[#20d9d2] mb-2">
                        <Icons.AI />
                        <span className="text-xs font-bold uppercase tracking-wider opacity-60">Answer</span>
                      </div>
                      <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/30 prose-pre:rounded-xl max-w-none text-[#e8e8f0]/90 bg-white/[0.02] border border-white/5 p-6 rounded-3xl">
                        <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className='mb-2 last:mb-0'>{children}</p>,
                      ul: ({ children }) => <ul className='mb-2 list-disc pl-5'>{children}</ul>,
                      ol: ({ children }) => <ol className='mb-2 list-decimal pl-5'>{children}</ol>,
                      code: ({ children }) => <code className='rounded bg-white/10 px-1 py-0.5'>{children}</code>,
                      pre: ({ children }) => <pre className='mb-2 overflow-x-auto rounded-xl bg-black/30 p-3'>{children}</pre>
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
                <div className="flex flex-col items-center animate-in fade-in duration-300">
                  <div className="w-full max-w-3xl space-y-4">
                    <div className="flex items-center gap-2 text-[#20d9d2] mb-2">
                      <Icons.AI />
                      <span className="text-xs font-bold uppercase tracking-wider opacity-60">Thinking</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-6 rounded-3xl flex gap-1.5 items-center">
                      <div className="w-2 h-2 bg-[#20d9d2]/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-[#20d9d2]/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-[#20d9d2]/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="w-full max-w-3xl mx-auto px-6 pb-8 sticky bottom-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/95 to-transparent">
          <form
            onSubmit={handleSubmitMessage}
            className="bg-[#111116] border border-white/10 rounded-2xl p-3 focus-within:border-[#20d9d2]/30 transition-all shadow-2xl"
          >
            <textarea
              ref={inputRef}
              autoFocus
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={hasMessages ? "Ask a follow up..." : "Ask anything..."}
              rows={1}
              className="w-full bg-transparent border-none outline-none resize-none px-2 py-1 text-base placeholder-[#e8e8f0]/30 min-h-[44px] max-h-60"
            />
            <div className="flex items-center justify-end mt-2 px-1">
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="w-8 h-8 bg-[#20d9d2] disabled:bg-[#e8e8f0]/20 rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 disabled:scale-100 transition-all shadow-lg"
              >
                <Icons.Send />
              </button>
            </div>
          </form>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  )
}

export default Dashboard