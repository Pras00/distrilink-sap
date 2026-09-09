"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { SalesTable } from "@/components/dashboard/SalesTable";
import { initialSalesData } from "@/data/salesData";
import { calculateSummary } from "@/lib/utils";
import { Loader2, Award, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [salesData] = useState(initialSalesData);

  // Protected route guard
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  const summary = useMemo(() => calculateSummary(salesData), [salesData]);

  const topPerformer = useMemo(() => {
    return [...salesData].sort(
      (a, b) => b.efektivitas_visit_persen - a.efektivitas_visit_persen
    )[0];
  }, [salesData]);

  const highestOOS = useMemo(() => {
    return [...salesData].sort(
      (a, b) => b.jumlah_order_oos - a.jumlah_order_oos
    )[0];
  }, [salesData]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#090d16] text-slate-600 dark:text-slate-300 gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
        <p className="text-sm font-medium">Memverifikasi sesi supervisor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-[#090d16] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Header with user info, theme toggle, & logout */}
      <DashboardHeader />

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8"
      >
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-blue-800 to-indigo-950 p-6 sm:p-8 text-white shadow-xl shadow-blue-950/20 border border-blue-600/30">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-xs text-blue-200 border border-white/20">
                SFA Supervision Hub &bull; Jawa Barat
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Halo, {user?.firstName}!
              </h2>
              <p className="text-sm text-blue-100/90 leading-relaxed">
                Pantau realisasi kunjungan harian tim canvasser, perbandingan omset taking order,
                dan deteksi dini kendala ketersediaan stok produk (OOS) di wilayah operasional Anda.
              </p>
            </div>

            {/* Quick Highlight Cards */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              {topPerformer && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                    <Award className="h-4 w-4" /> Top Performer
                  </div>
                  <p className="font-bold text-sm text-white">{topPerformer.nama_sales}</p>
                  <p className="text-blue-200">
                    Efektivitas: <span className="text-white font-bold">{topPerformer.efektivitas_visit_persen}%</span> ({topPerformer.area})
                  </p>
                </div>
              )}
              {highestOOS && (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-rose-300 font-semibold">
                    <AlertCircle className="h-4 w-4" /> Perhatian Khusus OOS
                  </div>
                  <p className="font-bold text-sm text-white">{highestOOS.area}</p>
                  <p className="text-rose-200">
                    {highestOOS.jumlah_order_oos} order OOS ({highestOOS.nama_sales})
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Section 1: Summary Cards */}
        <section aria-labelledby="summary-heading">
          <h3 id="summary-heading" className="sr-only">
            Ringkasan Metrik
          </h3>
          <SummaryCards summary={summary} totalSalesCount={salesData.length} />
        </section>

        {/* Section 2: Visualisasi Chart */}
        <section aria-labelledby="charts-heading">
          <h3 id="charts-heading" className="sr-only">
            Visualisasi Grafik
          </h3>
          <PerformanceChart data={salesData} />
        </section>

        {/* Section 3: Tabel Performa Sales */}
        <section aria-labelledby="table-heading">
          <h3 id="table-heading" className="sr-only">
            Tabel Data Salesman
          </h3>
          <SalesTable data={salesData} />
        </section>
      </motion.main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c121e] py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-medium text-slate-700 dark:text-slate-300">
            &copy; {new Date().getFullYear()} Distrilink SAP &bull; Platform Sales Force Automation & Data Consolidator.
          </p>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            Dikerjakan untuk Seleksi Kandidat Magang MagangHub &bull; PT Urbansolv
          </p>
        </div>
      </footer>
    </div>
  );
}
