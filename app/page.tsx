import { FileText, Layers, Download, Sparkles } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={FileText} label="JDs Generated Today" value="12" delta="+3 from yesterday" />
        <StatCard icon={Layers} iconColor="text-hexagon-sea" label="Templates Available" value="24" delta="Job role templates" />
        <StatCard icon={Download} iconColor="text-hexagon-accentSky" label="Recent Exports" value="8" delta="This week" />
        <StatCard icon={Sparkles} iconColor="text-hexagon-land" label="AI Status" value="Active" delta="Claude Sonnet" />
      </div>

      <div className="panel p-6">
        <h2 className="text-base font-semibold">Get started</h2>
        <p className="mt-1 text-sm text-white/60">
          Head to Create JD to generate a new, ATS-ready job description from structured input.
        </p>
      </div>
    </div>
  );
}
