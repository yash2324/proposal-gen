"use client"; // app/proposals/page.tsx
import Link from "next/link";
import useProposalStore from "../../stores/proposalStore";
import React from "react";
export default function ProposalsPage() {
  const { proposals } = useProposalStore();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Proposals</h1>
      {proposals.length === 0 ? (
        <p>You haven't created any proposals yet.</p>
      ) : (
        <ul>
          {proposals.map((proposal) => (
            <li key={proposal.id} className="mb-2">
              <Link href={`/proposals/${proposal.id}`}>{proposal.title}</Link>
            </li>
          ))}
        </ul>
      )}
      <Link
        href="/"
        className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
      >
        Create New Proposal
      </Link>
    </div>
  );
}
