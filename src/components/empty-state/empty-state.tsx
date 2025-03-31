import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const EmptyState = () => {
  return (
    <Card className="w-[800px] border-dashed shadow-none mt-8">
      <CardHeader>
        <CardTitle>Welcome to Trivia!</CardTitle>
        <CardDescription>
          Use the above toolbar to launch a new game.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
