# Tech Stack

## Vite + React

`npm create vite@latest my-app -- --template react-ts`
(for some reason running this with pnpm seems to ignore the template)

## Node types

`pnpm.i -D @types/node`

## Convex

`pnpm i convex`

## Clerk

- Create application in Clerk
- Create JWT template (Convex)
- configure CLERK_JWT_ISSUER_DOMAIN on the Convex Dashboard
- Create convex/auth.config.ts:

  ```typescript
  export default {
    providers: [
      {
        domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
        applicationID: 'convex',
      },
    ],
  };
  ```

  ```

  ```

- Install clerk: `pnpm install @clerk/clerk-react`
- Add VITE_CLERK_PUBLISHABLE_KEY to .env.local
- Configure ConvexProviderWithClerk

## Test auth

- Create getCurrentUser API function

```typescript
import { query } from './_generated/server';

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error('Not authenticated');
    }
    return identity;
  },
});
```

- Create UserName component:

  ```typescript
  const UserName = () => {
    const user = useQuery(api.username.getCurrentUser);
    if (!user) {
      return <div>Not signed in</div>;
    }
    return <div>{user ? `Hello ${user.email}` : 'Loading...'}</div>;
  };
  ```

- Update App.tsx:

```tsx
<main>
  <Unauthenticated>
    <SignInButton />
  </Unauthenticated>
  <Authenticated>
    <UserButton />
    <UserName />
    <SignOutButton />
  </Authenticated>
  <AuthLoading>
    <p>Still loading</p>
  </AuthLoading>
</main>
```

temp user pwd: 7?9MR?iFGMEstBio
