import { Link, useLocation } from 'react-router';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'History', href: '/history' },
];

export function MainNav() {
  const location = useLocation();

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <NavigationMenu className="flex items-center gap-2">
      <NavigationMenuList>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} data-active={isLinkActive(item.href)} asChild>
              <Link to={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
