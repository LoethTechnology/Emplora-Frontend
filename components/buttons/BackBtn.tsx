import React from "react";
import { Button } from "../ui/button";

const BackButton = ({ className }: { className?: string }) => {
  return (
    <Button
      className={`flex justify-center items-center rounded-xl w-10 h-10 ${className}`}
      variant={"outline"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
    </Button>
  );
};

export default BackButton;
