import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { useTheme } from './ThemeProvider';

export function ModeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const tooltipText = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <TooltipProvider>
      <Tooltip>
        <Button variant="ghost" className="group/toggle h-8 w-8 px-0" onClick={toggleTheme} asChild>
          <TooltipTrigger>
            <SunIcon className="hidden [html.dark_&]:block" />
            <MoonIcon className="hidden [html.light_&]:block" />
            <span className="sr-only">Toggle theme</span>
          </TooltipTrigger>
        </Button>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
