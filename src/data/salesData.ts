import { SalesPerformance } from "@/types/sales";

export const initialSalesData: SalesPerformance[] = [
  {
    nama_sales: "Dimas Rasyid",
    area: "Bandung Kota",
    kunjungan_planned: 18,
    kunjungan_realisasi: 15,
    efektivitas_visit_persen: 83,
    total_order_rp: 6880002,
    jumlah_order_oos: 2,
  },
  {
    nama_sales: "Siti Aminah",
    area: "Bandung Barat",
    kunjungan_planned: 20,
    kunjungan_realisasi: 20,
    efektivitas_visit_persen: 100,
    total_order_rp: 9250000,
    jumlah_order_oos: 0,
  },
  {
    nama_sales: "Andi Wijaya",
    area: "Cimahi",
    kunjungan_planned: 15,
    kunjungan_realisasi: 10,
    efektivitas_visit_persen: 67,
    total_order_rp: 4100000,
    jumlah_order_oos: 4,
  },
  {
    nama_sales: "Rina Puspita",
    area: "Bandung Timur",
    kunjungan_planned: 22,
    kunjungan_realisasi: 19,
    efektivitas_visit_persen: 86,
    total_order_rp: 7600000,
    jumlah_order_oos: 1,
  },
  {
    nama_sales: "Fajar Nugroho",
    area: "Soreang",
    kunjungan_planned: 16,
    kunjungan_realisasi: 12,
    efektivitas_visit_persen: 75,
    total_order_rp: 5300000,
    jumlah_order_oos: 3,
  },
];

export const AREAS = [
  "Semua Area",
  "Bandung Kota",
  "Bandung Barat",
  "Bandung Timur",
  "Bandung Selatan",
  "Cimahi",
  "Soreang",
  "Padalarang",
  "Lembang",
] as const;
