"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Menu,
  X,
  Home,
  BookOpen,
  FileText,
  Layers,
  HardDrive,
  Repeat,
  Zap,
  ChevronRight
} from "lucide-react";

const navItems = [
  { href: "/", label: "Início", icon: Home, description: "Página inicial" },
  { href: "/os", label: "Sistemas Operacionais", icon: BookOpen, description: "Módulo completo de SO" },
  { 
    href: "/os/memoria/paginacao", 
    label: "Paginação", 
    icon: FileText,
    description: "3 simuladores + TLB 3D",
    badge: "3D"
  },
  { 
    href: "/os/memoria/segmentacao", 
    label: "Segmentação", 
    icon: Layers,
    description: "Simulador completo"
  },
  { 
    href: "/os/memoria/virtual", 
    label: "Memória Virtual", 
    icon: HardDrive,
    description: "6 simuladores interativos",
    badge: "6"
  },
  { 
    href: "/os/memoria/substituicao", 
    label: "Substituição de Página", 
    icon: Repeat,
    description: "4 algoritmos + Belady",
    badge: "4"
  },
  { 
    href: "/os/exercicios", 
    label: "Exercícios", 
    icon: Zap,
    description: "25+ questões gamificadas",
    badge: "25+"
  },
];

export function CollapsibleNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Toggle Button - Fixed Position */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed left-4 top-4 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          size="icon"
          className={`size-12 rounded-full shadow-2xl transition-all duration-300 ${
            isOpen 
              ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600" 
              : "bg-gradient-to-r from-os-primary to-os-secondary hover:from-os-primary/80 hover:to-os-secondary/80"
          }`}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="size-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>

      {/* Sidebar Navigation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-80 z-50"
            >
              <Card className="h-full rounded-none rounded-r-3xl border-r-2 border-os-primary/30 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="p-6 bg-gradient-to-r from-os-primary to-os-secondary">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <BookOpen className="size-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">OS & DB Academy</h2>
                        <p className="text-xs text-white/80">Plataforma Interativa</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Navigation Items */}
                  <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    {navItems.map((item, idx) => {
                      const Icon = item.icon;
                      const isActive = pathname === item.href;

                      return (
                        <motion.div
                          key={item.href}
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`group block p-4 rounded-xl transition-all duration-200 ${
                              isActive
                                ? "bg-gradient-to-r from-os-primary/20 to-os-secondary/20 border-2 border-os-primary/50 shadow-lg"
                                : "hover:bg-muted border-2 border-transparent hover:border-os-primary/30"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`p-2 rounded-lg transition-all ${
                                  isActive 
                                    ? "bg-gradient-to-br from-os-primary to-os-secondary text-white" 
                                    : "bg-muted group-hover:bg-os-primary/20"
                                }`}>
                                  <Icon className="size-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className={`font-semibold text-sm ${
                                      isActive ? "text-os-primary" : "text-foreground"
                                    }`}>
                                      {item.label}
                                    </p>
                                    {item.badge && (
                                      <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight className={`size-4 transition-transform ${
                                isActive ? "text-os-primary" : "text-muted-foreground opacity-0 group-hover:opacity-100"
                              }`} />
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </nav>

                  <Separator />

                  {/* Footer */}
                  <div className="p-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-os-primary/10 to-os-secondary/10 border border-os-primary/20">
                      <p className="text-xs text-muted-foreground mb-2">📚 Conteúdo Disponível</p>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Simuladores</span>
                          <strong>12</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Exercícios</span>
                          <strong>25+</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Visualizadores 3D</span>
                          <strong>3</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

