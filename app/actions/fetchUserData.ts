import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";

export async function fetchUserData() {
  try {
    const session = await getServerSession();
    if (session?.user?.email) {
      const email = session.user.email;
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          companyInfo: {
            include: {
              Testimonials: true,
              projects: true,
            },
          },
        },
      });

      if (!user || !user.companyInfo) {
        return { success: false, error: "User or company info not found" };
      }

      const companyInfo = user.companyInfo[0];
      console.log("Data fetched successfully:", companyInfo);
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
          },
          testimonials: companyInfo.Testimonials,
          projects: companyInfo.projects,
        },
      };
    } else {
      return { success: false, error: "User not authenticated" };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return { success: false, error: "Failed to fetch user data" };
  }
}
