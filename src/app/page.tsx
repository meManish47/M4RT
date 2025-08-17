"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toogle";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="h-screen w-screen flex flex-col bg-background">
      {/* Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 shadow">
        <h1 className="text-2xl font-bold">
          <span className="text-black dark:text-white">M</span>
          <span className="text-purple-600">4</span>
          <span className="text-black dark:text-white">RT</span>
        </h1>
        <ModeToggle />
      </header>

      {/* Body */}
      <div className="flex flex-1 flex-col justify-center items-center gap-6 px-4">
        <h2 className="text-3xl font-bold">Login</h2>

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Link href="/admin/login">
            <Button className="w-full rounded-xl text-lg py-6">
              Login to Admin
            </Button>
          </Link>

          <Link href="/staff/login">
            <Button
              className="w-full rounded-xl text-lg py-6"
              variant="secondary"
            >
              Login to Staff / Manager
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
