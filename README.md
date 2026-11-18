# DevFinder 🔍

A developer tools search website with category filters, favorites,
dark mode, and Firebase login/sign up.

## Project Structure

    DevFinder/
    ├── index.html       Main page
    ├── style.css        Main styles
    ├── script.js        Search, filters, favorites, dark mode
    ├── auth.html        Login / Sign Up page
    ├── auth.css         Auth page styles
    ├── auth.js          Login / Sign Up logic
    ├── auth-state.js    Shows user name / logout on the main page
    ├── firebase.js      Firebase config (add your keys here)
    ├── search.c         Standalone C search program
    └── README.md

## How to Run

1. Open the folder in VS Code.
2. Right-click `index.html` -> **Open with Live Server**
   (the auth files use ES modules, so `file://` will not work).

## Enable Login / Sign Up

1. Go to https://console.firebase.google.com and create a project.
2. Add a **Web app** and copy its config into `firebase.js`.
3. Authentication -> Sign-in method -> enable **Email/Password**.
4. Authentication -> Settings -> Authorized domains: make sure
   `localhost` is listed (use `localhost`, not `127.0.0.1`).

## Run the C Program

    gcc search.c -o search
    ./search          (Windows: search.exe)

## License

MIT
