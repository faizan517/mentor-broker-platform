import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/shared/Navbar';
import { useThemeStore } from '@stores/themeStore';

export default function CustomerPortalLayout() {
  const isDark = useThemeStore((state) => state.isDark);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="flex flex-col h-screen bg-white dark:bg-neutral-950">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
