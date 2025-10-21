"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExerciseCard } from "@/components/exercises/ExerciseCard";
import { ExerciseFilters } from "@/components/exercises/ExerciseFilters";
import { ProgressDashboard } from "@/components/exercises/ProgressDashboard";
import { exercisesDatabase, exerciseStats } from "@/data/exercises-database";
import { Trophy, Target, Sparkles, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export default function ExerciciosPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [answeredExercises, setAnsweredExercises] = useState<Record<string, boolean>>({});
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({});
  const [earnedPoints, setEarnedPoints] = useState(0);

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

    // Category progress
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

  // Handle answer
  const handleAnswer = (exerciseId: string, isCorrect: boolean, points: number) => {
    setAnsweredExercises(prev => ({ ...prev, [exerciseId]: true }));
    setCorrectAnswers(prev => ({ ...prev, [exerciseId]: isCorrect }));
    
    if (isCorrect) {
      setEarnedPoints(prev => prev + points);
      toast.success(`+${points} pontos! 🎉`);
    }
  };

  // Filter options
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
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-os-primary via-cyan-500 to-os-secondary p-8 md:p-12 text-white">
          <div className="absolute inset-0 bg-grid-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-6" />
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  Sistema de Exercícios Gamificado
                </Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">
                Exercícios de Gerenciamento de Memória
              </h1>
              <p className="text-lg text-white/90 max-w-2xl">
                {exercisesDatabase.length}+ exercícios práticos para dominar os conceitos de sistemas operacionais.
                Teste seus conhecimentos e ganhe pontos!
              </p>
            </div>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6 text-center">
              <Trophy className="size-12 mx-auto mb-2 text-yellow-300" />
              <p className="text-sm text-white/80">Total de Pontos</p>
              <p className="text-3xl font-bold">{stats.totalPoints}</p>
              <p className="text-xs text-white/60 mt-1">disponíveis</p>
            </Card>
          </div>
        </div>

        {/* Progress Dashboard */}
        <ProgressDashboard {...stats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
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

              {/* Quick Stats */}
              <Card className="p-4 bg-gradient-to-br from-os-primary/5 to-os-secondary/5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Iniciante</span>
                    <Badge variant="outline" className="bg-green-500/10 border-green-500/30">
                      {exerciseStats.byDifficulty.beginner || 0}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Intermediário</span>
                    <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30">
                      {exerciseStats.byDifficulty.intermediate || 0}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Avançado</span>
                    <Badge variant="outline" className="bg-red-500/10 border-red-500/30">
                      {exerciseStats.byDifficulty.advanced || 0}
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main - Exercises */}
          <div className="lg:col-span-3 space-y-6">
            {filteredExercises.length === 0 ? (
              <Card className="p-12 text-center">
                <Target className="size-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-xl font-bold mb-2">Nenhum exercício encontrado</h3>
                <p className="text-muted-foreground mb-6">
                  Tente ajustar os filtros para ver mais exercícios
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedDifficulty("all");
                  }}
                >
                  Limpar Filtros
                </Button>
              </Card>
            ) : (
              <>
                {/* Results Header */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    Mostrando <strong>{filteredExercises.length}</strong> exercícios
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                  >
                    Ir para o final
                    <ArrowRight className="size-4 ml-2" />
                  </Button>
                </div>

                <Separator />

                {/* Exercise Cards */}
                <div className="space-y-6">
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

                {/* Footer CTA */}
                {stats.completedExercises === exercisesDatabase.length && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-12"
                  >
                    <Card className="p-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 text-center">
                      <Trophy className="size-16 mx-auto mb-4 text-yellow-500 animate-bounce" />
                      <h3 className="text-2xl font-bold mb-2">
                        🎉 Parabéns! Você completou todos os exercícios!
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Sua pontuação final: <strong className="text-foreground">{earnedPoints}/{stats.totalPoints}</strong> pontos
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Taxa de acerto: <strong className="text-green-500">
                          {((stats.correctAnswers / stats.completedExercises) * 100).toFixed(1)}%
                        </strong>
                      </p>
                    </Card>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
