"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { taskSchema, Task } from "@/lib/validators/task";
import { useTaskStore } from "@/lib/store/taskStore";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function EditTaskModal() {
  const editingTask = useTaskStore((state) => state.editingTask);
  const setEditingTask = useTaskStore((state) => state.setEditingTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const form = useForm<Task>({
    resolver: zodResolver(taskSchema),
    mode: "onChange",
  });

  // Refill form with current task data when editing
  useEffect(() => {
    if (editingTask) {
      form.reset(editingTask);
    }
  }, [editingTask, form]);

  if (!editingTask) return null;

  const onSubmit = (data: Task) => {
    updateTask(data);
    setEditingTask(null);
  };

  return (
    <Dialog
      open={!!editingTask}
      onOpenChange={(open) => {
        if (!open) setEditingTask(null);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Title" {...form.register("title")} />
          <Textarea
            placeholder="Description"
            {...form.register("description")}
          />

          <Select
            value={form.watch("status")}
            onValueChange={(val) =>
              form.setValue("status", val as Task["status"])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={form.watch("priority")}
            onValueChange={(val) =>
              form.setValue("priority", val as Task["priority"])
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
            </SelectContent>
          </Select>

          <Input type="date" {...form.register("dueDate")} />
          <Input placeholder="Assignee" {...form.register("assignee")} />

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setEditingTask(null)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
