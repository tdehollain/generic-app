# App Architecture

This app uses a TanStack Router root shell with Clerk for authentication and Convex for authenticated data access. The application-session module is the only place that coordinates their state.

## Auth shell behavior

### Session recovery on sign-in

If Clerk says the session already exists, activate that existing session and then route into the app.

### Stale login tab refresh

If a login tab becomes active again, refresh Clerk state first; if the user is already signed in, activate that session and leave the login page automatically.

## Notes

- The root route supplies application content to the application-session module without interpreting provider state.
- The application-session module renders loading, sign-in, or application content from one coordinated session state.
- Navigation is part of the signed-in application content and assumes an authenticated user.
- Tests select session states through a test adapter and do not mount Clerk or Convex providers.
- Charts should use the `uplot` library unless indicated otherwise.
