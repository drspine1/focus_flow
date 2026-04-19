export const maxDuration = 30; 
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-preview", 
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

    // 1. Get the text and handle potential 'undefined'
    const rawText = response.text;

    // 2. The Guard Clause: This fixes the Vercel build error
    if (!rawText || typeof rawText !== "string") {
      throw new Error("AI returned an empty or invalid response.");
    }

    // 3. Now that we know rawText is a string, it's safe to use .replace()
    const cleanJson = rawText.replace(/```json|```/g, "").trim();
    const structuredData = JSON.parse(cleanJson);

    return NextResponse.json(structuredData);

  } catch (error: any) {
    console.error("VERCEL ERROR:", error.message);
    
    // Check if it's a quota issue to give a better message
    if (error.message?.includes("429")) {
      return NextResponse.json(
        { error: "Daily limit reached. Try again in a bit!" }, 
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "AI logic error. Check model compatibility." }, 
      { status: 500 }
    );
  }
}