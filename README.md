# Gemini AI Chatbot

Ini adalah aplikasi chatbot sederhana yang dibangun menggunakan Node.js (Express) di sisi backend dan HTML, CSS, serta JavaScript di sisi frontend. Chatbot ini terhubung dengan Gemini API untuk menghasilkan respons.

## Fitur
- Integrasi dengan Gemini API untuk percakapan AI.
- Antarmuka pengguna yang bersih dan responsif.
- Gelembung chat yang bergaya untuk pesan pengguna dan bot.

## Cara Menjalankan Proyek

1.  **Instal Dependensi**: Pastikan Anda memiliki Node.js terinstal. Kemudian, instal dependensi yang diperlukan dengan menjalankan perintah berikut di direktori root proyek:
    ```bash
    npm install
    ```

2.  **Konfigurasi Gemini API Key**: Buat file `.env` di direktori root proyek dan tambahkan kunci API Gemini Anda:
    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```
    Ganti `YOUR_GEMINI_API_KEY` dengan kunci API Gemini Anda yang sebenarnya.

3.  **Jalankan Server**: Mulai server backend dengan perintah:
    ```bash
    node index.js
    ```

4.  **Akses Aplikasi**: Buka browser Anda dan navigasikan ke `http://localhost:3000`.

## Struktur Proyek

```
.
├── .env                 (Untuk variabel lingkungan)
├── index.js             (Backend server dengan Express)
├── package.json         (Dependensi proyek)
└── public/
    ├── index.html       (Struktur UI frontend)
    ├── script.js        (Logika frontend untuk chat)
    └── style.css        (Styling frontend)
```