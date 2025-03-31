import { Button } from "@/components/ui/button";
import { TriviaQuestion } from "@/lib/types";
import { shuffleArray } from "@/lib/utils";
import he from "he";
import { useMemo } from "react";

export const AnswersRow = ({
  selectedAnswer,
  onAnswerSelect,
  question,
  correctionMode = false,
}: {
  selectedAnswer: string | null;
  onAnswerSelect: (value: string) => void;
  question: TriviaQuestion;
  correctionMode?: boolean;
}) => {
  const shuffledAnswers = useMemo(() => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    return shuffleArray<string>(answers);
  }, [question]);
  const variantBuilder = (answer: string) => {
    if (correctionMode) {
      if (answer === question.correct_answer) return "correct";
      return answer === selectedAnswer ? "destructive" : "outline";
    }
    return answer === selectedAnswer ? "default" : "outline";
  };

  return (
    <div className="flex items-center gap-2 flex-wrap ml-8">
      {shuffledAnswers.map((answer) => (
        <Button
          type="button"
          className="cursor-pointer"
          variant={variantBuilder(answer)}
          onClick={() => (correctionMode ? null : onAnswerSelect(answer))}
          key={answer}
        >
          {he.decode(answer)}
        </Button>
      ))}
    </div>
  );
};
