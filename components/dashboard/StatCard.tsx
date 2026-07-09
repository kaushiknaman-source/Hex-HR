import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  iconColor?: string;
  label: string;
  value: string;
  delta?: string;
}

export function StatCard({ icon: Icon, iconColor = 'text-primary', label, value, delta }: StatCardProps) {
  return (
    <div className="panel flex items-start gap-4 p-5">
      <div className={cn('flex h-10 w-10 items-center justify-center rounded-md bg-white/5', iconColor)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm text-white/50">{label}</p>
        <p className="text-2xl font-semibold leading-tight">{value}</p>
        {delta && <p className="mt-0.5 text-xs text-hexagon-land">{delta}</p>}
      </div>
    </div>
  );
}
