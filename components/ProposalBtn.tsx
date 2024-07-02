"use client";
import React from "react";
import { Button } from "./ui/button";

type Props = {};

const ProposalBtn = (props: Props) => {
  const handleClick = () => {};

  return (
    <Button variant={"outline"} onClick={handleClick} className="mt-3">
      Get Started
    </Button>
  );
};

export default ProposalBtn;
