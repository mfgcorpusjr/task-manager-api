import { Router } from "express";

import { getTasks, createTask, getTask } from "./task.controllers.js";

const taskRoutes = Router();

taskRoutes.get("/", getTasks);
taskRoutes.post("/", createTask);
taskRoutes.get("/:id", getTask);

export default taskRoutes;
