import { NextResponse } from "next/server";
import OpenAI from "openai";
import { processProposalWithAI } from "../../utils/aiMiddleware";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
export const maxDuration = 20;
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { templateContent, userData } = body;

    if (!templateContent) {
      throw new Error("Missing templateContent");
    }
    if (!userData) {
      throw new Error("Missing userData");
    }

    const generatedProposal = await processProposalWithAI(
      templateContent,
      userData,
      groq
    );

    console.log("Generated proposal:", generatedProposal);

    return NextResponse.json({ proposal: generatedProposal });
  } catch (error: unknown) {
    console.error("Error in generate-proposal API:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to generate proposal", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to generate proposal",
        details: "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
