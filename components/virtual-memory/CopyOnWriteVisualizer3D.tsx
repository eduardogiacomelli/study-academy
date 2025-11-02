"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Copy, Users, Zap, Save } from "lucide-react";
import * as anime from "animejs";

interface Process {
  pid: number;
  name: string;
  pages: number[];
  color: string;
}

interface Page {
  id: number;
  data: string;
  refCount: number;
  owners: number[];
  copied: boolean;
}

export function CopyOnWriteVisualizer3D() {
  const [parent, setParent] = useState<Process>({ pid: 1, name: "Parent", pages: [0, 1, 2, 3], color: "bg-blue-500" });
  const [child, setChild] = useState<Process | null>(null);
  const [pages, setPages] = useState<Page[]>([
    { id: 0, data: "Code", refCount: 1, owners: [1], copied: false },
    { id: 1, data: "Data1", refCount: 1, owners: [1], copied: false },
    { id: 2, data: "Data2", refCount: 1, owners: [1], copied: false },
    { id: 3, data: "Stack", refCount: 1, owners: [1], copied: false },
  ]);
  const [step, setStep] = useState(0);
  const [memorySaved, setMemorySaved] = useState(0);

  const doFork = () => {
    setStep(1);
    // Fork: criar child compartilhando páginas
    const childProc: Process = {
      pid: 2,
      name: "Child",
      pages: [0, 1, 2, 3],
      color: "bg-green-500"
    };
    setChild(childProc);
    
    // Incrementar refCount de todas as páginas
    setPages(prev => prev.map(p => ({
      ...p,
      refCount: 2,
      owners: [...p.owners, 2]
    })));
    
    // 4 páginas compartilhadas * 4KB = 16KB salvos
    setMemorySaved(16);
    
    // Animate
    anime({
      targets: '.child-process',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo'
    });
  };

  const writeToPage = (pageId: number, owner: 'parent' | 'child') => {
    setStep(2);
    const pid = owner === 'parent' ? 1 : 2;
    
    setPages(prev => prev.map(p => {
      if (p.id !== pageId) return p;
      
      if (p.refCount > 1) {
        // COW: copiar página
        const newPageId = Math.max(...prev.map(pg => pg.id)) + 1;
        const newPage: Page = {
          id: newPageId,
          data: p.data + "'",
          refCount: 1,
          owners: [pid],
          copied: true
        };
        
        // Atualizar processo para usar nova página
        if (owner === 'parent') {
          setParent(pr => ({
            ...pr,
            pages: pr.pages.map(pg => pg === pageId ? newPageId : pg)
          }));
        } else {
          setChild(ch => ch ? ({
            ...ch,
            pages: ch.pages.map(pg => pg === pageId ? newPageId : pg)
          }) : null);
        }
        
        // Decrementar refCount da página original
        const updatedPages = prev.map(pg => 
          pg.id === pageId 
            ? { ...pg, refCount: pg.refCount - 1, owners: pg.owners.filter(o => o !== pid) }
            : pg
        );
        
        // Adicionar nova página
        return [...updatedPages, newPage].find(pg => pg.id === p.id) || p;
      }
      
      // Página exclusiva, só modificar
      return { ...p, data: p.data + "!" };
    }));
    
    // Recalcular memória salva
    setTimeout(() => {
      setPages(current => {
        const shared = current.filter(p => p.refCount > 1).length;
        setMemorySaved(shared * 4);
        return current;
      });
    }, 100);
    
    // Animate copy
    anime({
      targets: `.page-${pageId}`,
      scale: [1, 1.2, 1],
      duration: 500,
      easing: 'easeInOutQuad'
    });
  };

  const reset = () => {
    setStep(0);
    setChild(null);
    setPages([
      { id: 0, data: "Code", refCount: 1, owners: [1], copied: false },
      { id: 1, data: "Data1", refCount: 1, owners: [1], copied: false },
      { id: 2, data: "Data2", refCount: 1, owners: [1], copied: false },
      { id: 3, data: "Stack", refCount: 1, owners: [1], copied: false },
    ]);
    setParent({ pid: 1, name: "Parent", pages: [0, 1, 2, 3], color: "bg-blue-500" });
    setMemorySaved(0);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Copy className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Copy-on-Write (COW) Simulator</h3>
          </div>
          <Button onClick={reset} variant="outline" size="sm">
            Reset
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={doFork}
            disabled={step >= 1}
            className="bg-green-500 hover:bg-green-600"
          >
            <Users className="w-4 h-4 mr-2" />
            fork()
          </Button>
          
          {child && (
            <>
              <Button
                onClick={() => writeToPage(1, 'parent')}
                disabled={step >= 2}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Parent writes Data1
              </Button>
              <Button
                onClick={() => writeToPage(2, 'child')}
                disabled={step >= 2}
                className="bg-green-500 hover:bg-green-600"
              >
                Child writes Data2
              </Button>
            </>
          )}
        </div>
      </Card>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-purple-950/30 border-purple-500/20 p-4">
          <div className="text-xs text-purple-400 mb-1">Total Pages</div>
          <div className="text-3xl font-bold text-white">{pages.length}</div>
          <div className="text-xs text-slate-500">{pages.length * 4} KB</div>
        </Card>
        
        <Card className="bg-green-950/30 border-green-500/20 p-4">
          <div className="text-xs text-green-400 mb-1">Shared Pages</div>
          <div className="text-3xl font-bold text-green-300">
            {pages.filter(p => p.refCount > 1).length}
          </div>
          <div className="text-xs text-slate-500">COW enabled</div>
        </Card>
        
        <Card className="bg-blue-950/30 border-blue-500/20 p-4">
          <div className="text-xs text-blue-400 mb-1 flex items-center gap-1">
            <Save className="w-3 h-3" />
            Memory Saved
          </div>
          <div className="text-3xl font-bold text-blue-300">{memorySaved} KB</div>
          <div className="text-xs text-slate-500">
            {pages.length > 0 ? ((memorySaved / (pages.length * 4)) * 100).toFixed(0) : 0}% savings
          </div>
        </Card>
      </div>

      {/* Visual */}
      <Card className="bg-white/5 backdrop-blur-sm border-purple-500/20 p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Parent Process */}
          <div className="parent-process">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="font-semibold text-white">Parent Process (PID 1)</span>
            </div>
            <div className="space-y-2">
              {parent.pages.map(pageId => {
                const page = pages.find(p => p.id === pageId);
                if (!page) return null;
                return (
                  <Card
                    key={pageId}
                    className={`page-${pageId} p-3 ${
                      page.refCount > 1 
                        ? 'bg-yellow-950/30 border-yellow-500/30' 
                        : 'bg-blue-950/30 border-blue-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-mono text-sm text-white">Page {pageId}</div>
                        <div className="text-xs text-slate-400">{page.data}</div>
                      </div>
                      <div className="text-right">
                        {page.refCount > 1 && (
                          <Badge className="bg-yellow-500 text-xs">Shared</Badge>
                        )}
                        {page.copied && page.owners.includes(1) && (
                          <Badge className="bg-purple-500 text-xs mt-1">COW Copy</Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Child Process */}
          {child && (
            <div className="child-process">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="font-semibold text-white">Child Process (PID 2)</span>
              </div>
              <div className="space-y-2">
                {child.pages.map(pageId => {
                  const page = pages.find(p => p.id === pageId);
                  if (!page) return null;
                  return (
                    <Card
                      key={pageId}
                      className={`page-${pageId} p-3 ${
                        page.refCount > 1 
                          ? 'bg-yellow-950/30 border-yellow-500/30' 
                          : 'bg-green-950/30 border-green-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-mono text-sm text-white">Page {pageId}</div>
                          <div className="text-xs text-slate-400">{page.data}</div>
                        </div>
                        <div className="text-right">
                          {page.refCount > 1 && (
                            <Badge className="bg-yellow-500 text-xs">Shared</Badge>
                          )}
                          {page.copied && page.owners.includes(2) && (
                            <Badge className="bg-purple-500 text-xs mt-1">COW Copy</Badge>
                          )}
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Explanation */}
      <Card className="bg-gradient-to-r from-purple-950/50 to-pink-950/50 border-purple-500/20 p-6">
        <h3 className="text-xl font-semibold text-purple-300 mb-4">Como funciona Copy-on-Write (COW)</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <div className="flex items-start gap-2">
            <Badge className="bg-blue-500 min-w-[20px] h-6 flex items-center justify-center">1</Badge>
            <div>
              <strong className="text-blue-400">fork():</strong> Ao criar processo filho, ao invés de copiar todas as páginas, 
              ambos processos compartilham as mesmas páginas físicas (refCount aumenta).
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Badge className="bg-green-500 min-w-[20px] h-6 flex items-center justify-center">2</Badge>
            <div>
              <strong className="text-green-400">Read:</strong> Enquanto ninguém escreve, todos leem da mesma página física. 
              Economia máxima de memória!
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Badge className="bg-yellow-500 min-w-[20px] h-6 flex items-center justify-center">3</Badge>
            <div>
              <strong className="text-yellow-400">Write (COW Trigger):</strong> Quando um processo tenta escrever em página compartilhada, 
              page fault ocorre e kernel copia a página (copy-on-write).
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Badge className="bg-purple-500 min-w-[20px] h-6 flex items-center justify-center">4</Badge>
            <div>
              <strong className="text-purple-400">Result:</strong> Processo que escreveu ganha cópia privada. 
              RefCount da original decrementa. Memória economizada até realmente necessário!
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

