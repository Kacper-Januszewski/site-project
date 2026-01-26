import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// Allow the function to run for up to 60 seconds (Vercel Hobby limit might be 10s or 60s depending on region/plan, but this helps if allowed)
export const maxDuration = 60;

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            console.error("GEMINI_API_KEY is missing from environment variables");
            return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not set on server" }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const ai = new GoogleGenAI({ apiKey });

        const data = await req.json();
        const { message, history, model } = data;

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

        // Use the requested model or default to flash
        const selectedModel = model || "gemini-3-flash-preview";

        // Use 'generateContentStream' for streaming
        const streamResult = await ai.models.generateContentStream({
            model: selectedModel,
            contents: contents, // Pass full conversation history
            config: {
                temperature: 0.1,
                systemInstruction: {
                    parts: [{ text: "You are a direct, fact-based logic engine. You do not use greetings, pleasantries, or closing remarks. You output only the answer. If the answer is a code snippet, output only the code. Do not apologize. Do not say 'Here is the answer'. Be purely functional." }]
                }
            }
        });

        // Create a ReadableStream from the Gemini stream
        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    // streamResult is the AsyncGenerator
                    for await (const chunk of streamResult) {
                        const chunkText = chunk.text; // Access as property, not function
                        if (chunkText) {
                            controller.enqueue(encoder.encode(chunkText));
                        }
                    }
                    controller.close();
                } catch (error) {
                    controller.error(error);
                }
            },
        });

        return new Response(readableStream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });

    } catch (error: any) {
        console.error("Error generating content:", error);
        return new Response(JSON.stringify({
            error: "Failed to generate content",
            details: error.message || String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
