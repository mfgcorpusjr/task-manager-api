import { Router } from "express";

import * as taskControllers from "./task.controllers.js";

const router = Router();

router.get("/", taskControllers.getAll);
router.post("/", taskControllers.create);
router.get("/:id", taskControllers.get);
router.patch("/:id", taskControllers.update);

export default router;
