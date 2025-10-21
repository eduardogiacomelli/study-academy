"use client";

import { Brain } from "lucide-react";

export default function OSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Removida navbar - usando CollapsibleNav global */}
      <main>{children}</main>
    </div>
  );
}
