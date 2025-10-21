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
  timeEstimate?: number; // em minutos
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <Card className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:shadow-os-primary/20 ${
        isSubmitted
          ? isCorrect
            ? "border-green-500/50 bg-green-500/5"
            : "border-red-500/50 bg-red-500/5"
          : "border-border hover:border-os-primary/50"
      }`}>
        {/* Header */}
        <div className={`p-4 bg-gradient-to-r ${config.color} relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                  {exercise.category}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                  {config.label}
                </Badge>
                {exercise.timeEstimate && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs flex items-center gap-1">
                    <Clock className="size-3" />
                    {exercise.timeEstimate} min
                  </Badge>
                )}
              </div>
              <h3 className="text-lg font-bold text-white">
                #{index + 1} - {exercise.title}
              </h3>
              {exercise.description && (
                <p className="text-sm text-white/80 mt-1">{exercise.description}</p>
              )}
            </div>
            
            <div className="flex flex-col items-end gap-2">
              <Badge className="bg-white text-gray-900 font-bold px-3 py-1">
                <Trophy className="size-3 mr-1" />
                {exercise.points} pts
              </Badge>
              {isSubmitted && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="size-8 text-green-400" />
                  ) : (
                    <XCircle className="size-8 text-red-400" />
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Question */}
          <div className="space-y-4">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              {exercise.question}
            </p>

            {/* Hint */}
            {exercise.hint && !showResult && (
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowHint(!showHint)}
                  className="text-yellow-500 hover:text-yellow-400"
                >
                  <Lightbulb className="size-4 mr-2" />
                  {showHint ? "Ocultar Dica" : "Ver Dica"}
                </Button>
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-4 bg-yellow-500/10 border-l-4 border-yellow-500 rounded"
                    >
                      <p className="text-sm text-yellow-300">💡 {exercise.hint}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {exercise.type === "multiple_choice" && exercise.options && (
              <div className="space-y-2">
                {exercise.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isThisCorrect = showResult && option === exercise.correctAnswer;
                  const isThisWrong = showResult && isSelected && option !== exercise.correctAnswer;

                  return (
                    <motion.button
                      key={idx}
                      onClick={() => !isSubmitted && setSelectedAnswer(option)}
                      disabled={isSubmitted}
                      whileHover={!isSubmitted ? { scale: 1.01, x: 4 } : {}}
                      whileTap={!isSubmitted ? { scale: 0.99 } : {}}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        isThisCorrect
                          ? "bg-green-500/20 border-green-500 shadow-lg shadow-green-500/20"
                          : isThisWrong
                          ? "bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20"
                          : isSelected
                          ? "bg-os-primary/20 border-os-primary shadow-lg shadow-os-primary/20"
                          : "bg-card border-border hover:border-os-primary/50 hover:bg-os-primary/5"
                      } ${isSubmitted ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? "border-os-primary bg-os-primary" : "border-muted-foreground"
                          }`}>
                            {isSelected && <div className="w-3 h-3 bg-white rounded-full" />}
                          </div>
                          <span className="text-sm font-medium">{option}</span>
                        </div>
                        {isThisCorrect && <CheckCircle2 className="size-5 text-green-500" />}
                        {isThisWrong && <XCircle className="size-5 text-red-500" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {(exercise.type === "calculation" || exercise.type === "true_false") && (
              <div className="space-y-2">
                {exercise.type === "true_false" ? (
                  <div className="flex gap-3">
                    {["Verdadeiro", "Falso"].map((option) => (
                      <Button
                        key={option}
                        onClick={() => !isSubmitted && setSelectedAnswer(option)}
                        disabled={isSubmitted}
                        variant={selectedAnswer === option ? "default" : "outline"}
                        className={`flex-1 ${
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
                    className={`font-mono text-lg ${
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

          {/* Submit Button */}
          {!isSubmitted && (
            <Button
              onClick={checkAnswer}
              disabled={!selectedAnswer || isSubmitted}
              className="w-full gradient-os text-white font-semibold py-6 text-lg"
              size="lg"
            >
              Verificar Resposta
            </Button>
          )}

          {/* Result & Explanation */}
          <AnimatePresence>
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`p-6 rounded-xl border-2 ${
                  isCorrect
                    ? "bg-green-500/10 border-green-500/50"
                    : "bg-red-500/10 border-red-500/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle2 className="size-6 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="size-6 text-red-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 space-y-3">
                    <p className={`font-bold text-lg ${isCorrect ? "text-green-400" : "text-red-400"}`}>
                      {isCorrect ? "🎉 Correto!" : "❌ Incorreto"}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm">
                        <strong>Resposta correta:</strong>{" "}
                        <span className="font-mono text-green-400">
                          {Array.isArray(exercise.correctAnswer) 
                            ? exercise.correctAnswer.join(" ou ") 
                            : exercise.correctAnswer}
                        </span>
                      </p>
                    )}
                    <div className="pt-2 border-t border-border/50">
                      <p className="text-sm font-semibold text-foreground mb-2">📚 Explicação:</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
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

