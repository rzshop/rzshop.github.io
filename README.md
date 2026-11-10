# RZ Shop — Website Starter

Website storefront responsif dengan identitas RZ Shop, logo animasi, karakter anime, katalog, pencarian, filter kategori, pengurutan harga, detail produk, wishlist, keranjang, dan ringkasan pemesanan WhatsApp.

## Cara menjalankan
1. Ekstrak `RZ-Shop.zip`.
2. Buka folder `rz_shop`.
3. Buka `index.html` di browser untuk melihat demo.

## Pengaturan sebelum dipublikasikan
- Buka `app.js`, lalu isi `STORE_WHATSAPP` dengan nomor WhatsApp toko format internasional tanpa tanda `+`.
- Edit array `products` di bagian atas `app.js` untuk mengganti nama, kategori, harga, label, dan deskripsi produk.
- Ganti foto/ilustrasi produk demo sesuai aset yang memang kamu punya izin untuk digunakan.

## Catatan penting
- Ini adalah template frontend/demo. Keranjang dan wishlist disimpan di browser pengguna (localStorage).
- Checkout hanya membuat ringkasan pesan WhatsApp. Tidak ada pembayaran online, akun pengguna, database, panel admin aman, atau sinkronisasi stok di versi ini.
- Jangan memasukkan password rahasia atau data pelanggan ke file frontend. Untuk login admin, database, pembayaran gateway, dan pengelolaan pesanan sungguhan diperlukan backend dan konfigurasi layanan yang aman.
- Gunakan informasi produk, kebijakan, kontak, dan garansi yang benar sebelum toko dipublikasikan.
