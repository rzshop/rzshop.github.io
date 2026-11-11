# RZ Shop — Firebase Firestore

Paket ini menghubungkan katalog RZ Shop ke Firestore. Project ID sudah diisi: `rz-shop-912bd`.

## 1. Ambil konfigurasi Web App
1. Buka https://console.firebase.google.com/ dan pilih project `rz-shop-912bd`.
2. Buka Project settings (ikon roda gigi) > General > Your apps.
3. Jika belum ada aplikasi Web, tekan `</>` lalu daftarkan aplikasi Web.
4. Salin `apiKey`, `messagingSenderId`, dan `appId` ke `firebase-config.js`. Domain dan projectId sudah disiapkan.
5. Simpan file lalu unggah seluruh isi folder ke repository GitHub Pages.

## 2. Buat database
1. Firebase Console > Build > Firestore Database > Create database.
2. Pilih lokasi yang tersedia dan dekat dengan pengguna (pilihan lokasi tidak dapat diubah setelah database dibuat).
3. Setelah database aktif, buka tab Rules.
4. Salin isi `firestore.rules` ke Rules lalu tekan Publish.

## 3. Tambahkan produk
Buka Firestore > Data > Start collection, nama koleksi `products`.
Buat dokumen dengan field:
- `name` string — nama listing
- `game` string — Free Fire / Mobile Legends / Roblox / PUBG Mobile / Lainnya
- `price` number — harga dalam Rupiah
- `tag` string — label kartu
- `description` string — deskripsi
- `spec` array — contoh ["Level 45", "Rank Heroic"]
- `premium` boolean — true atau false
- `status` string — `active` agar tampil, `hidden` agar disembunyikan
- `createdAt` timestamp — waktu dibuat (opsional)

Website mengambil produk berstatus `active` dari database. Jika koleksi belum berisi produk, katalog demo masih akan tampil.

## 4. Pengajuan listing
Formulir `Jual akun` mengirim data ke koleksi `listingRequests` dengan status `pending`. Admin dapat memeriksanya di Firebase Console > Firestore > Data.
Jangan meminta password, OTP, kode pemulihan, atau akses email dari pengaju.

## 5. Admin
Rules hanya memberi hak tulis produk dan membaca pengajuan kepada `ffmiskin188@gmail.com`. Tambahkan email admin lain di daftar `isAdmin()` pada `firestore.rules`, lalu Publish ulang. Agar aturan email bekerja, admin harus login ke Firebase Authentication. Aktifkan Authentication > Sign-in method > Google dan tambahkan domain GitHub Pages di Authentication > Settings > Authorized domains.

## Catatan keamanan
- `apiKey` Firebase untuk aplikasi web bukan password; batasi domain dan aktifkan App Check sebelum penggunaan publik.
- Jangan pernah mengunggah service-account JSON atau private key ke GitHub.
- Checkout, pembayaran, dan pengiriman digital belum diaktifkan.
- Pastikan ketentuan penerbit game mengizinkan listing yang ditayangkan.
