// app/user-settings/page.tsx
import { getServerSession } from "next-auth/next";
import { fetchUserData } from "./fetchUserData";
import MainForm from "@/app/user-settings/components/MainForm";

// Server Component
export default async function UserSettingsPage() {
  const session = await getServerSession();
  let initialData = null;

  if (session?.user?.email) {
    const result = await fetchUserData(session.user.email);
    if (result.success) {
      initialData = result.data;
    }
  }

  return <MainForm initialData={initialData} />;
}
