# How to start a project from this template

## Clerk

- Create the app in Clerk (if it doesn't already exist)
- Copy the VITE_CLERK_PUBLISHABLE_KEY and CLERK_JWT_ISSUER_DOMAIN values to .env.local
- Create in the Clerk dashboard the convec JWT template (Configure > JWT Template > Select Convex as template > don't change anyhting)

## Convex

- Create the app in Convex (if it doesn't already exist)
- Copy the CONVEX_DEPLOYMENT and VITE_CONVEX_URL values to .env.local
- Create the CLERK_JWT_ISSUER_DOMAIN env var in the project Settings > Environment Variables
