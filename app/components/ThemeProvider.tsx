"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// Same configuration as the main D4 Community site: class-based, dark by default.
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
