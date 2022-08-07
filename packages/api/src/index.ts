import express, { Application, Request, Response } from "express";
import cors from "cors";
const app: Application = express();
const port = 5000;

// Body parsing Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(
  "/",
  async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).send({
      message: "Hello World!",
    });
  }
);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
