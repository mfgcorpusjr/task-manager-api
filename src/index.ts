import express, { type Request, type Response } from "express";
import "dotenv/config";
import cors from "cors";

import taskRoutes from "./features/task/task.routes.js";
import { catchAll, error } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ success: true, service: "Task Manager API" });
});

app.use("/api/v1/tasks", taskRoutes);

app.use(catchAll);
app.use(error);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
