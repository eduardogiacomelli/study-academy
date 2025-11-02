"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { POW2_BYTES, formatBytes } from "@/lib/bytes";
import { toast } from "sonner";
import { PlusCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { usePagingStore } from "@/store/paging.store";

export function CreateProcessDialog() {
  const createProcess = usePagingStore((s) => s.createProcess);
  const maxProcessBytes = usePagingStore((s) => s.config.maxProcessBytes);
  const frameOccupancy = usePagingStore((s) => s.frameOccupancy);
  const pageSize = usePagingStore((s) => s.config.pageSizeBytes);

  const freeFrames = useMemo(() => {
    return frameOccupancy.reduce((acc, occ, idx) => {
      if (occ === null) acc.push(idx);
      return acc;
    }, [] as number[]);
  }, [frameOccupancy]);

  const [open, setOpen] = useState(false);
  const [pid, setPid] = useState<string>("");
  const [size, setSize] = useState<string>("1024");
  const [validationError, setValidationError] = useState<string>("");

  useEffect(() => {
    if (!pid || !size) {
      setValidationError("");
      return;
    }

    const pidNum = Number(pid);
    const sizeNum = Number(size);

    if (!Number.isInteger(pidNum) || pidNum <= 0) {
      setValidationError("PID deve ser inteiro positivo");
      return;
    }

    if (sizeNum > maxProcessBytes) {
      setValidationError(`Tamanho excede máximo (${formatBytes(maxProcessBytes)})`);
      return;
    }

    const pagesNeeded = Math.ceil(sizeNum / pageSize);
    if (freeFrames.length < pagesNeeded) {
      setValidationError(`Memória insuficiente! Precisa ${pagesNeeded}, disponível ${freeFrames.length}`);
      return;
    }

    setValidationError("");
  }, [pid, size, maxProcessBytes, freeFrames, pageSize]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      const pidNum = Number(pid);
      const sizeNum = Number(size);

      createProcess(pidNum, sizeNum);
      toast.success(`Processo ${pidNum} criado (${formatBytes(sizeNum)})`);

      setOpen(false);
      setPid("");
      setSize("1024");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erro ao criar processo";
      toast.error(message);
    }
  };

  const isValid = pid && size && !validationError;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <PlusCircle className="size-4 mr-2" />
          Novo Processo
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Processo</DialogTitle>
          <DialogDescription>Configure o PID e tamanho do processo</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* PID */}
          <div>
            <Label className="mb-1.5 block">Process ID (PID)</Label>
            <div className="relative">
              <Input
                placeholder="ex.: 101"
                value={pid}
                onChange={(e) => setPid(e.target.value)}
                inputMode="numeric"
                className="pr-10"
              />
              {pid && Number.isInteger(Number(pid)) && Number(pid) > 0 && (
                <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-green-500" />
              )}
            </div>
          </div>

          {/* Size */}
          <div>
            <Label className="mb-1.5 block">Tamanho</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {POW2_BYTES.filter((v) => v >= 256 && v <= maxProcessBytes).map((v) => {
                  const pagesNeeded = Math.ceil(v / pageSize);
                  const canAllocate = freeFrames.length >= pagesNeeded;

                  return (
                    <SelectItem key={v} value={String(v)} disabled={!canAllocate}>
                      <span className="flex items-center justify-between gap-4">
                        <span>{formatBytes(v)}</span>
                        <Badge variant={canAllocate ? "secondary" : "outline"} className="text-xs">
                          {pagesNeeded} pág
                        </Badge>
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {size && (
              <p className="text-xs text-muted-foreground mt-1.5">
                {Math.ceil(Number(size) / pageSize)} páginas • {freeFrames.length} quadros livres
              </p>
            )}
          </div>

          {/* Error */}
          {validationError && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
              <AlertCircle className="size-4 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{validationError}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid} className="flex-1">
              Criar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

