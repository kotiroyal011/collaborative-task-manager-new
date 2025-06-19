import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Providers from "./providers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Collaborative Task Manager",
  description: "Built with Next.js App Router",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Providers>
          <header className="bg-white shadow mb-6">
            <div className="max-w-6xl mx-auto px-4 py-4 flex gap-6 items-center">
              <Link href="/dashboard" className="font-semibold hover:underline">
                Task Board
              </Link>
              <Link href="/recipes" className="font-semibold hover:underline">
                Recipes
              </Link>
            </div>
          </header>

          <main className="max-w-6xl mx-auto px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
