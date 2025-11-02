"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { POW2_BYTES, formatBytes, isPowerOfTwo } from "@/lib/bytes";
import { toast } from "sonner";
import { RefreshCw, Settings2 } from "lucide-react";
import { usePagingStore } from "@/store/paging.store";

export function ConfigPanel() {
  const config = usePagingStore((s) => s.config);
  const applyConfig = usePagingStore((s) => s.applyConfig);
  const clearAll = usePagingStore((s) => s.clearAll);
  const frameOccupancy = usePagingStore((s) => s.frameOccupancy);
  const score = usePagingStore((s) => s.score);

  // Derivar valores com useMemo para evitar re-renders infinitos
  const frames = useMemo(() => frameOccupancy.length, [frameOccupancy]);
  const freePct = useMemo(() => {
    const free = frameOccupancy.filter((f) => f === null).length;
    const total = frameOccupancy.length;
    return total === 0 ? 0 : Math.round((free / total) * 100);
  }, [frameOccupancy]);

  const [phys, setPhys] = useState(String(config.physicalMemoryBytes));
  const [page, setPage] = useState(String(config.pageSizeBytes));
  const [maxp, setMaxp] = useState(String(config.maxProcessBytes));

  const onApply = () => {
    try {
      const p = Number(phys), g = Number(page), m = Number(maxp);
      if (!isPowerOfTwo(p) || !isPowerOfTwo(g) || !isPowerOfTwo(m)) throw new Error("Todos os tamanhos devem ser potências de 2.");
      if (p % g !== 0) throw new Error("A memória física deve ser múltiplo do tamanho da página.");
      applyConfig({ physicalMemoryBytes: p, pageSizeBytes: g, maxProcessBytes: m });
      toast.success("Configuração aplicada. Memória reinicializada.");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Falha ao aplicar configuração";
      toast.error(message);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background to-secondary/5 p-4 md:p-6">
      {/* Blur circle decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Settings2 className="size-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Configuração</h2>
              <p className="text-xs text-muted-foreground">Ajuste a memória</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary" className="font-mono">Score: {score}</Badge>
            <Badge variant="outline" className="text-xs">{frames} quadros • {freePct}% livre</Badge>
          </div>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label className="mb-1 block">Memória física</Label>
          <Select value={phys} onValueChange={setPhys}>
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              {POW2_BYTES.filter(v => v >= 4096 && v <= 32768).map(v =>
                <SelectItem key={v} value={String(v)}>{formatBytes(v)}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1 block">Tamanho da página</Label>
          <Select value={page} onValueChange={setPage}>
            <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
            <SelectContent>
              {POW2_BYTES.filter(v => v >= 128 && v <= 1024).map(v =>
                <SelectItem key={v} value={String(v)}>{formatBytes(v)}</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1 block">Tamanho máx. de processo</Label>
          <Input type="number" value={maxp} onChange={(e) => setMaxp(e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">Ex.: {formatBytes(2048)} (potência de 2)</p>
        </div>
      </div>

        <Separator className="my-4" />

        <div className="flex gap-3">
          <Button onClick={onApply} className="gap-2">
            <RefreshCw className="size-4" /> Aplicar
          </Button>
          <Button variant="outline" onClick={() => { clearAll(); toast.info("Memória limpa."); }}>
            Limpar memória
          </Button>
        </div>
      </div>
    </div>
  );
}

