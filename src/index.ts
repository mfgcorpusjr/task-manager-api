import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";

import { catchAll, error } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(helmet());

app.get("/health", (req, res) => {
  res.json({
    success: true,
    service: "Task Manager API",
  });
});

app.use(catchAll);
app.use(error);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}.`);
});
