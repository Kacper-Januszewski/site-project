"use client";

import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function PDFPage() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="relative w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
            {/* PDF Viewer - Full Screen */}
            <iframe
                src="/document.pdf"
                className="w-full h-full border-none"
                title="Document Viewer"
            />

            {/* Custom Code Overlay (Chat App) */}
            <div className="absolute top-0 right-0 h-full w-full pointer-events-none sticky-overlay-container flex flex-col justify-end items-end p-6 z-50">

                {/* Chat Widget Container */}
                <div
                    className={`
              pointer-events-auto transition-all duration-500 ease-in-out
              ${isOpen ? 'w-80 h-96 opacity-100 translate-y-0' : 'w-12 h-12 opacity-100 translate-y-0 rounded-full'}
              backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 shadow-2xl overflow-hidden flex flex-col
              ${isOpen ? 'rounded-2xl' : 'rounded-full items-center justify-center cursor-pointer hover:bg-white/20'}
            `}
                    onClick={() => !isOpen && setIsOpen(true)}
                >

                    {isOpen ? (
                        <>
                            {/* Header */}
                            <div className="p-4 flex justify-between items-center bg-white/5 border-b border-white/10">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                                    <span className="font-medium text-sm text-white/90">Assistant</span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    className="text-white/50 hover:text-white transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Chat Body - More invisible/clean */}
                            <div className="flex-1 p-4 flex flex-col justify-end text-right">
                                {/* Messages would go here. Examples of camouflaged bubbles */}
                                <div className="space-y-3">
                                    <div className="self-end bg-white/10 text-white text-xs p-2 rounded-lg rounded-tr-none inline-block backdrop-blur-sm max-w-[80%] ml-auto">
                                        Hi! How can I help with this document?
                                    </div>
                                </div>
                            </div>

                            {/* Input Area */}
                            <div className="p-3 border-t border-white/10 bg-black/5">
                                <div className="flex gap-2 relative">
                                    <input
                                        type="text"
                                        placeholder="Type..."
                                        className="w-full bg-transparent text-white placeholder-white/40 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-white/40 focus:bg-white/5 transition-all"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors">
                                        <Send size={14} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <MessageSquare className="text-white w-5 h-5" />
                    )}

                </div>
            </div>
        </div>
    );
}
