'use client';

import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { clearDraft, getSavedJDs } from '@/lib/localStore';

const PREFS_KEY = 'hexhr:preferences';

interface Prefs {
  displayName: string;
  department: string;
}

function readPrefs(): Prefs {
  if (typeof window === 'undefined') return { displayName: 'HR Manager', department: 'Hexagon India' };
  try {
    const raw = window.localStorage.getItem(PREFS_KEY);
    return raw ? JSON.parse(raw) : { displayName: 'HR Manager', department: 'Hexagon India' };
  } catch {
    return { displayName: 'HR Manager', department: 'Hexagon India' };
  }
}

export default function SettingsPage() {
  const [prefs, setPrefs] = useState<Prefs>({ displayName: 'HR Manager', department: 'Hexagon India' });
  const [saved, setSaved] = useState(false);
  const [savedJdCount, setSavedJdCount] = useState(0);

  useEffect(() => {
    setPrefs(readPrefs());
    setSavedJdCount(getSavedJDs().length);
  }, []);

  function handleSave() {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  function handleClearDraft() {
    clearDraft();
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h2 className="text-base font-semibold">Workspace Settings</h2>
        <p className="mt-1 text-sm text-white/50">Your display info and local workspace preferences.</p>
      </div>

      <div className="panel space-y-4 p-6">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/80">Display Name</span>
          <input
            value={prefs.displayName}
            onChange={(e) => setPrefs((p) => ({ ...p, displayName: e.target.value }))}
            className="w-full rounded-md border border-border bg-surfaceMuted px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-white/80">Workspace</span>
          <input
            value={prefs.department}
            onChange={(e) => setPrefs((p) => ({ ...p, department: e.target.value }))}
            className="w-full rounded-md border border-border bg-surfaceMuted px-3 py-2 text-sm outline-none focus:border-primary"
          />
        </label>
        <button
          onClick={handleSave}
          className="rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-hexagon-darkBlue transition-opacity hover:opacity-90"
        >
          {saved ? 'Saved' : 'Save changes'}
        </button>
      </div>

      <div className="panel space-y-3 p-6">
        <h3 className="text-sm font-semibold">Local data</h3>
        <p className="text-sm text-white/50">
          You have {savedJdCount} saved job description{savedJdCount === 1 ? '' : 's'} stored in this browser.
        </p>
        <button
          onClick={handleClearDraft}
          className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-white/70 transition-colors hover:border-hexagon-errorRed hover:text-hexagon-errorRed"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear in-progress draft
        </button>
      </div>
    </div>
  );
}
