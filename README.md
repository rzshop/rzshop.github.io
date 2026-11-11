# RZ Shop — Multi-game marketplace template

Template frontend katalog dengan identitas RZ Shop, logo beranimasi, karakter RZ, kategori Free Fire, Mobile Legends, Roblox, PUBG Mobile dan lainnya.

## Fitur demo
- Hero dan navigasi marketplace
- Kategori game dan pencarian
- Filter budget dan pengurutan harga
- Kartu listing dengan spesifikasi
- Rekomendasi premium
- Riwayat terjual (data ilustrasi)
- Favorit dan keranjang lokal
- Bagian budget, panduan, form minat listing, FAQ
- Responsive untuk HP dan desktop

## Menjalankan
Ekstrak ZIP, lalu buka `index.html` di browser. Untuk GitHub Pages, unggah `index.html`, `style.css`, `app.js`, dan folder `assets` ke repositori website.

## Mengganti produk
Edit array `listings` pada bagian atas `app.js`. Data yang ada hanyalah contoh dan bukan penawaran akun sungguhan. Isi nama, game, harga, deskripsi, tag, dan spesifikasi dengan informasi yang benar serta memiliki izin untuk ditampilkan.

## Batasan penting
Ini template frontend/demo. Belum ada backend, akun pengguna, database, panel admin, pembayaran, checkout, sistem stok, atau pengiriman digital. Keranjang dan favorit hanya tersimpan lokal di browser. Formulir jual akun hanya demo dan tidak mengirim data ke server.
Sebelum mempublikasikan, periksa ketentuan resmi setiap penerbit game tentang transfer atau jual beli akun. Jangan pernah meminta atau mengirim password, OTP, kode pemulihan, atau akses email pribadi melalui formulir publik.


## Database Firebase
Lihat `README-DATABASE.md` untuk menghubungkan Firestore. Isi konfigurasi Web App pada `firebase-config.js`, buat Firestore, lalu terapkan `firestore.rules`.
