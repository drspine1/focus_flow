export const maxDuration = 30; 
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
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
    console.error("VERCEL ERROR FULL:", JSON.stringify(error, null, 2));
    console.error("VERCEL ERROR MESSAGE:", error.message);
    console.error("VERCEL ERROR STATUS:", error.status);
    console.error("VERCEL ERROR CODE:", error.code);
    
    // Check if it's a quota issue to give a better message
    if (error.status === 429 || error.message?.includes("429") || error.message?.includes("RESOURCE_EXHAUSTED")) {
      return NextResponse.json(
        { error: "Daily limit reached. Try again in a bit!" }, 
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || "AI logic error. Check model compatibility." }, 
      { status: 500 }
    );
  }
}