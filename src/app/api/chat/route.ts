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

        const ai = new GoogleGenAI({ apiKey, apiVersion: "v1alpha" });

        const data = await req.json();
        const { message, history, model, images } = data; // Receive images array [ { data: base64, mimeType: string } ]

        // Helper to format parts
        const formatParts = (text: string, imgs: any[]) => {
            const parts: any[] = [{ text }];
            if (imgs && Array.isArray(imgs)) {
                imgs.forEach(img => {
                    parts.push({
                        inlineData: {
                            mimeType: img.mimeType,
                            data: img.data
                        },
                        mediaResolution: {
                            level: "media_resolution_high"
                        }
                    });
                });
            }
            return parts;
        };


        // Simple mapping:
        let contents: { role: string; parts: any[] }[] = [];
        if (history && Array.isArray(history)) {
            // We assume history might now contain inlineData, but for simplicity 
            // and saving context, we might strip images from history or keep them if efficient.
            // For now, let's just pass text from history to save tokens unless user wants full multi-turn vision.
            // The prompt implies we want to be able to "add" images.
            // Let's assume history contains minimal text representations if we don't want to re-upload images.
            // Actually, best practice for vision history is to retain the inlineData. 
            // But we need to make sure the frontend sends it back correctly.
            // Let's rely on frontend sending 'parts' correctly structured if it does.
            contents = history.map((msg: any) => ({
                role: msg.role,
                parts: msg.parts // Pass through parts (text + images)
            }));
        }

        // Add current message with potential images
        contents.push({
            role: "user",
            parts: formatParts(message, images)
        });

        // Use the requested model or default to flash
        const selectedModel = model || "gemini-3-flash-preview";

        // Use 'generateContentStream' for streaming
        const streamResult = await ai.models.generateContentStream({
            model: selectedModel,
            contents: contents, // Pass full conversation history
            config: {
                temperature: 1.0,
                systemInstruction: {
                    parts: [{ text: "You are a minimal assistant. Keep responses concise and to the point. Do not use pleasantries. Output only the answer." }]
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
