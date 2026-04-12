## Conversation style

- Always converse in English
- When you do something because that's what is being prescribed by these docs, let me know
- Always run `pnpm tsc -b` and eslint on the files that you updated or created
- Use the Context7 MCP server when using an npm package, using the methods get-library-docs and resolve-library-id, to make sure you use the latest documentation for the version that is being used
- If during the conversation I ask you to do something that contradicts what is in the documentation (.md files), or creates something new that should be added to the documentation, suggest to edit it.
- At the end of your answer, make sure you specify if I need to run a command like `pnpm run deploy`
- Only change the code when I explicitly ask to do something, with an action verb like "please add..." or "let's create...". But when I ask how you would do something ("how would you implement this?", "what is the best way to do this?"), or share my thoughts ("I think..."), don't make any changes and just answer the question / give feedback

## General

- Use pnpm to install dependencies (not npm)

## App Architecture

- Please read docs/app_architecture.md to know how this app is architected

## State Management

- State for values selected by the user in Select, Multi-Select, Switch, Date Picker, Search input, Tabs should live in the URL as query parameters, managed by Tanstack Router. If you have a doubt, ask me.

## React Specifics

- In general try and avoid useEffect directly, i.e. in the code that you write (it's ok if it's within a trusted package like Tanstack Query or a Shadcn component). If you plan to use one, pause and tell me, so I can review if there is a better alternative.

## Shadcn components

- always use Shadcn components for generic components like buttons, forms, date-pickers, etc. Install them using the Shadcn CLI: `pnpm dlx shadcn@latest add button`

## Frontend verification

- When you make frontend changes, use the agent-browser skill/tool to verify the affected UI before finishing.
- Check the changed route or component in the browser, verify the main interaction path, and report any console errors or visual regressions you find.
- If agent-browser is unavailable, say so explicitly and describe what verification you ran instead.
- When reviewing, set the viewport to a 14 inch MacBook Pro, with the command `agent-browser set viewport 1512 982 2`
