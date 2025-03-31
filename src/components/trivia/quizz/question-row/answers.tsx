import { Button } from "@/components/ui/button";
import he from "he";

export const AnswersRow = ({
  selectedAnswer,
  onAnswerSelect,
  answers,
}: {
  selectedAnswer: string | null;
  onAnswerSelect: (value: string) => void;
  answers: string[];
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap ml-8">
      {answers.map((answer) => (
        <Button
          className="cursor-pointer"
          variant={selectedAnswer === answer ? "default" : "outline"}
          onClick={() => onAnswerSelect(answer)}
          key={answer}
        >
          {he.decode(answer)}
        </Button>
      ))}
    </div>
  );
};
