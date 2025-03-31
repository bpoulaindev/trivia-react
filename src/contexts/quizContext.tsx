import React, { createContext, useState, useContext } from "react";
import { Difficulty, TriviaQuestion } from "@/lib/types";

interface QuizContextType {
  questions: TriviaQuestion[];
  answers: { [questionId: number]: string };
  category: number | undefined;
  difficulty: Difficulty | undefined;
  setQuestions: (questions: TriviaQuestion[]) => void;
  setAnswer: (questionId: number, answer: string) => void;
  setCategory: (categoryId: number | undefined) => void;
  setDifficulty: (difficulty: Difficulty | undefined) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(
    undefined,
  );

  const setAnswer = (questionId: number, answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const resetQuiz = () => {
    setQuestions([]);
    setAnswers({});
    setCategory(undefined);
    setDifficulty(undefined);
  };

  const value: QuizContextType = {
    questions,
    answers,
    setQuestions,
    setAnswer,
    resetQuiz,
    category,
    difficulty,
    setCategory,
    setDifficulty,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuizContext must be used within a QuizProvider");
  }
  return context;
};
