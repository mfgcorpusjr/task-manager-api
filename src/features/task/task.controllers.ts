import type { Request, Response } from "express";

import * as taskSchemas from "./task.schemas.js";
import { prisma } from "../../lib/prisma.js";

export const create = async (req: Request, res: Response) => {
  const data = taskSchemas.create.parse(req.body);

  const task = await prisma.task.create({ data });

  res.status(201).json({ success: true, data: task });
};
