"use client";

import { useEffect } from "react";
import TaskForm from "./components/TaskForm";
import FilterBar from "./components/FilterBar";
import DroppableColumn from "./components/DroppableColumn";
import EditTaskModal from "./components/EditTaskModal";

import { useTasks } from "@/lib/hooks/useTasks";
import { useTaskStore } from "@/lib/store/taskStore";

import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";

const statuses = ["To Do", "In Progress", "Done"] as const;

export default function Dashboard() {
  const { tasks = [], isLoading, updateTask } = useTasks();
  const { filters, setTasks } = useTaskStore();
  const { searchText, priority, status: filterStatus } = filters;

  // Sync Zustand store with tasks from React Query
  useEffect(() => {
    if (tasks) {
      setTasks(tasks);
    }
  }, [tasks, setTasks]);

  // Drag handler to update task status
  function handleDragEnd(event: DragEndEvent) {
    const taskId = event.active.id as string;
    const newStatus = event.over?.id as (typeof statuses)[number] | undefined;

    const draggedTask = tasks.find((t) => t.id === taskId);
    if (draggedTask && newStatus && draggedTask.status !== newStatus) {
      updateTask.mutate({ ...draggedTask, status: newStatus });
    }
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="p-4 space-y-6">
        {/* Form to create a new task */}
        <TaskForm />

        {/* Filter controls */}
        <FilterBar />

        {/* Kanban board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {statuses.map((status) => (
            <DroppableColumn
              key={status}
              status={status}
              tasks={tasks}
              filters={{ searchText, priority, filterStatus }}
            />
          ))}
        </div>
      </div>

      {/* Globally mounted Edit Task Modal */}
      <EditTaskModal />
    </DndContext>
  );
}
