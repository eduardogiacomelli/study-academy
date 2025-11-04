"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  ChevronRight,
  ChevronDown,
  FolderTree,
  Rocket,
  Cpu,
  Database,
  Shield,
  Settings,
  Code2
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: any;
  description?: string;
  badge?: string;
  children?: NavItem[];
}

const navStructure: NavItem[] = [
  { 
    href: "/", 
    label: "Início", 
    icon: Home, 
    description: "Página inicial" 
  },
  { 
    href: "/os", 
    label: "Sistemas Operacionais", 
    icon: BookOpen, 
    description: "Dashboard principal" 
  },
  {
    href: "/os/memoria/paginacao",
    label: "Paginação",
    icon: FileText,
    description: "Tradução de endereços e TLB",
    badge: "3D",
    children: [
      { href: "/os/memoria/paginacao", label: "Visão Geral", icon: FileText },
      { href: "/os/memoria/paginacao/teoria", label: "Teoria", icon: BookOpen },
      { href: "/os/memoria/paginacao/simulador-interativo", label: "Simulador Interativo", icon: Cpu },
      { href: "/os/memoria/paginacao/tlb", label: "TLB", icon: Zap },
      { href: "/os/memoria/paginacao/multinivel", label: "Paginação Multinível", icon: Layers },
      { href: "/os/memoria/paginacao/localidade", label: "Localidade", icon: Database },
      { href: "/os/memoria/paginacao/page-fault", label: "Page Fault", icon: Shield },
      { href: "/os/memoria/paginacao/swapping", label: "Swapping", icon: Repeat },
      { href: "/os/memoria/paginacao/linux-implementation", label: "Implementação Linux", icon: Settings },
      { href: "/os/memoria/paginacao/estruturas-dados", label: "Estruturas de Dados", icon: Code2 },
      { href: "/os/memoria/paginacao/avancado", label: "Avançado", icon: Rocket },
      { href: "/os/memoria/paginacao/exercicios", label: "Exercícios", icon: Zap },
      { href: "/os/memoria/paginacao/conclusao", label: "Conclusão", icon: BookOpen },
    ]
  },
  {
    href: "/os/memoria/segmentacao",
    label: "Segmentação",
    icon: Layers,
    description: "Tabelas de segmentos",
    children: [
      { href: "/os/memoria/segmentacao", label: "Visão Geral", icon: Layers },
      { href: "/os/memoria/segmentacao/teoria", label: "Teoria", icon: BookOpen },
      { href: "/os/memoria/segmentacao/tabela", label: "Tabela de Segmentos", icon: Database },
      { href: "/os/memoria/segmentacao/protecao", label: "Proteção", icon: Shield },
      { href: "/os/memoria/segmentacao/simulador", label: "Simulador", icon: Cpu },
      { href: "/os/memoria/segmentacao/x86", label: "Intel x86", icon: Settings },
      { href: "/os/memoria/segmentacao/combinado", label: "Segmentação Paginada", icon: Layers },
      { href: "/os/memoria/segmentacao/vs-paginacao", label: "vs Paginação", icon: FileText },
      { href: "/os/memoria/segmentacao/exercicios", label: "Exercícios", icon: Zap },
      { href: "/os/memoria/segmentacao/conclusao", label: "Conclusão", icon: BookOpen },
    ]
  },
  {
    href: "/os/memoria/virtual",
    label: "Memória Virtual",
    icon: HardDrive,
    description: "Demand paging e working set",
    badge: "6",
    children: [
      { href: "/os/memoria/virtual", label: "Visão Geral", icon: HardDrive },
      { href: "/os/memoria/virtual/teoria", label: "Teoria", icon: BookOpen },
      { href: "/os/memoria/virtual/demand-paging", label: "Demand Paging", icon: Database },
      { href: "/os/memoria/virtual/page-fault", label: "Page Fault", icon: Shield },
      { href: "/os/memoria/virtual/localidade", label: "Localidade", icon: Database },
      { href: "/os/memoria/virtual/working-set", label: "Working Set", icon: Cpu },
      { href: "/os/memoria/virtual/visualizacoes", label: "Visualizações", icon: Zap },
      { href: "/os/memoria/virtual/algoritmos", label: "Algoritmos", icon: Code2 },
      { href: "/os/memoria/virtual/performance", label: "Performance", icon: Rocket },
      { href: "/os/memoria/virtual/linux-kernel", label: "Linux Kernel", icon: Settings },
      { href: "/os/memoria/virtual/exercicios", label: "Exercícios", icon: Zap },
      { href: "/os/memoria/virtual/conclusao", label: "Conclusão", icon: BookOpen },
    ]
  },
  {
    href: "/os/memoria/substituicao",
    label: "Substituição de Página",
    icon: Repeat,
    description: "Algoritmos FIFO, LRU, Clock",
    badge: "4",
    children: [
      { href: "/os/memoria/substituicao", label: "Visão Geral", icon: Repeat },
      { href: "/os/memoria/substituicao/belady-anomaly", label: "Anomalia de Belady", icon: Shield },
    ]
  },
  {
    href: "/os/arquivos/arquivos",
    label: "Sistema de Arquivos",
    icon: FolderTree,
    description: "Arquivos, diretórios e implementação",
    children: [
      { href: "/os/arquivos/arquivos", label: "Arquivos", icon: FileText },
      { href: "/os/arquivos/protecao", label: "Proteção", icon: Shield },
      { href: "/os/arquivos/implementacao", label: "Implementação", icon: Settings },
    ]
  },
  {
    href: "/os/io",
    label: "Entrada e Saída",
    icon: Cpu,
    description: "Hardware, drivers e scheduling",
    children: [
      { href: "/os/io", label: "Visão Geral", icon: Cpu },
      { href: "/os/io/hardware", label: "Hardware", icon: Cpu },
      { href: "/os/io/drivers", label: "Drivers", icon: Settings },
      { href: "/os/io/scheduling", label: "Scheduling", icon: Database },
    ]
  },
  {
    href: "/os/exercicios",
    label: "Exercícios",
    icon: Zap,
    description: "Questões por módulo",
    children: [
      { href: "/os/exercicios", label: "Todos os Exercícios", icon: Zap },
      { href: "/os/exercicios/memoria-virtual", label: "Memória Virtual", icon: HardDrive },
      { href: "/os/exercicios/arquivos", label: "Sistema de Arquivos", icon: FolderTree },
      { href: "/os/exercicios/jogo-anti-aerea", label: "Jogo Anti-Aérea", icon: Rocket },
    ]
  },
];

export function CollapsibleNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const pathname = usePathname();
  const router = useRouter();

  // Block body scroll when navbar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  // Auto-expand sections that contain current page
  useEffect(() => {
    navStructure.forEach((item) => {
      if (item.children && pathname.startsWith(item.href)) {
        setExpandedSections(prev => new Set(prev).add(item.href));
      }
    });
  }, [pathname]);

  // Prefetch automático de rotas relacionadas quando a navegação abre
  useEffect(() => {
    if (isOpen) {
      // Prefetch todas as rotas principais quando a navegação está aberta
      navStructure.forEach((item) => {
        router.prefetch(item.href);
        if (item.children) {
          item.children.forEach((child) => {
            router.prefetch(child.href);
          });
        }
      });
    }
  }, [isOpen, router]);

  const toggleSection = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(href)) {
        newSet.delete(href);
      } else {
        newSet.add(href);
      }
      return newSet;
    });
  };

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
    // Prefetch para navegação instantânea
    router.prefetch(href);
    router.push(href);
  };

  const isActive = (href: string) => {
    if (href === pathname) return true;
    if (href !== "/" && pathname.startsWith(href + "/")) return true;
    return false;
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed left-4 top-4 z-[100]"
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
            {/* Backdrop - Blocks everything behind */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[90]"
              onClick={() => setIsOpen(false)}
              style={{ pointerEvents: 'auto' }}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -400, opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-96 z-[95] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Card className="h-full rounded-none border-r-2 border-os-primary/30 bg-background/98 backdrop-blur-xl shadow-2xl flex flex-col">
                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-os-primary to-os-secondary border-b border-os-primary/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <BookOpen className="size-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-white">OS & DB Academy</h2>
                        <p className="text-xs text-white/80">Navegação Rápida</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Navigation Items - Scrollable */}
                <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-1" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {navStructure.map((item, idx) => {
                    const Icon = item.icon;
                    const hasChildren = item.children && item.children.length > 0;
                    const isExpanded = expandedSections.has(item.href);
                    const itemActive = isActive(item.href);

                    return (
                      <div key={item.href} className="mb-1">
                        {/* Main Item */}
                        <motion.div
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.03 }}
                        >
                          <div
                            onClick={(e) => {
                              if (hasChildren) {
                                toggleSection(item.href, e);
                              } else {
                                handleNavClick(item.href, e);
                              }
                            }}
                            className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 cursor-pointer ${
                              itemActive && !hasChildren
                                ? "bg-gradient-to-r from-os-primary/20 to-os-secondary/20 border-2 border-os-primary/50 shadow-lg"
                                : "hover:bg-muted/50 border-2 border-transparent hover:border-os-primary/30"
                            }`}
                          >
                            <div className={`p-2 rounded-lg transition-all ${
                              itemActive && !hasChildren
                                ? "bg-gradient-to-br from-os-primary to-os-secondary text-white" 
                                : "bg-muted group-hover:bg-os-primary/20"
                            }`}>
                              <Icon className="size-4" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className={`font-semibold text-sm truncate ${
                                  itemActive && !hasChildren ? "text-os-primary" : "text-foreground"
                                }`}>
                                  {item.label}
                                </p>
                                {item.badge && (
                                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                              {item.description && (
                                <p className="text-xs text-muted-foreground truncate">
                                  {item.description}
                                </p>
                              )}
                            </div>

                            {hasChildren && (
                              <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="size-4 text-muted-foreground" />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>

                        {/* Children */}
                        <AnimatePresence>
                          {hasChildren && isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-6 mt-1 space-y-1 border-l-2 border-os-primary/20 pl-3"
                            >
                              {item.children!.map((child, childIdx) => {
                                const ChildIcon = child.icon;
                                const childActive = isActive(child.href);
                                
                                return (
                                  <motion.div
                                    key={child.href}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: childIdx * 0.05 }}
                                    onClick={(e) => handleNavClick(child.href, e)}
                                    className={`flex items-center gap-2 p-2 rounded-lg transition-all cursor-pointer ${
                                      childActive
                                        ? "bg-os-primary/20 border border-os-primary/50"
                                        : "hover:bg-muted/30"
                                    }`}
                                  >
                                    <ChildIcon className={`size-3 ${
                                      childActive ? "text-os-primary" : "text-muted-foreground"
                                    }`} />
                                    <span className={`text-xs truncate ${
                                      childActive ? "text-os-primary font-semibold" : "text-muted-foreground"
                                    }`}>
                                      {child.label}
                                    </span>
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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
                        <span>Páginas</span>
                        <strong>40+</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Simuladores</span>
                        <strong>12</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Exercícios</span>
                        <strong>40+</strong>
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
