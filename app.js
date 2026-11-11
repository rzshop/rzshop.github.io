// RZ Shop multi-game catalog demo. Replace demo listings with accurate, authorized inventory.
let listings=[]; // Live inventory is loaded from Firestore; no fake products are shown.
let activeGame="Semua",favorites=JSON.parse(localStorage.getItem("rz-favs")||"[]"),cart=JSON.parse(localStorage.getItem("rz-cart-v2")||"[]");
const $=s=>document.querySelector(s),money=n=>"Rp"+Number(n).toLocaleString("id-ID");
function save(){localStorage.setItem("rz-favs",JSON.stringify(favorites));localStorage.setItem("rz-cart-v2",JSON.stringify(cart));counts()}
function counts(){$("#favCount").textContent=favorites.length;$("#cartCount").textContent=cart.reduce((n,x)=>n+x.qty,0)}
function toast(t){let e=$("#toast");e.textContent=t;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),1800)}
function card(p){return `<article class="listing-card"><div class="listing-art"><span class="game-label">${p.tag}</span><span class="stock-label">DEMO</span><img src="${p.image||'rz-logo.png'}" alt="RZ Shop" onerror="this.src='rz-logo.png'"><button class="heart" data-fav="${p.id}">${favorites.includes(p.id)?"♥":"♡"}</button></div><div class="listing-body"><div class="listing-game">${p.game}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="specs">${p.spec.map(s=>`<span>${s}</span>`).join("")}</div><div class="price-row"><b class="price">${money(p.price)}</b><button class="detail" data-detail="${p.id}">Detail ↗</button>${window.rzIsAdmin?`<button class="detail" data-edit="${p.id}">Edit</button><button class="detail" data-delete="${p.id}">Hapus</button>`:""}</div></div></article>`}
function filtered(){let q=($("#catalogSearch").value+" "+$("#globalSearch").value).trim().toLowerCase(),price=$("#priceFilter").value,sort=$("#sortFilter").value;let a=listings.filter(p=>(activeGame==="Semua"||p.game===activeGame)&&(!q||`${p.game} ${p.name} ${p.desc} ${p.spec.join(" ")}`.toLowerCase().includes(q)));a=a.filter(p=>price==="all"||(price==="low"&&p.price<100000)||(price==="mid"&&p.price>=100000&&p.price<=500000)||(price==="high"&&p.price>500000&&p.price<=1000000)||(price==="top"&&p.price>1000000));if(sort==="low")a.sort((x,y)=>x.price-y.price);if(sort==="high")a.sort((x,y)=>y.price-x.price);if(sort==="new")a.sort((x,y)=>y.id-x.id);return a}
function render(){let a=filtered();$("#listingCount").textContent=a.length+" listing";$("#listingGrid").innerHTML=a.map(card).join("");$("#empty").hidden=!!a.length}
function renderPremium(){$("#premiumGrid").innerHTML=listings.filter(p=>p.premium).slice(0,4).map(p=>`<article class="premium-card"><img src="rz-logo.png" alt=""><div><small>✦ RZ PREMIUM · ${p.game.toUpperCase()}</small><h3>${p.name}</h3><p>${p.spec.join(" · ")}</p><strong>${money(p.price)}</strong> <button class="detail" data-detail="${p.id}">Lihat detail</button></div></article>`).join("")}
function renderSold(){$("#soldGrid").innerHTML=[["Free Fire","FF Diamond Showcase","Rp320.000"],["Mobile Legends","ML Epic Collection","Rp420.000"],["Roblox","Roblox Avatar Set","Rp180.000"],["PUBG Mobile","PUBG Classic Locker","Rp550.000"]].map(x=>`<article class="sold-card"><small>✓ CONTOH RIWAYAT · ${x[0]}</small><h3>${x[1]}</h3><p>Data ilustrasi, bukan penjualan aktual</p><strong>${x[2]}</strong></article>`).join("")}
function openDrawer(mode){$("#shade").classList.add("show");$("#drawer").classList.add("open");$("#drawerTitle").textContent=mode==="cart"?"Keranjang":"Favorit";if(mode==="cart"){let rows=cart.map(x=>{let p=listings.find(p=>p.id===x.id);return `<div class="drawer-row"><img src="rz-logo.png"><div><strong>${p.name}</strong><small>${money(p.price)} · Qty ${x.qty}</small><button data-remove="${p.id}">Hapus</button></div></div>`}).join("");$("#drawerBody").innerHTML=rows||"<p>Keranjang masih kosong.</p>";$("#drawerBottom").textContent="Total demo: "+money(cart.reduce((n,x)=>n+listings.find(p=>p.id===x.id).price*x.qty,0))+". Checkout belum diaktifkan."}else{$("#drawerBody").innerHTML=favorites.map(id=>listings.find(p=>p.id===id)).filter(Boolean).map(p=>`<div class="drawer-row"><img src="rz-logo.png"><div><strong>${p.name}</strong><small>${money(p.price)}</small><button data-detail="${p.id}">Detail</button></div></div>`).join("")||"<p>Belum ada favorit.</p>";$("#drawerBottom").textContent="Produk favorit disimpan di browser ini."}}
function closeDrawer(){$("#shade").classList.remove("show");$("#drawer").classList.remove("open")}
function detail(id){let p=listings.find(x=>String(x.id)===String(id));if(!p)return;$("#modalBody").innerHTML=`<img src="rz-logo.png" alt="RZ"><div class="listing-game">${p.game}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="specs">${p.spec.map(s=>`<span>${s}</span>`).join("")}</div><h3 style="color:#65caff">${money(p.price)}</h3><p><b>Catatan:</b> ini listing demo. Verifikasi ketentuan penerbit game dan keaslian informasi sebelum transaksi.</p><button class="btn primary" data-add="${p.id}">Simpan ke keranjang demo</button>`;$("#modalBack").classList.add("show")}
document.addEventListener("click",e=>{let b=e.target.closest("button");if(!b)return;if(b.dataset.game){activeGame=b.dataset.game;document.querySelectorAll(".game-tab").forEach(x=>x.classList.toggle("active",x===b));render()}if(b.dataset.fav){let id=b.dataset.fav;favorites=favorites.some(x=>String(x)===String(id))?favorites.filter(x=>String(x)!==String(id)):[...favorites,id];save();render();toast("Favorit diperbarui")}if(b.dataset.detail)detail(b.dataset.detail);if(b.dataset.add){let id=b.dataset.add,found=cart.find(x=>String(x.id)===String(id));found?found.qty++:cart.push({id,qty:1});save();$("#modalBack").classList.remove("show");toast("Masuk keranjang demo")}if(b.dataset.remove){cart=cart.filter(x=>String(x.id)!==String(b.dataset.remove));save();openDrawer("cart")}if(b.dataset.keyword){$("#catalogSearch").value=b.dataset.keyword;render();document.querySelector("#catalog").scrollIntoView()}if(b.dataset.budget){$("#priceFilter").value=b.dataset.budget;render();document.querySelector("#catalog").scrollIntoView()}});
$("#catalogSearch").addEventListener("input",render);$("#priceFilter").addEventListener("change",render);$("#sortFilter").addEventListener("change",render);$("#globalSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){ $("#catalogSearch").value=e.target.value;render();$("#catalog").scrollIntoView()}});$("#searchGo").onclick=()=>{$("#catalogSearch").value=$("#globalSearch").value;render();$("#catalog").scrollIntoView()};$("#resetFilters").onclick=()=>{$("#catalogSearch").value="";$("#globalSearch").value="";$("#priceFilter").value="all";$("#sortFilter").value="featured";activeGame="Semua";document.querySelectorAll(".game-tab").forEach(x=>x.classList.toggle("active",x.dataset.game==="Semua"));render()};$("#cartOpen").onclick=()=>openDrawer("cart");$("#favoriteOpen").onclick=()=>openDrawer("fav");$("#drawerClose").onclick=closeDrawer;$("#shade").onclick=closeDrawer;$("#hamburger").onclick=()=>$("#mainNav").classList.toggle("open");document.querySelectorAll("#mainNav a").forEach(a=>a.onclick=()=>$("#mainNav").classList.remove("open"));$("#modalClose").onclick=()=>$("#modalBack").classList.remove("show");$("#modalBack").onclick=e=>{if(e.target.id==="modalBack")$("#modalBack").classList.remove("show")};$("#sellForm").onsubmit=e=>{e.preventDefault();toast("Form demo: belum terhubung ke server");e.target.reset()};$("#year").textContent=new Date().getFullYear();render();renderPremium();renderSold();counts();


// Firebase integration for RZ Shop
window.rzIsAdmin = false;
(function initRZFirebase(){
  const cfg = window.RZ_FIREBASE_CONFIG;
  const msg = (t)=>{ const el=document.getElementById('adminMessage'); if(el) el.textContent=t; };
  if(!window.firebase || !cfg){ msg('Firebase SDK belum termuat. Periksa koneksi internet.'); return; }
  try {
    if(!firebase.apps.length) firebase.initializeApp(cfg);
    const auth=firebase.auth(), db=firebase.firestore();
    const productsRef=db.collection('products');
    let currentUser=null;
    const adminBack=document.getElementById('adminBack');
    const adminLogin=document.getElementById('adminLogin');
    const adminPanel=document.getElementById('adminPanel');
    const adminProducts=document.getElementById('adminProducts');
    const productForm=document.getElementById('productForm');
    const esc=(v)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    function showAdmin(){adminBack.classList.add('show');}
    document.getElementById('adminOpen').onclick=showAdmin;
    document.getElementById('adminClose').onclick=()=>adminBack.classList.remove('show');
    adminBack.addEventListener('click',e=>{if(e.target===adminBack)adminBack.classList.remove('show')});
    async function verifyAdmin(user){
      const snap=await db.collection('admins').doc(user.uid).get();
      if(!snap.exists || snap.data().role!=='admin'){
        await auth.signOut(); window.rzIsAdmin=false; currentUser=null;
        adminPanel.hidden=true; adminLogin.hidden=false;
        msg('Akun ini belum terdaftar sebagai admin. Pastikan dokumen admins menggunakan UID akun Google yang sama dan role = admin.');
        return false;
      }
      currentUser=user; window.rzIsAdmin=true;
      adminLogin.hidden=true; adminPanel.hidden=false;
      document.getElementById('adminWho').textContent='Login sebagai '+user.email;
      msg('Admin terverifikasi.');
      await loadProducts(true);
      render(); renderPremium();
      return true;
    }
    document.getElementById('googleAdminLogin').onclick=async()=>{
      try {
        msg('Mengalihkan ke Google untuk login...');
        const provider=new firebase.auth.GoogleAuthProvider();
        await auth.signInWithRedirect(provider);
      } catch(e) {
        console.error('Google redirect login error:', e);
        msg('Login gagal ('+(e.code||'tanpa-kode')+'): '+(e.message||'Periksa koneksi internet dan pengaturan Firebase.')+
          (e.code==='auth/unauthorized-domain'?' Tambahkan rzshop.github.io di Authentication > Settings > Authorized domains.':
          e.code==='auth/operation-not-allowed'?' Aktifkan Google di Authentication > Sign-in method.':
          e.code==='auth/network-request-failed'||e.code==='auth/unavailable'?' Periksa koneksi internet, matikan VPN/adblock sementara, lalu coba lagi.':''));
      }
    };
    // Complete Google redirect sign-in after returning to GitHub Pages.
    auth.getRedirectResult().catch(e=>{
      console.error('Google redirect result error:', e);
      msg('Login Google gagal ('+(e.code||'tanpa-kode')+'): '+(e.message||'Periksa Authorized domains dan koneksi internet.')+
        (e.code==='auth/unauthorized-domain'?' Domain rzshop.github.io belum diizinkan di Firebase.':
        e.code==='auth/operation-not-allowed'?' Provider Google belum aktif di Firebase Authentication.':
        e.code==='auth/network-request-failed'||e.code==='auth/unavailable'?' Layanan/koneksi sementara tidak tersedia; coba jaringan lain dan ulangi.':''));
    });
    document.getElementById('adminLogout').onclick=async()=>{await auth.signOut();window.rzIsAdmin=false;currentUser=null;adminPanel.hidden=true;adminLogin.hidden=false;productForm.reset();document.getElementById('productId').value='';render();renderPremium();msg('Kamu sudah keluar.');};
    async function loadProducts(asAdmin=false){
      try {
        let query=productsRef;
        if(!asAdmin) query=query.where('status','==','active');
        const snap=await query.get();
        const remote=snap.docs.map(d=>{const x=d.data();return {id:d.id,game:x.game||'Lainnya',name:x.name||'Produk',price:Number(x.price)||0,tag:x.tag||'RZ SHOP',desc:x.description||x.desc||'',spec:Array.isArray(x.spec)?x.spec:[],premium:!!x.premium,status:x.status||'active',image:x.image||''};});
        listings=remote;
        render();renderPremium();
        return remote;
      } catch(e){console.error(e); if(!asAdmin){listings=[];render();renderPremium();toast('Database belum dapat dibaca. Periksa koneksi dan Firestore Rules.');} else msg('Gagal memuat produk: '+(e.code||'')+' '+e.message); return [];}
    }
    function renderAdminProducts(){
      adminProducts.innerHTML=listings.map(p=>`<div class="admin-product"><div><b>${esc(p.name)}</b><small>${esc(p.game)} · ${money(p.price)} · ${esc(p.status||'active')}</small></div><div><button type="button" class="detail" data-edit="${esc(p.id)}">Edit</button> <button type="button" class="detail" data-delete="${esc(p.id)}">Hapus</button></div></div>`).join('')||'<p>Belum ada produk.</p>';
    }
    const originalRender=render;
    render=function(){originalRender();if(window.rzIsAdmin)renderAdminProducts();};
    function resetForm(){productForm.reset();document.getElementById('productId').value='';document.getElementById('productStatus').value='active';}
    document.getElementById('productCancel').onclick=resetForm;
    productForm.onsubmit=async e=>{
      e.preventDefault(); if(!window.rzIsAdmin||!currentUser){msg('Login admin diperlukan.');return;}
      const id=document.getElementById('productId').value;
      const data={name:document.getElementById('productName').value.trim(),game:document.getElementById('productGame').value,price:Number(document.getElementById('productPrice').value),description:document.getElementById('productDesc').value.trim(),image:document.getElementById('productImage').value.trim(),status:document.getElementById('productStatus').value,tag:'RZ SHOP',spec:[],premium:false,updatedAt:firebase.firestore.FieldValue.serverTimestamp()};
      try {if(id) await productsRef.doc(id).update(data); else {data.createdAt=firebase.firestore.FieldValue.serverTimestamp();await productsRef.add(data);} resetForm(); await loadProducts(true); toast('Produk berhasil disimpan.');}
      catch(err){msg('Gagal menyimpan produk: '+err.message);}
    };
    document.addEventListener('click',async e=>{
      const edit=e.target.closest('[data-edit]');
      if(edit){const p=listings.find(x=>String(x.id)===String(edit.dataset.edit));if(!p)return;document.getElementById('productId').value=p.id;document.getElementById('productName').value=p.name;document.getElementById('productGame').value=p.game;document.getElementById('productPrice').value=p.price;document.getElementById('productDesc').value=p.desc||'';document.getElementById('productImage').value=p.image||'';document.getElementById('productStatus').value=p.status||'active';document.getElementById('adminPanel').scrollIntoView({behavior:'smooth'});}
      const del=e.target.closest('[data-delete]');
      if(del&&window.rzIsAdmin){const id=del.dataset.delete;if(confirm('Hapus produk ini?')){try{await productsRef.doc(String(id)).delete();await loadProducts(true);toast('Produk dihapus.');}catch(err){msg('Gagal menghapus: '+err.message);}}}
    });
    auth.onAuthStateChanged(async user=>{if(user){try{await verifyAdmin(user);}catch(e){console.error(e);msg('Tidak dapat memeriksa admin: '+e.message);}}});
    // Public catalog reads only active products; Firestore Rules must match this query.
    loadProducts(false);
  } catch(e){console.error(e); const el=document.getElementById('adminMessage'); if(el)el.textContent='Firebase gagal diinisialisasi: '+e.message;}
})();
