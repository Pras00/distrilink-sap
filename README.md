# Distrilink SAP — Dashboard Analisa Performa Salesman
> **Take-Home Assessment Frontend Web — Seleksi Magang MagangHub x PT Urbansolv**  
> Purwarupa (*Prototype*) Web Dashboard Analisa Performa Salesman untuk Supervisor SFA (*Sales Automation Platform*).

[![Next.js](https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Vercel Deployment](https://img.shields.io/badge/Deployment-Vercel-success?style=flat-square&logo=vercel)](https://distrilink-sap.vercel.app)

---

## 🌐 Tautan Demo & Repositori

- **Live Production URL**: [https://distrilink-sap.vercel.app](https://distrilink-sap.vercel.app)
- **Repositori GitHub**: [https://github.com/Pras00/distrilink-sap](https://github.com/Pras00/distrilink-sap)

---

## 📋 Ringkasan Studi Kasus & Konteks Bisnis

**Distrilink SAP (Sales Automation Platform)** adalah platform terintegrasi yang menghubungkan tim *sales/canvasser* lapangan dengan sistem *backoffice* distributor secara *real-time*. Fitur utamanya mencakup *Mobile SFA Taking Order*, *Geotagging & New Outlet Onboarding (NOO)*, *Live Tracking*, serta penanganan *Pesanan Tanpa Kunjungan / Out of Stock (OOS)*.

Dalam studi kasus ini, seorang **SFA Supervisor** memerlukan antarmuka web terpusat untuk mengevaluasi kinerja harian tim *canvasser* di wilayah operasionalnya:
1. **Efektivitas Kunjungan**: Membandingkan realisasi kunjungan toko terhadap rencana target harian.
2. **Realisasi Omset**: Memantau total nilai rupiah pesanan (*taking order*) yang dibukukan.
3. **Deteksi Kendala Stok (OOS)**: Mengidentifikasi jumlah pesanan yang gagal dipenuhi akibat ketiadaan stok barang di gudang/distributor agar dapat segera dimitigasi.

---

## ✅ Matriks Pemenuhan Kebutuhan Soal (Requirement Compliance)

Seluruh 7 poin tugas dan ketentuan teknis pada dokumen soal telah dianalisis dan dipenuhi secara menyeluruh:

| No | Kebutuhan / Tugas Soal (PDF) | Status | Implementasi pada Aplikasi | Berkas Terkait |
| :-: | :--- | :-: | :--- | :--- |
| **1** | **Halaman Login Terhubung ke API Sungguhan**<br>Form username, password, tombol "Masuk", terhubung ke `https://dummyjson.com/auth/login`, penanganan error yang jelas. | **Terpenuhi** ⭐ | Menggunakan React Hook Form + Zod. Terhubung langsung ke API DummyJSON. Dilengkapi alert error informatif berbahasa Indonesia, tombol *quick demo accounts*, dan *smart email-to-username resolver*. | [`LoginForm.tsx`](src/components/auth/LoginForm.tsx)<br>[`api.ts`](src/lib/api.ts) |
| **2** | **Redirect Dashboard & Tampilkan Nama Pengguna**<br>Mengarahkan user setelah login dan menampilkan nama dari respons API di header. | **Terpenuhi** ⭐ | Redirect otomatis via Next.js router. Header menampilkan nama lengkap (`Emily Johnson`), avatar foto profil riil DummyJSON, badge SFA Supervisor, dan dropdown profil interaktif. | [`DashboardHeader.tsx`](src/components/dashboard/DashboardHeader.tsx)<br>[`AuthContext.tsx`](src/context/AuthContext.tsx) |
| **3** | **Dashboard Responsif (Desktop, Tablet, Mobile)**<br>Menampilkan daftar sales dan metrik dari dataset lokal. | **Terpenuhi** ⭐ | Desain *fluid responsive* berbasis Tailwind CSS. Optimal di desktop, tablet, dan smartphone dengan penanganan khusus layar sentuh. | [`page.tsx`](src/app/dashboard/page.tsx)<br>[`SalesTable.tsx`](src/components/dashboard/SalesTable.tsx) |
| **4** | **Kartu Ringkasan (Summary Cards)**<br>Minimal: Total kunjungan realisasi tim, rata-rata efektivitas tim, total nilai order. | **Terpenuhi** ⭐ | Menghitung 4 metrik dinamis: Realisasi Kunjungan (76 Outlet), Rata-rata Efektivitas (80.2%), Total Nilai Order (Rp 33.130.002), dan Pesanan Gagal OOS (10 Order). | [`SummaryCards.tsx`](src/components/dashboard/SummaryCards.tsx)<br>[`utils.ts`](src/lib/utils.ts) |
| **5** | **Visualisasi Grafik (Minimal 1 Chart Bar/Pie)**<br>Visualisasi data, misal efektivitas kunjungan antar sales. | **Terpenuhi** ⭐ | **Interactive Recharts Bar Chart** dengan 2 mode tampilan (% Efektivitas vs Planned/Realisasi), gradasi *Electric Blue* & *Emerald Target 100%*, custom tooltip, dan *docked mobile detail card*. | [`PerformanceChart.tsx`](src/components/dashboard/PerformanceChart.tsx) |
| **6** | **Fitur Pencarian & Filter Sederhana**<br>Pencarian nama/area dan filter berdasarkan area. | **Terpenuhi** ⭐ | *Live text search* (nama salesman/area), dropdown filter wilayah, *multi-column sorting* (asc/desc), pagination interaktif, serta *empty state* dengan tombol *reset filter*. | [`SalesTable.tsx`](src/components/dashboard/SalesTable.tsx) |
| **7** | **Tombol Logout pada Dashboard**<br>Mengembalikan pengguna ke halaman Login. | **Terpenuhi** ⭐ | Tombol logout di dropdown profil supervisor. Membersihkan sesi `localStorage` dan meredirect pengguna kembali ke `/login`. | [`DashboardHeader.tsx`](src/components/dashboard/DashboardHeader.tsx) |
| **8** | **Ketentuan Teknis Wajib**<br>Next.js, TypeScript, Tailwind CSS, dataset lokal, README jelas. | **Terpenuhi** ⭐ | Next.js 16.3.4 (Turbopack), React 19, TypeScript strict mode, Tailwind CSS v4, dataset lokal presisi, dan dokumentasi lengkap. | *Root Repository* |

---

## 🌟 Fitur Unggulan & Penyempurnaan Tambahan

Selain memenuhi seluruh kebutuhan dasar soal, aplikasi ini dilengkapi berbagai fitur bernilai tambah (*exceeding expectations*):

### 1. Desain Logo Vektor (`Logo.tsx`)
- Logo SVG murni kustom tanpa gambar statis raster, merepresentasikan huruf **"D"** (*Distribution*), jalur tulang punggung rantai pasok (*Spine Chain*), titik simpul toko (*Distribution Nodes*), dan panah pertumbuhan penjualan (*Dynamic Growth Arrow*).
- Menggunakan ID SVG dinamis via `useId()` sehingga aman dari bentrokan ID rendering di Next.js.

### 2. Optimasi Mobile & Tablet Touch Experience
- **Horizontal Scrollable Chart**: Pada layar HP/tablet, grafik memiliki batas minimum lebar yang nyaman (`min-w-155`) sehingga setiap batang memiliki ruang sentuh yang lega tanpa berdesakan.
- **Docked Mobile Detail Card**: Rincian metrik salesman tampil pada kartu interaktif khusus tepat di bawah grafik saat batang disentuh di smartphone, mencegah *floating tooltip* yang menutupi grafik atau terhalang jempol pengguna.
- **Bebas Outline Mengganggu**: Telah dikonfigurasi penghilangan *browser focus border* dan `-webkit-tap-highlight-color` saat batang grafik disentuh pada perangkat layar sentuh.

### 3. Dukungan Penuh Dark Mode & Light Mode
- Dilengkapi tombol toggle tema dengan animasi ikon Matahari & Bulan berbasis **Framer Motion**.
- Terintegrasi dengan warna tema grafik Recharts (grid lines dan label sumbu otomatis berganti kontras mengikuti mode gelap/terang).
- Bebas *flicker* saat dimuat ulang (*anti-flash script* & sinkronisasi tema).

### 4. Tombol Cepat Akun Demo (One-Click Demo Accounts)
- Memudahkan penguji/rekruter menguji login tanpa harus menghafal atau mengetik kredensial DummyJSON secara manual:
  - **Emily Johnson** (`emilys` / `emilyspass`) — *Sales Manager* (⭐ Akun Utama)
  - **Michael Williams** (`michaelw` / `michaelwpass`) — *Support Specialist*

---

## 🔑 Kredensial Pengujian (DummyJSON)

Akun uji resmi yang terhubung ke server publik [https://dummyjson.com/users](https://dummyjson.com/users):

| Nama Akun | Username / Email | Password | Jabatan DummyJSON |
| :--- | :--- | :--- | :--- |
| **Emily Johnson** | `emilys` *(atau `emily.johnson@x.dummyjson.com`)* | `emilyspass` | Sales Manager (⭐ Utama) |
| **Michael Williams** | `michaelw` *(atau `michael.williams@x.dummyjson.com`)* | `michaelwpass` | Support Specialist |

---

## 🛠️ Arsitektur & Teknologi yang Digunakan

| Teknologi | Versi | Alasan & Justifikasi Pemilihan |
| :--- | :---: | :--- |
| **Next.js (App Router)** | `16.3.4` | Framework React modern dengan *Turbopack bundling* ultra cepat, optimasi aset gambar dan font bawaan, serta arsitektur berbasis rute yang bersih. |
| **React** | `19.0.0` | Menghadirkan performa render mutakhir dengan *Concurrent features* dan integrasi `useSyncExternalStore` untuk manajemen state lokal tanpa efek samping hidrasi. |
| **TypeScript** | `^5` | Memberikan *type-safety* penuh pada antarmuka model data (`SalesPerformance`, `UserProfile`), memastikan tidak ada *runtime undefined errors*. |
| **Tailwind CSS** | `v4` | Engine styling modern berbasis CSS-first yang menghasilkan bundle CSS ultra ringan dengan utilitas responsif lengkap. |
| **Recharts** | `^2.15` | Pustaka visualisasi data deklaratif yang terintegrasi sempurna dengan siklus hidup React dan mendukung grafis SVG responsif. |
| **Framer Motion** | `^12` | Menyediakan micro-interactions yang elegan pada transisi kartu, pergantian tema gelap/terang, dan animasi loading. |
| **React Hook Form + Zod** | `^7` / `^3` | Validasi input form berbasis skema deklaratif yang tangguh dan memberikan umpan balik kesalahan secara *instant*. |
| **Lucide React** | `^0.475` | Ikonografi SVG yang bersih, tajam, dan seragam untuk estetika dashboard korporat. |

---

## 📂 Struktur Direktori Proyek

```text
test-maganghub-urbansolv/
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Halaman utama dashboard (Summary, Chart, Table)
│   │   ├── login/
│   │   │   └── page.tsx            # Halaman login dengan showcase brand story
│   │   ├── globals.css             # Konfigurasi Tailwind v4 & touch reset
│   │   ├── layout.tsx              # Root layout, Plus Jakarta Sans, Provider wrapper
│   │   └── page.tsx                # Root redirect otomatis (/dashboard atau /login)
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginForm.tsx       # Form login interaktif (Zod, API, Quick Accounts)
│   │   ├── dashboard/
│   │   │   ├── DashboardHeader.tsx # Header aplikasi, info user API, theme toggle & logout
│   │   │   ├── PerformanceChart.tsx# Recharts visualizer dual-mode & mobile docked card
│   │   │   ├── SalesTable.tsx      # Tabel data sales, search, filter, sort, pagination
│   │   │   └── SummaryCards.tsx    # 4 kartu ringkasan metrik utama
│   │   └── ui/
│   │       ├── Badge.tsx           # Komponen badge status
│   │       ├── Button.tsx          # Komponen tombol reusable
│   │       ├── Card.tsx            # Primitif kartu container
│   │       ├── Input.tsx           # Primitif input form
│   │       ├── Logo.tsx            # Vektor SVG resmi Distrilink SAP
│   │       ├── Select.tsx          # Dropdown filter wilayah
│   │       └── ThemeToggle.tsx     # Animated Sun/Moon switcher
│   ├── context/
│   │   ├── AuthContext.tsx         # Manajemen status sesi & integrasi API login
│   │   └── ThemeContext.tsx        # Manajemen status dark/light mode
│   ├── data/
│   │   └── salesData.ts            # Dataset lokal performa 5 salesman harian
│   ├── lib/
│   │   ├── api.ts                  # Integrasi fetch API DummyJSON
│   │   └── utils.ts                # Helper format Rupiah, persen, & kalkulasi metrik
│   └── types/
│       ├── auth.ts                 # Type definition profil user & autentikasi
│       └── sales.ts                # Type definition metrik sales & dashboard summary
├── public/                         # Aset publik statis
├── package.json                    # Konfigurasi dependensi
├── tsconfig.json                   # Konfigurasi TypeScript
└── README.md                       # Dokumentasi resmi proyek
```

---

## 💻 Panduan Instalasi & Menjalankan di Lokal

### Prasyarat:
- **Node.js**: Versi 18.18.0 atau lebih baru (direkomendasikan Node.js v20 LTS atau v22/v24).
- **npm** (atau package manager alternatif seperti `pnpm` / `yarn`).

### Langkah-langkah:

1. **Clone repositori dari GitHub**:
   ```bash
   git clone https://github.com/Pras00/distrilink-sap.git
   cd distrilink-sap
   ```

2. **Instal seluruh dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan lokal (*development mode*)**:
   ```bash
   npm run dev
   ```
   Buka peramban (*browser*) dan kunjungi: **[http://localhost:3000](http://localhost:3000)**.  
   *(Aplikasi akan secara otomatis mengarahkan Anda ke `/login` jika belum memiliki sesi aktif).*

4. **Menjalankan Linter**:
   ```bash
   npm run lint
   ```

5. **Membangun versi produksi (*production build*)**:
   ```bash
   npm run build
   npm run start
   ```

---

## 👤 Informasi Pengembang

- **Nama**: Prasetia Wahyu Ramadhan
- **Mitra Industri**: PT Urbansolv (Distrilink SAP)

