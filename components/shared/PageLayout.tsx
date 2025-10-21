"use client";

import { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  icon: LucideIcon;
  tags?: string[];
  category?: string;
}

export function PageLayout({ children, title, description, icon: Icon, tags, category }: PageLayoutProps) {
  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Hero Header */}
      <motion.div 
        style={{ opacity: headerOpacity, y: headerY }}
        className="relative overflow-hidden bg-gradient-to-br from-os-primary/90 via-cyan-600/90 to-os-secondary/90 border-b border-white/10"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        <div className="relative container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <Icon className="size-6 text-white" />
              </div>
              <div>
                {category && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-white/70 uppercase tracking-wider">{category}</span>
                  </div>
                )}
                <h1 className="text-3xl font-bold text-white mb-1">{title}</h1>
                <p className="text-sm text-white/80">{description}</p>
              </div>
            </div>

            {tags && tags.length > 0 && (
              <div className="hidden md:flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/20 text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content - Compact */}
      <div className="container mx-auto px-6 py-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

