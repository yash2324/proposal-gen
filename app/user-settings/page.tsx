"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import CompanyInfoForm from "@/app/user-settings/components/CompanyInfoForm";
import TestimonialsForm from "@/app/user-settings/components/TestimonialsForm";
import ProjectsForm from "@/app/user-settings/components/ProjectsForm";

const MainForm = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
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
