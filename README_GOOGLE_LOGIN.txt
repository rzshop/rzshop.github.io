RZ SHOP - LOGIN GOOGLE AMAN
==========================

EMAIL ADMIN NOTIFIKASI
ffmiskin188@gmail.com

PENTING
- Sistem ini menggunakan Google OAuth melalui Firebase Authentication.
- Website hanya menerima nama, email, foto profil (jika tersedia), dan waktu login.
- Password Google pelanggan TIDAK diminta, disimpan, atau dikirim.
- ZIP ini adalah template integrasi. Login belum aktif sampai konfigurasi Firebase dan layanan email disiapkan.

LANGKAH SETUP

1. Buat project di https://console.firebase.google.com/
2. Tambahkan aplikasi Web (ikon </>) dan salin konfigurasi Firebase.
3. Buka firebase-config.js dan isi apiKey, authDomain, projectId, dan appId.
4. Firebase Console > Authentication > Get started > Sign-in method > aktifkan Google.
5. Authentication > Settings > Authorized domains: tambahkan rzshop.github.io.
6. Firebase Console > Firestore Database > Create database.
7. Pasang rules dari firestore.rules melalui tab Rules.
8. Untuk email notifikasi, siapkan akun Resend di https://resend.com/ dan verifikasi domain pengirim.
9. Install Firebase CLI di komputer, login, lalu dari folder website jalankan:
   firebase deploy --only firestore:rules,functions
   Saat diminta secret, masukkan API key Resend dengan nama RESEND_API_KEY.
10. Untuk produksi, ganti alamat pengirim onboarding@resend.dev dengan alamat dari domain yang sudah diverifikasi di Resend.

CATATAN
- Firebase Functions memerlukan paket Blaze (billing) dan dapat menimbulkan biaya sesuai pemakaian.
- Email notifikasi dikirim oleh Cloud Function server-side; API key Resend tidak diletakkan di website.
- Jika hanya meng-host file statis di GitHub Pages, file Cloud Function tetap harus di-deploy ke Firebase.
- Nomor checkout WhatsApp tetap 082190056440 (format link internasional 6282190056440).
