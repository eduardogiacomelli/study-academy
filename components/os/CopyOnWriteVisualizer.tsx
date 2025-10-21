"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Copy, Edit, Eye, RotateCcw, Users, Zap } from "lucide-react";

interface Page {
  id: number;
  content: string;
  isCOW: boolean;
  refCount: number;
  physicalFrame: number;
}

interface Process {
  id: string;
  name: string;
  color: string;
  pages: Map<number, number>; // virtual page -> physical frame
}

export function CopyOnWriteVisualizer() {
  const [physicalMemory, setPhysicalMemory] = useState<Page[]>([
    { id: 0, content: "Code Section", isCOW: false, refCount: 1, physicalFrame: 0 },
    { id: 1, content: "Data: x=10", isCOW: false, refCount: 1, physicalFrame: 1 },
    { id: 2, content: "Data: y=20", isCOW: false, refCount: 1, physicalFrame: 2 },
  ]);
  
  const [processes, setProcesses] = useState<Process[]>([
    {
      id: "parent",
      name: "Processo Pai",
      color: "from-blue-500 to-cyan-500",
      pages: new Map([[0, 0], [1, 1], [2, 2]]),
    },
  ]);

  const [hasChild, setHasChild] = useState(false);
  const [memorySaved, setMemorySaved] = useState(0);
  const [copyCount, setCopyCount] = useState(0);

  // Fork process (COW)
  const handleFork = () => {
    if (hasChild) {
      toast.error("Processo filho já existe!");
      return;
    }

    // Mark all pages as COW
    setPhysicalMemory(prev =>
      prev.map(page => ({
        ...page,
        isCOW: page.id !== 0, // Code section is read-only, not COW
        refCount: page.refCount + 1,
      }))
    );

    // Create child process with same page mapping
    const parentPages = processes[0].pages;
    const childPages = new Map(parentPages);

    setProcesses(prev => [
      ...prev,
      {
        id: "child",
        name: "Processo Filho",
        color: "from-green-500 to-emerald-500",
        pages: childPages,
      },
    ]);

    setHasChild(true);
    
    // Calculate memory saved
    const pageSize = 4; // KB
    const totalPages = physicalMemory.length;
    const saved = totalPages * pageSize;
    setMemorySaved(saved);

    toast.success("Fork executado com sucesso!", {
      description: `Economizou ${saved}KB usando Copy-on-Write. Páginas compartilhadas!`,
    });
  };

  // Write to page (triggers COW)
  const handleWrite = (processId: string, virtualPage: number) => {
    const process = processes.find(p => p.id === processId);
    if (!process) return;

    const physicalFrame = process.pages.get(virtualPage);
    if (physicalFrame === undefined) return;

    const page = physicalMemory.find(p => p.physicalFrame === physicalFrame);
    if (!page) return;

    if (!page.isCOW || page.refCount === 1) {
      // Not COW or only one reference - just modify
      setPhysicalMemory(prev =>
        prev.map(p =>
          p.physicalFrame === physicalFrame
            ? { ...p, content: `${p.content} (modificado por ${process.name})`, isCOW: false }
            : p
        )
      );
      toast.success(`Página ${virtualPage} modificada diretamente (sem COW)`);
      return;
    }

    // COW FAULT! Need to copy
    const newFrame = Math.max(...physicalMemory.map(p => p.physicalFrame)) + 1;
    const newPage: Page = {
      id: physicalMemory.length,
      content: `${page.content} (cópia - ${process.name})`,
      isCOW: false,
      refCount: 1,
      physicalFrame: newFrame,
    };

    // Decrement ref count of original page
    setPhysicalMemory(prev => [
      ...prev.map(p =>
        p.physicalFrame === physicalFrame
          ? { ...p, refCount: p.refCount - 1, isCOW: p.refCount > 2 }
          : p
      ),
      newPage,
    ]);

    // Update process page table
    setProcesses(prev =>
      prev.map(p =>
        p.id === processId
          ? {
              ...p,
              pages: new Map([...p.pages, [virtualPage, newFrame]]),
            }
          : p
      )
    );

    setCopyCount(prev => prev + 1);
    const pageSize = 4; // KB
    const actualSaved = memorySaved - pageSize;
    setMemorySaved(actualSaved);

    toast.warning(`🔄 COW FAULT!`, {
      description: `Página ${virtualPage} copiada para quadro ${newFrame}. Ainda economizando ${actualSaved}KB.`,
    });
  };

  // Reset
  const handleReset = () => {
    setPhysicalMemory([
      { id: 0, content: "Code Section", isCOW: false, refCount: 1, physicalFrame: 0 },
      { id: 1, content: "Data: x=10", isCOW: false, refCount: 1, physicalFrame: 1 },
      { id: 2, content: "Data: y=20", isCOW: false, refCount: 1, physicalFrame: 2 },
    ]);
    setProcesses([
      {
        id: "parent",
        name: "Processo Pai",
        color: "from-blue-500 to-cyan-500",
        pages: new Map([[0, 0], [1, 1], [2, 2]]),
      },
    ]);
    setHasChild(false);
    setMemorySaved(0);
    setCopyCount(0);
    toast.success("Sistema reiniciado!");
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/10 relative overflow-hidden border-violet-500/30">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <h3 className="text-2xl font-bold mb-4 text-violet-400 relative z-10 flex items-center gap-2">
        <Copy className="size-6" />
        Visualizador de Copy-on-Write (COW)
      </h3>
      <p className="text-muted-foreground mb-6 relative z-10">
        Execute fork() e observe como as páginas são compartilhadas. Elas só são copiadas quando modificadas!
      </p>

      <div className="space-y-6 relative z-10">
        {/* Controls */}
        <div className="flex gap-2 flex-wrap">
          <Button onClick={handleFork} disabled={hasChild} variant="default">
            <Users className="size-4 mr-2" /> Fork Process
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw className="size-4 mr-2" /> Reset
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-background/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground mb-1">Processos</p>
            <p className="text-2xl font-bold text-foreground">{processes.length}</p>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <p className="text-xs text-green-400 mb-1">Memória Economizada</p>
            <p className="text-2xl font-bold text-green-500">{memorySaved} KB</p>
          </div>
          <div className="p-4 bg-violet-500/10 rounded-lg border border-violet-500/30">
            <p className="text-xs text-violet-400 mb-1">COW Faults</p>
            <p className="text-2xl font-bold text-violet-500">{copyCount}</p>
          </div>
        </div>

        {/* Process Views */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {processes.map((process) => (
              <motion.div
                key={process.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-6 rounded-lg border-2 bg-gradient-to-br ${process.color}/10 border-${process.id === "parent" ? "blue" : "green"}-500/50`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    {process.id === "parent" ? <Users className="size-4" /> : <Copy className="size-4" />}
                    {process.name}
                  </h4>
                  <Badge variant="outline" className={`bg-${process.id === "parent" ? "blue" : "green"}-500/20`}>
                    PID: {process.id}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground mb-2">Tabela de Páginas:</p>
                  {Array.from(process.pages.entries()).map(([vPage, pFrame]) => {
                    const physPage = physicalMemory.find(p => p.physicalFrame === pFrame);
                    return (
                      <div
                        key={vPage}
                        className="flex items-center justify-between p-3 bg-background/50 rounded border border-border"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono">VP {vPage}</span>
                            <span className="text-xs">→</span>
                            <span className="text-xs font-mono text-cyan-400">Frame {pFrame}</span>
                            {physPage?.isCOW && (
                              <Badge variant="secondary" className="text-xs px-1 py-0 bg-yellow-500/20 text-yellow-400">
                                COW
                              </Badge>
                            )}
                            {physPage && physPage.refCount > 1 && (
                              <Badge variant="secondary" className="text-xs px-1 py-0 bg-purple-500/20 text-purple-400">
                                Shared ({physPage.refCount})
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {physPage?.content || "N/A"}
                          </p>
                        </div>
                        {vPage > 0 && ( // Can't write to code section
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleWrite(process.id, vPage)}
                            className="ml-2"
                          >
                            <Edit className="size-3 mr-1" /> Write
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Physical Memory View */}
        <div className="p-6 bg-background/30 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Eye className="size-4" />
            Memória Física (RAM)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <AnimatePresence mode="popLayout">
              {physicalMemory.map((page) => {
                const processesUsingPage = processes.filter(p =>
                  Array.from(p.pages.values()).includes(page.physicalFrame)
                );

                return (
                  <motion.div
                    key={page.physicalFrame}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`p-4 rounded-lg border-2 ${
                      page.isCOW
                        ? "bg-yellow-500/20 border-yellow-500/50"
                        : page.refCount > 1
                        ? "bg-purple-500/20 border-purple-500/50"
                        : "bg-cyan-500/20 border-cyan-500/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-semibold">Frame {page.physicalFrame}</span>
                      <div className="flex gap-1">
                        {page.isCOW && (
                          <Badge variant="secondary" className="text-xs px-1 py-0 bg-yellow-500/30 text-yellow-400">
                            COW
                          </Badge>
                        )}
                        {page.refCount > 1 && (
                          <Badge variant="secondary" className="text-xs px-1 py-0 bg-purple-500/30 text-purple-400">
                            ×{page.refCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {page.content}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {processesUsingPage.map(proc => (
                        <Badge
                          key={proc.id}
                          variant="outline"
                          className={`text-xs px-1 py-0 ${
                            proc.id === "parent" ? "bg-blue-500/20 border-blue-500/50" : "bg-green-500/20 border-green-500/50"
                          }`}
                        >
                          {proc.id}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Info & Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert className="bg-blue-500/10 border-blue-500/30">
            <Zap className="size-4 text-blue-500" />
            <AlertDescription className="text-blue-300 text-sm">
              <strong>Como funciona:</strong> Após fork(), pai e filho compartilham as mesmas páginas físicas.
              Elas são marcadas como read-only. Quando qualquer processo tenta escrever, ocorre um page fault
              e a página é copiada (COW fault).
            </AlertDescription>
          </Alert>

          <Alert className="bg-green-500/10 border-green-500/30">
            <AlertDescription className="text-green-300 text-sm">
              <strong>Benefícios:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                <li>Fork() muito mais rápido (sem copiar memória)</li>
                <li>Economia de memória (compartilhamento)</li>
                <li>Eficiente para exec() após fork()</li>
                <li>Copia apenas o que for modificado</li>
              </ul>
            </AlertDescription>
          </Alert>
        </div>

        {/* Example Scenario */}
        {!hasChild && (
          <div className="p-4 bg-violet-500/10 rounded-lg border border-violet-500/30">
            <p className="text-sm text-violet-300">
              💡 <strong>Experimente:</strong> Clique em &quot;Fork Process&quot; para criar um processo filho.
              Depois, tente modificar (Write) em diferentes páginas e observe quando ocorre COW!
            </p>
          </div>
        )}

        {hasChild && copyCount === 0 && (
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
            <p className="text-sm text-green-300">
              ✅ <strong>Páginas compartilhadas!</strong> Pai e filho estão usando as mesmas páginas físicas.
              Economizando {memorySaved}KB! Tente modificar uma página para ver o COW em ação.
            </p>
          </div>
        )}

        {copyCount > 0 && (
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <p className="text-sm text-yellow-300">
              🔄 <strong>COW em ação!</strong> Já ocorreram {copyCount} cópias. 
              Ainda economizando {memorySaved}KB em relação à cópia completa!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}

