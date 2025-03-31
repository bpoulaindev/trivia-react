import { Category, Difficulty, TriviaQuestion } from "@/lib/types";
import { paramsBuilder } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export const useTriviaQuestions = ({
  category,
  difficulty,
  amount = 5,
}: {
  category?: Category["id"];
  difficulty?: Difficulty;
  amount?: number;
}) => {
  return useQuery<TriviaQuestion[]>({
    queryKey: ["trivia-questions", category, difficulty, amount],
    queryFn: async () => {
      if (!category || !difficulty) {
        throw new Error("Category and difficulty are required");
      }
      const URLParams = paramsBuilder({
        category,
        difficulty,
        amount,
      });
      const data = await fetch(
        `https://opentdb.com/api.php?${URLParams.toString()}`,
      );
      const parsedData = await data.json();
      return parsedData.results;
    },
    enabled: !!category && !!difficulty,
  });
};
