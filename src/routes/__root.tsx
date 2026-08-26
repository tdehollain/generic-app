import { Outlet, createRootRoute } from '@tanstack/react-router';
import { ApplicationSession } from '@/application-session/ApplicationSession';
import { NavBar } from '@/components/NavBar';
import { AppSidebar } from '@/components/Sidebar/AppSidebar';

export const Route = createRootRoute({
  component: function RootComponent() {
    return (
      <ApplicationSession>
        <NavBar />
        <AppSidebar />
        <main className="pt-20 pb-6 px-14 md:px-16 lg:px-18 mx-auto">
          <Outlet />
        </main>
      </ApplicationSession>
    );
  },
});
