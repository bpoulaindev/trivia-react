import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Control, useController } from "react-hook-form";
import { ToolbarFormData } from "@/lib/types";

export const DifficultySelect = ({
  control,
  error,
}: {
  control: Control<ToolbarFormData>;
  error?: string;
}) => {
  const { field } = useController({
    name: "difficulty",
    control,
    defaultValue: undefined,
  });

  const difficultyOptions = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  return (
    <div>
      <Select
        onValueChange={(value) => field.onChange(value)}
        value={field.value}
      >
        <SelectTrigger
          className={error ? "border-red-500" : ""}
          id="difficultySelectTrigger"
        >
          <SelectValue placeholder="Select difficulty" />
        </SelectTrigger>
        <SelectContent id="difficultySelect">
          {difficultyOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
