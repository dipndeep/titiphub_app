# TitipHub

**TitipHub** adalah sebuah website sistem informasi berbasis *multi-role* yang dirancang khusus untuk mempermudah operasional usaha jasa titip (jastip) lokal. Aplikasi ini menyediakan hub terpusat di mana pelanggan bisa menitipkan pesanan, manajer dapat memperbarui status pembelian dan pengiriman, serta pemilik usaha dapat memantau seluruh aktivitas transaksi.

## 🌟 Fitur Utama

Aplikasi ini mendukung 3 jenis pengguna (Customer, Manager, dan Owner) dengan fitur spesifik untuk masing-masing peran:

### 1. Customer (Pelanggan)
- **Formulir Jastip:** Memasukkan detail barang titipan (nama barang, referensi gambar, catatan).
- **Pelacakan Status (Tracking):** Memantau status pesanan secara *real-time* dan transparan.

### 2. Manager (Pengelola)
- **Manajemen Pesanan:** Menerima atau menolak pesanan dari pelanggan.
- **Pembaruan Status:** Mengubah status barang (contoh: diproses, dibeli, dikirim, selesai).
- **Kalkulasi Biaya:** Menentukan harga, ongkos kirim berdasarkan berat dan rute.

### 3. Owner (Pemilik)
- **Master Dashboard:** Memantau rekapitulasi performa jastip dan riwayat transaksi.
- **Manajemen Pengguna:** Menambahkan akun Manager baru atau mengelola akun yang bermasalah.

## 🚀 Tech Stack

TitipHub dibangun menggunakan arsitektur **Client-Server** yang modern untuk performa optimal dan kemudahan maintenance:

**Frontend:**
- [React.js](https://react.dev/) dengan [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) untuk styling
- [shadcn/ui](https://ui.shadcn.com/) untuk komponen antarmuka
- Routing modern dan pengelolaan state

**Backend & Database:**
- [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- [SQLite](https://sqlite.org/index.html) (Database ringan untuk <100 pengguna aktif)
- [Drizzle ORM](https://orm.drizzle.team/)
- Sistem Autentikasi (JWT / Better Auth)

## 🎨 Identitas Visual

Desain antarmuka TitipHub menggunakan skema warna khusus yang profesional dan segar:
- **Primary (`#1F6F5F`):** Warna utama, header, dan elemen inti.
- **Secondary (`#2FA084`):** Tombol aksi utama.
- **Accent (`#6FCF97`):** Elemen sukses dan highlight.
- **Background (`#EEEEEE`):** Latar belakang untuk meminimalisir distraksi.

## ⚙️ Alur Penggunaan (User Flow)

1. **Customer** membuat pesanan melalui form titipan.
2. Pesanan masuk dengan status "Menunggu Konfirmasi".
3. **Manager** menerima pesanan dan membelikan barang (Status: "Diproses").
4. **Manager** mengirimkan barang (Status: "Barang Dikirim").
5. **Customer** menerima pesanan (Status: "Selesai").
6. **Owner** dapat melihat laporan dari seluruh siklus ini di dashboard.

## 📝 Panduan Menjalankan

Silakan baca [`PANDUAN_RUN.md`](./PANDUAN_RUN.md) untuk instruksi mendetail mengenai cara menginstal dependensi dan menjalankan server *frontend* dan *backend* secara lokal.
