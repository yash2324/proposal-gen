import LogoutBtn from "@/components/LogoutBtn";
import { authOptions } from "@/libs/AuthOptions";
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
      <div>Protected Dashboard, hello: {session?.user?.email}</div>
    </main>
  );
}
