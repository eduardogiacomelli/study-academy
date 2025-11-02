"use client";

import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      {children}
    </SmoothScrollProvider>
  );
}
