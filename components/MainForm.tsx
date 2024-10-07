"use client";

import React, { useEffect } from "react";
import { Button } from "./ui/button";
import CompanyInfoForm from "./CompanyInfoForm";
import TestimonialsForm from "./TestimonialsForm";
import ProjectsForm from "./ProjectsForm";
import TeamMembersForm from "./TeamMembersForm";
import PricingSectionForm from "./PricingSectionForm";
import useFormStore from "../stores/formStore";
import { useSession } from "next-auth/react";
import { saveUserData } from "../app/actions/saveUserAction";
import { useToast } from "./ui/use-toast";

export default function MainForm({ initialData }: { initialData: any }) {
  const {
    email,
    companyInfo,
    testimonials,
    projects,
    teamMembers,
    proposals,
    pricingSection,
    setAllData,
  } = useFormStore();
  const { toast } = useToast();
  const { data: session } = useSession();

  useEffect(() => {
    if (initialData) {
      setAllData(initialData);
    }
  }, [initialData, setAllData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.email) {
      console.error("User not authenticated");
      return;
    }
    const data = {
      email,
      companyInfo,
      testimonials,
      projects,
      teamMembers,
      proposals,
      pricingSection,
    };
    try {
      const result = await saveUserData(data);
      if (result.success) {
        toast({
          title: "Data saved successfully",
          description: "Your changes have been saved.",
          duration: 3000,
        });
      } else {
        toast({
          title: "Error saving data",
          description: "Please try again later.",
          variant: "destructive",
        });
        console.error("Error saving data:", result.error);
      }
    } catch (error) {
      toast({
        title: "Error saving data",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-amber-50 to-orange-100 min-h-screen">
      <aside className="md:w-1/4 bg-white p-6 md:sticky md:top-0 md:h-screen overflow-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">User Settings</h2>
        <p className="text-sm text-gray-600 mb-6">
          Manage your company info and proposal preferences.
        </p>
        <nav className="space-y-2">
          {[
            "company-info",
            "testimonials",
            "projects",
            "team-members",
            "pricing-section",
          ].map((section) => (
            <Button
              key={section}
              variant="ghost"
              className="w-full justify-start text-left hover:bg-orange-100 hover:text-orange-700 transition-colors"
              onClick={() => scrollToSection(section)}
            >
              {section
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </Button>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-10 max-w-3xl mx-auto">
          <CompanyInfoForm />
          <TestimonialsForm />
          <ProjectsForm />
          <TeamMembersForm />
          <PricingSectionForm />
          <div className="mt-8">
            <Button
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
