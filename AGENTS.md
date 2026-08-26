## Conversation style

- Always converse in ASD-STE100 Simplified Technical English.
- Use the Context7 MCP server when using an npm package, using the methods get-library-docs and resolve-library-id, to make sure you use the latest documentation for the version that is being used
- If during the conversation I ask you to do something that contradicts what is in the documentation (.md files), or creates something new that should be added to the documentation, suggest to edit it.
- At the end of your answer, make sure you specify if I need to run a command like `pnpm run deploy`. If I don't, don't say anything
- Questions are requests for an answer, not changes.

## General

- Use pnpm to install dependencies (not npm)

## App Architecture

- Please read docs/app_architecture.md to know how this app is architected

## State Management

- Navigational and filter state selected by the user in Select, Multi-Select, Switch, Date Picker, Search input, and Tabs should live in the URL as query parameters, managed by Tanstack Router.
- Durable user preferences that should persist across routes and devices should live in user-scoped backend storage instead of the URL. If you have a doubt about which category applies, ask me.

## React Specifics

- In general try and avoid useEffect directly, i.e. in the code that you write (it's ok if it's within a trusted package like Tanstack Query or a Shadcn component). If you plan to use one, pause and tell me, so I can review if there is a better alternative.

## Shadcn components

- always use Shadcn components for generic components like buttons, forms, date-pickers, etc. Install them using the Shadcn CLI: `pnpm dlx shadcn@latest add button`

## Frontend

- I generally like neat, minimalistic UIs, with compact design, no fluff and no unnecessary placeholder text
- For testing:
  - I usually have a Chrome instance with the ChatGPT extension, where the app is running with a user logged in. Use that Chrome instance through chrome:control-chrome ().
  - If the instance exists but the tab is used by another Convex conversation, create a new tab. In that case, close the tab you created once your task is completed.
  - Only if that instance is unavailable, use agent-browser and log in with the credentials in the env var VITE_E2E_TEST_EMAIL and VITE_E2E_TEST_PASSWORD.
  - If fallback credentials are missing, stop and ask.
- When reviewing, set the viewport to a 14 inch MacBook Pro, with the command `agent-browser set viewport 1512 982 2`
- Check the changed route or component in the browser, verify the main interaction path, and report any console errors or visual regressions you find.
- All buttons and links should have a cursor-pointer, unless specified otherwise
- Format analytics values using `Intl.NumberFormat` with compact notation and `maximumSignificantDigits: 3`. Prefer short, magnitude-aware values such as `2.67`, `300`, `14.2K`, and `14.2M`

## Backend

- When making changes to the backend code, run the typescript compiler on that code too
