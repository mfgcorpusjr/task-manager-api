import express, { type Request, type Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Task Manager API" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
