# Panduan Menjalankan Frontend TitipHub

Dokumen ini berisi panduan singkat untuk menjalankan aplikasi antarmuka (frontend) React.js secara mandiri di komputer Anda.

## Prasyarat
Pastikan Anda sudah menginstal **Node.js** di komputer Anda. Anda bisa mengeceknya dengan menjalankan perintah ini di terminal/Command Prompt:
```bash
node -v
npm -v
```

## Langkah-langkah Menjalankan Server

1. **Buka Terminal** (Bisa melalui Visual Studio Code dengan menekan `Ctrl + \`` atau menggunakan Command Prompt/PowerShell).
2. **Masuk ke folder `frontend`**. Ketik perintah berikut dan tekan Enter:
   ```bash
   cd d:\code\titiphub_app\frontend
   ```
   *(Jika terminal Anda sudah berada di dalam folder `frontend`, Anda bisa melewati langkah ini).*

3. **Jalankan Server Pengembangan (Dev Server)**. Ketik perintah berikut:
   ```bash
   npm run dev
   ```

4. **Buka di Browser**. Setelah perintah berhasil dijalankan, terminal akan memunculkan tulisan seperti:
   ```
   ➜  Local:   http://localhost:5173/
   ```
   Klik URL tersebut sambil menahan tombol `Ctrl` (di VS Code) atau ketik manual **http://localhost:5173** di aplikasi browser Anda (Chrome/Firefox/Edge).

## Cara Mematikan Server
Jika Anda ingin berhenti menjalankan aplikasi, cukup kembali ke terminal tempat server berjalan dan tekan kombinasi tombol berikut:
- **`Ctrl + C`**
Lalu ketik **`Y`** (jika diminta) dan tekan Enter.

---

*Catatan: Semua dependensi dan library (seperti React, Tailwind CSS versi 3, dll) sudah diinstal. Anda tidak perlu lagi menjalankan `npm install` kecuali jika ada pembaruan kode baru dari GitHub atau jika Anda menghapus folder `node_modules`.*
