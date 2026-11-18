import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// PASTE YOUR REAL CONFIG HERE
// Firebase Console -> Project settings -> Your apps -> Web app
  const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.firebasestorage.app",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

export const isFirebaseConfigured =
  !firebaseConfig.apiKey.startsWith("YOUR_");

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

