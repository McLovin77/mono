import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { hello, SharedType } from "@juno-mono/shared";
import { Button } from "@juno-mono/ui";
import { Typography } from "@mui/material";

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
      <Typography variant='h4'>Vite + React + {hello()}</Typography>

      <div style={{ width: "100%", textAlign: "left" }}>
        <Typography gutterBottom>
          This button is imported from <code>@juno-mono/ui</code>
        </Typography>
        <Button sx={{mb: 4}} variant='contained' color='primary'>Shared button!</Button>
        <Typography gutterBottom>
          The type of this example imported from <code>@juno-mono/shared</code>
        </Typography>
        <pre>{JSON.stringify(example, null, 2)}</pre>
        <Typography gutterBottom>
          This response is from the API thats running concurrently{" "}
          <code>@juno-mono/api</code>
        </Typography>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
