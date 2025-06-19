"use client";

import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Task } from "@/lib/validators/task";
import TaskCard from "./TaskCard";

type Props = {
  status: Task["status"];
  tasks: Task[];
  filters: {
    searchText: string;
    filterStatus: string;
    priority: string;
  };
};

function DraggableCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id!,
    });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ ...style, opacity: isDragging ? 0.5 : 1 }}
    >
      <TaskCard task={task} />
    </div>
  );
}

export default function DroppableColumn({ status, tasks, filters }: Props) {
  const { setNodeRef } = useDroppable({ id: status });

  const { searchText, filterStatus, priority } = filters;

  const filteredTasks = tasks.filter((t) => {
    const matchTitle = t.title.toLowerCase().includes(searchText.toLowerCase());
    const matchStatus = filterStatus ? t.status === filterStatus : true;
    const matchPriority = priority ? t.priority === priority : true;
    const matchColumn = t.status === status;
    return matchTitle && matchStatus && matchPriority && matchColumn;
  });

  return (
    <div
      ref={setNodeRef}
      className="bg-gray-100 p-3 rounded space-y-3 min-h-[200px]"
    >
      <h2 className="font-bold text-lg mb-2">{status}</h2>

      {filteredTasks.length === 0 ? (
        <p className="text-sm text-muted">No tasks</p>
      ) : (
        filteredTasks.map((task) => <DraggableCard key={task.id} task={task} />)
      )}
    </div>
  );
}
