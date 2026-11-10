"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex size-9 items-center justify-center rounded-md border border-black/20 bg-white/70 text-neutral-900 backdrop-blur transition-colors hover:bg-black/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:border-white/20 dark:bg-neutral-950/70 dark:text-white dark:hover:bg-white/10"
    >
      {/* Render a stable icon until mounted to avoid a hydration mismatch */}
      {mounted && !isDark ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
