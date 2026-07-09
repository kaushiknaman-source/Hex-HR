'use client';

import { useState } from 'react';
import { Copy, Check, FileDown, FileText, Printer, Share2, Save } from 'lucide-react';
import { GeneratedJD } from '@/lib/types/jd';
import { recordActivity, recordEvent, saveJD } from '@/lib/localStore';

export function ExportToolbar({ jd }: { jd: GeneratedJD | null }) {
  const disabled = !jd;
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

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
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function handleExport() {
    recordEvent('export');
    if (jd) recordActivity(`Exported "${jd.title}"`);
    window.print();
  }

  function handleSave() {
    if (!jd) return;
    saveJD(jd);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  const actions = [
    { icon: copied ? Check : Copy, label: copied ? 'Copied' : 'Copy', onClick: handleCopy },
    { icon: FileDown, label: 'Download PDF', onClick: handleExport },
    { icon: Printer, label: 'Print', onClick: handleExport },
    { icon: saved ? Check : Save, label: saved ? 'Saved' : 'Save JD', onClick: handleSave },
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

      <div className="mt-1 border-t border-border pt-1.5">
        <p className="px-1 pb-1 text-[11px] uppercase tracking-wide text-white/30">Coming soon</p>
        <button
          disabled
          title="DOCX export is on the roadmap"
          className="flex w-full cursor-not-allowed items-center gap-2 rounded-md px-3 py-2 text-sm text-white/30"
        >
          <FileText className="h-4 w-4" />
          Download DOCX
        </button>
        <button
          disabled
          title="Share links are on the roadmap"
          className="flex w-full cursor-not-allowed items-center gap-2 rounded-md px-3 py-2 text-sm text-white/30"
        >
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>
    </div>
  );
}
