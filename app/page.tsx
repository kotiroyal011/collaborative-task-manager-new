"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white px-6">
      <div className="text-center space-y-4 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Collaborative Task Manager
        </h1>
        <p className="text-gray-600 text-lg">
          Manage tasks, collaborate with ease, and explore new recipes — all in
          one modern app.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Task Board Card */}
        <Card className="hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle>📋 Task Board</CardTitle>
            <CardDescription>
              Create, edit, organize tasks and assign priorities with real-time
              drag-and-drop support.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/dashboard">
              <Button className="w-full">Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recipe Page Card */}
        <Card className="hover:shadow-xl transition-all">
          <CardHeader>
            <CardTitle>🍽️ Recipes</CardTitle>
            <CardDescription>
              Browse meals, search recipes by name, and get cooking inspiration
              from TheMealDB.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/recipes">
              <Button variant="outline" className="w-full">
                Explore Recipes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
