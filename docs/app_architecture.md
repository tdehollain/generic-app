# App Architecture

This app uses a TanStack Router root shell with Clerk for authentication and Convex for authenticated data access.

## Auth shell behavior

### Session recovery on sign-in

If Clerk says the session already exists, activate that existing session and then route into the app.

### Stale login tab refresh

If a login tab becomes active again, refresh Clerk state first; if the user is already signed in, activate that session and leave the login page automatically.

## Notes

- The login shell is rendered from the root route when the user is unauthenticated.
- The authenticated app shell is rendered from the same root route once Clerk and Convex report an active session.
- Charts should use the `uplot` library unless indicated otherwise.
