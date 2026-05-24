import { NextRequest, NextResponse } from "next/server";
import { extractTextFromPDF } from "../../../lib/pdfParser";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

async function generateWithRetry(model: any, prompt: string, retries = 4): Promise<string> {
    for (let i = 0; i < retries; i++) {
        try {
            const result = await model.generateContent(prompt);
            return result.response.text();
        } catch (error: any) {
            const isRetryable = error?.status === 503 || error?.status === 429;
            if (isRetryable && i < retries - 1) {
                const delay = (i + 1) * 3000;
                console.log(`Attempt ${i + 1} failed (${error?.status}). Retrying in ${delay / 1000}s...`);
                await new Promise(res => setTimeout(res, delay));
            } else {
                throw error;
            }
        }
    }
    throw new Error("Max retries reached");
}

function smartSample(text: string, maxChars = 20000): string {
    const cleaned = text.replace(/\s+/g, " ").trim();
    const total = cleaned.length;

    if (total <= maxChars) return cleaned;

    // Take from beginning, middle, and end for better coverage
    const chunkSize = Math.floor(maxChars / 3);
    const start = cleaned.slice(0, chunkSize);
    const mid = cleaned.slice(Math.floor(total / 2) - chunkSize / 2, Math.floor(total / 2) + chunkSize / 2);
    const end = cleaned.slice(total - chunkSize);

    return `${start}\n\n[...middle of document...]\n\n${mid}\n\n[...later in document...]\n\n${end}`;
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const sentences = parseInt(formData.get("sentences") as string) || 5;

        if (!file || !(file instanceof File)) {
            return NextResponse.json(
                { error: "No PDF uploaded" },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const text = await extractTextFromPDF(buffer);

        if (!text?.trim()) {
            return NextResponse.json(
                { success: false, error: "Could not extract text from PDF." },
                { status: 400 }
            );
        }

        // Sample from across the whole document, not just the start
        const sampled = smartSample(text, 20000);

        const prompt = `You are a professional book summarizer. Based on the following excerpts from a book/document, write a high-quality summary in exactly ${sentences} sentences.

Rules:
- Do NOT copy sentences from the text
- Write in your own words
- Cover the main themes, key lessons, and overall message
- Sound like a book review, not a transcript
- Be specific about what the book teaches or argues

Document excerpts:
${sampled}`;

        const models = [ "gemini-3.1-flash-lite", "gemini-3.5-flash", "gemini-2.5-flash", "gemini-2.5-flash-lite"];
        let summary = "";
        let lastError: any;

        for (const modelName of models) {
            try {
                console.log(`Trying model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                summary = await generateWithRetry(model, prompt);
                break;
            } catch (error: any) {
                console.warn(`Model ${modelName} failed:`, error?.status);
                lastError = error;
            }
        }

        if (!summary) throw lastError;

        return NextResponse.json({ success: true, text, summary });
    } catch (error) {
        console.error("Summarize Error:", error);
        return NextResponse.json(
            { success: false, error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}