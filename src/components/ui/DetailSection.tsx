import React from "react";
import { SectionHeading } from "./SectionHeading";

interface DetailSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const DetailSection = ({
  title,
  children,
  className,
}: DetailSectionProps) => {
  return (
    <div className={className}>
      <SectionHeading level={3} className="text-lg mb-3">
        {title}
      </SectionHeading>
      {children}
    </div>
  );
};
