"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X, CheckCircle2 } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  count: number;
  icon?: string;
}

interface ExerciseFiltersProps {
  categories: FilterOption[];
  difficulties: FilterOption[];
  selectedCategory: string;
  selectedDifficulty: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onClearFilters: () => void;
  totalExercises: number;
  filteredCount: number;
}

export function ExerciseFilters({
  categories,
  difficulties,
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
  onClearFilters,
  totalExercises,
  filteredCount
}: ExerciseFiltersProps) {
  const hasActiveFilters = selectedCategory !== "all" || selectedDifficulty !== "all";

  return (
    <Card className="p-4 bg-gradient-to-br from-os-primary/5 to-os-secondary/5 border-os-primary/20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-os-primary" />
          <h3 className="text-sm font-bold">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-7 text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="size-3 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Categories - Compact */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Categoria
          </p>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((category) => {
              const isActive = selectedCategory === category.value;
              return (
                <motion.button
                  key={category.value}
                  onClick={() => onCategoryChange(category.value)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-2.5 py-1.5 rounded-lg border transition-all duration-150 text-xs ${
                    isActive
                      ? "bg-os-primary border-os-primary text-white shadow-md shadow-os-primary/20"
                      : "bg-card border-border hover:border-os-primary/40 hover:bg-os-primary/5"
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {category.icon && <span className="text-sm">{category.icon}</span>}
                    <span className="font-medium">{category.label}</span>
                    <Badge
                      variant="secondary"
                      className={`text-[9px] px-1.5 py-0 ${
                        isActive ? "bg-white/20 text-white" : "bg-muted"
                      }`}
                    >
                      {category.count}
                    </Badge>
                    {isActive && <CheckCircle2 className="size-3" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Difficulties - Compact */}
        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Dificuldade
          </p>
          <div className="grid grid-cols-2 gap-1.5">
            {difficulties.map((difficulty) => {
              const isActive = selectedDifficulty === difficulty.value;
              const colorClass = 
                difficulty.value === "beginner" ? "from-green-500 to-emerald-500" :
                difficulty.value === "intermediate" ? "from-yellow-500 to-orange-500" :
                difficulty.value === "advanced" ? "from-red-500 to-pink-500" :
                "from-os-primary to-os-secondary";

              return (
                <motion.button
                  key={difficulty.value}
                  onClick={() => onDifficultyChange(difficulty.value)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative px-2.5 py-2 rounded-lg border transition-all duration-150 overflow-hidden ${
                    isActive
                      ? "border-transparent shadow-md"
                      : "bg-card border-border hover:border-os-primary/30"
                  }`}
                >
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} opacity-15`} />
                  )}
                  <div className="relative flex flex-col items-center gap-0.5">
                    <span className={`font-semibold text-xs ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {difficulty.label}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-[9px] px-1.5 py-0 ${isActive ? "bg-background/50" : "bg-muted"}`}
                    >
                      {difficulty.count}
                    </Badge>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Results Count - Compact */}
        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              <strong className="text-foreground">{filteredCount}</strong> de {totalExercises}
            </span>
            {filteredCount < totalExercises && (
              <Badge variant="outline" className="bg-os-primary/10 border-os-primary/30 text-[9px]">
                Filtrado
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
