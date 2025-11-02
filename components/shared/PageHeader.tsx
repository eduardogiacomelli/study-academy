"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  ChevronDown, 
  ChevronUp,
  Menu as MenuIcon
} from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon?: React.ReactNode;
}

interface PageHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  badges?: { text: string; color?: string }[];
  sections?: Section[];
}

export function PageHeader({
  title,
  subtitle,
  icon,
  gradient,
  badges = [],
  sections = []
}: PageHeaderProps) {
  const [showIndex, setShowIndex] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    if (sections.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
      setShowIndex(false);
    }
  };

  return (
    <>
      {/* Sticky Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border shadow-lg"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Title Section */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`p-2 rounded-xl ${gradient} flex-shrink-0`}>
                {icon}
              </div>
              <div className="min-w-0">
                <h2 className="text-xl font-bold truncate">{title}</h2>
                <p className="text-sm text-muted-foreground truncate hidden sm:block">
                  {subtitle}
                </p>
              </div>
            </div>

            {/* Index Toggle Button */}
            {sections.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowIndex(!showIndex)}
                className="gap-2 flex-shrink-0"
              >
                <MenuIcon className="size-4" />
                <span className="hidden sm:inline">Índice</span>
                {showIndex ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
              </Button>
            )}
          </div>

          {/* Badges Row */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {badges.map((badge, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className={badge.color || "bg-primary/10 text-primary border-primary/20"}
                >
                  {badge.text}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Index Dropdown */}
        <AnimatePresence>
          {showIndex && sections.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-border"
            >
              <div className="container mx-auto px-6 py-4">
                <Card className="p-4">
                  <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                    Navegação Rápida
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {sections.map((section) => (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "default" : "ghost"}
                        size="sm"
                        onClick={() => scrollToSection(section.id)}
                        className={`justify-start gap-2 ${
                          activeSection === section.id ? gradient : ""
                        }`}
                      >
                        {section.icon && section.icon}
                        <span className="truncate">{section.title}</span>
                      </Button>
                    ))}
                  </div>
                </Card>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

