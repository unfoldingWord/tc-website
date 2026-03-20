# Instructions for AI Agents (like Jules)

This project is the `tc-website`, the landing page for translationCore and related unfoldingWord translation helps.

## How to Create Issues for AI Agents

To get the best results when assigning tasks to Jules or other AI agents, please follow these guidelines:

### 1. Define a Clear Goal
Start with a concise summary of what needs to be achieved.
*Example: "Add a new 'Help' link to the footer that points to our documentation."*

### 2. Provide Context
Point the agent to the relevant files or sections of the code.
*Example: "The footer is defined in `index.html`. You should also update `style.css` if any new classes are needed."*

### 3. Specify Requirements and Constraints
Mention any specific behavior, design patterns, or technical constraints.
*Example: "The new link should open in a new tab and match the styling of existing footer links."*

### 4. Include Verification Steps
Tell the agent how you (or they) should verify the work.
*Example: "Verify by opening the `index.html` in a browser and clicking the link to ensure it works correctly."*

### 5. Reference Existing Patterns
If there's a similar feature already implemented, point it out.
*Example: "Follow the pattern used for the 'Community Forum' link in the footer."*

## Technical Notes for this Project
- This is a static site (HTML/CSS/Vanilla JS).
- Fonts and images are in the `assets/` directory.
- `scripts/helps.js` handles the dynamic loading of translation notes from the Door43 API.
- Netlify is used for hosting and handles redirects/headers via `netlify.toml`.
