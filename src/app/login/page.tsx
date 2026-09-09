"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import {
  BarChart2,
  CheckCircle2,
  Navigation,
  PackageCheck,
  Smartphone,
} from "lucide-react";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  const highlights = [
    {
      icon: Smartphone,
      title: "Mobile SFA Taking Order",
      desc: "Order & retur terintegrasi mode online & offline.",
    },
    {
      icon: Navigation,
      title: "Rute Kunjungan & Geotagging",
      desc: "Validasi lokasi check-in/out & cegah order fiktif.",
    },
    {
      icon: PackageCheck,
      title: "Monitoring Stok & Mitigasi OOS",
      desc: "Penanganan cepat stok kosong di lapangan.",
    },
    {
      icon: BarChart2,
      title: "Supervision Hub Terpusat",
      desc: "Analisa performa real-time dan insight omset.",
    },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50/60 to-slate-200 dark:from-slate-900 dark:via-slate-950 dark:to-blue-950 p-4 sm:p-6 lg:p-12 relative overflow-hidden transition-colors duration-300">
      {/* Theme Toggle in Top Right */}
      <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
        <ThemeToggle />
      </div>

      {/* Decorative ambient gradients */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/20 rounded-full blur-3xl pointer-events-none transition-colors duration-300" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-3xl pointer-events-none transition-colors duration-300" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Side: Brand Story & Features */}
        <div className="hidden lg:flex lg:col-span-6 flex-col justify-between text-slate-900 dark:text-white space-y-8 pr-4 transition-colors duration-300">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-400/30 text-blue-800 dark:text-blue-300 text-xs font-semibold backdrop-blur-xs transition-colors">
              <CheckCircle2 className="h-3.5 w-3.5" /> Sales Automation Platform (SAP)
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight mt-4 leading-tight text-slate-900 dark:text-white transition-colors">
              Distrilink <span className="text-blue-600 dark:text-blue-400">Enterprise</span> Portal
            </h1>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm leading-relaxed transition-colors">
              Solusi digitalisasi distribusi dan otomasi tim sales canvasser di lapangan.
              Pantau rute kunjungan, validasi order, dan evaluasi performa harian secara akurat.
            </p>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 backdrop-blur-xs space-y-1.5 shadow-xs dark:shadow-none transition-all"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-transparent transition-colors">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h2 className="font-bold text-xs text-slate-900 dark:text-white transition-colors">{item.title}</h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed transition-colors">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 transition-colors">
            <span>Studi Kasus Seleksi MagangHub</span>
            <span>PT Urbansolv &bull; Distrilink</span>
          </div>
        </div>

        {/* Right Side: Login Form Card */}
        <div className="lg:col-span-6 flex justify-center">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
