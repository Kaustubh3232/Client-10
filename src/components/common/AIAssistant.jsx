import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'bot', text: "Namaste! I am the Blue Bird AI Assistant. How can I help you today regarding admissions, academics, or school facilities?" }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = { type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input.toLowerCase();
        setInput('');

        // Mock AI Responses
        setTimeout(() => {
            let botResponse = "I'm still learning about that! You can contact our office at +91-XXXXXXXXXX for specific details.";

            if (currentInput.includes('admission') || currentInput.includes('apply')) {
                botResponse = "Admissions for the 2024-25 session are open! You can fill out the enquiry form on our Admission page or visit the school campus between 9 AM and 2 PM.";
            } else if (currentInput.includes('fees') || currentInput.includes('cost')) {
                botResponse = "Our fee structure is tailored to each grade to ensure the best facilities. Please visit the accounts office for a detailed prospectus and fee schedule.";
            } else if (currentInput.includes('location') || currentInput.includes('where')) {
                botResponse = "We are located at [School Address]. You can find the exact location on our Contact Us page via Google Maps!";
            } else if (currentInput.includes('hi') || currentInput.includes('hello')) {
                botResponse = "Hello! I'm here to assist you. What would you like to know about Blue Bird International School?";
            }

            setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 20, scale: 0.9, filter: 'blur(10px)' }}
                        className="bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] w-[380px] h-[550px] overflow-hidden flex flex-col mb-6"
                    >
                        {/* Header */}
                        <div className="bg-[#064e3b] p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-xl">
                                    <Bot size={24} className="text-[var(--color-brand-gold)]" />
                                </div>
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-tighter">Blue Bird AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        <span className="text-[10px] opacity-60 font-bold uppercase tracking-widest">Online Assistant</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: msg.type === 'bot' ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    key={i}
                                    className={`flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[80%] p-4 rounded-3xl ${msg.type === 'bot'
                                        ? 'bg-emerald-50 text-[#064e3b] rounded-tl-sm'
                                        : 'bg-[#064e3b] text-white rounded-tr-sm'
                                        } text-sm font-medium shadow-sm`}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input */}
                        <div className="p-6 bg-emerald-50/50 border-t border-emerald-100">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your question..."
                                    className="w-full bg-white border-2 border-emerald-100 rounded-2xl py-3 pl-4 pr-12 text-sm font-bold focus:outline-none focus:border-[var(--color-brand-gold)] transition-all shadow-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#064e3b] text-white rounded-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                                >
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen ? 'bg-rose-500 text-white translate-x-12' : 'bg-[#064e3b] text-white'
                    }`}
            >
                {isOpen ? <X size={28} /> : (
                    <div className="relative">
                        <MessageSquare size={28} />
                        <Sparkles className="absolute -top-4 -right-4 text-[var(--color-brand-gold)]" size={20} />
                    </div>
                )}
            </motion.button>
        </div>
    );
};

export default AIAssistant;
