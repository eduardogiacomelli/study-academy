"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  className?: string;
}

export function CodeBlock({ children, language = "typescript", title, className = "" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children.trim());
      setCopied(true);
      toast.success("Código copiado!");
      setTimeout(() => setCopied(false), 2000);
      } catch {
      toast.error("Falha ao copiar código");
    }
  };

  return (
    <div className={`relative group ${className}`}>
      {title && (
        <div className="bg-muted/50 px-4 py-2 rounded-t-lg border-b border-border">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {language && (
            <span className="text-xs text-muted-foreground uppercase">{language}</span>
          )}
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="size-4 text-green-500" />
          ) : (
            <Copy className="size-4" />
          )}
        </Button>
        <pre className={`bg-gray-900 text-gray-100 p-4 ${title ? 'rounded-b-lg' : 'rounded-lg'} overflow-x-auto text-sm leading-relaxed`}>
          <code className={`language-${language}`}>{children.trim()}</code>
        </pre>
      </div>
    </div>
  );
}

