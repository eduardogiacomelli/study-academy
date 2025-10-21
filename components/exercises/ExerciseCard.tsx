"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, Lightbulb, Trophy, Clock } from "lucide-react";

export interface Exercise {
  id: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  title: string;
  description: string;
  question: string;
  type: "multiple_choice" | "calculation" | "true_false";
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  hint?: string;
  points: number;
  timeEstimate?: number;
}

interface ExerciseCardProps {
  exercise: Exercise;
  index: number;
  onAnswer: (exerciseId: string, isCorrect: boolean, points: number) => void;
  isAnswered?: boolean;
}

const difficultyConfig = {
  beginner: {
    color: "from-green-500 to-emerald-500",
    label: "Iniciante",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    textColor: "text-green-400"
  },
  intermediate: {
    color: "from-yellow-500 to-orange-500",
    label: "Intermediário",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    textColor: "text-yellow-400"
  },
  advanced: {
    color: "from-red-500 to-pink-500",
    label: "Avançado",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    textColor: "text-red-400"
  }
};

export function ExerciseCard({ exercise, index, onAnswer, isAnswered = false }: ExerciseCardProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(isAnswered);

  const config = difficultyConfig[exercise.difficulty];

  const checkAnswer = () => {
    const correct = Array.isArray(exercise.correctAnswer)
      ? exercise.correctAnswer.includes(selectedAnswer)
      : selectedAnswer.toLowerCase().trim() === exercise.correctAnswer.toString().toLowerCase().trim();
    
    setShowResult(true);
    setIsSubmitted(true);
    onAnswer(exercise.id, correct, correct ? exercise.points : 0);
  };

  const isCorrect = showResult && (
    Array.isArray(exercise.correctAnswer)
      ? exercise.correctAnswer.includes(selectedAnswer)
      : selectedAnswer.toLowerCase().trim() === exercise.correctAnswer.toString().toLowerCase().trim()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
      className="group"
    >
      <Card className={`overflow-hidden border transition-all duration-200 hover:shadow-lg ${
        isSubmitted
          ? isCorrect
            ? "border-green-500/40 bg-green-500/5"
            : "border-red-500/40 bg-red-500/5"
          : "border-border hover:border-os-primary/40"
      }`}>
        {/* Compact Header */}
        <div className={`p-3 bg-gradient-to-r ${config.color} relative`}>
          <div className="absolute inset-0 bg-black/10" />
          
          <div className="relative z-10 flex items-center justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20 text-[10px] px-2 py-0">
                  {exercise.category}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/20 text-[10px] px-2 py-0">
                  {config.label}
                </Badge>
                {exercise.timeEstimate && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/20 text-[10px] px-2 py-0 flex items-center gap-1">
                    <Clock className="size-2.5" />
                    {exercise.timeEstimate}min
                  </Badge>
                )}
              </div>
              <h3 className="text-sm font-bold text-white truncate">
                #{index + 1} - {exercise.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className="bg-white text-gray-900 font-bold text-xs px-2 py-1">
                <Trophy className="size-3 mr-1" />
                {exercise.points}
              </Badge>
              {isSubmitted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="size-6 text-green-400" />
                  ) : (
                    <XCircle className="size-6 text-red-400" />
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Content - Compact */}
        <div className="p-4 space-y-4">
          {/* Question */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground leading-relaxed">
              {exercise.question}
            </p>

            {/* Hint */}
            {exercise.hint && !showResult && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="text-yellow-500 hover:text-yellow-400 h-7 text-xs"
                >
                  <Lightbulb className="size-3 mr-1" />
                  {showHint ? "Ocultar Dica" : "Ver Dica"}
                </Button>
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-2 p-3 bg-yellow-500/10 border-l-2 border-yellow-500 rounded text-xs text-yellow-300"
                    >
                      💡 {exercise.hint}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Answer Options - Compact */}
          <div className="space-y-2">
            {exercise.type === "multiple_choice" && exercise.options && (
              <div className="space-y-1.5">
                {exercise.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isThisCorrect = showResult && option === exercise.correctAnswer;
                  const isThisWrong = showResult && isSelected && option !== exercise.correctAnswer;

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => !isSubmitted && setSelectedAnswer(option)}
                      disabled={isSubmitted}
                      whileHover={!isSubmitted ? { scale: 1.005, x: 2 } : {}}
                      whileTap={!isSubmitted ? { scale: 0.998 } : {}}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-150 text-sm ${
                        isThisCorrect
                          ? "bg-green-500/20 border-green-500 shadow"
                          : isThisWrong
                          ? "bg-red-500/20 border-red-500 shadow"
                          : isSelected
                          ? "bg-os-primary/20 border-os-primary shadow"
                          : "bg-card border-border hover:border-os-primary/40 hover:bg-os-primary/5"
                      } ${isSubmitted ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-os-primary bg-os-primary" : "border-muted-foreground"
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <span>{option}</span>
                        </div>
                        {isThisCorrect && <CheckCircle2 className="size-4 text-green-500" />}
                        {isThisWrong && <XCircle className="size-4 text-red-500" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {(exercise.type === "calculation" || exercise.type === "true_false") && (
              <div>
                {exercise.type === "true_false" ? (
                  <div className="flex gap-2">
                    {["Verdadeiro", "Falso"].map((option) => (
                      <Button
                        key={option}
                        onClick={() => !isSubmitted && setSelectedAnswer(option)}
                        disabled={isSubmitted}
                        variant={selectedAnswer === option ? "default" : "outline"}
                        size="sm"
                        className={`flex-1 text-sm ${
                          showResult && option === exercise.correctAnswer
                            ? "bg-green-500 hover:bg-green-600"
                            : showResult && selectedAnswer === option && option !== exercise.correctAnswer
                            ? "bg-red-500 hover:bg-red-600"
                            : ""
                        }`}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <Input
                    value={selectedAnswer}
                    onChange={(e) => !isSubmitted && setSelectedAnswer(e.target.value)}
                    placeholder="Digite sua resposta"
                    disabled={isSubmitted}
                    className={`text-sm font-mono ${
                      showResult
                        ? isCorrect
                          ? "border-green-500 bg-green-500/10"
                          : "border-red-500 bg-red-500/10"
                        : ""
                    }`}
                  />
                )}
              </div>
            )}
          </div>

          {/* Submit Button - Compact */}
          {!isSubmitted && (
            <Button
              onClick={checkAnswer}
              disabled={!selectedAnswer || isSubmitted}
              className="w-full gradient-os text-white font-semibold py-5 text-sm"
            >
              Verificar Resposta
            </Button>
          )}

          {/* Result & Explanation - Compact */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                className={`p-4 rounded-lg border ${
                  isCorrect
                    ? "bg-green-500/10 border-green-500/40"
                    : "bg-red-500/10 border-red-500/40"
                }`}
              >
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="size-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="size-5 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-2 text-sm">
                    <p className={`font-bold ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                      {isCorrect ? "🎉 Correto!" : "❌ Incorreto"}
                    </p>
                    {!isCorrect && (
                      <p className="text-xs">
                        <strong>Resposta correta:</strong>{" "}
                        <span className="font-mono text-green-400">
                          {Array.isArray(exercise.correctAnswer) 
                            ? exercise.correctAnswer.join(" ou ") 
                            : exercise.correctAnswer}
                        </span>
                      </p>
                    )}
                    <div className="pt-2 border-t border-border/30">
                      <p className="text-xs font-semibold text-foreground mb-1">📚 Explicação:</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {exercise.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
}
