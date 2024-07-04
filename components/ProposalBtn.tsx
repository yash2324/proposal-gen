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
  const [isOpen, setIsOpen] = useState(false);
  const [proposalName, setProposalName] = useState("");
  const [templates, setTemplates] = useState<Template[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/templates")
      .then((response) => response.json())
      .then((data) => setTemplates(data))
      .catch((error) => console.error("Error fetching templates:", error));

    fetch("/api/user-data", { method: "GET" }) // Ensure method is GET
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

  const handleTemplateSelect = (templateId: string) => {
    if (!proposalName.trim()) {
      alert("Please enter a proposal name");
      return;
    }

    if (!userData || !userData.companyInfo || !userData.companyInfo.name) {
      alert("Please complete your user settings before creating a proposal.");
      router.push("/user-settings");
      return;
    }

    router.push(
      `/editor?template=${templateId}&name=${encodeURIComponent(proposalName)}`
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="m-5">Get Started</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Choose a Proposal Template</DialogTitle>
          <DialogDescription>
            Enter a name for your proposal and select a template to get started.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Enter proposal name"
          value={proposalName}
          onChange={(e) => setProposalName(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="group cursor-pointer hover:shadow-lg"
              onClick={() => handleTemplateSelect(template.id)}
            >
              {template.thumbnail && (
                <Image
                  src={"sample.svg"} // Update with actual template.thumbnail if available
                  alt={`${template.name} Template`}
                  width={300}
                  height={200}
                  className="object-cover w-full h-48 rounded-t-lg"
                />
              )}
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
