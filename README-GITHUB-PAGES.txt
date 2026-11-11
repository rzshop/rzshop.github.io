RZ SHOP - Firebase Edition

DEPLOY KE GITHUB PAGES:
1. Ekstrak ZIP ini.
2. Buka repository GitHub rzshop.github.io.
3. Upload SEMUA ISI folder ini (index.html, style.css, app.js, assets/) ke ROOT repository, bukan folder bertingkat.
4. Commit changes.
5. Buka Settings > Pages dan pastikan Deploy from a branch, branch main, folder /(root).
6. Tunggu GitHub Pages selesai deploy.

LOGIN ADMIN:
- Tekan tombol Admin di header website.
- Tekan Masuk dengan Google.
- Login menggunakan akun Google yang UID-nya merupakan Document ID di Firestore admins dan memiliki field role = admin.
- Tambahkan https://rzshop.github.io ke Firebase Authentication > Settings > Authorized domains.

DATABASE:
- Koleksi products: field name (string), game (string), price (number), description (string), image (string opsional), status (string: active/draft).
- Koleksi admins: Document ID = Firebase Auth UID; field email (string), role (string: admin).

PENTING:
- Jangan gunakan data demo sebagai produk sungguhan.
- Jangan meminta atau menyimpan password, OTP, kode pemulihan, atau kredensial akun game.
- Periksa ketentuan penerbit game sebelum mengiklankan perpindahan atau penjualan akun.
- Jangan membuka akses tulis Firestore untuk publik. Gunakan Rules yang memverifikasi UID admin.
