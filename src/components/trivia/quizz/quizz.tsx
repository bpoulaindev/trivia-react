import { useTriviaQuestions } from "@/hooks/useTriviaQuestions";
import { Difficulty } from "@/lib/types";
import { useSearchParams } from "react-router";
import { QuestionRow } from "./question-row/question";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Quizz = () => {
  const [searchParams] = useSearchParams();
  const category = parseInt(searchParams.get("category")!, 10);
  const difficulty = searchParams.get("difficulty") as Difficulty;

  const {
    data: triviaQuestions,
    isPending,
    isError,
  } = useTriviaQuestions({
    category,
    difficulty,
  });

  const [questionsLoaded, setQuestionsLoaded] = useState(false);

  useEffect(() => {
    if (!isPending && triviaQuestions && !isError) {
      setQuestionsLoaded(true);
    }
  }, [isPending, triviaQuestions, isError]);

  useEffect(() => {
    if (!isPending && triviaQuestions) {
      console.log("Quizz loaded");
    }
  }, [isPending, triviaQuestions]);

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [questionId: number]: string;
  }>({});

  const handleAnswerSelection = (
    questionId: number,
    selectedAnswer: string,
  ) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedAnswer, // Update or add the answer
    }));
  };

  useEffect(() => {
    console.log("state of the form", selectedAnswers);
  }, [selectedAnswers]);

  return (
    <Card className="flex flex-col w-[800px] max-w-[800px]">
      <CardHeader>
        <CardTitle>Quiz time !</CardTitle>
        <CardDescription>
          Select one answer per question, good luck !
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending && (
          <div className="flex flex-col items-center justify-center">
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
            selectedAnswer={selectedAnswers[index]}
            onAnswerSelect={handleAnswerSelection}
            className={`transition-opacity duration-500 ease-in-out ${
              questionsLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </CardContent>
      <CardFooter>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
};
