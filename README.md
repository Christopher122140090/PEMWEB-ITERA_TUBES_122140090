# PEMWEB-ITERA_TUBES_122140090

Proyek ini merupakan tugas besar untuk mata kuliah Pemrograman Web di ITERA. Aplikasi ini, bernama **Wardrobe Wise**, adalah platform manajemen pakaian yang memungkinkan pengguna untuk mengatur dan mengelola koleksi pakaian mereka secara efisien.

## Fitur Utama

- **Manajemen Pakaian**: Tambah, edit, dan hapus item pakaian.
- **Kategorisasi**: Kelompokkan pakaian berdasarkan kategori seperti atasan, bawahan, aksesori, dll.
- **Pencarian dan Filter**: Cari pakaian berdasarkan nama, kategori, atau atribut lainnya.
- **Antarmuka Pengguna Interaktif**: Desain responsif yang mudah digunakan.

## Teknologi yang Digunakan

- **Frontend**: React dan MUI UI
- **Backend**: Python 
- **Database**: PostgreSQL
- **Manajemen Paket**: Node.js dengan npm

## Struktur Proyek

```
PEMWEB-ITERA_TUBES_122140090/
├── backend/                # Kode sumber untuk backend
├── wardrobe-wise/          # Kode sumber untuk frontend
├── node_modules/           # Modul Node.js
├── .idea/                  # Konfigurasi IDE
├── .vscode/                # Konfigurasi VSCode
├── package.json            # File konfigurasi npm
├── package-lock.json       # File lock untuk npm
├── run_tests.sh            # Skrip untuk menjalankan pengujian
└── README.md               # Dokumentasi proyek
```

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

- [Node.js](https://nodejs.org/) (versi terbaru)
- [Python](https://www.python.org/) (versi 3.6 atau lebih baru)
- [pip](https://pip.pypa.io/en/stable/) (pengelola paket Python)

## Cara Menjalankan Proyek

### 1. Kloning Repositori

```bash
git clone https://github.com/Christopher122140090/PEMWEB-ITERA_TUBES_122140090.git
cd PEMWEB-ITERA_TUBES_122140090
```

### 2. Instalasi Dependensi

#### Backend (Python)

```bash
cd backend
pip install -r requirements.txt
```

#### Frontend (Node.js)

```bash
cd ../wardrobe-wise
npm install
```

### 3. Menjalankan Aplikasi

#### Backend

```bash
cd ../backend
python app.py
```

#### Frontend

```bash
cd ../wardrobe-wise
npm start
```

Aplikasi akan berjalan di `http://localhost:3000/` secara default.

## Pengujian

Untuk menjalankan pengujian, gunakan skrip berikut:

```bash
./run_tests.sh
```

Pastikan Anda memiliki izin eksekusi untuk skrip tersebut. Jika tidak, ubah izin dengan:

```bash
chmod +x run_tests.sh
```

## Kontribusi

Kontribusi sangat dihargai! Silakan fork repositori ini dan buat pull request untuk perbaikan atau penambahan fitur.
