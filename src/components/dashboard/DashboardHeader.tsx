"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Logo } from "@/components/ui/Logo";
import {
  LogOut,
  Calendar,
  ShieldCheck,
  ChevronDown,
  Mail,
  User,
} from "lucide-react";

export function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    logout();
    router.replace("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : "Emily Johnson";
  const userInitials = user
    ? `${user.firstName[0]}${user.lastName[0]}`
    : "EJ";

  // Format current date in Indonesian
  const formattedDate = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#0c121e]/90 backdrop-blur-md transition-all shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-xl tracking-tight leading-tight">
                  Distrilink SAP
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 text-[11px] font-semibold text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800">
                  <ShieldCheck className="h-3 w-3" /> SFA Supervisor
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Dashboard Analisa Performa Salesman Harian
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
              <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
              <span>{formattedDate}</span>
            </div>

            <ThemeToggle />

            <div className="relative pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-800" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 p-1 sm:p-1.5 rounded-xl border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-100/70 dark:hover:bg-slate-800/70 transition-all cursor-pointer select-none group"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                {user?.image ? (
                  <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-full border border-blue-200 dark:border-blue-800 shadow-2xs shrink-0">
                    <Image
                      src={user.image}
                      alt={fullName}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-semibold text-sm border border-blue-200 dark:border-blue-800 shrink-0">
                    {userInitials}
                  </div>
                )}

                <div className="text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight block">
                      {fullName}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 block leading-tight">
                    SFA Supervisor
                  </span>
                </div>
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-2 shadow-xl shadow-slate-900/10 dark:shadow-black/50 z-50 overflow-hidden"
                  >
                    <div className="p-3 bg-slate-50/80 dark:bg-slate-900/80 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {fullName}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                          Online
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                        <User className="h-3 w-3 shrink-0 text-slate-400" />
                        @{user?.username || "emilys"}
                      </p>
                      {user?.email && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 truncate">
                          <Mail className="h-3 w-3 shrink-0 text-slate-400" />
                          {user.email}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 space-y-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-700 dark:hover:text-rose-300 transition-colors cursor-pointer group text-left"
                      >
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-100/60 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 group-hover:bg-rose-200/60 transition-colors shrink-0">
                          <LogOut className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <p className="leading-tight font-bold">Keluar Akun</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                            Akhiri sesi supervisor saat ini
                          </p>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
