'use client';

import { Bell, HelpCircle, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

const DEFAULT_TITLE = { title: 'Dashboard', subtitle: 'Overview of your HR AI activity' };

const TITLES: Record<string, { title: string; subtitle: string }> = {
  '/': DEFAULT_TITLE,
  '/create-jd': { title: 'Agent HR', subtitle: 'AI-Powered Job Description Studio' },
  '/templates': { title: 'Templates', subtitle: 'Reusable job role templates' },
  '/saved-jds': { title: 'Saved JDs', subtitle: 'Your saved job descriptions' },
  '/settings': { title: 'Settings', subtitle: 'Workspace configuration' },
};

export function Navbar() {
  const pathname = usePathname();
  const { title, subtitle } = TITLES[pathname] ?? DEFAULT_TITLE;

  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm text-white/50">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <button
          aria-label="Help"
          className="rounded-md p-2 text-white/60 hover:bg-white/5 hover:text-white"
        >
          <HelpCircle className="h-5 w-5" />
        </button>
        <button
          aria-label="Notifications"
          className="relative rounded-md p-2 text-white/60 hover:bg-white/5 hover:text-white"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-hexagon-errorRed text-[10px]">
            3
          </span>
        </button>
        <div className="flex items-center gap-2 rounded-md py-1.5 pl-1.5 pr-3 hover:bg-white/5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
            HR
          </div>
          <div className="text-left">
            <p className="text-sm font-medium leading-tight">HR Manager</p>
            <p className="text-xs leading-tight text-white/50">Hexagon India</p>
          </div>
          <ChevronDown className="h-4 w-4 text-white/40" />
        </div>
      </div>
    </header>
  );
}
