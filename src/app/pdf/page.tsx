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
              flex flex-col
              ${isOpen ? '' : 'items-center justify-center cursor-pointer bg-slate-900 text-white rounded-full'}
            `}
                    onClick={() => !isOpen && setIsOpen(true)}
                >

                    {isOpen ? (
                        <>
                            {/* Header - Invisible, just X button */}
                            <div className="p-4 flex justify-end items-center">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Chat Body - Invisible container */}
                            <div className="flex-1 p-4 flex flex-col justify-end text-right">
                                <div className="space-y-3">
                                    <div className="self-end bg-blue-600 text-white text-xs p-3 rounded-2xl rounded-tr-none inline-block shadow-sm max-w-[85%] ml-auto">
                                        Hi! How can I help with this document?
                                    </div>
                                </div>
                            </div>

                            {/* Input Area - Invisible container */}
                            <div className="p-3">
                                <div className="flex gap-2 relative">
                                    <input
                                        type="text"
                                        placeholder="Type..."
                                        className="w-full bg-white/90 dark:bg-black/80 backdrop-blur text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 p-1 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full transition-colors">
                                        <Send size={16} />
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
