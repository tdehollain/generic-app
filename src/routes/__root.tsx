import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { Authenticated, Unauthenticated } from 'convex/react';
import { LoginForm } from '@/components/auth/LoginForm';
import { NavBar } from '@/components/NavBar';
import { AppSidebar } from '@/components/Sidebar/AppSidebar';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <Unauthenticated>
        <main className="flex min-h-screen items-center justify-center bg-background text-foreground">
          <LoginForm />
        </main>
      </Unauthenticated>
      <Authenticated>
        <NavBar />
        <AppSidebar />
        <main className="pt-20 pb-6 px-14 md:px-16 lg:px-18 mx-auto">
          <Outlet />
        </main>
      </Authenticated>
    </React.Fragment>
  );
}
