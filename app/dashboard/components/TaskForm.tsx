"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";

import { taskSchema } from "@/lib/validators/task";
import { useTasks } from "@/lib/hooks/useTasks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskForm() {
  const { addTask } = useTasks();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "To Do",
      priority: "Medium",
      dueDate: "",
      assignee: "",
    },
  });

  const [status, setStatus] = useState("To Do");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    setValue("status", status);
  }, [status, setValue]);

  useEffect(() => {
    setValue("priority", priority);
  }, [priority, setValue]);

  const onSubmit = (data: TaskFormData) => {
    addTask.mutate(data);
    reset();
    setStatus("To Do");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Task title" {...register("title")} />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <Textarea placeholder="Description" {...register("description")} />

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="To Do">To Do</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priority} onValueChange={setPriority}>
        <SelectTrigger>
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Low">Low</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="High">High</SelectItem>
        </SelectContent>
      </Select>

      <Input type="date" {...register("dueDate")} />
      <Input placeholder="Assignee" {...register("assignee")} />

      <Button type="submit" disabled={addTask.isPending}>
        {addTask.isPending ? "Adding..." : "Add Task"}
      </Button>
    </form>
  );
}
