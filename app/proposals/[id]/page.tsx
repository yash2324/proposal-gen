"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProposal } from "../../actions/getProposal";
import "react-quill/dist/quill.snow.css";
import "@/styles/TextEditor.css";
import { Button } from "@/components/ui/button";

export default function ProposalPage() {
  interface Proposal {
    id: string;
    title: string;
    templateId: string;
    content: string | null;
    images?: string[];
  }

  const params = useParams();
  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const fetchedProposal = await getProposal(params.id as string);
        setProposal(fetchedProposal);
      }
    };

    fetchData();
  }, [params.id]);

  const handleExportPDF = async () => {
    if (!proposal) return;

    try {
      const response = await fetch(`/api/export-pdf?id=${proposal.id}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("PDF generation failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${proposal.title}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    }
  };

  if (!proposal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{proposal.title}</h1>

        <Button className="w-1/4 ml-auto bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:shadow-lg transition duration-300">
          Export PDF
        </Button>
      </div>
      <div className="ql-snow">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: proposal.content || "" }}
        />
      </div>
    </div>
  );
}
