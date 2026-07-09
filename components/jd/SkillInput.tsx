'use client';

import { useState, KeyboardEvent } from 'react';
import { X, Plus } from 'lucide-react';

interface SkillInputProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
}

export function SkillInput({ values, onChange, placeholder, suggestions = [] }: SkillInputProps) {
  const [draft, setDraft] = useState('');

  function addValue(v: string) {
    const trimmed = v.trim();
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed]);
    }
    setDraft('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addValue(draft);
    } else if (e.key === 'Backspace' && !draft && values.length) {
      onChange(values.slice(0, -1));
    }
  }

  const filteredSuggestions = suggestions.filter(
    (s) => !values.includes(s) && s.toLowerCase().includes(draft.toLowerCase())
  );

  return (
    <div>
      <div className="flex min-h-[42px] flex-wrap items-center gap-1.5 rounded-md border border-border bg-surfaceMuted px-2 py-1.5 focus-within:border-primary">
        {values.map((v) => (
          <span
            key={v}
            className="flex items-center gap-1 rounded bg-primary/15 px-2 py-1 text-xs font-medium text-primary"
          >
            {v}
            <button type="button" onClick={() => onChange(values.filter((x) => x !== v))} aria-label={`Remove ${v}`}>
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={values.length ? '' : placeholder}
          className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-white/30"
        />
        {draft && (
          <button
            type="button"
            onClick={() => addValue(draft)}
            className="rounded p-1 text-primary hover:bg-primary/10"
            aria-label="Add"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {draft && filteredSuggestions.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {filteredSuggestions.slice(0, 6).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addValue(s)}
              className="rounded border border-border px-2 py-0.5 text-xs text-white/60 hover:border-primary hover:text-primary"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
