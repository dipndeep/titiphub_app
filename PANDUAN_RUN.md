# Panduan Menjalankan TitipHub (Frontend & Backend)

Dokumen ini berisi panduan lengkap untuk memasang, menyiapkan database, dan menjalankan aplikasi **TitipHub** secara lokal di komputer Anda.

---

## 📋 Prasyarat
Pastikan Anda sudah menginstal **Node.js** di komputer Anda. Anda bisa mengeceknya dengan menjalankan perintah ini di terminal/Command Prompt:
```bash
node -v
npm -v
```

---

## 🛠️ Langkah 1: Persiapan & Menjalankan Backend (Server API)

Backend menggunakan Node.js, Express, SQLite, dan Drizzle ORM.

1. **Buka Terminal Baru** dan masuk ke folder `backend`:
   ```bash
   cd d:\code\titiphub_app\backend
   ```
2. **Instal Dependensi Backend**:
   *(Langkah ini hanya perlu dilakukan satu kali di awal)*
   ```bash
   npm install
   ```
3. **Inisialisasi Database & Seed Data**:
   *(Membuat file database SQLite lokal dan mengisi data akun dummy + contoh transaksi)*
   ```bash
   npm run db:seed
   ```
4. **Jalankan Server Backend**:
   ```bash
   npm run dev
   ```
   *Server backend akan berjalan di **http://localhost:5000**.*

---

## 💻 Langkah 2: Menjalankan Frontend (Aplikasi React)

Frontend menggunakan React.js + Vite + Tailwind CSS.

1. **Buka Terminal Baru Lainnya** (biarkan terminal backend tetap berjalan) dan masuk ke folder `frontend`:
   ```bash
   cd d:\code\titiphub_app\frontend
   ```
2. **Instal Dependensi Frontend (Jika Belum)**:
   ```bash
   npm install
   ```
3. **Jalankan Dev Server Frontend**:
   ```bash
   npm run dev
   ```
4. **Buka di Browser**:
   Buka alamat berikut di browser Anda: **[http://localhost:5173](http://localhost:5173)**.

---

## 💡 Kredensial Akun Uji Coba (Demo)
Anda dapat menggunakan akun-akun dummy berikut untuk mencoba fitur multi-role pada halaman **Sign In** (tersedia juga tombol pengisian otomatis/autofill di halaman login):

| Role | Nama Pengguna | Email | Password | Keterangan |
|---|---|---|---|---|
| **Owner** | Pak Joko (Owner) | `owner@titiphub.com` | `owner123` | Akses Master Dashboard Owner |
| **Manager** | Andi (Admin 1) | `manager@titiphub.com` | `manager123` | Akses Admin Dashboard Manager |
| **Customer** | Budi Santoso | `budi@email.com` | `customer123` | Akses Formulir Jastip & Lacak Pesanan |
| **Customer** | Siti Rahayu | `siti@email.com` | `customer123` | Akun Pelanggan 2 |
| **Customer** | Agus Pratama | `agus@email.com` | `customer123` | Akun Pelanggan 3 |

---

## 🛑 Cara Mematikan Server
Jika Anda ingin berhenti menjalankan aplikasi, masuk ke masing-masing terminal tempat server backend dan frontend berjalan, lalu tekan:
- **`Ctrl + C`**
Lalu ketik **`Y`** (jika diminta) dan tekan Enter.
