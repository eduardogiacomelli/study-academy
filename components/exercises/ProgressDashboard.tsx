"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Zap, Award, TrendingUp } from "lucide-react";

interface ProgressDashboardProps {
  totalExercises: number;
  completedExercises: number;
  correctAnswers: number;
  totalPoints: number;
  earnedPoints: number;
  categoryProgress: { category: string; completed: number; total: number }[];
}

export function ProgressDashboard({
  totalExercises,
  completedExercises,
  correctAnswers,
  totalPoints,
  earnedPoints,
  categoryProgress
}: ProgressDashboardProps) {
  const completionRate = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;
  const accuracyRate = completedExercises > 0 ? (correctAnswers / completedExercises) * 100 : 0;
  const pointsRate = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;

  const stats = [
    {
      label: "Progresso Geral",
      value: `${completedExercises}/${totalExercises}`,
      percentage: completionRate,
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Taxa de Acerto",
      value: `${correctAnswers}/${completedExercises}`,
      percentage: accuracyRate,
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Pontuação",
      value: `${earnedPoints}/${totalPoints}`,
      percentage: pointsRate,
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/10",
    },
  ];

  const getPerformanceLevel = (rate: number) => {
    if (rate >= 90) return { label: "Excelente! 🌟", color: "text-green-400" };
    if (rate >= 70) return { label: "Muito Bom! 👏", color: "text-blue-400" };
    if (rate >= 50) return { label: "Bom! 💪", color: "text-yellow-400" };
    return { label: "Continue Praticando! 📚", color: "text-orange-400" };
  };

  const performance = getPerformanceLevel(accuracyRate);

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`p-6 ${stat.bgColor} border-2 border-border/50 hover:border-os-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-os-primary/20`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <Icon className="size-6 text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-bold">{stat.percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={stat.percentage} className="h-2" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Performance Badge */}
      {completedExercises > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-6 bg-gradient-to-r from-os-primary/10 to-os-secondary/10 border-2 border-os-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-br from-os-primary to-os-secondary rounded-2xl">
                  <Award className="size-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Desempenho Atual
                  </p>
                  <p className={`text-2xl font-bold ${performance.color}`}>
                    {performance.label}
                  </p>
                </div>
              </div>
              {accuracyRate >= 90 && (
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <Trophy className="size-12 text-yellow-500" />
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Category Progress */}
      {categoryProgress.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="size-5 text-os-primary" />
            <h3 className="text-lg font-bold">Progresso por Categoria</h3>
          </div>
          <div className="space-y-4">
            {categoryProgress.map((cat) => {
              const progress = cat.total > 0 ? (cat.completed / cat.total) * 100 : 0;
              return (
                <div key={cat.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{cat.category}</span>
                    <span className="text-muted-foreground">
                      {cat.completed}/{cat.total}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
}

