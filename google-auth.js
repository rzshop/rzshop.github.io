import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {
  getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  getFirestore, doc, setDoc, addDoc, collection, serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const message = document.getElementById("googleAuthMsg");
const button = document.getElementById("googleLoginBtn");
const modal = document.getElementById("authModal");
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

button?.addEventListener("click", async () => {
  message.textContent = "Menghubungkan ke Google...";
  button.disabled = true;
  try {
    const result = await signInWithPopup(auth, provider);
    const u = result.user;
    const profile = {
      uid: u.uid,
      name: u.displayName || "Pengguna RZShop",
      email: u.email || "",
      photoURL: u.photoURL || ""
    };
    await setDoc(doc(db, "users", u.uid), {
      ...profile,
      lastLoginAt: serverTimestamp()
    }, { merge: true });
    await addDoc(collection(db, "loginEvents"), {
      uid: u.uid,
      name: profile.name,
      email: profile.email,
      loginAt: serverTimestamp()
    });
    window.rzSetGoogleUser?.(profile);
    modal?.classList.add("hidden");
    message.textContent = "";
  } catch (error) {
    console.error(error);
    message.textContent = error.code === "auth/popup-closed-by-user"
      ? "Jendela login ditutup. Silakan coba lagi."
      : "Login gagal. Periksa konfigurasi Firebase dan domain yang diizinkan.";
  } finally {
    button.disabled = false;
  }
});

window.rzGoogleSignOut = async () => {
  await signOut(auth);
  window.rzSetGoogleUser?.(null);
};

onAuthStateChanged(auth, (u) => {
  if (u) {
    window.rzSetGoogleUser?.({
      uid: u.uid,
      name: u.displayName || "Pengguna RZShop",
      email: u.email || "",
      photoURL: u.photoURL || ""
    });
  } else {
    window.rzSetGoogleUser?.(null);
  }
});
