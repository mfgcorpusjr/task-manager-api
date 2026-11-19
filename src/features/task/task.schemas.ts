import { z } from "zod";

export const create = z.object({
  text: z
    .string({ error: "Text is required." })
    .trim()
    .min(1, { error: "Text is required." })
    .max(191, { error: "Text cannot exceed 191 characters." }),
});

export const update = z.object({
  text: z
    .string({ error: "Text is required." })
    .trim()
    .min(1, { error: "Text is required." })
    .max(191, { error: "Text cannot exceed 191 characters." }),
  isCompleted: z.boolean({
    error: "Is completed is required.",
  }),
});
