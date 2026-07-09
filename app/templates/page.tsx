'use client';

import { useRouter } from 'next/navigation';
import { LayoutTemplate, ArrowRight } from 'lucide-react';
import { JD_TEMPLATES } from '@/lib/data/templates';
import { setDraft } from '@/lib/localStore';
import { JDFormInput } from '@/lib/types/jd';

export default function TemplatesPage() {
  const router = useRouter();

  function useTemplate(templateId: string) {
    const template = JD_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    const form: JDFormInput = {
      position: template.defaults.position,
      department: template.defaults.department,
      experience: template.defaults.experience,
      employmentType: template.defaults.employmentType,
      qualifications: template.defaults.qualifications,
      state: '',
      city: '',
      skills: template.defaults.skills,
      responsibilities: template.defaults.responsibilities,
      additionalNotes: '',
    };

    setDraft(form, null);
    router.push('/create-jd');
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold">Job Role Templates</h2>
        <p className="mt-1 text-sm text-white/50">
          Start from a pre-filled role template, then adjust the details and generate the JD.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {JD_TEMPLATES.map((template) => (
          <div key={template.id} className="panel flex flex-col gap-3 p-5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-primary">
                <LayoutTemplate className="h-4 w-4" />
              </div>
              <span className="rounded bg-hexagon-accentSky/15 px-2 py-0.5 text-xs font-medium text-hexagon-accentSky">
                {template.department}
              </span>
            </div>

            <div>
              <h3 className="font-semibold leading-tight">{template.name}</h3>
              <p className="mt-1 text-sm text-white/50">{template.blurb}</p>
            </div>

            <div className="mt-1 flex flex-wrap gap-1.5">
              {template.defaults.skills.slice(0, 4).map((skill) => (
                <span key={skill} className="rounded bg-white/5 px-2 py-0.5 text-xs text-white/60">
                  {skill}
                </span>
              ))}
              {template.defaults.skills.length > 4 && (
                <span className="rounded bg-white/5 px-2 py-0.5 text-xs text-white/40">
                  +{template.defaults.skills.length - 4} more
                </span>
              )}
            </div>

            <button
              onClick={() => useTemplate(template.id)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:border-primary hover:text-primary"
            >
              Use this template
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
