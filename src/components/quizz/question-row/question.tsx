import { TriviaQuestion } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AnswersRow } from "./answers";
import he from "he";
import { Badge } from "@/components/ui/badge";
import { useQuizContext } from "@/contexts/quizContext";

export const QuestionRow = ({
  question,
  questionIndex,
  correctionMode = false,
  className,
}: {
  question: TriviaQuestion;
  questionIndex: number;
  correctionMode?: boolean;
  className?: string;
}) => {
  const { answers, setAnswer } = useQuizContext();

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
        question={question}
        selectedAnswer={answers[questionIndex]}
        correctionMode={correctionMode}
        onAnswerSelect={(answer: string) => {
          setAnswer(questionIndex, answer);
        }}
      />
    </div>
  );
};
