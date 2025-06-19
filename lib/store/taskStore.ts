import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "@/lib/validators/task";

type Filters = {
  searchText: string;
  status: string;
  priority: string;
};

type TaskStore = {
  tasks: Task[];
  filters: Filters;
  editingTask: Task | null;

  // Task operations
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;

  // Filters
  setFilters: (filters: Partial<Filters>) => void;

  // Modal editing
  setEditingTask: (task: Task | null) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      // Initial state
      tasks: [],
      filters: {
        searchText: "",
        status: "",
        priority: "",
      },
      editingTask: null,

      // Task CRUD (local manipulation for optional in-memory display)
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      updateTask: (task) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      setTasks: (tasks) => set({ tasks }),

      // Filter & modal control
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters },
        })),

      setEditingTask: (task) => set({ editingTask: task }),
    }),
    {
      name: "task-storage",
      partialize: (state) => ({
        tasks: state.tasks, // Persist only tasks
      }),
    }
  )
);
