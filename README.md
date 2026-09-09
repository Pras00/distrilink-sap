# Distrilink SAP — Dashboard Analisa Performa Salesman
> **Take-Home Test Magang Frontend Web — MagangHub x PT Urbansolv**  
> Studi Kasus: Purwarupa (*Prototype*) Dashboard Analisa Performa Salesman untuk Supervisor SAP (Sales Automation Platform).

---

## 📋 Ringkasan Studi Kasus

**Distrilink SAP (Sales Automation Platform)** adalah platform enterprise yang menghubungkan tim *sales/canvasser* di lapangan dengan sistem *backoffice* secara *real-time*. 

Dalam studi kasus ini, seorang **Supervisor SAP** membutuhkan antarmuka web untuk memantau performa harian tim sales di wilayah kerjanya:
1. Seberapa efektif kunjungan outlet yang telah dilakukan terhadap target terjadwal.
2. Berapa total nilai transaksi *taking order* (omset) yang berhasil dicapai.
3. Berapa banyak pesanan yang gagal akibat kendala ketersediaan stok (*Out of Stock* / OOS).

---

## 🚀 Fitur Utama

### 1. Autentikasi Riil (API DummyJSON) & Validasi Schema Zod
- **API Sungguhan**: Terhubung langsung ke `POST https://dummyjson.com/auth/login`.
- **Validasi Schema Zod & React Hook Form**: Form divalidasi secara instan menggunakan schema Zod sebelum request dikirimkan ke server.
- **Penanganan Status Autentikasi**:
  - **Sukses (200)**: Menyimpan profil dan token pengguna ke *state* dan `localStorage`, kemudian mengalihkan pengguna ke `/dashboard`.
  - **Gagal (400/401)**: Menampilkan pesan error spesifik dari API (contoh: *Invalid credentials*) menggunakan kartu alert animasi.
  - **Loading State**: Tombol submit menampilkan animasi *spinner* dan berstatus *disabled* selama proses verifikasi.
- **Pilihan Akun Demo Otentik (dummyjson.com/users)**: Tersedia 4 tombol cepat untuk menguji multi-profil user dari server DummyJSON:
  - **Emily Johnson** (`emilys` / `emilyspass`) — *Sales Manager* (⭐ Rekomendasi Utama)
  - **Michael Williams** (`michaelw` / `michaelwpass`) — *Support Specialist*
- **Route Guard / Proteksi Halaman**: Mencegah akses ke `/dashboard` jika belum login, dan mengarahkan otomatis ke `/dashboard` jika sudah memiliki sesi login aktif.

### 2. Header Dashboard Dinamis, Theme Toggle & Logout
- Menampilkan nama pengguna aktif secara dinamis dari respons API (contoh: **Emily Johnson**).
- Menampilkan avatar foto profil asli dari API DummyJSON, status online, badge peran *SFA Supervisor*, penanggalan dinamis Bahasa Indonesia.
- **Tombol Animasi Dark / Light Mode (ThemeToggle)**: Tombol interaktif dengan animasi rotasi dan skala ikon Bulan & Matahari menggunakan **Framer Motion**.
- Tombol **Logout** yang membersihkan sesi dan mengembalikan pengguna ke halaman Login.

### 3. Tema Gelap & Terang (Dark / Light Mode)
- Mendukung mode tampilan terang (*Light Mode*) dan gelap (*Dark Mode*) secara menyeluruh di seluruh aplikasi.
- **Animasi Ikon Sun & Moon**: Transisi berputar halus ($180^\circ$) dengan efek *spring* saat tombol diklik.
- **Penyimpanan Status**: Preferensi tema tersimpan di `localStorage` (`distrilink_theme`) sehingga tidak hilang saat me-refresh halaman browser.
- **Penyesuaian Visual Cerdas**:
  - Warna kontras kartu dan teks disesuaikan secara presisi.
  - Grid lines dan teks sumbu grafik Recharts otomatis menyesuaikan kontras ketika berpindah tema.

### 4. Ringkasan Metrik (Summary Cards)
Menghitung secara dinamis 4 kartu metrik utama dari dataset:
- **Total Kunjungan Realisasi**: Penjumlahan seluruh kunjungan outlet yang berhasil tercapai ($15 + 20 + 10 + 19 + 12 = 76$ outlet dari target 91).
- **Rata-rata Efektivitas Tim**: Rata-rata persentase efektivitas kunjungan seluruh tim ($80.2\%$).
- **Total Nilai Order**: Akumulasi nilai pesanan dalam format Rupiah standar Indonesia (**Rp 33.130.002**).
- **Total Pesanan Gagal (OOS)**: Indikator kendala stok kosong ($10$ pesanan gagal).

### 5. Visualisasi Grafik Interaktif (Recharts)
- Visualisasi data dengan **Bar Chart** modern yang responsif.
- Fitur **Mode Toggle**:
  - Mode **% Efektivitas**: Membandingkan persentase kunjungan tiap salesman terhadap garis acuan target 100%.
  - Mode **Planned vs Realisasi**: Membandingkan jumlah outlet yang terjadwal versus outlet yang berhasil dikunjungi secara riil.
- **Custom Tooltip**: Menampilkan rincian komprehensif (nama lengkap, area, efektivitas, omset, dan OOS) saat kursor diarahkan ke grafik.

### 6. Tabel Data Performa Interaktif
- Menampilkan seluruh metrik salesman: Nama Salesman, Area Kerja, Kunjungan Planned, Realisasi, Efektivitas Visit, Total Nilai Order, dan Order OOS.
- **Live Search**: Pencarian instan berdasarkan nama salesman atau wilayah area.
- **Filter Area**: Dropdown untuk menyaring data berdasarkan wilayah (Bandung Kota, Bandung Barat, Bandung Timur, Cimahi, Soreang).
- **Sortable Columns**: Pengurutan data (naik/turun) pada seluruh kolom.
- **Indikator Visual**: *Progress bar* dan badge warna (Hijau $\ge 85\%$, Kuning $75-84\%$, Merah $<75\%$) untuk memudahkan evaluasi visual cepat oleh supervisor.
- **Empty State**: Tampilan informatif jika pencarian atau filter tidak menghasilkan data, dilengkapi tombol reset filter.

### 7. Desain UI & Animasi Halus (Framer Motion)
- Menggunakan tipografi **Plus Jakarta Sans** dari Google Fonts yang memberi kesan ramah, luwes, modern, dan sangat profesional tanpa kesan template generik.
- Mengadopsi arsitektur komponen **Shadcn UI** dengan `class-variance-authority`.
- Animasi transisi *staggered entrance*, efek *hover lift*, dan transisi lembut mode chart menggunakan **Framer Motion**.

---

## 🔑 Kredensial Pengujian (DummyJSON)

Akun berikut diambil langsung dari basis data publik [https://dummyjson.com/users](https://dummyjson.com/users):

| Nama Pengguna | Username | Password | Posisi di DummyJSON | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Emily Johnson** | `emilys` | `emilyspass` | Sales Manager | ⭐ Rekomendasi Utama |
| **Michael Williams** | `michaelw` | `michaelwpass` | Support Specialist | Alternatif |

> *Tip: Anda dapat mengklik langsung kartu akun demo di halaman Login untuk mengisi username & password secara otomatis.*

---

## 🛠️ Tech Stack & Justifikasi Arsitektur

| Teknologi | Justifikasi Pemilihan |
| :--- | :--- |
| **Next.js (App Router)** | Framework React standar industri modern yang menyediakan *client/server component separation*, struktur rute berbasis folder yang rapi, optimasi aset otomatis, dan performa kompilasi cepat via Turbopack. |
| **TypeScript** | Memastikan *type safety* yang ketat pada struktur data API DummyJSON, model dataset performa sales, serta props komponen, sehingga meminimalisir potensi *runtime error*. |
| **Tailwind CSS (v4)** | Memungkinkan styling antarmuka dengan efisiensi tinggi, desain responsif multi-breakpoint (`sm`, `md`, `lg`), dan menghasilkan ukuran berkas CSS yang sangat ringan. |
| **Plus Jakarta Sans** | Tipografi geometris modern buatan Indonesia yang memberikan kesan segar, bersahabat, namun berbobot enterprise. |
| **Shadcn UI Architecture** | Komponen UI modular berbasis `class-variance-authority` (CVA) dan Tailwind CSS untuk konsistensi desain sistem. |
| **Zod & React Hook Form** | Validasi schema yang ketat, deklaratif, berkinerja tinggi, dan ramah pengguna dengan error message yang presisi. |
| **Framer Motion** | Pustaka animasi standar produksi untuk memberikan micro-interactions, animasi tombol Sun/Moon, dan transisi antar halaman yang halus. |
| **Recharts** | Pustaka visualisasi data deklaratif yang terintegrasi sempurna dengan komponen React, mendukung `ResponsiveContainer` dan kustomisasi SVG yang halus. |
| **Lucide React** | Koleksi ikon SVG yang konsisten, modern, dan berukuran kecil (*tree-shakeable*). |
| **Context API & LocalStorage** | Manajemen status autentikasi dan tema yang ringan dan persisten di sisi klien tanpa *overhead* pustaka pihak ketiga yang berlebih. |

---

## 💻 Panduan Instalasi & Menjalankan di Lokal

### Prasyarat:
- **Node.js**: Versi 18.18.0 atau lebih tinggi (disarankan v20 / v24).
- **npm** (atau pnpm / yarn).

### Langkah Menjalankan:

1. **Clone repository**:
   ```bash
   git clone <URL_REPOSITORY>
   cd test-maganghub-urbansolv
   ```

2. **Instal seluruh dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan (development mode)**:
   ```bash
   npm run dev
   ```
   Buka peramban (*browser*) dan akses: [http://localhost:3000](http://localhost:3000).

4. **Build untuk produksi (production build test)**:
   ```bash
   npm run build
   npm run start
   ```

---

## 👤 Pengembang
- **Kandidat**: Seleksi Magang Frontend Web MagangHub
- **Mitra Industri**: PT Urbansolv (Distrilink SAP)
