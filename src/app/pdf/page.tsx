import React from 'react';

export default function PDFPage() {
  return (
    <div className="relative w-full h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* PDF Viewer - Full Screen */}
      <iframe
        src="/document.pdf"
        className="w-full h-full border-none"
        title="Document Viewer"
      />

      {/* Custom Code Overlay (Placeholder for Chat App) */}
      <div className="absolute top-0 right-0 h-full w-full pointer-events-none sticky-overlay-container flex flex-col justify-end items-end p-6">
          {/* 
             Example Chat Widget Container 
             pointer-events-auto is needed here because the parent has pointer-events-none 
             to let clicks pass through to the PDF for scrolling etc.
          */}
          <div className="pointer-events-auto w-80 bg-white dark:bg-slate-800 shadow-2xl rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <span className="font-semibold text-sm">Assistant</span>
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
            </div>

            {/* Chat Body Placeholder */}
            <div className="p-4 h-64 bg-gray-50 dark:bg-slate-900/50 flex flex-col justify-center items-center text-center text-gray-400 text-xs">
              <p>Ready for your custom logic</p>
              <p>Add your chat application here</p>
            </div>

            {/* Input Placeholder */}
            <div className="p-3 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  disabled
                  placeholder="Type a message..." 
                  className="w-full bg-gray-100 dark:bg-slate-900 border-none rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

          </div>
      </div>
    </div>
  );
}
