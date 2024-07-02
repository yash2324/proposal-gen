"use server";

import prisma from "@/lib/prismadb";

interface UserData {
  email: string;
  companyInfo: any;
  testimonials: any[];
  projects: any[];
}

export async function saveUserData(data: UserData) {
  const { email, companyInfo, testimonials, projects } = data;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { companyInfo: true },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    const userId = user.id.toString();

    let company;

    if (user.companyInfo && user.companyInfo.length > 0) {
      // Update existing CompanyInfo
      company = await prisma.companyInfo.update({
        where: { userId: userId },
        data: {
          ...companyInfo,
          Testimonials: {
            deleteMany: {},
            create: testimonials.map(({ id, ...rest }) => rest),
          },
          projects: {
            deleteMany: {},
            create: projects.map(({ id, ...rest }) => rest),
          },
        },
        include: {
          Testimonials: true,
          projects: true,
        },
      });
    } else {
      // Create new CompanyInfo
      company = await prisma.companyInfo.create({
        data: {
          ...companyInfo,
          userId: userId,
          Testimonials: {
            create: testimonials.map(({ id, ...rest }) => rest),
          },
          projects: {
            create: projects.map(({ id, ...rest }) => rest),
          },
        },
        include: {
          Testimonials: true,
          projects: true,
        },
      });
    }

    return { success: true, company };
  } catch (error: unknown) {
    console.error(error);

    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "An unknown error occurred" };
  }
}
