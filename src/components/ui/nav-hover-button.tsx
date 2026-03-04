"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface NavHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function NavHoverButton({
  children,
  className,
  ...props
}: NavHoverButtonProps) {
  return (
    <button
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border border-transparent px-4 py-1.5 text-center font-bold text-[#1F1F69] transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* The background fill effect */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-[#1F1F69] opacity-0 transition-all duration-500 ease-in-out group-hover:scale-[30] group-hover:opacity-100"></div>
      </div>

      {/* The Text Layer */}
      <div className="relative z-10 flex items-center justify-center">
        <span className="inline-block transition-colors duration-300 group-hover:text-white">
          {children}
        </span>
      </div>
    </button>
  );
}