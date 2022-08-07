import express, { Application, Request, Response } from "express";
import cors from "cors";
import { trpcMiddleware } from "./trpc";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// TODO Currently, set to the port of the vite app, should be using process.env.CLIENT_URL
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// The trpc middleware - routes all requests that hit the /trpc endpoint to
// the trpc router, alll other requests will go to the "standard" express router
app.use("/trpc", trpcMiddleware);

// The "standard" express router
app.get("/", async (req: Request, res: Response): Promise<Response> => {
  return res.status(200).send({
    message: "Hello World!",
  });
});

app.listen(PORT, (): void =>
  console.log(`App is listening on port: ${PORT} 🚀`)
);
