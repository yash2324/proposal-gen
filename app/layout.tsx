import Header from "@/components/Header";
import { authOptions } from "@/lib/AuthOptions";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
interface ProtectedRootLayoutProps {
  children: React.ReactNode;
}

export default async function ProtectedRootLayout({
  children,
}: ProtectedRootLayoutProps) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        {session && <Header />}
        <main className="container mb-4">{children}</main>
      </body>
    </html>
  );
}
