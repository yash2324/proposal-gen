"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useProposalStore from "@/stores/proposalStore";
import { AiLoading } from "@/components/AiLoading";
import { useToast } from "./ui/use-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string | null;
}

interface UserData {
  email: string;
  companyInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    logo?: string;
    website: string;
  };
}

export default function ProposalBtn() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [proposalName, setProposalName] = useState("");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { setGeneratedProposal } = useProposalStore();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/templates")
      .then((response) => response.json())
      .then((data) => setTemplates(data))
      .catch((error) => console.error("Error fetching templates:", error));

    fetch("/api/user-data", { method: "GET" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setUserData(data.data);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleTemplateSelect = async (templateId: string) => {
    if (!proposalName.trim()) {
      toast({ title: "Please enter a proposal name" });
      return;
    }

    if (!userData || !userData.companyInfo || !userData.companyInfo.name) {
      toast({
        title: "Please complete your user settings before creating a proposal.",
      });
      router.push("/user-settings");
      return;
    }
    setIsGenerating(true);

    try {
      const response = await fetch(`/api/templates/${templateId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch template: ${response.statusText}`);
      }
      const data = await response.json();
      const templateContent = data.content;

      const proposalResponse = await fetch("/api/generate-proposal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ templateContent, userData }),
      });
      if (!proposalResponse.ok) {
        throw new Error("Failed to generate proposal");
      }

      const proposalData = await proposalResponse.json();

      setGeneratedProposal(proposalData.proposal);
      router.push(
        `/editor?template=${templateId}&name=${encodeURIComponent(
          proposalName
        )}`
      );
    } catch (error: any) {
      console.error("Error processing proposal:", error);
      toast({
        title: "Error processing proposal",
        description: `An error occurred : ${error.message}`,
      });
    } finally {
      setTimeout(() => setIsGenerating(false), 1000);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300">
            Get Started
          </Button>
        </DialogTrigger>
        <DialogContent
          className={`sm:max-w-[800px] max-h-[90vh] overflow-auto ${
            isGenerating ? "bg-white" : "bg-gray-100"
          }`}
        >
          {isGenerating && <AiLoading />}
          {!isGenerating && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
                  Choose a Proposal Template
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Enter a name for your proposal and select a template to get
                  started.
                </DialogDescription>
              </DialogHeader>
              <Input
                placeholder="Enter proposal name"
                value={proposalName}
                onChange={(e) => setProposalName(e.target.value)}
                className="mb-6 border-orange-300 focus:border-orange-500 focus:ring-orange-500"
              />
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {templates.map((template) => (
                  <Card
                    key={template.id}
                    className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 bg-white"
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    {template.thumbnail && (
                      <Image
                        src={template.thumbnail}
                        alt={`${template.name} Template`}
                        width={300}
                        height={200}
                        className="object-cover w-full h-48 rounded-t-lg"
                      />
                    )}
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {template.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {template.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
