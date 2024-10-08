import { fetchUserData } from "../actions/fetchUserData";
import MainForm from "@/components/MainForm";

export default async function UserSettingsPage() {
  let initialData = null;

  const result = await fetchUserData();
  if (result.success) {
    initialData = result.data;
  }

  return (
    <div className="mx-5">
      <MainForm initialData={initialData} />
    </div>
  );
}
