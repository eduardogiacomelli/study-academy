"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ValidatedInputProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (value: number | string) => void;
  type?: "number" | "text";
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  placeholder?: string;
  helpText?: string;
  tooltip?: string;
  examples?: string[];
  showValidation?: boolean;
  className?: string;
}

export function ValidatedInput({
  id,
  label,
  value,
  onChange,
  type = "number",
  min,
  max,
  step,
  unit,
  placeholder,
  helpText,
  tooltip,
  examples,
  showValidation = true,
  className = "",
}: ValidatedInputProps) {
  const numValue = typeof value === "number" ? value : parseFloat(value as string);
  
  const isValid = 
    type !== "number" ||
    (isNaN(numValue) ? false : 
      (min === undefined || numValue >= min) && 
      (max === undefined || numValue <= max));
  
  const getValidationColor = () => {
    if (!showValidation || type !== "number") return "";
    if (isNaN(numValue)) return "border-red-500 bg-red-500/10";
    if (!isValid) return "border-yellow-500 bg-yellow-500/10";
    return "border-green-500 bg-green-500/10";
  };

  const getValidationIcon = () => {
    if (!showValidation || type !== "number" || isNaN(numValue)) return null;
    if (!isValid) return <AlertCircle className="size-4 text-yellow-500" />;
    return <CheckCircle2 className="size-4 text-green-500" />;
  };

  const getRange = () => {
    if (min !== undefined && max !== undefined) {
      return `${min} - ${max}${unit ? ` ${unit}` : ""}`;
    }
    if (min !== undefined) return `≥ ${min}${unit ? ` ${unit}` : ""}`;
    if (max !== undefined) return `≤ ${max}${unit ? ` ${unit}` : ""}`;
    return null;
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label htmlFor={id} className="text-sm font-semibold">
            {label}
          </Label>
          {tooltip && (
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <HelpCircle className="size-3.5 text-muted-foreground cursor-help hover:text-os-primary transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-xs">{tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {getRange() && (
          <Badge variant="outline" className="text-xs font-mono">
            {getRange()}
          </Badge>
        )}
      </div>

      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => {
            const val = type === "number" ? parseFloat(e.target.value) || 0 : e.target.value;
            onChange(val);
          }}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder || (type === "number" && min !== undefined ? `Ex: ${min}` : "")}
          className={`font-mono pr-10 transition-all ${getValidationColor()}`}
        />
        <AnimatePresence>
          {getValidationIcon() && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {getValidationIcon()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-start justify-between gap-2 min-h-[20px]">
        {helpText && (
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Info className="size-3" />
            {helpText}
          </p>
        )}
        
        {examples && examples.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-end">
            {examples.map((example, idx) => (
              <button
                key={idx}
                onClick={() => {
                  const val = type === "number" ? parseFloat(example) : example;
                  onChange(val);
                }}
                className="text-xs px-2 py-0.5 rounded bg-muted/50 hover:bg-os-primary/20 transition-colors border border-border hover:border-os-primary/50"
              >
                {example}{unit}
              </button>
            ))}
          </div>
        )}
      </div>

      {!isValid && type === "number" && !isNaN(numValue) && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-xs text-yellow-500 bg-yellow-500/10 px-3 py-2 rounded border border-yellow-500/30"
        >
          <AlertCircle className="size-3" />
          {numValue < (min || -Infinity) && `Valor mínimo: ${min}`}
          {numValue > (max || Infinity) && `Valor máximo: ${max}`}
        </motion.div>
      )}
    </div>
  );
}

