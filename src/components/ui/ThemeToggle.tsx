"use client";

import React, { useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: "default" | "glass";
}

const emptySubscribe = () => () => {};

export function ThemeToggle({
  className = "",
  showLabel = false,
  variant = "default",
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  // useSyncExternalStore safely detects client mount without cascading renders
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return (
      <div
        className={cn(
          "h-9.5 w-9.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80",
          className
        )}
      />
    );
  }

  const isDark = theme === "dark";

  const defaultStyles = isDark
    ? "border-slate-700/80 bg-slate-800/90 text-amber-300 hover:bg-slate-700 hover:border-slate-600 focus-visible:ring-amber-400/30"
    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-blue-500/20";

  const glassStyles = isDark
    ? "border-white/25 bg-white/15 text-amber-300 hover:bg-white/25 hover:border-white/40 shadow-lg backdrop-blur-md"
    : "border-white/25 bg-white/15 text-amber-200 hover:bg-white/25 hover:border-white/40 shadow-lg backdrop-blur-md";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center h-9.5 px-2.5 rounded-xl border transition-all duration-200 cursor-pointer select-none group shadow-2xs",
        variant === "glass" ? glassStyles : defaultStyles,
        className
      )}
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
    >
      <div className="relative h-5 w-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "backOut" }}
              className="absolute inset-0 flex items-center justify-center text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
            >
              <Sun className="h-4.5 w-4.5 fill-amber-400/25 stroke-[2.2]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: "backOut" }}
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-colors",
                variant === "glass"
                  ? "text-amber-200 drop-shadow-[0_0_8px_rgba(253,230,138,0.4)]"
                  : "text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
              )}
            >
              <Moon className="h-4.5 w-4.5 fill-current/20 stroke-[2.2]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="ml-2 text-xs font-semibold">
          {isDark ? "Mode Terang" : "Mode Gelap"}
        </span>
      )}
    </button>
  );
}
