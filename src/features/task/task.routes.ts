import { Router } from "express";

import {
  getTasks,
  createTask,
  getTask,
  updateTask,
  destroyTask,
} from "./task.controllers.js";

const taskRoutes = Router();

taskRoutes.get("/", getTasks);
taskRoutes.post("/", createTask);
taskRoutes.get("/:id", getTask);
taskRoutes.patch("/:id", updateTask);
taskRoutes.delete("/:id", destroyTask);

export default taskRoutes;
