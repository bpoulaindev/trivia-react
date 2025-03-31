import { z } from "zod";

const categoryIdSchema = z.number().int().positive();

export const categorySchema = z.object({
  id: categoryIdSchema,
  name: z.string().min(1),
});

export type Category = z.infer<typeof categorySchema>;

export const difficultySchema = z.enum(["easy", "medium", "hard"]);
export type Difficulty = z.infer<typeof difficultySchema>;

export const toolbarSchema = z.object({
  category: categoryIdSchema,
  difficulty: difficultySchema,
});

export type ToolbarFormData = z.infer<typeof toolbarSchema>;

export type TriviaQuestion = {
  type: "multiple";
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export const answerSchema = z.string();

export const questionAnswersSchema = z.array(answerSchema);

export const quizFormSchema = z.object({
  answers: questionAnswersSchema,
});

export type QuizFormData = z.infer<typeof quizFormSchema>;
