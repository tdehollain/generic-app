# How to start a project from this template

## Clerk

- Create the app in Clerk (if it doesn't already exist)
- Copy the VITE_CLERK_PUBLISHABLE_KEY and CLERK_JWT_ISSUER_DOMAIN values to .env.local
- Create in the Clerk dashboard the convec JWT template (Configure > JWT Template > Select Convex as template > don't change anyhting)

## Convex

- Create the app in Convex (if it doesn't already exist)
- Copy the CONVEX_DEPLOYMENT and VITE_CONVEX_URL values to .env.local
- Create the CLERK_JWT_ISSUER_DOMAIN env var in the project Settings > Environment Variables

## Run

- Run `pnpm run dev`
- Run `convex dev`

## Deploy to Vercel (dev)

- in Vercel > Environment Variables, create the variables VITE_CLERK_PUBLISHABLE_KEY, VITE_CONVEX_URL (?)

## Creating a production environment

- In Convex, create a Production environment
- In Clerk, create a Production environment (will require a bunch of DNS CNAME additions)
- From Clerk, in Setting > API keys, copy the "Frontend API URL" (e.g. https://clerk.barelinks.in) to Convex's setting > Environment Variables, creating a variable CLERK_JWT_ISSUER_DOMAIN
- In Convex, Project Settings > Production Deploy Keys, click "Generate Production Deploy Keys"
- Copy the key in Vercel > Environment Variables (for Production environment only): CONVEX_DEPLOY_KEY
- In Vercel, override the "Build command" to be 'npx convex deploy --cmd 'npm run build'.
- If Google OAuth is enabled, there are a few more steps to be done in the Google Cloud Platform (explained in the guide linked by Clerk)
