import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Product } from '../types';
import { getShoppingAdvice } from '../services/geminiService';

interface GeminiAssistantProps {
  products: Product[];
  currentCart: Product[];
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ products, currentCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm your Gemini Assistant. How can I help you find the perfect product today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const response = await getShoppingAdvice([...messages, userMsg], products, currentCart);
    
    setMessages(prev => [...prev, { role: 'assistant' as const, content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="bg-white dark:bg-slate-800 w-80 sm:w-96 h-[500px] shadow-2xl rounded-3xl flex flex-col border border-gray-200 dark:border-slate-700 overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#131921] text-white p-5 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <i className="fa-solid fa-wand-magic-sparkles text-[#131921] text-sm"></i>
              </div>
              <span className="font-bold font-poppins text-sm tracking-tight">FortumarsMart Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-amber-400 transition-colors p-2">
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-slate-900/50 backdrop-blur-sm">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-slate-900 dark:bg-slate-700 text-white rounded-br-none shadow-md' 
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 rounded-bl-none'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 animate-pulse">
                  <span className="text-slate-400 dark:text-slate-500 text-xs italic font-medium">Assistant is thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 flex gap-3">
            <input
              type="text"
              className="flex-grow border dark:border-slate-700 bg-slate-50 dark:bg-slate-900 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all dark:text-white"
              placeholder="How can I help with your lifestyle?"
              value={input}
              // Fixed: Using setInput instead of undefined setQuery
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="bg-amber-500 hover:bg-amber-400 text-slate-900 h-11 w-11 rounded-full flex items-center justify-center disabled:opacity-30 disabled:grayscale transition-all active:scale-90 shadow-md"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-[#131921] text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-3 border border-white/10"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-wand-magic-sparkles text-[#131921] text-xs"></i>
          </div>
          <span className="font-bold pr-2 hidden sm:inline tracking-tight font-poppins">Ask Gemini</span>
        </button>
      )}
    </div>
  );
};

export default GeminiAssistant;