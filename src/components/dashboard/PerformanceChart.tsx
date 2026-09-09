"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { useTheme } from "@/context/ThemeContext";
import { SalesPerformance } from "@/types/sales";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { BarChart3 } from "lucide-react";
import { formatRupiah } from "@/lib/utils";

interface PerformanceChartProps {
  data: SalesPerformance[];
}

interface ChartItemPayload {
  name: string;
  fullName: string;
  area: string;
  efektivitas: number;
  planned: number;
  realisasi: number;
  totalOrder: number;
  oos: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload?: ChartItemPayload;
  }>;
}

// Declared outside of render to prevent recreation during render
function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length && payload[0].payload) {
    const currentItem = payload[0].payload;

    return (
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 p-3.5 shadow-xl backdrop-blur-xs text-xs space-y-2 min-w-[200px]">
        <div>
          <p className="font-bold text-slate-900 dark:text-white text-sm">
            {currentItem.fullName}
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-[11px]">
            Wilayah Operasional:{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {currentItem.area}
            </span>
          </p>
        </div>

        <div className="space-y-1.5 pt-1.5 border-t border-slate-100 dark:border-slate-800">
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span>Efektivitas Visit:</span>
            <span className="font-extrabold text-blue-600 dark:text-blue-400">
              {currentItem.efektivitas}%
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span>Target Kunjungan:</span>
            <span className="font-medium text-slate-800 dark:text-slate-200">
              {currentItem.planned} outlet
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span>Realisasi Selesai:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              {currentItem.realisasi} outlet
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span>Nilai Taking Order:</span>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              {formatRupiah(currentItem.totalOrder)}
            </span>
          </div>
          <div className="flex justify-between items-center text-slate-600 dark:text-slate-300">
            <span>Pesanan Gagal (OOS):</span>
            <span className="font-bold text-rose-600 dark:text-rose-400">
              {currentItem.oos} order
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [chartMode, setChartMode] = useState<"effectiveness" | "visits">("effectiveness");
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Chart data formatting
  const chartData: ChartItemPayload[] = data.map((item) => ({
    name: item.nama_sales.split(" ")[0], // First name for clean x-axis
    fullName: item.nama_sales,
    area: item.area,
    efektivitas: item.efektivitas_visit_persen,
    planned: item.kunjungan_planned,
    realisasi: item.kunjungan_realisasi,
    totalOrder: item.total_order_rp,
    oos: item.jumlah_order_oos,
  }));

  const gridColor = isDark ? "#1e293b" : "#f1f5f9";
  const axisTextColor = isDark ? "#94a3b8" : "#64748b";
  const axisLineColor = isDark ? "#334155" : "#e2e8f0";

  return (
    <Card className="border-slate-200/90 dark:border-slate-800 shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
              <BarChart3 className="h-4 w-4" />
            </div>
            <CardTitle className="text-base sm:text-lg">
              Analisa Komparatif Performa Tim Sales
            </CardTitle>
          </div>
          <CardDescription className="mt-1">
            {chartMode === "effectiveness"
              ? "Persentase efektivitas kunjungan outlet per salesman dibandingkan ambang target 100%"
              : "Perbandingan jumlah kunjungan yang direncanakan (target) vs tercapai secara riil"}
          </CardDescription>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/80 self-start sm:self-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setChartMode("effectiveness")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              chartMode === "effectiveness"
                ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            % Efektivitas
          </button>
          <button
            type="button"
            onClick={() => setChartMode("visits")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              chartMode === "visits"
                ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Planned vs Realisasi
          </button>
        </div>
      </CardHeader>

      <CardContent className="pt-3 pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${chartMode}-${isDark ? "dark" : "light"}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[320px] sm:h-[360px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              {chartMode === "effectiveness" ? (
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 15, left: -10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: axisTextColor, fontSize: 12, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={{ stroke: axisLineColor }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    unit="%"
                    tick={{ fill: axisTextColor, fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: axisLineColor }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <ReferenceLine
                    y={100}
                    stroke="#10b981"
                    strokeDasharray="4 4"
                    label={{
                      value: "Target 100%",
                      fill: "#10b981",
                      fontSize: 11,
                      fontWeight: 600,
                      position: "insideTopRight",
                    }}
                  />
                  <Bar
                    dataKey="efektivitas"
                    name="Efektivitas (%)"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={52}
                  />
                </BarChart>
              ) : (
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 15, left: -10, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                  <XAxis
                    dataKey="name"
                    tick={{ fill: axisTextColor, fontSize: 12, fontWeight: 500 }}
                    tickLine={false}
                    axisLine={{ stroke: axisLineColor }}
                  />
                  <YAxis
                    tick={{ fill: axisTextColor, fontSize: 12 }}
                    tickLine={false}
                    axisLine={{ stroke: axisLineColor }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ paddingTop: 14, fontSize: 12 }}
                    iconType="circle"
                  />
                  <Bar
                    dataKey="planned"
                    name="Kunjungan Terjadwal (Planned)"
                    fill={isDark ? "#64748b" : "#94a3b8"}
                    radius={[6, 6, 0, 0]}
                    maxBarSize={38}
                  />
                  <Bar
                    dataKey="realisasi"
                    name="Kunjungan Realisasi"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={38}
                  />
                </BarChart>
              )}
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
