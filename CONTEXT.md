# Application context

This context describes how a visitor gains access to the application.

## Language

**Application session**:
The application-level interpretation of identity and authenticated data access. It is the only concept that decides whether the application is loading, signed out, or signed in.
_Avoid_: Clerk session, Convex authentication state, auth state
