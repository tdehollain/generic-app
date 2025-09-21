import {
  Authenticated,
  AuthLoading,
  Unauthenticated,
  useQuery,
} from 'convex/react';
import './App.css';
import { api } from '../convex/_generated/api';
import { SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';

function App() {
  const UserName = () => {
    const user = useQuery(api.username.getCurrentUser);
    if (!user) {
      return <div>Not signed in</div>;
    }
    return <div>{user ? `Hello ${user.email}` : 'Loading...'}</div>;
  };

  return (
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
  );
}

export default App;
