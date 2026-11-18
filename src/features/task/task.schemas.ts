import { z } from "zod";

export const create = z.object({
  text: z
    .string({ error: "Text is required." })
    .trim()
    .min(1, { error: "Text is required." }),
});

export const update = z.object({
  text: z
    .string({ error: "Text is required." })
    .trim()
    .min(1, { error: "Text is required." }),
  isCompleted: z.boolean({
    error: "Is completed is required.",
  }),
});
