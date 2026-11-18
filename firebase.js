import { initializeApp } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { getAuth } from
  "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCCxCA5HI7xUvAGI7MGdgmC7h-Zja0pNEo",
  authDomain: "devfinder-gps.firebaseapp.com",
  projectId: "devfinder-gps",
  storageBucket: "devfinder-gps.firebasestorage.app",
  messagingSenderId: "566715438791",
  appId: "1:566715438791:web:d8950f7d3f45afe0d150e2",
  measurementId: "G-NSKYBD566Q"
};

export const isFirebaseConfigured =
  !firebaseConfig.apiKey.startsWith("YOUR_");

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
