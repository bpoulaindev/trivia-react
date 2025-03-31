import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";
import { Trivia } from "./components/trivia/trivia";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Trivia />} />
          <Route path="/trivia" element={<Trivia showQuizz />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
