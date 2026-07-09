'use client';

import { Wand2, Scissors, Landmark, Cpu, Target, RotateCcw } from 'lucide-react';
import { ToolbarAction } from '@/lib/types/jd';

const ACTIONS: { action: ToolbarAction; label: string; icon: typeof Wand2 }[] = [
  { action: 'improve', label: 'Improve', icon: Wand2 },
  { action: 'shorten', label: 'Shorten', icon: Scissors },
  { action: 'more_formal', label: 'More Formal', icon: Landmark },
  { action: 'more_technical', label: 'More Technical', icon: Cpu },
  { action: 'ats_optimize', label: 'ATS Optimize', icon: Target },
  { action: 'regenerate', label: 'Regenerate', icon: RotateCcw },
];

export function RefineToolbar({
  disabled,
  busyAction,
  onAction,
}: {
  disabled: boolean;
  busyAction: ToolbarAction | null;
  onAction: (action: ToolbarAction) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS.map(({ action, label, icon: Icon }) => (
        <button
          key={action}
          disabled={disabled || busyAction !== null}
          onClick={() => onAction(action)}
          className="flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon className="h-3.5 w-3.5" />
          {busyAction === action ? 'Working…' : label}
        </button>
      ))}
    </div>
  );
}
