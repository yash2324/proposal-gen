// app/api/templates/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const templates = await prisma.template.findMany();
    return NextResponse.json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    return NextResponse.json(
      { error: "Error fetching templates" },
      { status: 500 }
    );
  }
}
