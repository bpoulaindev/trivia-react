import { Quizz } from "./quizz/quizz";
import { Toolbar } from "./toolbar/toolbar";

export const Trivia = ({ showQuizz = false }: { showQuizz?: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh gap-4">
      <Toolbar />
      {showQuizz && <Quizz />}
    </div>
  );
};
