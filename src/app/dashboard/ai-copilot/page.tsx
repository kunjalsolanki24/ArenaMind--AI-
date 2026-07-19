"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export default function AICopilotScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hello! I am ArenaMind AI. How can I assist you with stadium operations today? I can help predict crowd flow, locate incidents, or optimize staff deployment."
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setIsTyping(true);

    // Mock Gemini API Response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: getMockResponse(newMsg.text)
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getMockResponse = (query: string) => {
    const lower = query.toLowerCase();
    if (lower.includes("crowd") || lower.includes("density")) {
      return "Current crowd density is highest in the North Wing (82%). I recommend redirecting fans to the East Wing gates and opening 3 additional turnstiles to ease congestion.";
    }
    if (lower.includes("food") || lower.includes("inventory")) {
      return "Food stall 4A and 7B are running low on beverages. I have auto-drafted a restock request to the logistics team.";
    }
    if (lower.includes("medical") || lower.includes("emergency")) {
      return "Medical incident reported in Sector C, Row 12. Dispatching the nearest volunteer team and alerting onsite paramedics.";
    }
    return "I've analyzed the current stadium metrics. Operations are nominal. Is there a specific sector or system you'd like me to focus on?";
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6 flex items-center space-x-3">
        <div className="p-2 bg-primary/20 rounded-xl">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">ArenaMind Copilot</h1>
          <p className="text-white/50 text-sm">Powered by Gemini AI</p>
        </div>
      </div>

      <div className="flex-1 glass-panel rounded-3xl p-4 md:p-6 flex flex-col relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4 scrollbar-hide z-10">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-white/10 ml-3' : 'bg-primary/20 mr-3'}`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-primary" />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-primary/20 text-white rounded-tr-sm border border-primary/20' : 'bg-black/40 text-white/90 rounded-tl-sm border border-white/10'}`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start z-10">
               <div className="flex flex-row max-w-[80%]">
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-primary/20 mr-3">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 rounded-tl-sm flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="relative z-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask ArenaMind AI about stadium operations..."
            className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary text-black rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
