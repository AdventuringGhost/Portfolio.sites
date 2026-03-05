import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const SectionHeading = ({
  children,
  className,
  level = 2,
}: SectionHeadingProps) => {
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;

  const baseClasses = "font-bold text-gray-900 mb-4";

  const levelClasses = {
    1: "text-4xl md:text-5xl",
    2: "text-3xl md:text-4xl",
    3: "text-2xl md:text-3xl",
    4: "text-xl md:text-2xl",
    5: "text-lg md:text-xl",
    6: "text-base md:text-lg",
  };

  return (
    <HeadingTag className={cn(baseClasses, levelClasses[level], className)}>
      {children}
    </HeadingTag>
  );
};
