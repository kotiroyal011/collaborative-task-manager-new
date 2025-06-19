"use client";

import { useTaskStore } from "@/lib/store/taskStore";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function FilterBar() {
  const { filters, setFilters } = useTaskStore();

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      {/* Search */}
      <Input
        placeholder="Search by title..."
        value={filters.searchText}
        onChange={(e) => setFilters({ searchText: e.target.value })}
        className="w-64"
      />

      {/* Status Filter */}
      <Select
        onValueChange={(val) =>
          setFilters({ status: val === "all" ? "" : val })
        }
        defaultValue="all"
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter by Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="To Do">To Do</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
        </SelectContent>
      </Select>

      {/* Priority Filter */}
      <Select
        onValueChange={(val) =>
          setFilters({ priority: val === "all" ? "" : val })
        }
        defaultValue="all"
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Filter by Priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="High">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
