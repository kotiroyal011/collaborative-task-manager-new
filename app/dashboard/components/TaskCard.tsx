"use client";

import { Task } from "@/lib/validators/task";
import { useTaskStore } from "@/lib/store/taskStore";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { useState } from "react";

export default function TaskCard({ task }: { task: Task }) {
  const { setEditingTask, deleteTask } = useTaskStore();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    if (task.id) {
      deleteTask(task.id); // Zustand delete
      setOpen(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow bg-white space-y-2">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold text-sm">{task.title}</h4>
        <div className="flex gap-2">
          {/* Edit Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditingTask(task)}
          >
            Edit
          </Button>

          {/* Delete Button with Confirmation */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Deletion</DialogTitle>
              </DialogHeader>

              <p>Are you sure you want to delete this task?</p>

              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-muted">{task.description}</p>
      )}
      <div className="text-xs text-gray-500">
        {task.status} • {task.priority}
        {task.assignee && <> • {task.assignee}</>}
        {task.dueDate && <> • Due: {task.dueDate}</>}
      </div>
    </div>
  );
}
