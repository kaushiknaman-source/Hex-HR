'use client';

import { useState } from 'react';
import { GripVertical, Trash2, Plus } from 'lucide-react';

interface ResponsibilitiesEditorProps {
  items: string[];
  onChange: (items: string[]) => void;
}

export function ResponsibilitiesEditor({ items, onChange }: ResponsibilitiesEditorProps) {
  const [draft, setDraft] = useState('');
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  function add() {
    if (draft.trim()) {
      onChange([...items, draft.trim()]);
      setDraft('');
    }
  }

  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i));
  }

  function update(i: number, value: string) {
    onChange(items.map((it, idx) => (idx === i ? value : it)));
  }

  function handleDrop(i: number) {
    if (dragIndex === null || dragIndex === i) return;
    const next = [...items];
    const moved = next[dragIndex];
    if (moved === undefined) return;
    next.splice(dragIndex, 1);
    next.splice(i, 0, moved);
    onChange(next);
    setDragIndex(null);
  }

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div
          key={i}
          draggable
          onDragStart={() => setDragIndex(i)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(i)}
          className="flex items-center gap-2 rounded-md border border-border bg-surfaceMuted px-2 py-1.5"
        >
          <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-white/30" />
          <input
            value={item}
            onChange={(e) => update(i, e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none"
          />
          <button type="button" onClick={() => remove(i)} aria-label="Delete responsibility">
            <Trash2 className="h-4 w-4 text-white/40 hover:text-hexagon-errorRed" />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), add())}
          placeholder="Add a responsibility…"
          className="flex-1 rounded-md border border-border bg-surfaceMuted px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-primary"
        />
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1 rounded-md border border-border px-3 py-2 text-sm text-white/70 hover:border-primary hover:text-primary"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>
    </div>
  );
}
