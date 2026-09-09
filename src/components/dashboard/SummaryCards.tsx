"use client";

import React from "react";
import { motion } from "framer-motion";
import { DashboardSummary } from "@/types/sales";
import { formatNumber, formatPercent, formatRupiah } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/Card";
import {
  CheckCircle2,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";

interface SummaryCardsProps {
  summary: DashboardSummary;
  totalSalesCount: number;
}

export function SummaryCards({ summary, totalSalesCount }: SummaryCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
  };

  const cards = [
    {
      title: "Kunjungan Realisasi",
      value: `${formatNumber(summary.totalKunjunganRealisasi)} Outlet`,
      subtext: `Target: ${formatNumber(summary.totalKunjunganPlanned)} terjadwal`,
      badgeText: `${Math.round((summary.totalKunjunganRealisasi / summary.totalKunjunganPlanned) * 100)}% tercapai`,
      icon: CheckCircle2,
      iconBg: "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
      badgeColor: "bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    },
    {
      title: "Rata-rata Efektivitas",
      value: formatPercent(summary.rataRataEfektivitas),
      subtext: `Akumulasi ${totalSalesCount} orang salesman`,
      badgeText: summary.rataRataEfektivitas >= 80 ? "Sesuai Target" : "Perlu Evaluasi",
      icon: TrendingUp,
      iconBg:
        summary.rataRataEfektivitas >= 80
          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
          : "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800",
      badgeColor:
        summary.rataRataEfektivitas >= 80
          ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
          : "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    },
    {
      title: "Total Nilai Order",
      value: formatRupiah(summary.totalNilaiOrder),
      subtext: "Akumulasi taking order hari ini",
      badgeText: "Realisasi Omset",
      icon: DollarSign,
      iconBg: "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
      badgeColor: "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    },
    {
      title: "Pesanan Gagal (OOS)",
      value: `${summary.totalOrderOOS} Order`,
      subtext: "Kendala stok produk kosong",
      badgeText: summary.totalOrderOOS > 0 ? "Perlu Restock" : "Stok Aman",
      icon: AlertTriangle,
      iconBg:
        summary.totalOrderOOS > 0
          ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800"
          : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      badgeColor:
        summary.totalOrderOOS > 0
          ? "bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800"
          : "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
    >
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -3, transition: { duration: 0.15 } }}
          >
            <Card className="border-slate-200/90 dark:border-slate-800/90 shadow-xs hover:shadow-md transition-all hover:border-slate-300 dark:hover:border-slate-700 h-full flex flex-col justify-between">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {card.title}
                  </p>
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl border ${card.iconBg}`}
                  >
                    <IconComponent className="h-4.5 w-4.5" />
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
                    {card.value}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 truncate">{card.subtext}</span>
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-full border px-2 py-0.5 text-[10px] font-bold shrink-0 ${card.badgeColor}`}
                  >
                    <ArrowUpRight className="h-2.5 w-2.5" />
                    {card.badgeText}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
