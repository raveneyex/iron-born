import { Dumbbell } from 'lucide-react';

import { MainNav } from './MainNav';
import { ModeSwitcher } from './ModeSwitcher';

export function Header() {
  return (
    <header className="sticky top-0 flex justify-between w-full px-6 py-2 border-b shadow backdrop-blur-md bg-opacity-0 z-50">
      <div className="flex items-center gap-2">
        <Dumbbell className="w-6 h-6" />
        <h1 className="text-lg font-semibold">Iron Born</h1>
      </div>

      <MainNav />

      <div className="flex items-center gap-2">
        <ModeSwitcher />
      </div>
    </header>
  );
}
