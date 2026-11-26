import type { Request, Response } from "express";

import { getTasksQuerySchema } from "./task.schemas.js";
import { prisma } from "../../lib/prisma.js";
import type { TaskWhereInput } from "../../generated/prisma/models.js";

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
