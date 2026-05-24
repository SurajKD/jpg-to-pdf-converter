import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

async function generateWithRetry(model: any, prompt: string, retries = 4): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error: any) {
      if ((error?.status === 503 || error?.status === 429) && i < retries - 1) {
        await new Promise(res => setTimeout(res, (i + 1) * 3000));
      } else throw error;
    }
  }
  throw new Error("Max retries reached");
}

async function callGemini(prompt: string, requestedModel?: string): Promise<string> {
  const models = [requestedModel, "gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.5-pro"]
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i) as string[];

  let lastError: any;
  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      return await generateWithRetry(model, prompt);
    } catch (e: any) {
      lastError = e;
    }
  }
  throw lastError;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // ── Fetch video info mode ──────────────────────────────────
    if (body.action === "fetch") {
      const { videoId } = body;

      // 1. Get real title from YouTube oEmbed (no API key needed)
      let title = "YouTube Video";
      let authorName = "";
      try {
        const oembedRes = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        );
        if (oembedRes.ok) {
          const oembedData = await oembedRes.json();
          title = oembedData.title || title;
          authorName = oembedData.author_name || "";
        }
      } catch {}

      // 2. Use Gemini to generate a summary based on the real title
      let summary = "";
      try {
        const summaryPrompt = `The YouTube video is titled "${title}" by "${authorName}". 
Based on this title, write a 3–4 sentence description of what this video is likely about and what viewers will learn. 
Be specific and accurate based on the title. Return only the description, no preamble.`;
        summary = await callGemini(summaryPrompt);
      } catch {
        summary = `A YouTube video titled "${title}"${authorName ? ` by ${authorName}` : ""}.`;
      }

      return NextResponse.json({ title, authorName, summary });
    }

    // ── Generate content mode ──────────────────────────────────
    const { prompt, model: requestedModel } = body;
    if (!prompt) return NextResponse.json({ error: "No prompt provided" }, { status: 400 });

    const text = await callGemini(prompt, requestedModel);
    return NextResponse.json({ text });

  } catch (error) {
    console.error("Repurpose Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}