import { Outlet } from 'react-router';

import { Header } from './Header';
import { ThemeProvider } from './ThemeProvider';

import { Toaster } from '@/components/ui/sonner';

export function AppLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-svh w-svw flex flex-col">
        <Header />
        <main className="p-4 flex flex-col w-full h-full overflow-x-hidden">
          <Outlet />
          <Toaster />
        </main>
      </div>
    </ThemeProvider>
  );
}
