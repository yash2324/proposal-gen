"use server";

import prisma from "@/lib/prismadb";

export async function getProposal(id: string) {
  try {
    const proposal = await prisma.proposals.findUnique({
      where: { id },
    });

    if (!proposal) {
      return null;
    }

    return {
      id: proposal.id,
      title: proposal.title,
      templateId: proposal.templateId,
      content: proposal.content,
    };
  } catch (error) {
    console.error("Error fetching proposal:", error);
    throw new Error("Failed to fetch proposal");
  }
}
