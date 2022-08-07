import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Todos from "./components/Todos";
import { trpc } from "./utils/trpc";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:5000/trpc", // TODO bring the URL from the process.env variables

      // optional
      headers: async () => {
        return {
          authorization: localStorage.getItem("auth-token") ?? "",
        };
      },
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Todos />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
