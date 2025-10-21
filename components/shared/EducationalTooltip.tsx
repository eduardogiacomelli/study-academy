"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, Lightbulb, AlertCircle } from "lucide-react";
import { ReactNode } from "react";

interface EducationalTooltipProps {
  children: ReactNode;
  content: string;
  type?: "info" | "tip" | "warning";
  side?: "top" | "right" | "bottom" | "left";
}

export function EducationalTooltip({ 
  children, 
  content, 
  type = "info",
  side = "top" 
}: EducationalTooltipProps) {
  const icons = {
    info: <Info className="size-4 text-blue-400" />,
    tip: <Lightbulb className="size-4 text-yellow-400" />,
    warning: <AlertCircle className="size-4 text-red-400" />,
  };

  const colors = {
    info: "border-blue-500/50 bg-blue-500/10",
    tip: "border-yellow-500/50 bg-yellow-500/10",
    warning: "border-red-500/50 bg-red-500/10",
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side}
          className={`max-w-xs ${colors[type]} border backdrop-blur-sm`}
        >
          <div className="flex gap-2 items-start">
            <div className="mt-0.5">{icons[type]}</div>
            <p className="text-sm leading-relaxed">{content}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

