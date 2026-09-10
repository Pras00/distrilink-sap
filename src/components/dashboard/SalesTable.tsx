"use client";

import React, { useMemo, useState } from "react";
import { SalesPerformance } from "@/types/sales";
import { formatRupiah } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Badge } from "@/components/ui/Badge";
import {
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Users,
  MapPin,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AREAS } from "@/data/salesData";

interface SalesTableProps {
  data: SalesPerformance[];
}

type SortField =
  | "nama_sales"
  | "area"
  | "kunjungan_planned"
  | "kunjungan_realisasi"
  | "efektivitas_visit_persen"
  | "total_order_rp"
  | "jumlah_order_oos";

type SortOrder = "asc" | "desc";

export function SalesTable({ data }: SalesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("Semua Area");
  const [sortField, setSortField] = useState<SortField>("efektivitas_visit_persen");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Filtering
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        item.nama_sales.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.area.toLowerCase().includes(searchQuery.toLowerCase());

      const matchArea =
        selectedArea === "Semua Area" || item.area === selectedArea;

      return matchSearch && matchArea;
    });
  }, [data, searchQuery, selectedArea]);

  // Sorting
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });
  }, [filteredData, sortField, sortOrder]);

  // Pagination calculation
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const startIndex = totalItems > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const endIndex = Math.min(currentPage * pageSize, totalItems);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedArea("Semua Area");
    setSortField("efektivitas_visit_persen");
    setSortOrder("desc");
    setCurrentPage(1);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <ArrowUpDown className="h-3.5 w-3.5 text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity" />
      );
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
    );
  };

  const renderEffectivenessBadge = (percentage: number) => {
    if (percentage >= 85) {
      return (
        <Badge variant="success">
          {percentage}% &bull; Sangat Baik
        </Badge>
      );
    }
    if (percentage >= 75) {
      return (
        <Badge variant="warning">
          {percentage}% &bull; Baik
        </Badge>
      );
    }
    return (
      <Badge variant="danger">
        {percentage}% &bull; Perlu Evaluasi
      </Badge>
    );
  };

  return (
    <Card className="border-slate-200/90 dark:border-slate-800 shadow-xs overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                <Users className="h-4 w-4" />
              </div>
              <CardTitle className="text-base sm:text-lg">
                Daftar Performa Harian Salesman
              </CardTitle>
            </div>
            <CardDescription className="mt-1">
              Rincian metrik kunjungan, efektivitas pencapaian target, transaksi taking order, dan OOS
            </CardDescription>
          </div>

          {/* Quick Counter Badge */}
          <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 self-start md:self-auto font-medium">
            Halaman <span className="font-bold text-slate-900 dark:text-slate-100">{currentPage}</span> dari{" "}
            <span className="font-bold text-slate-900 dark:text-slate-100">{totalPages}</span> (Total{" "}
            <span className="font-bold text-slate-900 dark:text-slate-100">{totalItems}</span> salesman)
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-6 lg:col-span-5">
            <Input
              placeholder="Cari nama salesman atau wilayah..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              icon={<Search className="h-4 w-4" />}
            />
          </div>

          <div className="sm:col-span-4 lg:col-span-4">
            <Select
              value={selectedArea}
              onChange={(e) => {
                setSelectedArea(e.target.value);
                setCurrentPage(1);
              }}
              options={AREAS.map((area) => ({ value: area, label: area }))}
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3 flex items-center">
            {(searchQuery !== "" || selectedArea !== "Semua Area") && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Filter
              </button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50/90 dark:bg-slate-900/90 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th
                  onClick={() => handleSort("nama_sales")}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Nama Salesman</span>
                    {getSortIcon("nama_sales")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("area")}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Area Kerja</span>
                    {getSortIcon("area")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("kunjungan_planned")}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none text-center"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Target Planned</span>
                    {getSortIcon("kunjungan_planned")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("kunjungan_realisasi")}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none text-center"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Realisasi</span>
                    {getSortIcon("kunjungan_realisasi")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("efektivitas_visit_persen")}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Efektivitas Visit</span>
                    {getSortIcon("efektivitas_visit_persen")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("total_order_rp")}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none text-right"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Total Nilai Order</span>
                    {getSortIcon("total_order_rp")}
                  </div>
                </th>
                <th
                  onClick={() => handleSort("jumlah_order_oos")}
                  className="py-3.5 px-4 font-semibold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group select-none text-center"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Order OOS</span>
                    {getSortIcon("jumlah_order_oos")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedData.length > 0 ? (
                paginatedData.map((sales, idx) => (
                  <tr
                    key={sales.nama_sales}
                    className={`hover:bg-blue-50/40 dark:hover:bg-blue-950/30 transition-colors ${
                      idx % 2 === 0
                        ? "bg-white dark:bg-[#0f172a]"
                        : "bg-slate-50/40 dark:bg-slate-900/40"
                    }`}
                  >
                    <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs border border-blue-200 dark:border-blue-800 shrink-0">
                          {sales.nama_sales
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            {sales.nama_sales}
                          </p>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500">Canvasser Field</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
                        {sales.area}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {sales.kunjungan_planned} outlet
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      {sales.kunjungan_realisasi} outlet
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="space-y-1.5 min-w-35">
                        <div className="flex items-center justify-between">
                          {renderEffectivenessBadge(sales.efektivitas_visit_persen)}
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              sales.efektivitas_visit_persen >= 85
                                ? "bg-emerald-500"
                                : sales.efektivitas_visit_persen >= 75
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{
                              width: `${Math.min(sales.efektivitas_visit_persen, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap font-mono">
                      {formatRupiah(sales.total_order_rp)}
                    </td>
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      {sales.jumlah_order_oos > 0 ? (
                        <span className="inline-flex items-center justify-center rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 font-bold px-2 py-0.5 text-xs border border-rose-200 dark:border-rose-800">
                          {sales.jumlah_order_oos} order
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-medium px-2 py-0.5 text-xs border border-emerald-200 dark:border-emerald-800">
                          0 order
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500 dark:text-slate-400">
                    <div className="mx-auto flex flex-col items-center justify-center space-y-2">
                      <AlertCircle className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Tidak ditemukan salesman dengan filter yang dipilih
                      </p>
                      <button
                        type="button"
                        onClick={handleResetFilters}
                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold cursor-pointer"
                      >
                        Reset semua pencarian & filter
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls Section */}
        {totalItems > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs text-slate-600 dark:text-slate-400">
            {/* Range info and page size selector */}
            <div className="flex items-center gap-3">
              <span>
                Menampilkan <span className="font-bold text-slate-900 dark:text-slate-100">{startIndex}</span> -{" "}
                <span className="font-bold text-slate-900 dark:text-slate-100">{endIndex}</span> dari{" "}
                <span className="font-bold text-slate-900 dark:text-slate-100">{totalItems}</span> salesman
              </span>

              <div className="flex items-center gap-1.5 pl-3 border-l border-slate-200 dark:border-slate-800">
                <span>Per halaman:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-1 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer font-medium"
                title="Halaman Sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden xs:inline">Sebelumnya</span>
              </button>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`h-8 w-8 rounded-lg font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white shadow-xs"
                        : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer font-medium"
                title="Halaman Selanjutnya"
              >
                <span className="hidden xs:inline">Selanjutnya</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
