import type { Request, Response } from "express";

import * as taskSchemas from "./task.schemas.js";
import { prisma } from "../../lib/prisma.js";
import { NotFoundError } from "../../utils/error.js";

export const getAll = async (req: Request, res: Response) => {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  res.json({ success: true, data: tasks });
};

export const create = async (req: Request, res: Response) => {
  const data = taskSchemas.create.parse(req.body);

  const task = await prisma.task.create({ data });

  res.status(201).json({ success: true, data: task });
};

export const get = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await prisma.task.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!task) {
    throw new NotFoundError("No task found.");
  }

  res.json({
    success: true,
    data: task,
  });
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingTask = await prisma.task.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!existingTask) {
    throw new NotFoundError("No task found.");
  }

  const data = taskSchemas.update.parse(req.body);

  const task = await prisma.task.update({
    data,
    where: {
      id: id as string,
    },
  });

  res.json({ success: true, data: task });
};
