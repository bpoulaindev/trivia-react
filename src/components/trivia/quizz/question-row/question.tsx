import { QuizFormData, TriviaQuestion } from "@/lib/types";
import { cn, shuffleArray } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";
import { AnswersRow } from "./answers";
import he from "he";
import { Badge } from "@/components/ui/badge";

export const QuestionRow = ({
  question,
  questionIndex,
  className,
  selectedAnswer,
  onAnswerSelect,
}: {
  question: TriviaQuestion;
  questionIndex: number;
  className?: string;
  selectedAnswer: string;
  onAnswerSelect: (questionId: number, answer: string) => void;
}) => {
  const shuffledAnswers = useMemo(() => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return shuffleArray<string>(answers);
  }, [question]);
  useEffect(() => {
    console.log("selected answer:", selectedAnswer);
  }, [selectedAnswer]);
  return (
    <div
      className={cn(
        "flex flex-col gap-2",
        questionIndex !== 0 && "mt-8",
        className,
      )}
    >
      <div className="flex items-start gap-2">
        <Badge>{questionIndex + 1}</Badge>
        <h2 className="-mt-[2px]">{he.decode(question.question)}</h2>
      </div>
      <AnswersRow
        answers={shuffledAnswers}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={(value) => onAnswerSelect(questionIndex, value)}
      />
    </div>
  );
};
