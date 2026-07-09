'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Layers, Download, Sparkles, ArrowRight, Clock } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { JD_TEMPLATES } from '@/lib/data/templates';
import { getActivity, getStats, ActivityItem } from '@/lib/localStore';

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ jdsToday: 0, exportsThisWeek: 0, savedCount: 0 });
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setStats(getStats());
    setActivity(getActivity(5));
    setLoaded(true);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={FileText}
          label="JDs Generated Today"
          value={loaded ? String(stats.jdsToday) : '—'}
          delta={stats.jdsToday > 0 ? 'Generated today' : 'No JDs yet today'}
        />
        <StatCard
          icon={Layers}
          iconColor="text-hexagon-sea"
          label="Templates Available"
          value={String(JD_TEMPLATES.length)}
          delta="Job role templates"
        />
        <StatCard
          icon={Download}
          iconColor="text-hexagon-accentSky"
          label="Recent Exports"
          value={loaded ? String(stats.exportsThisWeek) : '—'}
          delta="Last 7 days"
        />
        <StatCard icon={Sparkles} iconColor="text-hexagon-land" label="AI Status" value="Active" delta="Claude Sonnet" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="panel flex flex-col justify-between gap-4 p-6 lg:col-span-2">
          <div>
            <h2 className="text-base font-semibold">Get started</h2>
            <p className="mt-1 text-sm text-white/60">
              Generate a new, ATS-ready job description from structured input, or start from a role template.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/create-jd"
              className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-hexagon-darkBlue transition-opacity hover:opacity-90"
            >
              Create a JD
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/templates"
              className="flex items-center gap-1.5 rounded-md border border-border px-4 py-2.5 text-sm font-medium text-white/80 transition-colors hover:border-primary hover:text-primary"
            >
              Browse templates
            </Link>
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="flex items-center gap-1.5 text-base font-semibold">
            <Clock className="h-4 w-4 text-white/50" />
            Recent activity
          </h2>
          {activity.length === 0 ? (
            <p className="mt-3 text-sm text-white/40">Nothing yet — activity shows up here as you work.</p>
          ) : (
            <ul className="mt-3 space-y-3">
              {activity.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
                  <span className="text-white/70">{item.message}</span>
                  <span className="shrink-0 text-xs text-white/30">{timeAgo(item.at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
