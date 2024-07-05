// app/proposals/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useProposalStore from "../../../stores/proposalStore";
import "react-quill/dist/quill.snow.css";
import "@/styles/TextEditor.css";
export default function ProposalPage() {
  interface Proposal {
    id: string;
    title: string;
    templateId: string;
    content: string;
    images?: string[];
  }
  const params = useParams();
  const { getProposal } = useProposalStore();
  const [proposal, setProposal] = useState<Proposal | null>(null);

  useEffect(() => {
    if (params.id) {
      const fetchedProposal = getProposal(params.id as string);
      setProposal(fetchedProposal || null);
    }
  }, [params.id, getProposal]);

  if (!proposal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{proposal.title}</h1>
      <div className="ql-snow">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: proposal.content }}
        />
      </div>
    </div>
  );
}
