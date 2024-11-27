import React from "react";

const Wiki = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <iframe
                src="/wiki/index.html"
                className="w-full h-[100vh] border-0"
            />
        </div>
    );
};

export default Wiki;