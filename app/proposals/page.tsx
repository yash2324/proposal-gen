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
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Proposals</h1>
      {proposals.length === 0 ? (
        <p className="text-center text-gray-600">
          You haven&apos;t created any proposals yet.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="bg-gradient-to-r from-orange-100 to-amber-100">
              <TableHead className="font-semibold text-gray-700">
                Proposal
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Status
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                Created
              </TableHead>
              <TableHead className="font-semibold text-gray-700">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal) => (
              <TableRow
                key={proposal.id}
                className="hover:bg-orange-50 transition-colors"
              >
                <TableCell className="font-medium">
                  <Link
                    href={`/proposals/${proposal.id}`}
                    className="text-orange-600 hover:text-orange-800 hover:underline"
                  >
                    {proposal.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-amber-100 text-amber-800 border-amber-300"
                  >
                    Draft
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">
                  {new Date(proposal.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Link href={`/editor?id=${proposal.id}`}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-orange-500 hover:text-orange-700 hover:bg-orange-100"
                    >
                      <TbFilePencil className="h-5 w-5" />
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
