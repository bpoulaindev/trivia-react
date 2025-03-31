import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category, Difficulty } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const paramsBuilder = ({
  category,
  difficulty,
  amount = 5,
}: {
  category: Category["id"];
  difficulty: Difficulty;
  amount?: number;
}) => {
  const params = new URLSearchParams();

  params.append("category", category.toString());
  params.append("difficulty", difficulty);
  params.append("amount", amount.toString());

  return params.toString();
};

export const shuffleArray = <T>(array: T[]) => {
  const newArray = [...array];
  newArray.forEach((_, i) => {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  });
  return newArray;
};
