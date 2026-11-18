import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const loginLink = document.getElementById("loginLink");
const userName = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");

if (loginLink && userName && logoutBtn) {

    onAuthStateChanged(auth, (user) => {
        loginLink.hidden = !!user;
        userName.hidden = !user;
        logoutBtn.hidden = !user;

        if (user) {
            userName.textContent =
                "Welcome, " + (user.displayName || user.email);
        }
    });

    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            window.location.reload();
        } catch (error) {
            alert("Unable to logout. Please try again.");
            console.error(error);
        }
    });
}
