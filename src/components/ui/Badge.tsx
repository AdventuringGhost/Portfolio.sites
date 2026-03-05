import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "highlight" | "outline" | "success";
  className?: string;
}

export const Badge = ({
  children,
  variant = "default",
  className,
}: BadgeProps) => {
  const baseClasses =
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";

  const variantClasses = {
    default: "bg-[#59D5E0] text-white",
    accent: "bg-[#F5DD61] text-gray-900",
    highlight: "bg-[#F4538A] text-white",
    outline: "border border-gray-300 text-gray-700 bg-white",
    success: "bg-green-100 text-green-800",
  };

  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </span>
  );
};
