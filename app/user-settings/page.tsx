"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import CompanyInfoForm from "@/app/user-settings/components/CompanyInfoForm";
import TestimonialsForm from "@/app/user-settings/components/TestimonialsForm";
import ProjectsForm from "@/app/user-settings/components/ProjectsForm";
import useFormStore from "@/stores/formStore";
import { useSession } from "next-auth/react";

const MainForm = () => {
  const { setEmail, email, companyInfo, testimonials, projects } =
    useFormStore();
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.email) {
      setEmail(session.user.email);
    }
  }, [session, setEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      email,
      companyInfo,
      testimonials,
      projects,
    };

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Data saved successfully:", result);
      } else {
        console.error("Error saving data:", result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-white text-black">
      <aside className="hidden md:block w-full md:w-1/4 p-4 border-r">
        <h2 className="text-2xl font-bold mb-2">User Settings</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Manage your company info and proposal preferences.
        </p>
        <nav className="space-y-2">
          <Button
            variant="outline"
            className="w-full text-left"
            onClick={() =>
              document.getElementById("company-info")?.scrollIntoView()
            }
          >
            Company Info
          </Button>
          <Button
            variant="outline"
            className="w-full text-left"
            onClick={() =>
              document.getElementById("testimonials")?.scrollIntoView()
            }
          >
            Testimonials
          </Button>
          <Button
            variant="outline"
            className="w-full text-left"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView()
            }
          >
            Projects
          </Button>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          <CompanyInfoForm />
          <TestimonialsForm />
          <ProjectsForm />
          <div className="mt-4">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default MainForm;
