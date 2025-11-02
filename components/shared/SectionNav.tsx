"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, type LucideIcon } from "lucide-react";

export interface NavSection {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  subsections?: NavSection[];
}

interface SectionNavProps {
  sections: NavSection[];
  basePath: string;
}

export function SectionNav({ sections, basePath }: SectionNavProps) {
  const pathname = usePathname();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (id: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedSections(newExpanded);
  };

  const isActive = (sectionPath: string) => pathname === `${basePath}/${sectionPath}`;

  return (
    <nav className="space-y-2">
      {sections.map((section, idx) => {
        const Icon = section.icon;
        const hasSubsections = section.subsections && section.subsections.length > 0;
        const isExpanded = expandedSections.has(section.id);
        const sectionPath = section.id;
        const active = isActive(sectionPath);

        return (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card
              className={`overflow-hidden transition-all ${
                active
                  ? "bg-gradient-to-r from-os-primary/20 to-cyan-500/20 border-os-primary/50 shadow-lg shadow-os-primary/20"
                  : "hover:bg-muted/50 border-transparent"
              }`}
            >
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <Link
                    href={`${basePath}/${sectionPath}`}
                    className="flex items-center gap-3 flex-1 group"
                  >
                    {Icon && (
                      <div
                        className={`p-2 rounded-lg transition-colors ${
                          active
                            ? "bg-os-primary text-white"
                            : "bg-muted group-hover:bg-os-primary/20"
                        }`}
                      >
                        <Icon className="size-4" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p
                          className={`font-semibold text-sm truncate ${
                            active ? "text-os-primary" : "text-foreground"
                          }`}
                        >
                          {section.title}
                        </p>
                        {section.badge && (
                          <Badge variant="secondary" className="text-xs px-1.5 py-0">
                            {section.badge}
                          </Badge>
                        )}
                      </div>
                      {section.description && (
                        <p className="text-xs text-muted-foreground truncate">
                          {section.description}
                        </p>
                      )}
                    </div>
                  </Link>

                  {hasSubsections && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSection(section.id)}
                      className="p-1 h-8 w-8"
                    >
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="size-4" />
                      </motion.div>
                    </Button>
                  )}
                </div>

                {/* Subsections */}
                <AnimatePresence>
                  {hasSubsections && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-9 pt-3 space-y-2 border-l-2 border-os-primary/20 ml-4 mt-2">
                        {section.subsections!.map((subsection) => {
                          const subPath = `${sectionPath}/${subsection.id}`;
                          const subActive = isActive(subPath);

                          return (
                            <Link
                              key={subsection.id}
                              href={`${basePath}/${subPath}`}
                              className={`block p-2 rounded-lg text-sm transition-colors ${
                                subActive
                                  ? "bg-os-primary/10 text-os-primary font-medium"
                                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <ChevronRight className="size-3" />
                                <span>{subsection.title}</span>
                                {subsection.badge && (
                                  <Badge variant="outline" className="text-xs px-1 py-0">
                                    {subsection.badge}
                                  </Badge>
                                )}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </nav>
  );
}

