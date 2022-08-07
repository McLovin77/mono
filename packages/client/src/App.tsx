import { Typography } from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Todos from "./components/Todos";
import { trpc } from "./utils/trpc";

function App() {
  const [usernameInput, setUsernameInput] = useState("");
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
  const username = localStorage.getItem("auth-token");

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          {!username ? (
            <>
              <Typography>Please sign in</Typography>
              <input
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                placeholder="Username"
              />
              <button
                onClick={() => {
                  localStorage.setItem("auth-token", usernameInput);
                  window.location.reload();
                }}
              >
                Sign in
              </button>
            </>
          ) : (
            <Todos />
          )}
        </Layout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const username = localStorage.getItem("auth-token");

  return (
    <>
      <header
        style={{
          paddingRight: 24,
          paddingLeft: 24,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        {username ? <h3>Hello {username}</h3> : <div />}
        {username && (
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.reload();
            }}
          >
            Sign out
          </button>
        )}
      </header>
      <div style={{ padding: 8, maxWidth: 712, margin: "auto" }}>
        {children}
      </div>
    </>
  );
};

export default App;
