export const maxDuration = 30; // Allows the AI more time to think on Vercel
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function POST(req: Request) {
  try {
    // 1. Check if the API Key exists (Helps debug Vercel logs)
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing from environment variables.");
    }

    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Break down this goal into 5 sub-tasks: ${prompt}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            goal: { type: "string" },
            subtasks: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  energy: { type: "string", enum: ["low", "mid", "high"] }
                },
                required: ["id", "title", "energy"]
              }
            }
          },
          required: ["goal", "subtasks"]
        }
      }
    });

    // 2. Vercel-Safe Parsing Logic
    const rawText = response.text;
    
    if (!rawText) {
      throw new Error("AI returned an empty response.");
    }

    // Sometimes AI wraps JSON in markdown blocks even when told not to
    const cleanJson = rawText.replace(/```json|```/g, "").trim();
    const structuredData = JSON.parse(cleanJson);

    return NextResponse.json(structuredData);

  } catch (error: any) {
    // 3. This will show up in your Vercel Dashboard -> Logs
    console.error("VERCEL DEPLOYMENT ERROR:", error.message);
    
    return NextResponse.json(
      { error: "Plan generation failed. Please check your connection or try a simpler goal." }, 
      { status: 500 }
    );
  }
}