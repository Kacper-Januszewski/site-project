"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ArrowLeftRight, Eye, EyeOff, Ghost } from 'lucide-react';



import ReactMarkdown from 'react-markdown';

type Message = {
    role: 'user' | 'model';
    text: string;
};

export default function PDFPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isRightAligned, setIsRightAligned] = useState(true);
    const [isInvisible, setIsInvisible] = useState(false);
    const [isHardInvisible, setIsHardInvisible] = useState(false);



    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: 'Hi! How can I help with this document?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        try {
            // Filter out the initial greeting if it's the first message, 
            // because Gemini requires history to start with 'user' or be empty + 'user' prompt.
            // Actually, we should just send meaningful history.
            // If the first message is 'model', exclude it.
            const validHistory = messages.filter((_, index) => index > 0).map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // If history is empty, that's fine. The 'message' (userMessage) starts the chat.
                body: JSON.stringify({ message: userMessage, history: validHistory })
            });

            if (!response.ok) {
                let errorData;
                try {
                    errorData = await response.json();
                } catch {
                    errorData = { error: `Server Error (${response.status})` };
                }
                console.error("Server Error Details:", errorData);
                throw new Error(errorData.details || errorData.error || 'Failed to send message');
            }

            // Stream reading logic
            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            // Add an empty model message to start filling
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                setMessages(prev => {
                    const lastMsg = prev[prev.length - 1];
                    // Create new array with updated last message
                    const newMessages = prev.slice(0, -1);
                    return [...newMessages, { ...lastMsg, text: lastMsg.text + chunk }];
                });
            }

        } catch (error: any) {
            console.error("Chat Error:", error);
            const errorMessage = error.message || "Sorry, I encountered an error.";
            // Check if the last message is empty model message (failed mid-stream or start), if so update it, else append error
            setMessages(prev => {
                const lastMsg = prev[prev.length - 1];
                if (lastMsg.role === 'model' && lastMsg.text === '') {
                    return [...prev.slice(0, -1), { role: 'model', text: errorMessage }];
                }
                return [...prev, { role: 'model', text: errorMessage }];
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="relative w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            {/* PDF Viewer - Full Screen */}
            <iframe
                src="/document.pdf"
                className="w-full h-full border-none"
                title="Document Viewer"
            />

            {/* Custom Code Overlay (Chat App) */}
            <div className={`absolute top-0 h-full w-full pointer-events-none sticky-overlay-container flex flex-col justify-end p-6 z-50 ${isRightAligned ? 'right-0 items-end' : 'left-0 items-start'}`}>

                <div
                    className={`
              pointer-events-auto transition-all duration-500 ease-in-out
              ${isOpen ? `w-80 h-96 ${isHardInvisible ? 'opacity-0' : isInvisible ? 'opacity-0 hover:opacity-100' : 'opacity-100'} translate-y-0` : 'w-auto h-auto opacity-80 translate-y-0'}
              flex flex-col


              ${isOpen ? '' : 'items-center justify-center cursor-pointer'} 
            `}
                    onClick={() => !isOpen && setIsOpen(true)}
                >

                    {isOpen ? (
                        <>
                            {/* Header - Invisible, just X button */}
                            <div className="p-4 flex justify-between items-center">
                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsRightAligned(!isRightAligned); }}
                                        className="text-[#808080] hover:text-[#808080]/80 transition-colors"
                                        title={isRightAligned ? "Move to Left" : "Move to Right"}
                                    >
                                        <ArrowLeftRight size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsInvisible(!isInvisible); }}
                                        className="text-[#808080] hover:text-[#808080]/80 transition-colors"
                                        title={isInvisible ? "Show Chat" : "Soft Invisible Mode"}
                                    >
                                        {isInvisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsHardInvisible(!isHardInvisible); }}
                                        className={`text-[#808080] hover:text-[#808080]/80 transition-colors ${isHardInvisible ? 'opacity-50' : ''}`}
                                        title={isHardInvisible ? "Disable Hard Invisible" : "Enable Hard Invisible"}
                                    >
                                        <Ghost size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    className="text-[#808080] hover:text-[#808080]/80 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Chat Body - Straight text */}
                            <div className="flex-1 p-4 flex flex-col overflow-y-auto no-scrollbar mask-gradient">
                                <div className="space-y-3 mt-auto">
                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`
                                                text-sm p-1 max-w-[90%] font-medium
                                                ${msg.role === 'user'
                                                    ? 'self-end text-right text-[#808080]'
                                                    : 'self-start text-left text-[#808080]'}
                                            `}
                                        >
                                            <ReactMarkdown
                                                components={{
                                                    code({ node, inline, className, children, ...props }: any) {
                                                        return !inline ? (
                                                            <div className="bg-gray-800 text-[#808080] p-2 rounded-md my-2 overflow-x-auto text-xs">
                                                                <code className={className} {...props}>
                                                                    {children}
                                                                </code>
                                                            </div>
                                                        ) : (
                                                            <code className="bg-[#808080]/10 px-1 rounded text-[#808080]" {...props}>
                                                                {children}
                                                            </code>
                                                        )
                                                    },
                                                    p: ({ children }) => <p className="text-[#808080]">{children}</p>,
                                                    li: ({ children }) => <li className="text-[#808080]">{children}</li>,
                                                    strong: ({ children }) => <strong className="text-[#808080] font-bold">{children}</strong>
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="self-start text-[#808080]/70 text-xs animate-pulse">
                                            Thinking...
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>


                            {/* Input Area - Straight text */}
                            <div className="p-4">
                                <div className="flex gap-2 relative border-b border-[#808080]/30">
                                    <input
                                        type="text"
                                        placeholder="Type here..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="w-full bg-transparent text-[#808080] placeholder-[#808080]/50 border-none px-0 py-2 text-sm focus:outline-none focus:ring-0"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={isLoading}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-[#808080] p-1 hover:opacity-70 transition-opacity disabled:opacity-30"
                                    >
                                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        // 10px dot
                        <div className="w-[10px] h-[10px] bg-[#808080] rounded-full hover:bg-[#808080]/80 transition-colors cursor-pointer"></div>
                    )}

                </div>
            </div>
        </div>
    );
}
