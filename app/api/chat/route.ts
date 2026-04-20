export const maxDuration = 30; 
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            goal: { type: SchemaType.STRING },
            subtasks: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  id: { type: SchemaType.STRING },
                  title: { type: SchemaType.STRING },
                  energy: { type: SchemaType.STRING, format: "enum", enum: ["low", "mid", "high"] }
                },
                required: ["id", "title", "energy"]
              }
            }
          },
          required: ["goal", "subtasks"]
        }
      }
    });

    const result = await model.generateContent(`Break down this goal into 5 sub-tasks: ${prompt}`);
    const response = result.response;
    const rawText = response.text();

    if (!rawText || typeof rawText !== "string") {
      throw new Error("AI returned an empty or invalid response.");
    }

    const cleanJson = rawText.replace(/```json|```/g, "").trim();
    const structuredData = JSON.parse(cleanJson);

    return NextResponse.json(structuredData);

  } catch (error: any) {
    // Technical details for terminal/logs only
    console.error("VERCEL ERROR FULL:", JSON.stringify(error, null, 2));
    console.error("VERCEL ERROR MESSAGE:", error.message);
    console.error("VERCEL ERROR STATUS:", error.status);
    console.error("VERCEL ERROR CODE:", error.code);
    
    if (error.status === 429 || error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json(
        { error: "You've hit the daily limit. Come back tomorrow!" }, 
        { status: 429 }
      );
    }

    if (error.message?.includes("503") || error.message?.includes("Service Unavailable")) {
      return NextResponse.json(
        { error: "AI is a bit busy right now. Try again in a few seconds!" },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again!" }, 
      { status: 500 }
    );
  }
}