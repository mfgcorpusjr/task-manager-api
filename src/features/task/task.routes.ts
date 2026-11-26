import { Router } from "express";

import {
  getTasks,
  createTask,
  getTask,
  updateTask,
} from "./task.controllers.js";

const taskRoutes = Router();

taskRoutes.get("/", getTasks);
taskRoutes.post("/", createTask);
taskRoutes.get("/:id", getTask);
taskRoutes.patch("/:id", updateTask);

export default taskRoutes;
