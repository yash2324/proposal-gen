import ProposalBtn from "@/components/ProposalBtn";
import { authOptions } from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import ProposalsPage from "./proposals/page";
import { TbSparkles } from "react-icons/tb";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }

  return (
    <main className="bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row items-center p-8 md:p-12">
            <div className="md:w-2/3 text-left md:pr-8">
              <h2 className="font-bold text-4xl md:text-5xl text-gray-800 mb-4 leading-tight">
                Craft Winning Proposals <br className="hidden md:inline" />
                with Ease
              </h2>
              <h3 className="text-lg md:text-xl text-gray-600 mb-8">
                Choose from our curated templates and create{" "}
                <br className="hidden md:inline" />
                the perfect proposal tailored to your needs.
              </h3>
              <ProposalBtn />
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end mt-8 md:mt-0">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-transform duration-300">
                <TbSparkles className="text-5xl md:text-6xl" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <ProposalsPage />
        </div>
      </div>
    </main>
  );
}
