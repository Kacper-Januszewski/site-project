"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, ArrowLeftRight, Eye, EyeOff, Ghost, Palette } from 'lucide-react';




import ReactMarkdown from 'react-markdown';

type Message = {
    role: 'user' | 'model';
    text: string;
};

// Custom minimal scrollbar and selection styles
const globalStyles = `
  .minimal-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .minimal-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .minimal-scrollbar::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-color);
    border-radius: 20px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  .minimal-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: var(--scrollbar-hover-color);
  }
  
  /* Custom Text Selection */
  ::selection {
    background-color: var(--selection-bg);
    color: inherit;
  }
  ::-moz-selection {
    background-color: var(--selection-bg);
    color: inherit;
  }
`;


export default function PDFPage() {

    const [isOpen, setIsOpen] = useState(false);
    const [isRightAligned, setIsRightAligned] = useState(true);
    const [isInvisible, setIsInvisible] = useState(false);
    const [isHardInvisible, setIsHardInvisible] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // Dynamic Theme Colors
    const themeColor = isDarkTheme ? '#333333' : '#808080';
    const textClass = isDarkTheme ? 'text-[#333333]' : 'text-[#808080]';
    const borderClass = isDarkTheme ? 'border-[#333333]' : 'border-[#808080]';
    const bgClass = isDarkTheme ? 'bg-[#333333]' : 'bg-[#808080]';




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
                <style jsx global>{globalStyles}</style>
                <div
                    style={{
                        '--scrollbar-color': isDarkTheme ? 'rgba(51, 51, 51, 0.3)' : 'rgba(128, 128, 128, 0.3)',
                        '--scrollbar-hover-color': isDarkTheme ? 'rgba(51, 51, 51, 0.5)' : 'rgba(128, 128, 128, 0.5)',
                        '--selection-bg': isDarkTheme ? 'rgba(51, 51, 51, 0.3)' : 'rgba(128, 128, 128, 0.3)',
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden',
                        perspective: '1000px',
                        transform: 'translateZ(0)'
                    } as React.CSSProperties}
                    className={`

              pointer-events-auto transition-all duration-500 ease-in-out transform-gpu will-change-[opacity,transform]
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
                                        className={`hover:opacity-80 transition-colors`}
                                        style={{ color: themeColor }}
                                        title={isRightAligned ? "Move to Left" : "Move to Right"}
                                    >
                                        <ArrowLeftRight size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsInvisible(!isInvisible); }}
                                        className={`hover:opacity-80 transition-colors`}
                                        style={{ color: themeColor }}
                                        title={isInvisible ? "Show Chat" : "Soft Invisible Mode"}
                                    >
                                        {isInvisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsHardInvisible(!isHardInvisible); }}
                                        className={`text-[#808080] hover:text-[#808080]/80 transition-colors ${isHardInvisible ? 'opacity-50' : ''}`}
                                        style={{ color: themeColor }}
                                        title={isHardInvisible ? "Disable Hard Invisible" : "Enable Hard Invisible"}
                                    >
                                        <Ghost size={16} />
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setIsDarkTheme(!isDarkTheme); }}
                                        className={`hover:opacity-80 transition-colors`}
                                        style={{ color: themeColor }}
                                        title={isDarkTheme ? "Switch to Light Gray" : "Switch to Dark Gray"}
                                    >
                                        <Palette size={16} />
                                    </button>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    className={`hover:opacity-80 transition-colors`}
                                    style={{ color: themeColor }}
                                >
                                    <X size={20} />
                                </button>
                            </div>


                            {/* Chat Body - Straight text */}
                            <div className="flex-1 p-4 flex flex-col overflow-y-auto minimal-scrollbar mask-gradient">
                                <div className="space-y-3 mt-auto">

                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`
                                                text-sm p-1 max-w-[90%] font-medium
                                                ${msg.role === 'user'
                                                    ? 'self-end text-right'
                                                    : 'self-start text-left'}
                                            `}
                                            style={{ color: themeColor }}

                                        >
                                            <ReactMarkdown
                                                components={{
                                                    code({ node, inline, className, children, ...props }: any) {
                                                        return !inline ? (
                                                            <div className={`p-2 rounded-md my-2 overflow-x-auto minimal-scrollbar text-xs`} style={{ backgroundColor: 'transparent', color: themeColor }}>
                                                                <code className={className} {...props}>
                                                                    {children}
                                                                </code>
                                                            </div>
                                                        ) : (
                                                            <code className={`px-1 rounded`} style={{ backgroundColor: 'transparent', color: themeColor }} {...props}>
                                                                {children}
                                                            </code>
                                                        )
                                                    },
                                                    p: ({ children }) => <p style={{ color: themeColor }}>{children}</p>,
                                                    li: ({ children }) => <li style={{ color: themeColor }}>{children}</li>,
                                                    strong: ({ children }) => <strong style={{ color: themeColor }} className="font-bold">{children}</strong>

                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="self-start text-xs animate-pulse" style={{ color: themeColor, opacity: 0.7 }}>
                                            Thinking...
                                        </div>
                                    )}

                                    <div ref={messagesEndRef} />
                                </div>
                            </div>


                            {/* Input Area - Straight text */}
                            <div className="p-4">
                                <div className="flex gap-2 relative border-b" style={{ borderColor: isDarkTheme ? 'rgba(51, 51, 51, 0.3)' : 'rgba(128, 128, 128, 0.3)' }}>
                                    <input
                                        type="text"
                                        placeholder="Type here..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        spellCheck={false}
                                        className={`w-full bg-transparent border-none px-0 py-2 text-sm focus:outline-none focus:ring-0 ${isDarkTheme ? 'placeholder-[#333333]/50' : 'placeholder-[#808080]/50'}`}
                                        style={{ color: themeColor }}
                                    />

                                    <button
                                        onClick={handleSend}
                                        disabled={isLoading}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity disabled:opacity-30"
                                        style={{ color: themeColor }}
                                    >
                                        {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        // 10px dot
                        <div
                            className="w-[10px] h-[10px] rounded-full hover:opacity-80 transition-colors cursor-pointer"
                            style={{ backgroundColor: themeColor }}
                            title="Click to Open, Right-Click to Switch Side"
                            onContextMenu={(e) => { e.preventDefault(); setIsRightAligned(!isRightAligned); }}
                        ></div>

                    )}

                </div>
            </div>
        </div>
    );
}
