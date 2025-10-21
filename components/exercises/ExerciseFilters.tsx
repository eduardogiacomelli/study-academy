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
    <Card className="p-6 bg-gradient-to-br from-os-primary/5 to-os-secondary/5 border-os-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="size-5 text-os-primary" />
          <h3 className="text-lg font-bold">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="size-4 mr-2" />
            Limpar
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Categoria
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category.value;
              return (
                <motion.button
                  key={category.value}
                  onClick={() => onCategoryChange(category.value)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative px-4 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                    isActive
                      ? "bg-os-primary border-os-primary text-white shadow-lg shadow-os-primary/30"
                      : "bg-card border-border hover:border-os-primary/50 hover:bg-os-primary/10"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {category.icon && <span className="text-lg">{category.icon}</span>}
                    <span className="font-medium text-sm">{category.label}</span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${
                        isActive ? "bg-white/20 text-white" : "bg-muted"
                      }`}
                    >
                      {category.count}
                    </Badge>
                    {isActive && (
                      <CheckCircle2 className="size-4 ml-1" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Difficulties */}
        <div className="space-y-3">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Dificuldade
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative px-4 py-3 rounded-xl border-2 transition-all duration-200 overflow-hidden ${
                    isActive
                      ? "border-transparent shadow-lg"
                      : "bg-card border-border hover:border-os-primary/30"
                  }`}
                >
                  {isActive && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} opacity-20`} />
                  )}
                  <div className="relative flex flex-col items-center gap-1">
                    <span className={`font-semibold text-sm ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}>
                      {difficulty.label}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-xs ${isActive ? "bg-background/50" : "bg-muted"}`}
                    >
                      {difficulty.count}
                    </Badge>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Mostrando <span className="font-bold text-foreground">{filteredCount}</span> de{" "}
              <span className="font-bold text-foreground">{totalExercises}</span> exercícios
            </p>
            {filteredCount < totalExercises && (
              <Badge variant="outline" className="bg-os-primary/10 border-os-primary/30">
                Filtrado
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

