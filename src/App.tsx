import { QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router";

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QuizProvider } from "@/contexts/quizContext";
import { Results } from "@/components/results/results";
import { Toolbar } from "./components/toolbar/toolbar";
import { Quizz } from "./components/quizz/quizz";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <QuizProvider>
        <BrowserRouter>
          <div className="flex flex-col items-center justify-start min-h-svh gap-4 py-20">
            <Toolbar />
            <Routes>
              <Route path="/" element={<Quizz />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </div>
        </BrowserRouter>
      </QuizProvider>
    </PersistQueryClientProvider>
  );
}

export default App;
