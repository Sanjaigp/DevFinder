
// ======================================
// 1. DEVELOPER TOOLS DATABASE
// ======================================

const tools = [

    {
        name: "Visual Studio Code",
        category: "Code Editor",
        icon: "</>",
        description: "A powerful code editor for web development and programming.",
        keywords: "vscode editor coding programming html css javascript",
        url: "https://code.visualstudio.com/"
    },

    {
        name: "CodePen",
        category: "Code Editor",
        icon: "CP",
        description: "Write and test HTML, CSS and JavaScript online.",
        keywords: "html css javascript online editor frontend",
        url: "https://codepen.io/"
    },

    {
        name: "JSFiddle",
        category: "Code Editor",
        icon: "JS",
        description: "An online playground for testing JavaScript code.",
        keywords: "javascript html css editor playground",
        url: "https://jsfiddle.net/"
    },

    {
        name: "Replit",
        category: "Code Editor",
        icon: "R",
        description: "An online coding environment supporting multiple languages.",
        keywords: "python c java javascript compiler editor",
        url: "https://replit.com/"
    },

    {
        name: "ChatGPT",
        category: "AI Tools",
        icon: "AI",
        description: "An AI assistant for coding, learning and problem solving.",
        keywords: "artificial intelligence ai coding chatbot help",
        url: "https://chatgpt.com/"
    },

    {
        name: "GitHub Copilot",
        category: "AI Tools",
        icon: "GH",
        description: "An AI coding assistant that helps write code.",
        keywords: "ai artificial intelligence code completion programming",
        url: "https://github.com/features/copilot"
    },

    {
        name: "Google Gemini",
        category: "AI Tools",
        icon: "G",
        description: "An AI assistant for research, coding and productivity.",
        keywords: "ai artificial intelligence chatbot coding",
        url: "https://gemini.google.com/"
    },

    {
        name: "Canva",
        category: "Design",
        icon: "C",
        description: "Create graphics, presentations and visual designs.",
        keywords: "graphic design poster presentation graphics",
        url: "https://www.canva.com/"
    },

    {
        name: "Coolors",
        category: "Design",
        icon: "CO",
        description: "Generate beautiful color palettes for your projects.",
        keywords: "color palette colors picker design website",
        url: "https://coolors.co/"
    },

    {
        name: "Figma",
        category: "Design",
        icon: "F",
        description: "Design website interfaces and interactive prototypes.",
        keywords: "ui ux design prototype website interface",
        url: "https://www.figma.com/"
    },

    {
        name: "Postman",
        category: "Testing",
        icon: "P",
        description: "Build, test and manage APIs with ease.",
        keywords: "api testing http request development backend",
        url: "https://www.postman.com/"
    },

    {
        name: "JSON Formatter",
        category: "Testing",
        icon: "{}",
        description: "Format, validate and read JSON data easily.",
        keywords: "json formatter validator api data testing",
        url: "https://jsonformatter.org/"
    },

    {
        name: "Regex101",
        category: "Testing",
        icon: ".*",
        description: "Test and understand regular expressions online.",
        keywords: "regex regular expression tester debugging testing",
        url: "https://regex101.com/"
    },

    {
        name: "MDN Web Docs",
        category: "Learning",
        icon: "M",
        description: "Learn HTML, CSS and JavaScript with documentation.",
        keywords: "learn html css javascript documentation tutorials",
        url: "https://developer.mozilla.org/"
    },

    {
        name: "freeCodeCamp",
        category: "Learning",
        icon: "FC",
        description: "Learn programming through free coding lessons.",
        keywords: "learn coding programming html css javascript courses",
        url: "https://www.freecodecamp.org/"
    },

    {
        name: "W3Schools",
        category: "Learning",
        icon: "W3",
        description: "Beginner-friendly programming tutorials and examples.",
        keywords: "learn html css javascript python c tutorials",
        url: "https://www.w3schools.com/"
    },

    {
        name: "GitHub",
        category: "Development",
        icon: "GH",
        description: "Host code, manage repositories and collaborate on projects.",
        keywords: "git github repository version control source code",
        url: "https://github.com/"
    },

    {
        name: "Netlify",
        category: "Development",
        icon: "N",
        description: "Deploy and host websites online.",
        keywords: "hosting deployment website frontend publish",
        url: "https://www.netlify.com/"
    },

    {
        name: "Vercel",
        category: "Development",
        icon: "V",
        description: "Deploy modern web applications and websites.",
        keywords: "hosting deployment frontend website web development",
        url: "https://vercel.com/"
    }

];


// ======================================
// 2. SELECT HTML ELEMENTS
// ======================================

const searchInput = document.getElementById("searchInput");

const searchButton = document.getElementById("searchButton");

const toolsGrid = document.getElementById("toolsGrid");

const categories = document.getElementById("categories");

const resultCount = document.getElementById("resultCount");

const noResults = document.getElementById("noResults");

const suggestions = document.getElementById("suggestions");

const clearSearch = document.getElementById("clearSearch");

const themeToggle = document.getElementById("themeToggle");

const favoritesNav = document.getElementById("favoritesNav");

const showAll = document.getElementById("showAll");


// ======================================
// 3. APPLICATION STATE
// ======================================

let selectedCategory = "All";

let favoritesOnly = false;

let searchQuery = "";

let favorites = JSON.parse(
    localStorage.getItem("devfinder-favorites") || "[]"
);


// ======================================
// 4. SEARCH RANKING ALGORITHM
// ======================================

function calculateScore(tool, query) {

    const searchText = query.toLowerCase().trim();

    const words = searchText.split(/\s+/).filter(Boolean);

    const name = tool.name.toLowerCase();

    const category = tool.category.toLowerCase();

    const description = tool.description.toLowerCase();

    const keywords = tool.keywords.toLowerCase();

    let score = 0;

    // Exact name match
    if (name === searchText) {
        score += 100;
    }

    // Name starts with query
    else if (name.startsWith(searchText)) {
        score += 50;
    }

    // Name contains query
    else if (name.includes(searchText)) {
        score += 30;
    }

    // Category match
    if (category.includes(searchText)) {
        score += 20;
    }

    // Keyword match
    if (keywords.includes(searchText)) {
        score += 15;
    }

    // Description match
    if (description.includes(searchText)) {
        score += 10;
    }

    // Match individual search words
    words.forEach(word => {

        if (name.includes(word)) score += 12;

        if (category.includes(word)) score += 8;

        if (keywords.includes(word)) score += 6;

        if (description.includes(word)) score += 3;

    });

    return score;
}


// ======================================
// 5. DISPLAY TOOL CARDS
// ======================================

function displayTools(toolList) {

    toolsGrid.innerHTML = "";

    noResults.hidden = toolList.length !== 0;

    if (toolList.length === 0) {
        resultCount.textContent = "0 tools found";
        return;
    }

    resultCount.textContent =
        `Showing ${toolList.length} of ${tools.length} tools`;

    toolList.forEach(tool => {

        const isFavorite = favorites.includes(tool.name);

        const card = document.createElement("article");

        card.className = "tool-card";

        card.innerHTML = `

            <div class="card-top">

                <div class="tool-icon">
                    ${tool.icon || tool.name.substring(0, 2)}
                </div>

                <button
                    class="favorite-btn ${isFavorite ? "saved" : ""}"
                    aria-label="${isFavorite ? "Remove from" : "Add to"} favorites"
                    aria-pressed="${isFavorite}"
                    data-name="${tool.name}"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>

            </div>

            <h3>${tool.name}</h3>

            <p>${tool.description}</p>

            <span class="tool-category">
                ${tool.category}
            </span>

            <a
                class="visit-btn"
                href="${tool.url}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit Website ↗
            </a>

        `;

        toolsGrid.appendChild(card);

    });

}


// ======================================
// 6. SEARCH FUNCTION
// ======================================

function searchTools() {

    searchQuery = searchInput.value.trim();

    let filteredTools = [...tools];

    // Category filter
    if (selectedCategory !== "All") {

        filteredTools = filteredTools.filter(tool =>
            tool.category === selectedCategory
        );

    }

    // Favorites filter
    if (favoritesOnly) {

        filteredTools = filteredTools.filter(tool =>
            favorites.includes(tool.name)
        );

    }

    // Search filter and ranking
    if (searchQuery !== "") {

        filteredTools = filteredTools
            .map(tool => ({
                ...tool,
                score: calculateScore(tool, searchQuery)
            }))
            .filter(tool => tool.score > 0)
            .sort((a, b) => b.score - a.score);

    }

    displayTools(filteredTools);

    clearSearch.style.display =
        searchQuery ? "block" : "none";

    suggestions.classList.remove("active");

}


// ======================================
// 7. SEARCH BUTTON AND LIVE SEARCH
// ======================================

searchButton.addEventListener("click", searchTools);

searchInput.addEventListener("input", () => {

    searchTools();

    showSuggestions();

});

searchInput.addEventListener("keydown", event => {

    if (event.key === "Enter") {

        searchTools();

    }

    if (event.key === "Escape") {

        suggestions.classList.remove("active");

    }

});


// ======================================
// 8. SEARCH SUGGESTIONS
// ======================================

function showSuggestions() {

    const query = searchInput.value.toLowerCase().trim();

    suggestions.innerHTML = "";

    if (!query) {

        suggestions.classList.remove("active");

        return;

    }

    const matches = tools.filter(tool => {

        return (
            tool.name.toLowerCase().includes(query) ||
            tool.keywords.toLowerCase().includes(query) ||
            tool.category.toLowerCase().includes(query)
        );

    }).slice(0, 5);

    if (matches.length === 0) {

        suggestions.classList.remove("active");

        return;

    }

    matches.forEach(tool => {

        const item = document.createElement("div");

        item.className = "suggestion-item";

        item.textContent = tool.name;

        item.addEventListener("click", () => {

            searchInput.value = tool.name;

            searchTools();

        });

        suggestions.appendChild(item);

    });

    suggestions.classList.add("active");

}


// ======================================
// 9. CATEGORY FILTER
// ======================================

categories.addEventListener("click", event => {

    const button = event.target.closest(".category-btn");

    if (!button) return;

    selectedCategory = button.dataset.category;

    favoritesOnly = false;

    document.querySelectorAll(".category-btn").forEach(btn => {

        btn.classList.remove("active");

    });

    button.classList.add("active");

    searchTools();

});


// ======================================
// 10. FAVORITES FUNCTION
// ======================================

function saveFavorites() {

    localStorage.setItem(
        "devfinder-favorites",
        JSON.stringify(favorites)
    );

}


// Handle favorite button clicks
toolsGrid.addEventListener("click", event => {

    const button = event.target.closest(".favorite-btn");

    if (!button) return;

    const name = button.dataset.name;

    if (favorites.includes(name)) {

        favorites = favorites.filter(item => item !== name);

    } else {

        favorites.push(name);

    }

    saveFavorites();

    searchTools();

});


// Show only favorite tools
favoritesNav.addEventListener("click", () => {

    favoritesOnly = !favoritesOnly;

    favoritesNav.textContent =
        favoritesOnly ? "♥ All Tools" : "♥ Favorites";

    selectedCategory = "All";

    document.querySelectorAll(".category-btn").forEach(btn => {

        btn.classList.toggle(
            "active",
            btn.dataset.category === "All"
        );

    });

    searchTools();

});


// ======================================
// 11. DARK MODE
// ======================================

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    themeToggle.textContent = darkMode ? "☀" : "☾";

    localStorage.setItem("devfinder-dark", darkMode);

});


// Restore saved theme
if (localStorage.getItem("devfinder-dark") === "true") {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀";

}


// ======================================
// 12. CLEAR SEARCH
// ======================================

clearSearch.addEventListener("click", () => {

    searchInput.value = "";

    searchQuery = "";

    searchTools();

    searchInput.focus();

});


// ======================================
// 13. QUICK SEARCH BUTTONS
// ======================================

document.querySelectorAll(".quick-search").forEach(button => {

    button.addEventListener("click", () => {

        searchInput.value = button.dataset.query;

        searchTools();

    });

});


// ======================================
// 14. SHOW ALL TOOLS
// ======================================

function resetFilters() {
    searchInput.value = "";
    searchQuery = "";
    selectedCategory = "All";
    favoritesOnly = false;
    favoritesNav.textContent = "♥ Favorites";
    document.querySelectorAll(".category-btn").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.category === "All");
    });
    suggestions.classList.remove("active");
    searchTools();
}

showAll.addEventListener("click", resetFilters);

document.getElementById("resetSearch")
    .addEventListener("click", resetFilters);


// ======================================
// 15. INITIALIZE WEBSITE
// ======================================

// Close suggestions when clicking outside the search box
document.addEventListener("click", event => {
    if (!event.target.closest(".search-container")) {
        suggestions.classList.remove("active");
    }
});

displayTools(tools);
