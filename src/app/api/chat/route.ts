
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing from environment variables");
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set on server" },
                { status: 401 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const data = await req.json();
        const { message, history } = data;

        // Construct chat history if provided, otherwise start new chat
        const chat = model.startChat({
            history: history || [],
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error: any) {
        console.error("Error generating content:", error);
        return NextResponse.json(
            {
                error: "Failed to generate content",
                details: error.message || String(error)
            },
            { status: 500 }
        );
    }
}
