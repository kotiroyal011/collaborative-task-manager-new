import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["To Do", "In Progress", "Done"]),
  priority: z.enum(["Low", "Medium", "High"]),
  dueDate: z.string().optional(),
  assignee: z.string().optional(),
});

export type Task = z.infer<typeof taskSchema>;
