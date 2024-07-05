import { NextResponse } from "next/server";
import OpenAI from "openai";
import { processProposalWithAI } from "../../utils/aiMiddleware";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received request body:", body);

    const { templateContent, userData } = body;

    if (!templateContent) {
      throw new Error("Missing templateContent");
    }
    if (!userData) {
      throw new Error("Missing userData");
    }

    console.log("Processing with:", { templateContent, userData });

    const generatedProposal = await processProposalWithAI(
      templateContent,
      userData,
      openai
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
