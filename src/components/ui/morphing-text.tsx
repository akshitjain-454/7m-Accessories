"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface MorphingTextProps {
  words: string[];
  className?: string;
  interval?: number;
}

export const MorphingText = ({ 
  words, 
  className,
  interval = 3000 
}: MorphingTextProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const currentWord = words[currentIndex];
    const nextWord = words[(currentIndex + 1) % words.length];
    const morphDuration = 600;
    const steps = 15;
    let step = 0;

    const morphInterval = setInterval(() => {
      step++;
      const progress = step / steps;
      if (progress < 0.5) {
        const charCount = Math.floor(currentWord.length * (1 - progress * 2));
        setDisplayText(currentWord.slice(0, charCount));
      } else {
        const charCount = Math.floor(nextWord.length * ((progress - 0.5) * 2));
        setDisplayText(nextWord.slice(0, charCount));
      }
      if (step >= steps) {
        clearInterval(morphInterval);
        setDisplayText(nextWord);
      }
    }, morphDuration / steps);

    const wordTimeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);

    return () => {
      clearInterval(morphInterval);
      clearTimeout(wordTimeout);
    };
  }, [currentIndex, words]);

  return (
    <div className={cn("relative inline-block", className)}>
      <span className="font-bold text-[#1F1F69]">
        {displayText}
        <span className="inline-block w-[3px] h-[0.8em] bg-[#1F1F69] animate-pulse ml-1 align-middle" />
      </span>
    </div>
  );
};