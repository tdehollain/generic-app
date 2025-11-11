import { Menu } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { NavMain } from './nav-main';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import appModules from '@/lib/appModules';

export function AppSidebar({
  className,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider defaultOpen={false} className="min-h-0">
      <Sidebar
        collapsible="icon"
        className={cn('top-14', className)}
        {...props}
      >
        <SidebarHeader>
          <SidebarTrigger className="ml-0.5 mt-1">
            <Button variant="ghost" className="w-full">
              <Menu />
            </Button>
          </SidebarTrigger>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={appModules} />
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
