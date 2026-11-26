import { Router } from "express";

import { getTasks } from "./task.controllers.js";

const taskRoutes = Router();

taskRoutes.get("/", getTasks);

export default taskRoutes;
