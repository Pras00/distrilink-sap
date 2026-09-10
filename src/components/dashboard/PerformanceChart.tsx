"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart,
  Bar,
  Cell,
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
import {
  BarChart3,
  TrendingUp,
  Target,
  CheckCircle2,
  Hand,
  MoveRight,
} from "lucide-react";
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

// Komponen tooltip statis dideklarasikan di level modul untuk mematuhi aturan static component React 19
function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length && payload[0].payload) {
    const item = payload[0].payload;
    const isTargetAchieved = item.efektivitas >= 100;
    const isGood = item.efektivitas >= 80;

    return (
      <div className="hidden sm:block rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-[#0f172a]/95 p-3.5 sm:p-4 shadow-2xl shadow-slate-900/15 dark:shadow-black/70 backdrop-blur-md text-xs space-y-3 min-w-60 max-w-72 transition-all pointer-events-none">
        {/* Header: Avatar, Nama, dan Badge Wilayah */}
        <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-xs">
              {item.name[0]}
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                {item.fullName}
              </p>
              <p className="text-slate-400 dark:text-slate-500 text-[11px] leading-tight mt-0.5">
                Sales Canvasser
              </p>
            </div>
          </div>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60 shrink-0">
            {item.area}
          </span>
        </div>

        {/* Highlight Progress Efektivitas */}
        <div className="rounded-xl p-2.5 bg-slate-50/90 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800/80 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Efektivitas Visit
            </span>
            <div className="flex items-center gap-1">
              {isTargetAchieved && (
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
              )}
              <span
                className={`font-black text-sm ${
                  isTargetAchieved
                    ? "text-emerald-600 dark:text-emerald-400"
                    : isGood
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-amber-600 dark:text-amber-400"
                }`}
              >
                {item.efektivitas}%
              </span>
            </div>
          </div>

          {/* Mini progress bar */}
          <div className="h-1.5 w-full bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isTargetAchieved
                  ? "bg-linear-to-r from-emerald-400 to-emerald-500"
                  : isGood
                  ? "bg-linear-to-r from-blue-400 to-blue-600"
                  : "bg-linear-to-r from-amber-400 to-amber-500"
              }`}
              style={{ width: `${Math.min(item.efektivitas, 100)}%` }}
            />
          </div>
        </div>

        {/* Ringkasan Target vs Realisasi & OOS */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <div className="bg-slate-50/70 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-100 dark:border-slate-800/60">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              Target vs Realisasi
            </p>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
              <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                {item.realisasi}
              </span>
              <span className="text-slate-400 dark:text-slate-500 font-normal">
                {" "}
                / {item.planned} toko
              </span>
            </p>
          </div>

          <div className="bg-slate-50/70 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-100 dark:border-slate-800/60">
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              Kendala Stok OOS
            </p>
            <p className="text-xs font-bold mt-0.5">
              {item.oos > 0 ? (
                <span className="text-rose-600 dark:text-rose-400 font-extrabold">
                  {item.oos} order
                </span>
              ) : (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Nihil (0)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Total Omset Taking Order */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800/80 text-slate-600 dark:text-slate-300">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Total Taking Order:
          </span>
          <span className="font-extrabold text-blue-600 dark:text-blue-400 text-xs">
            {formatRupiah(item.totalOrder)}
          </span>
        </div>
      </div>
    );
  }
  return null;
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  const [chartMode, setChartMode] = useState<"effectiveness" | "visits">(
    "effectiveness"
  );
  const [selectedSales, setSelectedSales] = useState<ChartItemPayload | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Chart data formatting
  const chartData: ChartItemPayload[] = data.map((item) => ({
    name: item.nama_sales.split(" ")[0], // Nama depan untuk sumbu X
    fullName: item.nama_sales,
    area: item.area,
    efektivitas: item.efektivitas_visit_persen,
    planned: item.kunjungan_planned,
    realisasi: item.kunjungan_realisasi,
    totalOrder: item.total_order_rp,
    oos: item.jumlah_order_oos,
  }));

  // Default sales terpilih untuk kartu interaktif mobile (gunakan yang pertama atau top performer)
  const activeMobileSales = selectedSales || chartData[0];
  const targetAchievedCount = chartData.filter((d) => d.efektivitas >= 100).length;

  const gridColor = isDark ? "#1e293b" : "#f1f5f9";
  const axisTextColor = isDark ? "#94a3b8" : "#64748b";
  const axisLineColor = isDark ? "#334155" : "#e2e8f0";
  const cursorFill = isDark ? "rgba(59, 130, 246, 0.08)" : "rgba(37, 99, 235, 0.05)";

  const handleChartClick = (state: unknown) => {
    if (state && typeof state === "object" && "activePayload" in state) {
      const activePayload = (
        state as { activePayload?: Array<{ payload?: ChartItemPayload }> }
      ).activePayload;
      if (activePayload && activePayload.length && activePayload[0]?.payload) {
        setSelectedSales(activePayload[0].payload);
      }
    }
  };

  const handleBarClick = (entry: unknown) => {
    if (entry && typeof entry === "object" && "payload" in entry) {
      const payloadObj = (entry as { payload?: ChartItemPayload }).payload;
      if (payloadObj) {
        setSelectedSales(payloadObj);
      }
    }
  };

  return (
    <Card className="border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/30">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900 shadow-2xs">
              <BarChart3 className="h-4 w-4" />
            </div>
            <CardTitle className="text-base sm:text-lg">
              Analisa Komparatif Performa Tim Sales
            </CardTitle>
          </div>
          <CardDescription className="mt-1">
            {chartMode === "effectiveness"
              ? "Persentase efektivitas kunjungan per salesman (batang hijau menandakan pencapaian target 100%)"
              : "Perbandingan jumlah kunjungan yang direncanakan (target) vs berhasil terealisasi"}
          </CardDescription>
        </div>

        {/* View Toggle Tabs & Target Status */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {chartMode === "effectiveness" && (
            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Target 100%: {targetAchievedCount} Sales
            </span>
          )}

          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700/80 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setChartMode("effectiveness")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                chartMode === "effectiveness"
                  ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>% Efektivitas</span>
            </button>
            <button
              type="button"
              onClick={() => setChartMode("visits")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                chartMode === "visits"
                  ? "bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Target className="h-3.5 w-3.5" />
              <span>Planned vs Realisasi</span>
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 sm:pt-6 pb-6 space-y-4">
        {/* Panduan Interaksi Khusus Layar HP / Mobile */}
        <div className="flex sm:hidden items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
          <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <Hand className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            Ketuk batang untuk rincian
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-500">
            Geser grafik <MoveRight className="h-3 w-3" />
          </span>
        </div>

        {/* Kontainer Grafik dengan Scroll Horizontal Halus di Mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${chartMode}-${isDark ? "dark" : "light"}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-thin select-none outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]"
          >
            <div className="min-w-[620px] sm:min-w-full h-80 sm:h-96 select-none outline-none focus:outline-none [-webkit-tap-highlight-color:transparent]">
              <ResponsiveContainer width="100%" height="100%">
                {chartMode === "effectiveness" ? (
                  <BarChart
                    data={chartData}
                    margin={{ top: 25, right: 20, left: -10, bottom: 20 }}
                    onClick={handleChartClick}
                  >
                    <defs>
                      {/* Modern Electric Blue Gradient */}
                      <linearGradient id="barEffectivenessGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="60%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                      </linearGradient>

                      {/* Emerald Target Achieved Gradient */}
                      <linearGradient id="barTargetAchievedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="60%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="4 4"
                      vertical={false}
                      stroke={gridColor}
                    />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: axisTextColor, fontSize: 12, fontWeight: 500 }}
                      tickLine={false}
                      axisLine={{ stroke: axisLineColor }}
                    />
                    {/* Domain 0-110 memberikan ruang visual di atas garis target 100% */}
                    <YAxis
                      domain={[0, 110]}
                      unit="%"
                      tick={{ fill: axisTextColor, fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: axisLineColor }}
                    />

                    {/* Tooltip dengan kustomisasi cursor yang halus & beradius (tidak abu-abu pekat) */}
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{
                        fill: cursorFill,
                        radius: 12,
                      }}
                      animationDuration={150}
                      wrapperStyle={{ pointerEvents: "none", zIndex: 40 }}
                    />

                    {/* Garis batas target 100% dengan penempatan label yang rapi */}
                    <ReferenceLine
                      y={100}
                      stroke={isDark ? "#34d399" : "#059669"}
                      strokeDasharray="4 4"
                      strokeWidth={1.5}
                      label={{
                        value: "Target 100%",
                        fill: isDark ? "#34d399" : "#059669",
                        fontSize: 11,
                        fontWeight: 700,
                        position: "insideTopRight",
                        offset: 8,
                      }}
                    />

                    <Bar
                      dataKey="efektivitas"
                      name="Efektivitas (%)"
                      radius={[8, 8, 2, 2]}
                      maxBarSize={48}
                      onClick={handleBarClick}
                      className="cursor-pointer outline-none focus:outline-none"
                      activeBar={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.efektivitas >= 100
                              ? "url(#barTargetAchievedGrad)"
                              : "url(#barEffectivenessGrad)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                ) : (
                  <BarChart
                    data={chartData}
                    margin={{ top: 25, right: 20, left: -10, bottom: 20 }}
                    onClick={handleChartClick}
                  >
                    <defs>
                      <linearGradient id="barPlannedGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={isDark ? "#94a3b8" : "#cbd5e1"} />
                        <stop offset="100%" stopColor={isDark ? "#64748b" : "#94a3b8"} />
                      </linearGradient>
                      <linearGradient id="barRealisasiGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#34d399" />
                        <stop offset="70%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="4 4"
                      vertical={false}
                      stroke={gridColor}
                    />
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
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{
                        fill: cursorFill,
                        radius: 12,
                      }}
                      animationDuration={150}
                      wrapperStyle={{ pointerEvents: "none", zIndex: 40 }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: 16, fontSize: 12 }}
                      iconType="circle"
                    />
                    <Bar
                      dataKey="planned"
                      name="Kunjungan Target (Planned)"
                      fill="url(#barPlannedGrad)"
                      radius={[6, 6, 2, 2]}
                      maxBarSize={36}
                      onClick={handleBarClick}
                      className="cursor-pointer outline-none focus:outline-none"
                      activeBar={false}
                    />
                    <Bar
                      dataKey="realisasi"
                      name="Kunjungan Realisasi"
                      fill="url(#barRealisasiGrad)"
                      radius={[6, 6, 2, 2]}
                      maxBarSize={36}
                      onClick={handleBarClick}
                      className="cursor-pointer outline-none focus:outline-none"
                      activeBar={false}
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Kartu Rincian Interaktif Khusus Mobile (Tampil di Bawah Grafik di Layar HP) */}
        {activeMobileSales && (
          <div className="sm:hidden pt-2">
            <div className="rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-linear-to-br from-blue-50/60 via-white to-slate-50/60 dark:from-blue-950/30 dark:via-[#0c121e] dark:to-slate-900/40 p-4 shadow-xs space-y-3">
              {/* Header Kartu Mobile */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xs shrink-0">
                    {activeMobileSales.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-bold text-slate-900 dark:text-white text-sm">
                        {activeMobileSales.fullName}
                      </p>
                      {activeMobileSales.efektivitas >= 100 && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Wilayah:{" "}
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {activeMobileSales.area}
                      </span>
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                  Data Terpilih
                </span>
              </div>

              {/* Progress Bar Efektivitas Mobile */}
              <div className="space-y-1.5 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Efektivitas Visit:
                  </span>
                  <span
                    className={`font-black text-sm ${
                      activeMobileSales.efektivitas >= 100
                        ? "text-emerald-600 dark:text-emerald-400"
                        : activeMobileSales.efektivitas >= 80
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-amber-600 dark:text-amber-400"
                    }`}
                  >
                    {activeMobileSales.efektivitas}%
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      activeMobileSales.efektivitas >= 100
                        ? "bg-linear-to-r from-emerald-400 to-emerald-500"
                        : activeMobileSales.efektivitas >= 80
                        ? "bg-linear-to-r from-blue-400 to-blue-600"
                        : "bg-linear-to-r from-amber-400 to-amber-500"
                    }`}
                    style={{
                      width: `${Math.min(activeMobileSales.efektivitas, 100)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Grid 3 Metrik Inti */}
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    Realisasi
                  </p>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {activeMobileSales.realisasi}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      /{activeMobileSales.planned}
                    </span>
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    Omset TO
                  </p>
                  <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-0.5 truncate">
                    {formatRupiah(activeMobileSales.totalOrder)}
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/60">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    Kendala OOS
                  </p>
                  <p className="text-xs font-bold mt-0.5">
                    {activeMobileSales.oos > 0 ? (
                      <span className="text-rose-600 dark:text-rose-400 font-bold">
                        {activeMobileSales.oos} order
                      </span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400">
                        Nihil (0)
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
