
#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX_TEXT 200

// Structure to store developer tools
struct Tool {
    char name[100];
    char category[50];
    char keywords[MAX_TEXT];
    int score;
};

// Case-insensitive substring search
int containsIgnoreCase(char text[], char query[]) {

    int textLength = strlen(text);
    int queryLength = strlen(query);

    if (queryLength == 0) {
        return 0;
    }

    for (int i = 0; i <= textLength - queryLength; i++) {

        int j;

        for (j = 0; j < queryLength; j++) {

            if (tolower((unsigned char)text[i + j]) !=
                tolower((unsigned char)query[j])) {

                break;
            }
        }

        if (j == queryLength) {
            return 1;
        }
    }

    return 0;
}


// Calculate search score
int calculateScore(struct Tool tool, char query[]) {

    int score = 0;

    if (containsIgnoreCase(tool.name, query)) {
        score += 50;
    }

    if (containsIgnoreCase(tool.category, query)) {
        score += 20;
    }

    if (containsIgnoreCase(tool.keywords, query)) {
        score += 15;
    }

    return score;
}


// Display search results
void searchTools(struct Tool tools[], int count, char query[]) {

    int found = 0;

    printf("\n--- SEARCH RESULTS ---\n");

    for (int i = 0; i < count; i++) {

        tools[i].score = calculateScore(tools[i], query);

        if (tools[i].score > 0) {
            found++;
        }
    }

    // Sort results by score
    for (int i = 0; i < count - 1; i++) {

        for (int j = i + 1; j < count; j++) {

            if (tools[j].score > tools[i].score) {

                struct Tool temp = tools[i];

                tools[i] = tools[j];

                tools[j] = temp;
            }
        }
    }

    // Print matching tools
    if (found == 0) {
        printf("No matching tools found.\n");
        return;
    }

    for (int i = 0; i < count; i++) {

        if (tools[i].score > 0) {

            printf("\nTool: %s\n", tools[i].name);

            printf("Category: %s\n", tools[i].category);

            printf("Score: %d\n", tools[i].score);

        }
    }
}


// Main function
int main() {

    struct Tool tools[] = {

        {"Visual Studio Code", "Code Editor",
         "vscode editor coding programming html css javascript", 0},
        {"CodePen", "Code Editor",
         "html css javascript online editor frontend", 0},
        {"JSFiddle", "Code Editor",
         "javascript html css editor playground", 0},
        {"Replit", "Code Editor",
         "python c java javascript compiler editor", 0},
        {"ChatGPT", "AI Tools",
         "artificial intelligence ai coding chatbot help", 0},
        {"GitHub Copilot", "AI Tools",
         "ai artificial intelligence code completion programming", 0},
        {"Google Gemini", "AI Tools",
         "ai artificial intelligence chatbot coding", 0},
        {"Canva", "Design",
         "graphic design poster presentation graphics", 0},
        {"Coolors", "Design",
         "color palette colors picker design website", 0},
        {"Figma", "Design",
         "ui ux design prototype website interface", 0},
        {"Postman", "Testing",
         "api testing http request development backend", 0},
        {"JSON Formatter", "Testing",
         "json formatter validator api data testing", 0},
        {"Regex101", "Testing",
         "regex regular expression tester debugging testing", 0},
        {"MDN Web Docs", "Learning",
         "learn html css javascript documentation tutorials", 0},
        {"freeCodeCamp", "Learning",
         "learn coding programming html css javascript courses", 0},
        {"W3Schools", "Learning",
         "learn html css javascript python c tutorials", 0},
        {"GitHub", "Development",
         "git github repository version control source code", 0},
        {"Netlify", "Development",
         "hosting deployment website frontend publish", 0},
        {"Vercel", "Development",
         "hosting deployment frontend website web development", 0}

    };

    char query[100];

    printf("================================\n");
    printf("       DEVFINDER C SEARCH       \n");
    printf("================================\n");

    printf("\nEnter your search query: ");

    if (fgets(query, sizeof(query), stdin) == NULL) {
        return 1;
    }

    query[strcspn(query, "\n")] = '\0';

    if (strlen(query) == 0) {
        printf("Please enter a search term.\n");
        return 0;
    }

    searchTools(tools, (int)(sizeof(tools) / sizeof(tools[0])), query);

    return 0;
}
