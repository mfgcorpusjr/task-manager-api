import { Router } from "express";

import * as taskControllers from "./task.controllers.js";

const router = Router();

router.post("/", taskControllers.create);

export default router;
