"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProposal } from "../../actions/getProposal";
import "react-quill/dist/quill.snow.css";
import "@/styles/TextEditor.css";
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

  if (!proposal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{proposal.title}</h1>
      <div className="ql-snow">
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: proposal.content || "" }}
        />
      </div>
    </div>
  );
}
