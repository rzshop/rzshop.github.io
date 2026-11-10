const products = [
  {id:1, game:"Mobile Legends", name:"Akun ML — Koleksi Premium", desc:"Contoh katalog dengan koleksi skin dan detail akun.", price:"Rp 450.000", badge:"POPULAR", icon:"ML", detail:"Ini adalah data contoh. Ganti nama, deskripsi, harga, dan informasi produk sesuai stok asli RZ Shop."},
  {id:2, game:"Mobile Legends", name:"Akun ML — Starter", desc:"Contoh produk untuk kategori Mobile Legends.", price:"Rp 125.000", badge:"NEW", icon:"ML", detail:"Tambahkan detail produk yang benar sebelum dipublikasikan."},
  {id:3, game:"PUBG Mobile", name:"Akun PUBG — Collector", desc:"Contoh katalog untuk kategori PUBG Mobile.", price:"Rp 650.000", badge:"FEATURED", icon:"PUBG", detail:"Tambahkan informasi server, item, dan detail lain yang benar."},
  {id:4, game:"PUBG Mobile", name:"Akun PUBG — Classic", desc:"Contoh produk PUBG Mobile untuk demo tampilan.", price:"Rp 275.000", badge:"DEMO", icon:"PUBG", detail:"Harga dan detail pada template ini bukan penawaran nyata."},
  {id:5, game:"Free Fire", name:"Akun Free Fire — Elite", desc:"Contoh katalog untuk kategori Free Fire.", price:"Rp 180.000", badge:"NEW", icon:"FF", detail:"Ganti data ini dengan produk milik tokomu."},
  {id:6, game:"Free Fire", name:"Akun Free Fire — Collection", desc:"Contoh produk dengan tampilan kartu katalog.", price:"Rp 320.000", badge:"PICK", icon:"FF", detail:"Jangan gunakan data demo sebagai informasi transaksi."}
];

const grid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
let activeFilter = "Semua";

function renderProducts(){
  const query = searchInput.value.trim().toLowerCase();
  const visible = products.filter(p => (activeFilter === "Semua" || p.game === activeFilter) &&
    `${p.name} ${p.game} ${p.desc}`.toLowerCase().includes(query));
  grid.innerHTML = visible.map(p => `
    <article class="product-card">
      <div class="product-art"><span>${p.icon}</span><label class="product-badge">${p.badge}</label></div>
      <div class="product-info">
        <div class="product-category">${p.game.toUpperCase()}</div>
        <h3>${p.name}</h3><p>${p.desc}</p>
        <div class="product-bottom"><strong class="product-price">${p.price}</strong>
          <button class="detail-btn" data-id="${p.id}">DETAIL ↗</button></div>
      </div>
    </article>`).join("");
  resultCount.textContent = `Menampilkan ${visible.length} dari ${products.length} produk contoh`;
  emptyState.hidden = visible.length !== 0;
}
document.getElementById("filters").addEventListener("click", e => {
  const btn = e.target.closest("button[data-filter]");
  if(!btn) return;
  activeFilter = btn.dataset.filter;
  document.querySelectorAll(".filter").forEach(b => b.classList.toggle("active", b === btn));
  renderProducts();
});
searchInput.addEventListener("input", renderProducts);
grid.addEventListener("click", e => {
  const btn = e.target.closest("button[data-id]");
  if(!btn) return;
  const p = products.find(x => x.id === Number(btn.dataset.id));
  document.getElementById("dialogContent").innerHTML = `
    <div class="product-category">${p.game.toUpperCase()}</div>
    <h2 class="dialog-product-title">${p.name}</h2>
    <p class="dialog-product-desc">${p.detail}</p>
    <div class="dialog-note">Harga contoh: <b>${p.price}</b><br>Produk demo — belum tersedia untuk checkout.</div>`;
  document.getElementById("productDialog").showModal();
});
document.getElementById("dialogClose").addEventListener("click", () => document.getElementById("productDialog").close());
document.getElementById("productDialog").addEventListener("click", e => {
  if(e.target === e.currentTarget) e.currentTarget.close();
});
document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => document.getElementById("mainNav").classList.remove("open")));
document.addEventListener("keydown", e => {
  if(e.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();searchInput.focus();}
});
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
