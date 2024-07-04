"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { TbFilePencil } from "react-icons/tb";
interface Proposal {
  id: string;
  title: string;
  templateId: string;
  content: string;
  createdAt: string;
}

export default function ProposalsPage() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const response = await fetch("/api/proposals");
        if (!response.ok) {
          throw new Error("Failed to fetch proposals");
        }
        const data = await response.json();
        setProposals(data);
      } catch (err) {
        setError("Error fetching proposals. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProposals();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Proposals</h1>
      {proposals.length === 0 ? (
        <p>You haven&apos;t created any proposals yet.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Proposal</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal) => (
              <TableRow key={proposal.id}>
                <TableCell className="font-medium">
                  <Link
                    href={`/proposals/${proposal.id}`}
                    className="hover:underline cursor-pointer"
                  >
                    {proposal.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Draft</Badge>
                </TableCell>
                <TableCell>
                  {new Date(proposal.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Link href={`/editor?id=${proposal.id}`}>
                    <Button variant="ghost" size="icon">
                      <TbFilePencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
