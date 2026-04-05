'use client';

import React from 'react';
import {
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/Sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col min-h-screen w-full">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
