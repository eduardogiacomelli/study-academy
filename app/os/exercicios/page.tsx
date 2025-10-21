"use client";

import { useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseFilters } from "@/components/exercises/ExerciseFilters";
import { ProgressDashboard } from "@/components/exercises/ProgressDashboard";
import { exercisesDatabase, exerciseStats } from "@/data/exercises-database";
import { Trophy, Target, Sparkles, BookOpen, Filter, ChevronDown } from "lucide-react";
import { toast } from "sonner";

export default function ExerciciosPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [answeredExercises, setAnsweredExercises] = useState<Record<string, boolean>>({});
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({});
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const { scrollYProgress } = useScroll();
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    return exercisesDatabase.filter((ex) => {
      const categoryMatch = selectedCategory === "all" || ex.category === selectedCategory;
      const difficultyMatch = selectedDifficulty === "all" || ex.difficulty === selectedDifficulty;
      return categoryMatch && difficultyMatch;
    });
  }, [selectedCategory, selectedDifficulty]);

  // Calculate statistics
  const stats = useMemo(() => {
    const completedCount = Object.keys(answeredExercises).length;
    const correctCount = Object.values(correctAnswers).filter(Boolean).length;
    const totalPoints = exercisesDatabase.reduce((sum, ex) => sum + ex.points, 0);

    const categories = Array.from(new Set(exercisesDatabase.map(ex => ex.category)));
    const categoryProgress = categories.map(cat => ({
      category: cat,
      completed: Object.keys(answeredExercises).filter(id => {
        const ex = exercisesDatabase.find(e => e.id === id);
        return ex?.category === cat;
      }).length,
      total: exercisesDatabase.filter(ex => ex.category === cat).length
    }));

    return {
      totalExercises: exercisesDatabase.length,
      completedExercises: completedCount,
      correctAnswers: correctCount,
      totalPoints,
      earnedPoints,
      categoryProgress
    };
  }, [answeredExercises, correctAnswers, earnedPoints]);

  const handleAnswer = (exerciseId: string, isCorrect: boolean, points: number) => {
    setAnsweredExercises(prev => ({ ...prev, [exerciseId]: true }));
    setCorrectAnswers(prev => ({ ...prev, [exerciseId]: isCorrect }));
    
    if (isCorrect) {
      setEarnedPoints(prev => prev + points);
      toast.success(`+${points} pontos! 🎉`, {
        description: "Continue assim!",
        duration: 2000,
      });
    }
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(exercisesDatabase.map(ex => ex.category)));
    return [
      { value: "all", label: "Todas", count: exercisesDatabase.length, icon: "📚" },
      ...cats.map(cat => ({
        value: cat,
        label: cat,
        count: exercisesDatabase.filter(ex => ex.category === cat).length,
        icon: cat.includes("Básico") ? "📖" :
              cat.includes("Paginação") ? "📄" :
              cat.includes("Virtual") ? "💾" :
              cat.includes("TLB") ? "⚡" :
              cat.includes("Algoritmos") ? "🔄" :
              cat.includes("Particionamento") ? "📦" : "🎯"
      }))
    ];
  }, []);

  const difficulties = useMemo(() => {
    return [
      { value: "all", label: "Todas", count: exercisesDatabase.length },
      { value: "beginner", label: "Iniciante", count: exercisesDatabase.filter(ex => ex.difficulty === "beginner").length },
      { value: "intermediate", label: "Intermediário", count: exercisesDatabase.filter(ex => ex.difficulty === "intermediate").length },
      { value: "advanced", label: "Avançado", count: exercisesDatabase.filter(ex => ex.difficulty === "advanced").length },
    ];
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Compact Hero Header */}
      <motion.div 
        style={{ opacity: headerOpacity, y: headerY }}
        className="relative overflow-hidden bg-gradient-to-br from-os-primary/90 via-cyan-600/90 to-os-secondary/90 border-b border-white/10"
      >
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        <div className="relative container mx-auto px-6 py-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="size-4 text-yellow-300" />
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider">Sistema Gamificado</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">
                Exercícios de Memória
              </h1>
              <p className="text-sm text-white/70">
                {exercisesDatabase.length} questões • {stats.totalPoints} pontos disponíveis
              </p>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-white/60 uppercase tracking-wide">Progresso</div>
                <div className="text-2xl font-bold text-white">{stats.completedExercises}/{stats.totalExercises}</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-right">
                <div className="text-xs text-white/60 uppercase tracking-wide">Pontos</div>
                <div className="text-2xl font-bold text-yellow-300">{earnedPoints}</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Compact Layout */}
      <div className="container mx-auto px-6 py-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Compact Progress Dashboard */}
          <ProgressDashboard {...stats} />

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-between"
            >
              <span className="flex items-center gap-2">
                <Filter className="size-4" />
                Filtros
                {(selectedCategory !== "all" || selectedDifficulty !== "all") && (
                  <Badge variant="secondary" className="ml-2">Ativos</Badge>
                )}
              </span>
              <ChevronDown className={`size-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </Button>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4"
              >
                <ExerciseFilters
                  categories={categories}
                  difficulties={difficulties}
                  selectedCategory={selectedCategory}
                  selectedDifficulty={selectedDifficulty}
                  onCategoryChange={setSelectedCategory}
                  onDifficultyChange={setSelectedDifficulty}
                  onClearFilters={() => {
                    setSelectedCategory("all");
                    setSelectedDifficulty("all");
                  }}
                  totalExercises={exercisesDatabase.length}
                  filteredCount={filteredExercises.length}
                />
              </motion.div>
            )}
          </div>

          {/* Desktop Layout - Sidebar + Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
            {/* Compact Sidebar - Desktop Only */}
            <aside className="hidden lg:block space-y-4">
              <ExerciseFilters
                categories={categories}
                difficulties={difficulties}
                selectedCategory={selectedCategory}
                selectedDifficulty={selectedDifficulty}
                onCategoryChange={setSelectedCategory}
                onDifficultyChange={setSelectedDifficulty}
                onClearFilters={() => {
                  setSelectedCategory("all");
                  setSelectedDifficulty("all");
                }}
                totalExercises={exercisesDatabase.length}
                filteredCount={filteredExercises.length}
              />

              {/* Compact Stats */}
              <Card className="p-3 bg-gradient-to-br from-muted/50 to-muted/30 border-border/50">
                <div className="space-y-2">
                  {[
                    { label: "Iniciante", count: exerciseStats.byDifficulty.beginner || 0, color: "text-green-600" },
                    { label: "Intermediário", count: exerciseStats.byDifficulty.intermediate || 0, color: "text-yellow-600" },
                    { label: "Avançado", count: exerciseStats.byDifficulty.advanced || 0, color: "text-red-600" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className={`font-bold ${item.color}`}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </aside>

            {/* Main - Exercises */}
            <main className="min-w-0">
              {filteredExercises.length === 0 ? (
                <Card className="p-12 text-center">
                  <Target className="size-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-bold mb-1">Nenhum exercício encontrado</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ajuste os filtros para ver mais exercícios
                  </p>
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedCategory("all");
                      setSelectedDifficulty("all");
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Compact Results Header */}
                  <div className="flex items-center justify-between py-2 px-4 bg-muted/30 rounded-lg">
                    <p className="text-xs text-muted-foreground">
                      <strong className="text-foreground">{filteredExercises.length}</strong> de {exercisesDatabase.length} exercícios
                    </p>
                    {filteredExercises.length > 5 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                        className="text-xs h-7"
                      >
                        Ir ao final →
                      </Button>
                    )}
                  </div>

                  {/* Exercise Cards - Compact */}
                  <div className="space-y-4">
                    {filteredExercises.map((exercise, idx) => (
                      <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        index={idx}
                        onAnswer={handleAnswer}
                        isAnswered={answeredExercises[exercise.id]}
                      />
                    ))}
                  </div>

                  {/* Completion Badge */}
                  {stats.completedExercises === exercisesDatabase.length && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-8"
                    >
                      <Card className="p-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 text-center">
                        <Trophy className="size-16 mx-auto mb-3 text-yellow-500" />
                        <h3 className="text-2xl font-bold mb-2">
                          🎉 Todos os exercícios completados!
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          Pontuação: <strong className="text-xl text-foreground">{earnedPoints}/{stats.totalPoints}</strong>
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Acertos: <strong className="text-green-500">
                            {((stats.correctAnswers / stats.completedExercises) * 100).toFixed(1)}%
                          </strong>
                        </p>
                      </Card>
                    </motion.div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
