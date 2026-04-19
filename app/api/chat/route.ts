import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Break down this goal into 5 sub-tasks: ${prompt}`,
      config: {
        // This is the 2026 way to force a specific structure
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

    // In @google/genai, the response is already parsed if you use responseSchema
    // but we check it just in case
    const structuredData = typeof response.text === 'string' 
      ? JSON.parse(response.text) 
      : response.text;

    return NextResponse.json(structuredData);
  } catch (error: any) {
    console.error("PROMPT ERROR:", error);
    return NextResponse.json(
      { error: "AI failed to format the task list. Try again." }, 
      { status: 500 }
    );
  }
}