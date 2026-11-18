import express, { type Request, type Response } from "express";
import cors from "cors";

import { catchAll, error } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ success: true, message: "Task Manager API" });
});

app.use(catchAll);
app.use(error);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
