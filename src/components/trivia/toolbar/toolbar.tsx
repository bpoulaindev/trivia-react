import { Button } from "@/components/ui/button";
import { CategorySelect } from "./toolbar-form/category-select";
import { DifficultySelect } from "./toolbar-form/difficulty-select";
import { useTriviaCategories } from "@/hooks/useTriviaCategories";
import { useForm } from "react-hook-form";
import { Difficulty, ToolbarFormData, toolbarSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router";
import { paramsBuilder } from "@/lib/utils";

export const Toolbar = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { data: categories, isPending: categoriesPending } =
    useTriviaCategories();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ToolbarFormData>({
    resolver: zodResolver(toolbarSchema),
    values: {
      category: parseInt(searchParams.get("category")!, 10),
      difficulty: (searchParams.get("difficulty") as Difficulty) || undefined,
    },
  });

  const smoothStopLoading = () => {
    setTimeout(() => {
      setIsSubmitting(false);
    }, 800);
  };

  const handleFormSubmit = (data: ToolbarFormData) => {
    console.log("Form Data:", data);
    setIsSubmitting(true);
    if (errors && Object.keys(errors || {}).length > 0) {
      console.error("Form Errors:", errors);
      smoothStopLoading();
      return;
    }
    const URLParams = paramsBuilder({
      category: data.category,
      difficulty: data.difficulty,
      amount: 5,
    });
    navigate(`/trivia?${URLParams.toString()}`);
    smoothStopLoading();
  };

  return (
    <div className="flex items-center justify-center w-[800px] max-w-[800px] gap-4">
      <span className="h-[2px] rounded-full w-full grow bg-border" />
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
      <span className="h-[2px] rounded-full w-full grow bg-border" />
    </div>
  );
};
