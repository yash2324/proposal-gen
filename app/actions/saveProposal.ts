// app/actions/saveProposal.ts
"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOptions";
import prisma from "@/lib/prismadb";

export async function saveProposal(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const templateId = formData.get("templateId") as string;
  const content = formData.get("content") as string;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const proposal = await prisma.proposals.create({
      data: {
        title,
        templateId,
        content,
        userId: user.id,
      },
    });

    return proposal;
  } catch (error) {
    console.error("Error saving proposal:", error);
    throw new Error("Error saving proposal");
  }
}
