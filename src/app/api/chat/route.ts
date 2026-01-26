import { GoogleGenAI } from "@google/genai";

export const runtime = 'edge';

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
        const { message, history, model, images } = data;

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

        let contents: { role: string; parts: any[] }[] = [];
        if (history && Array.isArray(history)) {
            contents = history.map((msg: any) => ({
                role: msg.role,
                parts: msg.parts
            }));
        }

        contents.push({
            role: "user",
            parts: formatParts(message, images)
        });

        const selectedModel = model || "gemini-3-flash-preview";

        // Create stream immediately to send headers to client and avoid timeout
        const encoder = new TextEncoder();
        const readableStream = new ReadableStream({
            async start(controller) {
                // Keep-Alive Loop: Send a null byte every 3 seconds to prevent timeout without affecting text
                const keepAliveInterval = setInterval(() => {
                    try {
                        controller.enqueue(encoder.encode("\0"));
                    } catch (e) {
                        clearInterval(keepAliveInterval);
                    }
                }, 3000);

                try {
                    const streamResult = await ai.models.generateContentStream({
                        model: selectedModel,
                        contents: contents,
                        config: {
                            temperature: 1.0,
                            // Removed thinkingLevel: "low" to allow default High thinking for Pro
                            systemInstruction: {
                                parts: [{ text: "You are a minimal assistant. Keep responses concise and to the point. Do not use pleasantries. Output only the answer." }]
                            }
                        }
                    });

                    for await (const chunk of streamResult) {
                        // Clear keep-alive once we have data
                        clearInterval(keepAliveInterval);

                        const chunkText = chunk.text;
                        if (chunkText) {
                            controller.enqueue(encoder.encode(chunkText));
                        }
                    }
                    clearInterval(keepAliveInterval); // Ensure clear
                    controller.close();
                } catch (error: any) {
                    clearInterval(keepAliveInterval); // Ensure clear
                    console.error("Streaming/Generation Error:", error);
                    controller.error(error);
                }
            },
        });


        return new Response(readableStream, {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });

    } catch (error: any) {
        console.error("Request Error:", error);
        return new Response(JSON.stringify({
            error: "Failed to process request",
            details: error.message || String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

