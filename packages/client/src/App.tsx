import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { hello, SharedType } from "@juno-mono/shared";
import { Button } from "@juno-mono/ui";
import "./App.css";

const example: SharedType = {
  age: 24,
  username: "Hello",
};

function App() {
  const [data, setData] = useState<Response | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000`)
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + {hello()}</h1>

      <div style={{ width: "100%", textAlign: "left" }}>
        <h3>
          This button is imported from <code>@juno-mono/ui</code>
        </h3>
        <Button>Shared button!</Button>
        <h3>
          The type of this example imported from <code>@juno-mono/shared</code>
        </h3>
        <pre>{JSON.stringify(example, null, 2)}</pre>
        <h3>
          This response is from the API thats running concurrently{" "}
          <code>@juno-mono/api</code>
        </h3>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
