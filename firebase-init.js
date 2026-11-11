// Firebase client initialization for the public RZ Shop website.
(function(){
  const c=window.RZ_FIREBASE_CONFIG;
  const ready=c && c.apiKey && !c.apiKey.startsWith("ISI_") && c.appId && !c.appId.startsWith("ISI_");
  if(!ready || !window.firebase){console.info("RZ Shop: Firebase config belum diisi; mode demo aktif.");return;}
  try{
    const app=firebase.apps.length?firebase.app():firebase.initializeApp(c);
    window.RZ_DB=app.firestore();
    console.info("RZ Shop: Firestore terhubung.");
  }catch(e){console.error("RZ Shop Firebase init gagal:",e);}
})();
