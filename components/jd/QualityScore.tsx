import { CheckCircle2, Circle } from 'lucide-react';
import { QualityScore as QualityScoreType } from '@/lib/types/jd';

export function QualityScore({ score }: { score: QualityScoreType | null }) {
  const value = score?.overall ?? 0;
  const circumference = 2 * Math.PI * 30;
  const offset = circumference - (value / 100) * circumference;

  const rows: [string, boolean][] = [
    ['Required Fields', score?.requiredFields ?? false],
    ['ATS Ready', score?.atsReady ?? false],
    ['Grammar', score?.grammar ?? false],
    ['Completeness', score?.completeness ?? false],
  ];

  return (
    <div className="flex items-center gap-4">
      <svg width="72" height="72" viewBox="0 0 72 72" className="shrink-0 -rotate-90">
        <circle cx="36" cy="36" r="30" stroke="#173F63" strokeWidth="6" fill="none" />
        <circle
          cx="36"
          cy="36"
          r="30"
          stroke="#83C410"
          strokeWidth="6"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
        <text x="36" y="36" transform="rotate(90 36 36)" textAnchor="middle" dy="5" className="fill-white text-sm font-semibold">
          {value}%
        </text>
      </svg>
      <div className="space-y-1 text-xs text-white/70">
        {rows.map(([label, ok]) => (
          <div key={label} className="flex items-center gap-1.5">
            {ok ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-hexagon-land" />
            ) : (
              <Circle className="h-3.5 w-3.5 text-white/20" />
            )}
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
