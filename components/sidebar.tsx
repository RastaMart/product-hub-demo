'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Store,
  Package,
  Megaphone,
  Tv,
  ChevronDown,
  Home,
  Menu,
  X,
  Wifi,
  Monitor,
  Phone,
  Router,
  Settings2,
  ListChecks,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const routes = [
  {
    label: 'Dashboard',
    icon: Home,
    href: '/',
  },
  {
    label: 'Markets',
    icon: Store,
    href: '/markets',
  },
  {
    label: 'Products',
    icon: Package,
    href: '/products',
    submenu: [
      {
        label: 'Internet',
        icon: Wifi,
        href: '/products/internet',
      },
      {
        label: 'TV',
        icon: Monitor,
        href: '/products/tv',
      },
      {
        label: 'Voice',
        icon: Phone,
        href: '/products/voice',
      },
      {
        label: 'Equipment',
        icon: Router,
        href: '/products/equipment',
      },
    ],
  },
  {
    label: 'Promotions',
    icon: Megaphone,
    href: '/promotions/active',
    submenu: [
      {
        label: 'Active Promotions',
        icon: ListChecks,
        href: '/promotions/active',
      },
      {
        label: 'Configs',
        icon: Settings2,
        href: '/promotions/configs',
      },
    ],
  },
  {
    label: 'TV Channels',
    icon: Tv,
    href: '/channels',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (label: string) => {
    setExpandedMenus((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label]
    );
  };

  const isSubmenuExpanded = (label: string) => expandedMenus.includes(label);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <>
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={toggleSidebar}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      )}
      <div
        className={cn(
          'fixed md:static bg-white z-40 transition-all duration-300',
          isMobile ? (isOpen ? 'w-64 left-0' : '-left-64 w-64') : 'w-64',
          'h-screen'
        )}
      >
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-semibold text-[#1a237e]">Product Hub</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <div className="space-y-1">
                {routes.map((route) => (
                  <div key={route.href}>
                    {route.submenu ? (
                      <>
                        <Button
                          variant="ghost"
                          className={cn(
                            'w-full justify-between',
                            isActive(route.href)
                              ? 'bg-gray-100 text-[#ff5252]'
                              : 'text-gray-700'
                          )}
                          onClick={() => toggleSubmenu(route.label)}
                        >
                          <div className="flex items-center">
                            <route.icon className="h-5 w-5 mr-2" />
                            {route.label}
                          </div>
                          <ChevronDown
                            className={cn(
                              'h-4 w-4 transition-transform',
                              isSubmenuExpanded(route.label)
                                ? 'transform rotate-180'
                                : ''
                            )}
                          />
                        </Button>
                        {isSubmenuExpanded(route.label) && (
                          <div className="ml-4 space-y-1 mt-1">
                            {route.submenu.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={cn(
                                  'flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-[#ff5252]',
                                  isActive(subItem.href)
                                    ? 'bg-gray-100 text-[#ff5252]'
                                    : 'text-gray-700'
                                )}
                                onClick={() => isMobile && setIsOpen(false)}
                              >
                                <subItem.icon className="h-5 w-5" />
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={route.href}
                        className={cn(
                          'flex items-center gap-x-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-100 hover:text-[#ff5252]',
                          isActive(route.href)
                            ? 'bg-gray-100 text-[#ff5252]'
                            : 'text-gray-700'
                        )}
                        onClick={() => isMobile && setIsOpen(false)}
                      >
                        <route.icon className="h-5 w-5" />
                        {route.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
