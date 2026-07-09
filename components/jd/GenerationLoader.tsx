'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const STEPS = [
  'Analyzing position…',
  'Understanding skills…',
  'Matching qualifications…',
  'Generating ATS structure…',
  'Writing responsibilities…',
  'Optimizing language…',
  'Finalizing job description…',
];

export function GenerationLoader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-full min-h-[400px] flex-col items-center justify-center gap-3 text-white/60">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      <p className="text-sm">{STEPS[step]}</p>
    </div>
  );
}
