"use client";

import { useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatBytes } from "@/lib/bytes";
import { usePagingStore } from "@/store/paging.store";
import { Table2 } from "lucide-react";

// Mesmas cores do MemoryGrid
function getPidColor(pid: number) {
  const colors = [
    { bg: "bg-blue-500", text: "text-blue-950 dark:text-blue-50" },
    { bg: "bg-green-500", text: "text-green-950 dark:text-green-50" },
    { bg: "bg-purple-500", text: "text-purple-950 dark:text-purple-50" },
    { bg: "bg-orange-500", text: "text-orange-950 dark:text-orange-50" },
    { bg: "bg-pink-500", text: "text-pink-950 dark:text-pink-50" },
    { bg: "bg-cyan-500", text: "text-cyan-950 dark:text-cyan-50" },
    { bg: "bg-amber-500", text: "text-amber-950 dark:text-amber-50" },
    { bg: "bg-emerald-500", text: "text-emerald-950 dark:text-emerald-50" },
  ];
  return colors[pid % colors.length];
}

export function PageTableViewer() {
  const processes = usePagingStore(s => s.processes);
  const pageSize = usePagingStore(s => s.config.pageSizeBytes);
  const [pid, setPid] = useState<string>("");

  const proc = pid ? processes[Number(pid)] : undefined;
  const options = useMemo(() => Object.values(processes).map(p => ({ value: String(p.pid), label: `PID ${p.pid}` })), [processes]);
  const color = proc ? getPidColor(proc.pid) : null;

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background to-secondary/5 p-4 md:p-6">
      {/* Blur decoration */}
      {color && <div className={`absolute top-0 left-0 w-32 h-32 ${color.bg} opacity-10 rounded-full blur-3xl`} />}
      
      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <Table2 className="size-4 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Tabela de Páginas</h2>
              <p className="text-xs text-muted-foreground">Mapeamento página → quadro</p>
            </div>
          </div>
          <div className="min-w-48">
            <Select value={pid} onValueChange={setPid}>
              <SelectTrigger><SelectValue placeholder="Selecione um processo" /></SelectTrigger>
              <SelectContent>
                {options.length === 0 ? <div className="p-2 text-sm text-muted-foreground">Nenhum processo.</div> :
                  options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)
                }
              </SelectContent>
            </Select>
          </div>
        </div>

        {proc ? (
          <>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {color && (
                <div className={`px-2.5 py-1 rounded font-mono font-bold text-xs ${color.bg} ${color.text}`}>
                  PID {proc.pid}
                </div>
              )}
              <Badge variant="outline">Tamanho: {formatBytes(proc.sizeBytes)}</Badge>
              <Badge variant="outline">{proc.pagesCount} páginas</Badge>
              <Badge variant="outline">Página = {formatBytes(pageSize)}</Badge>
            </div>

          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Página</TableHead>
                  <TableHead>Quadro</TableHead>
                  <TableHead>Endereço físico (intervalo)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {proc.pageTable.map((frameIndex, pageIndex) => {
                  const start = frameIndex * pageSize;
                  const end = start + pageSize - 1;
                  return (
                    <TableRow key={pageIndex}>
                      <TableCell className="font-mono">P{pageIndex}</TableCell>
                      <TableCell className="font-mono">F{frameIndex}</TableCell>
                      <TableCell className="font-mono">[{start} .. {end}]</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Selecione um processo para visualizar seu mapeamento página → quadro.</p>
        )}
      </div>
    </div>
  );
}

