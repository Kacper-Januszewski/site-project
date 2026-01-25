
import { GoogleGenAI } from "@google/genai";
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

        const ai = new GoogleGenAI({ apiKey });

        const data = await req.json();
        const { message, history } = data;

        // Convert history format if needed, though simpler generation might strictly use 'contents'
        // The new SDK uses 'models.generateContent'.
        // We'll construct a prompt that includes history if possible, or just send the message for now
        // to match the user's snippet simplicity, but let's try to keep the chat history if we can.

        // For 'generateContent', we can pass a list of contents.
        // History from frontend is: { role: 'user'|'model', parts: [{ text: string }] }
        // New SDK expects 'contents': Array of Content objects.
        // Let's try to map it.

        // However, the user provided a snippet using "ai.models.generateContent".
        // Let's map our history to the format it expects or just append previous messages.

        // Simple mapping:
        // Explicitly type the array to avoid "implicitly has type 'any[]'" error
        let contents: { role: string; parts: { text: string }[] }[] = [];
        if (history && Array.isArray(history)) {
            contents = history.map((msg: any) => ({
                role: msg.role,
                parts: msg.parts
            }));
        }
        // Add current message
        contents.push({
            role: "user",
            parts: [{ text: message }]
        });

        // Use 'gemini-3-flash-preview' as requested by the user.
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: contents, // Pass full conversation history
        });

        const text = response.text; // formatting might be different in new SDK, user snippet used 'response.text' directly/property? 
        // User snippet: console.log(response.text);

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
