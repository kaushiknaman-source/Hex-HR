import { ReactNode } from 'react';

export function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-white/80">
        {label} {required && <span className="text-hexagon-errorRed">*</span>}
      </span>
      {children}
    </label>
  );
}

export const selectClass =
  'w-full rounded-md border border-border bg-surfaceMuted px-3 py-2 text-sm text-white outline-none focus:border-primary';
