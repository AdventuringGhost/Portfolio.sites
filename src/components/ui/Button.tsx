import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "accent" | "live";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
}

export const Button = ({
  asChild = false,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-2xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary:
      "bg-[#FAA300] text-white hover:bg-[#E89200] focus:ring-[#FAA300] shadow-lg hover:shadow-xl",
    secondary:
      "bg-[#59D5E0] text-white hover:bg-[#4BC4CF] focus:ring-[#59D5E0] shadow-lg hover:shadow-xl",
    ghost:
      "bg-transparent text-[#59D5E0] border-2 border-[#59D5E0] hover:bg-[#59D5E0] hover:text-white focus:ring-[#59D5E0]",
    accent:
      "bg-[#F5DD61] text-gray-900 hover:bg-[#EACD52] focus:ring-[#F5DD61] shadow-lg hover:shadow-xl",
    live: "bg-lime-500 text-white hover:bg-lime-600 focus:ring-lime-500 shadow-lg hover:shadow-xl",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    icon: "h-7 w-7",
  };

  const styleClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  // For asChild, clone the child element with button styles
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(styleClasses, (children.props as any).className),
    } as any);
  }

  return (
    <button className={styleClasses} {...props}>
      {children}
    </button>
  );
};
