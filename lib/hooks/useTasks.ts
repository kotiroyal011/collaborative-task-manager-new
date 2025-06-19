import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Task } from "../validators/task";

export const useTasks = () => {
  const queryClient = useQueryClient();

  // GET all tasks
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch("/api/tasks");
      return res.json();
    },
  });

  // POST - Add new task
  const addTask = useMutation({
    mutationFn: async (task: Omit<Task, "id">) => {
      const res = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify(task),
      });
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // PUT - Update task (e.g. status or content changes)
  const updateTask = useMutation({
    mutationFn: async (task: Task) => {
      const res = await fetch("/api/tasks", {
        method: "PUT",
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to update task");
      return res.json();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // DELETE task
  const deleteTask = useMutation({
    mutationFn: async (id: string) => {
      await fetch("/api/tasks", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return { tasks, isLoading, addTask, updateTask, deleteTask };
};
