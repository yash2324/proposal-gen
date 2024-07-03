import ProposalBtn from "@/components/ProposalBtn";
import { authOptions } from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/signin");
  }

  return (
    <main>
      <div className="flex-1 p-6">
        <div className="border-[1px] h-[30vh] rounded-xl flex-col flex items-center justify-center">
          <div className=" flex items-center  flex-col gap-2">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-white bg-black mt-5">
              <h1 className="text-5xl">✨</h1>
            </div>
            <h2 className=" font-bold text-xl">Generate Proposal</h2>
            <h3 className=" text-md font-normal">
              Choose from hundreds of templates and <br />
              generate the best proposal for your needs.
            </h3>
          </div>
          <ProposalBtn />
        </div>
      </div>
    </main>
  );
}
