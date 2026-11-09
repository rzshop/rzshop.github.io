const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");

initializeApp();
const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

exports.emailLoginNotification = onDocumentCreated({
  document: "loginEvents/{eventId}",
  secrets: [RESEND_API_KEY],
  region: "asia-southeast1"
}, async (event) => {
  const data = event.data.data();
  const time = data.loginAt && data.loginAt.toDate
    ? data.loginAt.toDate().toLocaleString("id-ID", { timeZone: "Asia/Makassar" })
    : "Waktu login tercatat di Firebase";
  const safeName = String(data.name || "Tidak diketahui");
  const safeEmail = String(data.email || "Tidak tersedia");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY.value()}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "RZShop Login <onboarding@resend.dev>",
      to: ["ffmiskin188@gmail.com"],
      subject: "Notifikasi login pelanggan RZShop",
      text: `Ada login Google baru di RZShop.\\nNama: ${safeName}\\nEmail: ${safeEmail}\\nWaktu: ${time}\\n\\nTidak ada password Google yang dikumpulkan.`
    })
  });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend error: ${response.status} ${body}`);
  }
});
