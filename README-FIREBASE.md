RZ SHOP — Firebase-connected starter

1. Upload the contents of this folder to your static host (GitHub Pages, Netlify, etc.).
2. Firebase project config is already placed in index.html. The Firebase Web API key is a public client identifier; protect data with Firestore Rules, not by hiding this key.
3. In Firebase Authentication, Google sign-in must be enabled. Add the exact website domain under Authentication > Settings > Authorized domains. For local testing, use a local web server (not file://).
4. In Firestore, the admins/{UID} document must use the exact UID of the Google account that signs in, with fields email (string) and role (string) = admin.
5. Firestore collection products uses fields: name (string), game (string), price (number), description (string), image (string URL, optional), status (string: active or draft), tag (string, optional), spec (array, optional), premium (boolean, optional).
6. Public catalog reads only products with status == active. Admin can read and manage products after UID verification.
7. Firestore Rules expected (publish in Firestore > Rules):

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isAdmin() {
      return request.auth != null
        && exists(/databases/$(database)/documents/admins/$(request.auth.uid))
        && get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.role == "admin";
    }
    match /admins/{userId} {
      allow get: if request.auth != null && request.auth.uid == userId;
      allow list, create, update, delete: if false;
    }
    match /products/{productId} {
      allow read: if resource.data.status == "active" || isAdmin();
      allow create, update, delete: if isAdmin();
    }
    match /{document=**} { allow read, write: if false; }
  }
}

Important:
- The Google account's UID must match the admins document ID. If the document currently uses a different UID, sign in once and compare the UID in Authentication > Users.
- Google login uses a popup; some embedded browsers may block popups. Open the site in Chrome if needed.
- This is a catalog/admin starter, not a payment or checkout system. The cart remains a browser-side demo.
- Do not collect game passwords, OTPs, recovery codes, or email credentials in the store.
- Check each game's official terms before listing account transfers or sales.
