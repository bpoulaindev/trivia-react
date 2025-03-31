import { Button } from "@/components/ui/button";
import { CategorySelect } from "./toolbar-form/category-select";
import { DifficultySelect } from "./toolbar-form/difficulty-select";
import { useTriviaCategories } from "@/hooks/useTriviaCategories";
import { useForm } from "react-hook-form";
import { Difficulty, ToolbarFormData, toolbarSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { Loader } from "lucide-react";
import { useQuizContext } from "@/contexts/quizContext";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export const Toolbar = ({
  noDecoration = false,
}: {
  noDecoration?: boolean;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categories, isPending: categoriesPending } =
    useTriviaCategories();

  const { category, setCategory, difficulty, setDifficulty, resetQuiz } =
    useQuizContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ToolbarFormData>({
    resolver: zodResolver(toolbarSchema),
    defaultValues: {
      category: category,
      difficulty: (difficulty as Difficulty) || undefined,
    },
  });

  const handleFormSubmit = useCallback(
    (data: ToolbarFormData) => {
      setIsSubmitting(true);
      if (errors && Object.keys(errors || {}).length > 0) {
        console.error("Form Errors:", errors);
        setIsSubmitting(false);
        return;
      }
      queryClient.invalidateQueries({
        queryKey: ["trivia-questions", data.category, data.difficulty, 5],
      });
      resetQuiz();

      setCategory(data.category);
      setDifficulty(data.difficulty);
      setIsSubmitting(false);
      navigate("/");
    },
    [errors, navigate, queryClient, setCategory, setDifficulty, resetQuiz],
  );

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        noDecoration ? "w-fit" : "w-[800px] max-w-[800px]",
      )}
    >
      {!noDecoration && (
        <span className="h-[2px] rounded-full w-full grow bg-border" />
      )}
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex items-start gap-2"
        method="post"
      >
        <CategorySelect
          control={control}
          error={errors.category?.message}
          categories={categories}
          categoriesPending={categoriesPending}
        />
        <DifficultySelect
          control={control}
          error={errors.difficulty?.message}
        />
        <Button
          id="createBtn"
          type="submit"
          disabled={isSubmitting || categoriesPending}
        >
          {isSubmitting || categoriesPending ? (
            <div className="flex items-center">
              <Loader className="animate-spin mr-1" size={12} />
              <span>Loading</span>
            </div>
          ) : (
            "Create"
          )}
        </Button>
      </form>
      {!noDecoration && (
        <span className="h-[2px] rounded-full w-full grow bg-border" />
      )}
    </div>
  );
};
