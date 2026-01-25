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

                <div
                    className={`
              pointer-events-auto transition-all duration-500 ease-in-out
              ${isOpen ? 'w-80 h-96 opacity-100 translate-y-0' : 'w-12 h-12 opacity-100 translate-y-0 rounded-full'}
              flex flex-col
              ${isOpen ? '' : 'items-center justify-center cursor-pointer bg-black text-white rounded-full'} 
            `}
                    onClick={() => !isOpen && setIsOpen(true)}
                >

                    {isOpen ? (
                        <>
                            {/* Header - Invisible, just X button */}
                            <div className="p-4 flex justify-end items-center">
                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Chat Body - Straight text */}
                            <div className="flex-1 p-4 flex flex-col justify-end text-right">
                                <div className="space-y-3">
                                    <div className="self-end text-black dark:text-white font-medium text-sm p-1 max-w-[90%] ml-auto">
                                        Hi! How can I help with this document?
                                    </div>
                                </div>
                            </div>

                            {/* Input Area - Straight text */}
                            <div className="p-4">
                                <div className="flex gap-2 relative border-b border-gray-300 dark:border-gray-600">
                                    <input
                                        type="text"
                                        placeholder="Type here..."
                                        className="w-full bg-transparent text-black dark:text-white placeholder-gray-500 border-none px-0 py-2 text-sm focus:outline-none focus:ring-0"
                                    />
                                    <button className="absolute right-0 top-1/2 -translate-y-1/2 text-black dark:text-white p-1 hover:opacity-70 transition-opacity">
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
