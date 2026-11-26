import { z } from "zod";

export const getTasksQuerySchema = z.object({
  page: z.coerce
    .number({ error: "Page must be an integer." })
    .int({ error: "Page must be an integer." })
    .min(1, { error: "Page must be at least 1." })
    .default(1),
  pageSize: z.coerce
    .number({ error: "Page size must be an integer." })
    .int({ error: "Page size must be an integer." })
    .min(1, { error: "Page size must be at least 1." })
    .default(10),
  search: z
    .string({ error: "Search must be a string" })
    .trim()
    .min(1, { error: "Search must be at least 1 character." })
    .optional(),
});

export const createTaskSchema = z.object({
  text: z
    .string({ error: "Text is required." })
    .trim()
    .min(1, { error: "Text must be at least 1 character." })
    .max(191, { error: "Text cannot exceed more than 191 characters." }),
});

export const updateTaskSchema = z.object({
  text: z
    .string({ error: "Text is required." })
    .trim()
    .min(1, { error: "Text must be at least 1 character." })
    .max(191, { error: "Text cannot exceed more than 191 characters." }),
  isCompleted: z.boolean({ error: "Is completed is required." }),
});
