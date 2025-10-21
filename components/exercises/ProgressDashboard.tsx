"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, Zap, Award } from "lucide-react";

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
}: ProgressDashboardProps) {
  const completionRate = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;
  const accuracyRate = completedExercises > 0 ? (correctAnswers / completedExercises) * 100 : 0;
  const pointsRate = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;

  const stats = [
    {
      label: "Progresso",
      value: `${completedExercises}/${totalExercises}`,
      percentage: completionRate,
      icon: Target,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Acertos",
      value: `${correctAnswers}/${completedExercises || 0}`,
      percentage: accuracyRate,
      icon: Zap,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Pontos",
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
    return { label: "Continue! 📚", color: "text-orange-400" };
  };

  const performance = getPerformanceLevel(accuracyRate);

  return (
    <div className="space-y-3">
      {/* Main Stats - Compact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
            >
              <Card className={`p-4 ${stat.bgColor} border border-border/50 hover:border-os-primary/40 transition-all duration-200 hover:shadow-md`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-[10px] text-muted-foreground font-medium mb-1 uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold truncate">{stat.value}</p>
                  </div>
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color} flex-shrink-0`}>
                    <Icon className="size-5 text-white" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">Progresso</span>
                    <span className="font-bold">{stat.percentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={stat.percentage} className="h-1.5" />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Performance Badge - Compact */}
      {completedExercises > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="p-3 bg-gradient-to-r from-os-primary/10 to-os-secondary/10 border border-os-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-br from-os-primary to-os-secondary rounded-lg">
                  <Award className="size-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
                    Desempenho Atual
                  </p>
                  <p className={`text-lg font-bold ${performance.color}`}>
                    {performance.label}
                  </p>
                </div>
              </div>
              {accuracyRate >= 90 && (
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                >
                  <Trophy className="size-8 text-yellow-500" />
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
