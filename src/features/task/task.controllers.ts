import type { Request, Response } from "express";

import {
  getTasksQuerySchema,
  createTaskSchema,
  updateTaskSchema,
} from "./task.schemas.js";
import { prisma } from "../../lib/prisma.js";
import type {
  TaskWhereInput,
  TaskWhereUniqueInput,
} from "../../generated/prisma/models.js";
import { NotFoundError } from "../../utils/error.js";

export const getTasks = async (req: Request, res: Response) => {
  const { page, pageSize, search } = getTasksQuerySchema.parse(req.query);

  const where: TaskWhereInput = {
    ...(search && {
      text: { contains: search, mode: "insensitive" },
    }),
  };

  const [tasks, totalItems] = await prisma.$transaction([
    prisma.task.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.task.count({
      where,
    }),
  ]);

  res.json({
    success: true,
    data: tasks,
    metadata: {
      totalItems,
      totalPages: Math.ceil(totalItems / pageSize),
      page,
      pageSize,
    },
  });
};

export const createTask = async (req: Request, res: Response) => {
  const data = createTaskSchema.parse(req.body);

  const task = await prisma.task.create({
    data,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
};

export const getTask = async (req: Request, res: Response) => {
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

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const where: TaskWhereUniqueInput = {
    id: id as string,
  };

  const existingTask = await prisma.task.findUnique({
    where,
  });

  if (!existingTask) {
    throw new NotFoundError("No task found.");
  }

  const data = updateTaskSchema.parse(req.body);

  const task = await prisma.task.update({
    data,
    where,
  });

  res.json({
    success: true,
    data: task,
  });
};

export const destroyTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  const where: TaskWhereUniqueInput = {
    id: id as string,
  };

  const task = await prisma.task.findUnique({
    where,
  });

  if (!task) {
    throw new NotFoundError("No task found.");
  }

  await prisma.task.delete({
    where,
  });

  res.json({
    success: true,
    message: "Task deleted.",
  });
};
