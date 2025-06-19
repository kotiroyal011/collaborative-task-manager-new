import { NextResponse } from "next/server";
import { taskSchema } from "@/lib/validators/task";
import { v4 as uuidv4 } from "uuid";

let tasks: any[] = [];

// GET - Fetch all tasks
export async function GET() {
  return NextResponse.json(tasks);
}

// POST - Add new task
export async function POST(req: Request) {
  const body = await req.json();
  const result = taskSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const newTask = { id: uuidv4(), ...body };
  tasks.push(newTask);
  return NextResponse.json(newTask);
}

// PUT - Update existing task
export async function PUT(req: Request) {
  const body = await req.json();
  const result = taskSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const index = tasks.findIndex((t) => t.id === body.id);
  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  tasks[index] = { ...tasks[index], ...body };
  return NextResponse.json(tasks[index]);
}

// DELETE - Remove a task
export async function DELETE(req: Request) {
  const { id } = await req.json();
  tasks = tasks.filter((task) => task.id !== id);
  return NextResponse.json({ success: true });
}
