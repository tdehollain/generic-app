// import { useQuery } from 'convex/react';
// import { api } from '../convex/_generated/api';
import { NavBar } from './components/NavBar';

function App() {
  // const UserName = () => {
  //   const user = useQuery(api.username.getCurrentUser);
  //   if (!user) {
  //     return <div>Not signed in</div>;
  //   }
  //   return <div>{user ? `Hello ${user.email}` : 'Loading...'}</div>;
  // };

  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground">
      <NavBar>
        <p>Hello {}</p>
      </NavBar>
    </main>
  );
}

export default App;
