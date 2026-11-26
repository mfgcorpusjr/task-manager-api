import { Router } from "express";

import { getTasks, createTask } from "./task.controllers.js";

const taskRoutes = Router();

taskRoutes.get("/", getTasks);
taskRoutes.post("/", createTask);

export default taskRoutes;
