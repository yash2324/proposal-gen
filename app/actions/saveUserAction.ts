"use server";

import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { ObjectId } from "mongodb";

interface UserData {
  email: string;
  companyInfo: any;
  testimonials: any[];
  projects: any[];
  pricingSection: any;
  teamMembers: any[];
}

export async function saveUserData(data: UserData) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      console.error("No authenticated user found in session");
      return { success: false, error: "User not authenticated" };
    }

    const sessionEmail = session.user.email;
    console.log("Session email:", sessionEmail);

    const user = await prisma.user.findUnique({
      where: { email: sessionEmail },
      include: { companyInfo: true },
    });

    if (!user) {
      console.error("User not found in database:", sessionEmail);
      return { success: false, error: "User not found" };
    }

    console.log("User found:", user.id);

    const { companyInfo, testimonials, projects, pricingSection, teamMembers } =
      data;

    // Ensure all related data has valid ObjectIDs
    const validTestimonials = testimonials.map((t) => ({
      ...t,
      id: new ObjectId().toString(),
    }));
    const validProjects = projects.map((p) => ({
      ...p,
      id: new ObjectId().toString(),
    }));
    const validTeamMembers = teamMembers.map((tm) => ({
      ...tm,
      id: new ObjectId().toString(),
    }));

    // Use a transaction to ensure data consistency
    const result = await prisma.$transaction(async (prisma) => {
      let companyInfoRecord: any;

      // Check if CompanyInfo exists
      const existingCompanyInfo = await prisma.companyInfo.findUnique({
        where: { userId: user.id },
      });

      if (existingCompanyInfo) {
        // Update existing company info
        companyInfoRecord = await prisma.companyInfo.update({
          where: { id: existingCompanyInfo.id },
          data: { ...companyInfo },
        });
      } else {
        // Create new company info
        companyInfoRecord = await prisma.companyInfo.create({
          data: {
            ...companyInfo,
            userId: user.id,
          },
        });
      }

      // Now that we have a valid CompanyInfo record, we can create/update related data
      await prisma.testimonials.deleteMany({
        where: { companyInfoId: companyInfoRecord.id },
      });
      if (validTestimonials.length > 0) {
        await prisma.testimonials.createMany({
          data: validTestimonials.map((t) => ({
            ...t,
            companyInfoId: companyInfoRecord.id,
          })),
        });
      }

      await prisma.projects.deleteMany({
        where: { companyInfoId: companyInfoRecord.id },
      });
      if (validProjects.length > 0) {
        await prisma.projects.createMany({
          data: validProjects.map((p) => ({
            ...p,
            companyInfoId: companyInfoRecord.id,
          })),
        });
      }

      if (pricingSection) {
        await prisma.pricingSection.upsert({
          where: { companyInfoId: companyInfoRecord.id },
          update: pricingSection,
          create: {
            ...pricingSection,
            companyInfoId: companyInfoRecord.id,
          },
        });
      }

      await prisma.teamMember.deleteMany({
        where: { companyInfoId: companyInfoRecord.id },
      });
      if (validTeamMembers.length > 0) {
        await prisma.teamMember.createMany({
          data: validTeamMembers.map((tm) => ({
            ...tm,
            companyInfoId: companyInfoRecord.id,
          })),
        });
      }

      return { company: companyInfoRecord };
    });

    console.log("Data saved successfully");
    return { success: true, company: result.company };
  } catch (error: unknown) {
    console.error("Error in saveUserData:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred" };
  }
}
