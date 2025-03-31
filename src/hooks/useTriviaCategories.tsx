import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/lib/types";

export const useTriviaCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("https://opentdb.com/api_category.php")
        .then((response) => response.json())
        .then((data) => data?.trivia_categories),
  });
};
