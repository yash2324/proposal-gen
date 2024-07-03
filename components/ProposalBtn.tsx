"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Component() {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} defaultOpen>
      <DialogTrigger asChild>
        <Button>Choose Proposal Template</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-auto">
        <div className="flex flex-col gap-6">
          <DialogHeader>
            <DialogTitle>Choose a Proposal Template</DialogTitle>
            <DialogDescription>
              Select a pre-designed template to get started on your business
              proposal.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <Card className="group cursor-pointer hover:shadow-lg">
              <Link href="#" className="" prefetch={false}>
                <span className="sr-only">Select template</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Proposal Template 1"
                width={400}
                height={300}
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">Startup Proposal</h3>
                <p className="text-sm text-muted-foreground">
                  A modern proposal template for startups.
                </p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-lg">
              <Link href="#" className="" prefetch={false}>
                <span className="sr-only">Select template</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Proposal Template 2"
                width={400}
                height={300}
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">Consulting Proposal</h3>
                <p className="text-sm text-muted-foreground">
                  A professional proposal template for consultants.
                </p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-lg">
              <Link href="#" className="" prefetch={false}>
                <span className="sr-only">Select template</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Proposal Template 3"
                width={400}
                height={300}
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">
                  Creative Agency Proposal
                </h3>
                <p className="text-sm text-muted-foreground">
                  A visually appealing proposal template for creative agencies.
                </p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-lg">
              <Link href="#" className="" prefetch={false}>
                <span className="sr-only">Select template</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Proposal Template 4"
                width={400}
                height={300}
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">Event Proposal</h3>
                <p className="text-sm text-muted-foreground">
                  A template for event planning and management proposals.
                </p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-lg">
              <Link href="#" className="" prefetch={false}>
                <span className="sr-only">Select template</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Proposal Template 5"
                width={400}
                height={300}
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">Marketing Proposal</h3>
                <p className="text-sm text-muted-foreground">
                  A proposal template for marketing and advertising services.
                </p>
              </CardContent>
            </Card>
            <Card className="group cursor-pointer hover:shadow-lg">
              <Link href="#" className="" prefetch={false}>
                <span className="sr-only">Select template</span>
              </Link>
              <img
                src="/placeholder.svg"
                alt="Proposal Template 6"
                width={400}
                height={300}
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold">IT Services Proposal</h3>
                <p className="text-sm text-muted-foreground">
                  A template for IT service providers to present their
                  offerings.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        <DialogFooter>
          <div>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
