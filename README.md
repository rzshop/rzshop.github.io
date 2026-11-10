# RZ Shop — Website Template

Template website statis RZ Shop dengan tema hitam-biru, logo animasi, karakter yang kamu kirim, katalog contoh, pencarian, filter kategori, modal detail, FAQ, dan layout responsif.

## Isi folder
- `index.html` — struktur halaman
- `style.css` — tampilan dan animasi
- `script.js` — katalog demo, pencarian, filter, dan detail produk
- `assets/rz-character.png` — karakter yang kamu unggah
- `assets/rz-logo.png` — logo RZ yang kamu unggah

## Cara menjalankan
1. Ekstrak ZIP.
2. Buka folder `rz_shop_website`.
3. Buka `index.html` melalui browser, atau unggah seluruh isi folder ke hosting statis.

## Mengganti produk
Buka `script.js`, cari bagian `const products = [...]`. Setiap produk memiliki:
- `game`: kategori game
- `name`: nama produk
- `desc`: deskripsi singkat
- `price`: harga yang ditampilkan
- `badge`: label kecil
- `icon`: teks ikon kategori
- `detail`: detail di jendela pop-up

Ganti semua produk contoh dengan data produk yang benar. Harga yang ada sekarang hanya data demo.

## Mengganti kontak toko
Template ini belum memiliki nomor WhatsApp atau alamat email karena kontak resmi belum diberikan. Tambahkan tombol kontak setelah kamu menentukan kontak toko.

## Catatan penting
- Ini adalah frontend/template statis, bukan salinan backend atau sistem internal situs referensi.
- Checkout, pembayaran, database, login, panel admin, dan pengelolaan stok belum diaktifkan.
- Sebelum menerima pesanan sungguhan, tambahkan backend yang aman, validasi pesanan, kebijakan privasi, syarat layanan, dan metode pembayaran resmi.
- Logo menggunakan animasi glow dan gerak halus. Animasi otomatis dikurangi jika perangkat pengguna mengaktifkan pengaturan reduced motion.
