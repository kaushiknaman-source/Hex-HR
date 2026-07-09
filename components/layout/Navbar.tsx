'use client';

import { useEffect, useRef, useState } from 'react';
import { Bell, HelpCircle, ChevronDown, LifeBuoy, BookOpen, Mail } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ActivityItem, getActivity, getUnseenActivityCount, markActivitySeen } from '@/lib/localStore';

const DEFAULT_TITLE = { title: 'Dashboard', subtitle: 'Overview of your HR AI activity' };

const TITLES: Record<string, { title: string; subtitle: string }> = {
  '/': DEFAULT_TITLE,
  '/create-jd': { title: 'Hexagon JD Agent', subtitle: 'AI-Powered Job Description Studio' },
  '/templates': { title: 'Templates', subtitle: 'Reusable job role templates' },
  '/saved-jds': { title: 'Saved JDs', subtitle: 'Your saved job descriptions' },
  '/settings': { title: 'Settings', subtitle: 'Workspace configuration' },
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

export function Navbar() {
  const pathname = usePathname();
  const { title, subtitle } = TITLES[pathname] ?? DEFAULT_TITLE;

  const [openPanel, setOpenPanel] = useState<'help' | 'notifications' | 'account' | null>(null);
  const [unseen, setUnseen] = useState(0);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUnseen(getUnseenActivityCount());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleNotifications() {
    if (openPanel === 'notifications') {
      setOpenPanel(null);
      return;
    }
    setActivity(getActivity(6));
    markActivitySeen();
    setUnseen(0);
    setOpenPanel('notifications');
  }

  function togglePanel(panel: 'help' | 'account') {
    setOpenPanel(openPanel === panel ? null : panel);
  }

  return (
    <header className="relative flex items-center justify-between border-b border-border bg-surface px-6 py-4 print:hidden">
      <div>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="text-sm text-white/50">{subtitle}</p>
      </div>

      <div ref={containerRef} className="flex items-center gap-4">
        <div className="relative">
          <button
            aria-label="Help"
            onClick={() => togglePanel('help')}
            className={`rounded-md p-2 text-white/60 hover:bg-white/5 hover:text-white ${openPanel === 'help' ? 'bg-white/5 text-white' : ''}`}
          >
            <HelpCircle className="h-5 w-5" />
          </button>
          {openPanel === 'help' && (
            <div className="absolute right-0 top-11 z-20 w-72 rounded-md border border-border bg-surfaceMuted p-2 shadow-panel">
              <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/40">Help</p>
              <a href="#" onClick={(e) => e.preventDefault()} className="flex items-start gap-2.5 rounded-md px-2 py-2 text-sm text-white/80 hover:bg-white/5">
                <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="block font-medium">Getting started</span>
                  <span className="block text-xs text-white/50">Fill in the Create JD form, then generate.</span>
                </span>
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} className="flex items-start gap-2.5 rounded-md px-2 py-2 text-sm text-white/80 hover:bg-white/5">
                <LifeBuoy className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="block font-medium">Refining a JD</span>
                  <span className="block text-xs text-white/50">Use the toolbar above the preview to improve, shorten, or optimize for ATS.</span>
                </span>
              </a>
              <a href="mailto:hr-support@hexagon.com" className="flex items-start gap-2.5 rounded-md px-2 py-2 text-sm text-white/80 hover:bg-white/5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="block font-medium">Contact HR Support</span>
                  <span className="block text-xs text-white/50">hr-support@hexagon.com</span>
                </span>
              </a>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            aria-label="Notifications"
            onClick={toggleNotifications}
            className={`relative rounded-md p-2 text-white/60 hover:bg-white/5 hover:text-white ${openPanel === 'notifications' ? 'bg-white/5 text-white' : ''}`}
          >
            <Bell className="h-5 w-5" />
            {unseen > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-hexagon-errorRed text-[10px]">
                {unseen}
              </span>
            )}
          </button>
          {openPanel === 'notifications' && (
            <div className="absolute right-0 top-11 z-20 w-80 rounded-md border border-border bg-surfaceMuted p-2 shadow-panel">
              <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/40">Notifications</p>
              {activity.length === 0 ? (
                <p className="px-2 py-3 text-sm text-white/40">No notifications yet.</p>
              ) : (
                <ul>
                  {activity.map((item) => (
                    <li key={item.id} className="rounded-md px-2 py-2 text-sm text-white/80 hover:bg-white/5">
                      <p>{item.message}</p>
                      <p className="mt-0.5 text-xs text-white/40">{timeAgo(item.at)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => togglePanel('account')}
            className={`flex items-center gap-2 rounded-md py-1.5 pl-1.5 pr-3 hover:bg-white/5 ${openPanel === 'account' ? 'bg-white/5' : ''}`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
              HR
            </div>
            <div className="text-left">
              <p className="text-sm font-medium leading-tight">HR Manager</p>
              <p className="text-xs leading-tight text-white/50">Hexagon India</p>
            </div>
            <ChevronDown className="h-4 w-4 text-white/40" />
          </button>
          {openPanel === 'account' && (
            <div className="absolute right-0 top-11 z-20 w-56 rounded-md border border-border bg-surfaceMuted p-2 shadow-panel">
              <Link
                href="/settings"
                onClick={() => setOpenPanel(null)}
                className="block rounded-md px-3 py-2 text-sm text-white/80 hover:bg-white/5"
              >
                Workspace settings
              </Link>
              <p className="px-3 py-2 text-xs text-white/40">HR Manager · Hexagon India</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
