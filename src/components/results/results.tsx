import { useQuizContext } from "@/contexts/quizContext";
import { QuestionRow } from "@/components/quizz/question-row/question";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { EmptyState } from "../empty-state/empty-state";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Toolbar } from "../toolbar/toolbar";

const Score = ({ score }: { score: number }) => {
  const scoreClasses = useMemo(() => {
    if (score < 2) return "text-red-800 bg-red-100 border-red-800";
    if (score < 4) return "text-yellow-800 bg-yellow-100 border-yellow-800";
    return "text-green-800 bg-green-100 border-green-800";
  }, [score]);
  return (
    <span
      className={cn(
        "flex items-center px-4 rounded-sm w-fit border text-sm h-9",
        scoreClasses,
      )}
    >
      Your scored {score} out of 5
    </span>
  );
};

export const Results = () => {
  const { questions, answers } = useQuizContext();
  const score = useMemo(() => {
    return questions.reduce(
      (acc, curr, index) =>
        acc + (answers[index] === curr.correct_answer ? 1 : 0),
      0,
    );
  }, [questions, answers]);
  if (!questions.length || questions.length === 0) {
    return <EmptyState />;
  }
  return (
    <Card className="flex flex-col w-[800px] max-w-[800px]">
      <CardHeader>
        <CardTitle>Correction time !</CardTitle>
        <CardDescription>Let's see how you did...</CardDescription>
      </CardHeader>
      <CardContent>
        {questions.map((question, index) => (
          <QuestionRow
            correctionMode={true}
            key={`question_row_${index}`}
            question={question}
            questionIndex={index}
            className="transition-opacity duration-500 ease-in-out"
          />
        ))}
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <Score score={score} />
        <span className="text-sm text-gray-500">Try again?</span>
        <Toolbar noDecoration />
      </CardFooter>
    </Card>
  );
};
