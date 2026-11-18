
import { auth, isFirebaseConfigured } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const authForm = document.getElementById("authForm");

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

const nameGroup = document.getElementById("nameGroup");
const confirmGroup = document.getElementById("confirmGroup");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("message");

let isSignup = false;

// Switch between Login and Sign Up
function setMode(signup) {
    isSignup = signup;

    loginTab.classList.toggle("active", !signup);
    signupTab.classList.toggle("active", signup);

    nameGroup.classList.toggle("hidden", !signup);
    confirmGroup.classList.toggle("hidden", !signup);

    document.getElementById("name").required = signup;
    document.getElementById("confirmPassword").required = signup;

    formTitle.textContent = signup
        ? "Create Account"
        : "Welcome Back!";

    formSubtitle.textContent = signup
        ? "Create your DevFinder account."
        : "Login to continue exploring developer tools.";

    submitBtn.textContent = signup ? "Sign Up" : "Login";

    message.textContent = "";
}

loginTab.addEventListener("click", () => setMode(false));
signupTab.addEventListener("click", () => setMode(true));

// Login and signup
authForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    message.style.color = "#dc2626";

    if (!isFirebaseConfigured) {
        message.textContent =
            "Firebase is not configured. Add your config in firebase.js.";
        return;
    }

    if (isSignup && password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        return;
    }

    if (password.length < 6) {
        message.textContent =
            "Password must contain at least 6 characters.";
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Please wait...";

    try {
        if (isSignup) {
            const result =
                await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );

            await updateProfile(result.user, {
                displayName: name
            });

            message.style.color = "green";
            message.textContent = "Account created successfully!";
        } else {
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            message.style.color = "green";
            message.textContent = "Login successful!";
        }

        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);

    } catch (error) {
        message.style.color = "#dc2626";

        console.error(error.code, error.message);

        const errors = {
            "auth/operation-not-allowed":
                "Email/Password sign-in is not enabled in Firebase.",
            "auth/api-key-not-valid.-please-pass-a-valid-api-key.":
                "Invalid Firebase API key. Check firebase.js.",
            "auth/invalid-api-key":
                "Invalid Firebase API key. Check firebase.js.",
            "auth/unauthorized-domain":
                "This domain is not authorized in Firebase settings.",
            "auth/user-disabled":
                "This account has been disabled.",
            "auth/email-already-in-use":
                "This email is already registered.",
            "auth/invalid-email":
                "Please enter a valid email address.",
            "auth/invalid-credential":
                "Incorrect email or password.",
            "auth/weak-password":
                "Please choose a stronger password.",
            "auth/network-request-failed":
                "Network error. Check your internet connection.",
            "auth/too-many-requests":
                "Too many attempts. Please try again later."
        };

        message.textContent =
            errors[error.code] || "Something went wrong. Please try again.";

    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = isSignup ? "Sign Up" : "Login";
    }
});
