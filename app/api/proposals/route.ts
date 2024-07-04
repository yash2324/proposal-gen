import { NextResponse } from "next/server";
import prisma from "../../../lib/prismadb"; // Adjust the import path as needed
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/AuthOptions";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user?.email ?? undefined },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const proposals = await prisma.proposals.findMany({
      where: { userId: user.id },
    });

    return NextResponse.json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
