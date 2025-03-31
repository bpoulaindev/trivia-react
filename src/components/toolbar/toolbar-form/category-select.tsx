import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

import type { Category } from "@/lib/types";
import { Loader } from "lucide-react";
import { Control, useController } from "react-hook-form";
import { ToolbarFormData } from "@/lib/types";

export const CategorySelect = ({
  control,
  error,
  categories = [],
  categoriesPending,
}: {
  control: Control<ToolbarFormData>;
  error?: string;
  categories?: Category[];
  categoriesPending?: boolean;
}) => {
  const { field } = useController({
    name: "category",
    control,
  });

  const categoryCount = categories.length;

  return (
    <div>
      <Select
        onValueChange={(value) => field.onChange(parseInt(value, 10))}
        value={field.value?.toString()}
      >
        <SelectTrigger
          id="categorySelectTrigger"
          className={error ? "border-red-500" : ""}
        >
          <Badge>
            {categoriesPending ? (
              <Loader size={12} className="animate-spin" />
            ) : (
              <span>{categoryCount > 0 ? categoryCount : 0}</span>
            )}
          </Badge>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent id="categorySelect">
          {categoriesPending ? (
            <span className="flex items-center px-2 text-sm">
              <Loader size={12} className="mr-2 animate-spin" /> Loading
              categories...
            </span>
          ) : categoryCount === 0 ? (
            <span>No categories available</span>
          ) : (
            categories.map((category) => (
              <SelectItem key={category.id} value={category.id.toString()}>
                {category.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
