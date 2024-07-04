// /app/actions/fetchUserData.ts
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";

export async function fetchUserData() {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return { success: false, error: "User not authenticated" };
    }

    const email = session.user.email;
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        companyInfo: {
          include: {
            Testimonials: true,
            projects: true,
            pricingSection: true,
            teamMembers: true,
          },
        },
      },
    });

    if (!user || !user.companyInfo) {
      return { success: false, error: "User or company info not found" };
    }

    const companyInfo = user.companyInfo;

    return {
      success: true,
      data: {
        email: user.email,
        companyInfo: {
          name: companyInfo.name,
          address: companyInfo.address,
          phone: companyInfo.phone,
          email: companyInfo.email,
          logo: companyInfo.logo,
          website: companyInfo.website,
          executiveSummary: companyInfo.executiveSummary,
        },
        testimonials: companyInfo.Testimonials,
        projects: companyInfo.projects,
        pricingSection: companyInfo.pricingSection,
        teamMembers: companyInfo.teamMembers,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, error: "Failed to fetch user data" };
  }
}
