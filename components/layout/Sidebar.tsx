'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FilePenLine,
  LayoutTemplate,
  BookmarkCheck,
  Sparkles,
  Settings,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/create-jd', label: 'Create JD', icon: FilePenLine },
  { href: '/templates', label: 'Templates', icon: LayoutTemplate },
  { href: '/saved-jds', label: 'Saved JDs', icon: BookmarkCheck },
  { href: '/ai-suggestions', label: 'AI Suggestions', icon: Sparkles },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-surface">
      <div className="flex items-center gap-2 px-6 py-5">
        <HexagonMark className="h-7 w-7" />
        <span className="text-lg font-bold tracking-wide">HEXAGON</span>
      </div>

      <p className="px-6 pb-4 text-xs uppercase tracking-widest text-hexagon.coolGrey9 text-white/40">
        Workspace
      </p>

      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary/15 text-primary'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-2">
        <p className="px-3 pb-2 text-xs uppercase tracking-widest text-white/40">Admin</p>
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>

      <div className="mx-3 mb-4 space-y-2 rounded-md border border-border bg-surfaceMuted p-3">
        <div className="flex items-center gap-2 text-sm text-hexagon-land">
          <CheckCircle2 className="h-4 w-4" />
          Claude Connected
        </div>
        <p className="text-xs text-white/50">All systems operational</p>
        <div className="flex items-center justify-between pt-1 text-xs">
          <span className="text-white/50">API Status</span>
          <span className="text-hexagon-land">●</span>
        </div>
      </div>

      <p className="px-6 pb-4 text-xs text-white/30">© {new Date().getFullYear()} Hexagon AB</p>
    </aside>
  );
}

function HexagonMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 260 320" className={className} fill="none" stroke="white" strokeWidth="10">
      <path d="M8 100 L128 8 L128 260 L8 260 Z M128 8 L128 260 L252 100 L128 176 L252 100 M128 260 L252 176" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
