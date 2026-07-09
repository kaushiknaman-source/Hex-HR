'use client';

import { Copy, FileDown, FileText, Printer, Share2, Save } from 'lucide-react';
import { GeneratedJD } from '@/lib/types/jd';

export function ExportToolbar({ jd }: { jd: GeneratedJD | null }) {
  const disabled = !jd;

  async function handleCopy() {
    if (!jd) return;
    const text = [
      jd.title,
      `${jd.location.city}, ${jd.location.state}`,
      '',
      'Job Summary',
      jd.jobSummary,
      '',
      'Key Responsibilities',
      ...jd.keyResponsibilities.map((r) => `- ${r}`),
    ].join('\n');
    await navigator.clipboard.writeText(text);
  }

  const actions = [
    { icon: Copy, label: 'Copy', onClick: handleCopy },
    { icon: FileDown, label: 'Download PDF', onClick: () => window.print() },
    { icon: FileText, label: 'Download DOCX', onClick: () => alert('Wire up /api/export/docx (docx package included).') },
    { icon: Printer, label: 'Print', onClick: () => window.print() },
    { icon: Share2, label: 'Share', onClick: () => alert('Wire up share link generation.') },
    { icon: Save, label: 'Save JD', onClick: () => alert('Wire up persistence (DB / KV) here.') },
  ];

  return (
    <div className="flex flex-col gap-1.5 print:hidden">
      {actions.map(({ icon: Icon, label, onClick }) => (
        <button
          key={label}
          disabled={disabled}
          onClick={onClick}
          className="flex items-center gap-2 rounded-md border border-border bg-surfaceMuted px-3 py-2 text-sm text-white/80 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
