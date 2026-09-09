import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DashboardSummary, SalesPerformance } from "@/types/sales";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1).replace(/\.0$/, "")}%`;
}

export function calculateSummary(data: SalesPerformance[]): DashboardSummary {
  if (data.length === 0) {
    return {
      totalKunjunganRealisasi: 0,
      rataRataEfektivitas: 0,
      totalNilaiOrder: 0,
      totalOrderOOS: 0,
      totalKunjunganPlanned: 0,
    };
  }

  const totalKunjunganPlanned = data.reduce(
    (acc, curr) => acc + curr.kunjungan_planned,
    0
  );
  const totalKunjunganRealisasi = data.reduce(
    (acc, curr) => acc + curr.kunjungan_realisasi,
    0
  );
  const totalNilaiOrder = data.reduce(
    (acc, curr) => acc + curr.total_order_rp,
    0
  );
  const totalOrderOOS = data.reduce(
    (acc, curr) => acc + curr.jumlah_order_oos,
    0
  );

  const rataRataEfektivitas =
    data.reduce((acc, curr) => acc + curr.efektivitas_visit_persen, 0) /
    data.length;

  return {
    totalKunjunganRealisasi,
    rataRataEfektivitas,
    totalNilaiOrder,
    totalOrderOOS,
    totalKunjunganPlanned,
  };
}
