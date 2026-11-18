import { Router } from "express";

import * as taskControllers from "./task.controllers.js";

const router = Router();

router.get("/", taskControllers.getAll);
router.post("/", taskControllers.create);

export default router;
