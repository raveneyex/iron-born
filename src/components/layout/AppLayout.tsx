import { Outlet } from 'react-router';
import { Header } from './Header';
import { ThemeProvider } from './ThemeProvider';

export function AppLayout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-svh w-full flex flex-col">
        <Header />
        <main className="p-4 w-full flex-1 h-full flex flex-col">
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  );
}
