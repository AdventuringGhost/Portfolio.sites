"use client";

import { useState, useEffect } from "react";
import { Clipboard, Check } from "lucide-react";
import { Button } from "./Button";

interface CodeBlockWrapperProps {
  snippet: string;
  children: React.ReactNode;
}

export function CodeBlockWrapper({ snippet, children }: CodeBlockWrapperProps) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isCopied) return;

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(snippet)
      .then(() => {
        setIsCopied(true);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="relative group">
      {children}
      <Button
        onClick={handleCopy}
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 hover:bg-gray-700"
        aria-label="Copy code to clipboard"
      >
        {isCopied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Clipboard className="w-4 h-4 text-gray-300" />
        )}
      </Button>
    </div>
  );
}
