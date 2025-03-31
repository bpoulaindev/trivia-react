import { useTriviaQuestions } from "@/hooks/useTriviaQuestions";
import { QuestionRow } from "./question-row/question";
import { useEffect, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuizContext } from "@/contexts/quizContext";
import { useNavigate } from "react-router";
import { EmptyState } from "../empty-state/empty-state";
import { Loader } from "lucide-react";
import { motion } from "motion/react";

export const Quizz = () => {
  const navigate = useNavigate();
  const { questions, setQuestions, difficulty, category, answers } =
    useQuizContext();
  const {
    data: triviaQuestions,
    isPending,
    isError,
  } = useTriviaQuestions({
    category,
    difficulty: difficulty || undefined,
  });
  const questionsLoaded = useMemo(() => {
    return !isPending && triviaQuestions && !isError;
  }, [isPending, triviaQuestions, isError]);

  useEffect(() => {
    if (!isPending && triviaQuestions && !isError) {
      setQuestions(triviaQuestions);
    }
  }, [isPending, triviaQuestions, isError, setQuestions]);

  const formIsComplete = useMemo(() => {
    return Object.values(answers || {}).length === questions.length;
  }, [answers, questions.length]);

  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formIsComplete) {
      navigate("/results");
    } else {
      setFormError("All the questions must be answered !");
    }
  };

  if (!questions.length || questions.length === 0) {
    return <EmptyState />;
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      method="post"
      initial={{ width: "fit-content" }}
      animate={{ width: questionsLoaded ? "800px" : "600px" }}
      transition={{ type: "tween", stiffness: 50 }}
    >
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Quiz time !</CardTitle>
          <CardDescription>
            Select one answer per question, good luck !
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending && (
            <div className="flex items-center justify-center w-full gap-2 ">
              <Loader size={24} className="animate-spin" />
              <p>Loading questions...</p>
            </div>
          )}
          {!isPending && triviaQuestions?.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <p>No questions found</p>
            </div>
          )}
          {triviaQuestions?.map((question, index) => (
            <QuestionRow
              key={`question_row_${index}`}
              question={question}
              questionIndex={index}
            />
          ))}
        </CardContent>
        <CardFooter className="flex items-center gap-4">
          {formIsComplete && <Button type="submit">Submit</Button>}
          {formError && (
            <span className="font-medium text-red-700">{formError}</span>
          )}
        </CardFooter>
      </Card>
    </motion.form>
  );
};
