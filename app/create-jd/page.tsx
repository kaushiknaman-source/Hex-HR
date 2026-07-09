'use client';

import { useEffect, useMemo, useState } from 'react';
import positionsData from '@/lib/data/positions.json';
import locationsData from '@/lib/data/locations.json';
import { Field, selectClass } from '@/components/ui/Field';
import { SkillInput } from '@/components/jd/SkillInput';
import { ResponsibilitiesEditor } from '@/components/jd/ResponsibilitiesEditor';
import { QualityScore } from '@/components/jd/QualityScore';
import { JDPreview } from '@/components/jd/JDPreview';
import { ExportToolbar } from '@/components/jd/ExportToolbar';
import { RefineToolbar } from '@/components/jd/RefineToolbar';
import { GenerationLoader } from '@/components/jd/GenerationLoader';
import { GeneratedJD, JDFormInput, ToolbarAction } from '@/lib/types/jd';
import { clearDraft, getDraft, recordActivity, recordEvent, setDraft } from '@/lib/localStore';

const SKILL_SUGGESTIONS = [
  'Preventive Maintenance', 'PLC', 'HSE', 'ISO Documentation', 'Asset Lifecycle',
  'Communication', 'Leadership', 'AutoCAD', 'SAP', 'Project Scheduling',
];

const locations = locationsData as Record<string, string[]>;

export default function CreateJDPage() {
  const [form, setForm] = useState<JDFormInput>({
    position: '',
    department: '',
    experience: '',
    employmentType: '',
    qualifications: [],
    state: '',
    city: '',
    skills: [],
    responsibilities: [],
    additionalNotes: '',
  });

  const [jd, setJd] = useState<GeneratedJD | null>(null);
  const [loading, setLoading] = useState(false);
  const [refining, setRefining] = useState<ToolbarAction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [restored, setRestored] = useState(false);

  // Restore any in-progress draft (from a previous visit, or from "Use this template").
  useEffect(() => {
    const draft = getDraft();
    if (draft) {
      setForm(draft.form);
      setJd(draft.jd);
      setRestored(true);
    }
    setHydrated(true);
  }, []);

  // Persist the draft as it changes so navigating between tabs doesn't lose progress.
  useEffect(() => {
    if (!hydrated) return;
    setDraft(form, jd);
  }, [form, jd, hydrated]);

  const cities = useMemo(() => (form.state ? locations[form.state] ?? [] : []), [form.state]);

  function set<K extends keyof JDFormInput>(key: K, value: JDFormInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleGenerate() {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/generate-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Generation failed.');
      setJd(data.jd);
      recordEvent('generate');
      recordActivity(`Generated JD for "${data.jd.title}"`);
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  async function handleRefine(action: ToolbarAction) {
    if (!jd) return;
    setRefining(action);
    setError(null);
    try {
      const res = await fetch('/api/improve-jd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, jd }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Update failed.');
      setJd(data.jd);
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong.');
    } finally {
      setRefining(null);
    }
  }

  function clearAll() {
    setForm({
      position: '', department: '', experience: '', employmentType: '',
      qualifications: [], state: '', city: '', skills: [], responsibilities: [], additionalNotes: '',
    });
    setJd(null);
    setError(null);
    setRestored(false);
    clearDraft();
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-2 print:block">
      {/* LEFT: FORM */}
      <div className="panel space-y-5 p-6 print:hidden">
        <div>
          <h2 className="text-base font-semibold">Create Job Description</h2>
          <p className="text-sm text-white/50">Fill in the details below. Claude will craft a professional JD for you.</p>
        </div>

        {restored && (
          <div className="flex items-center justify-between rounded-md border border-hexagon-accentSky/30 bg-hexagon-accentSky/10 px-3 py-2 text-xs text-hexagon-accentSky">
            <span>Restored your in-progress draft.</span>
            <button onClick={() => setRestored(false)} className="font-medium hover:underline">
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <Field label="Job Position" required>
            <select className={selectClass} value={form.position} onChange={(e) => set('position', e.target.value)}>
              <option value="">Select position</option>
              {positionsData.positions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="Department" required>
            <select className={selectClass} value={form.department} onChange={(e) => set('department', e.target.value)}>
              <option value="">Select department</option>
              {positionsData.departments.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Field>
          <Field label="Experience" required>
            <select className={selectClass} value={form.experience} onChange={(e) => set('experience', e.target.value)}>
              <option value="">Select experience</option>
              {positionsData.experienceLevels.map((e) => <option key={e} value={e}>{e}</option>)}
            </select>
          </Field>
          <Field label="Employment Type" required>
            <select className={selectClass} value={form.employmentType} onChange={(e) => set('employmentType', e.target.value)}>
              <option value="">Select type</option>
              {positionsData.employmentTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Qualifications" required>
          <SkillInput
            values={form.qualifications}
            onChange={(v) => set('qualifications', v)}
            placeholder="Add qualifications…"
            suggestions={positionsData.qualifications}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Location (State)" required>
            <select
              className={selectClass}
              value={form.state}
              onChange={(e) => setForm((f) => ({ ...f, state: e.target.value, city: '' }))}
            >
              <option value="">Select state</option>
              {Object.keys(locations).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="City" required>
            <select className={selectClass} value={form.city} onChange={(e) => set('city', e.target.value)} disabled={!form.state}>
              <option value="">Select city</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Skills" required>
          <SkillInput
            values={form.skills}
            onChange={(v) => set('skills', v)}
            placeholder="Add relevant skills…"
            suggestions={SKILL_SUGGESTIONS}
          />
          <p className="mt-1 text-xs text-white/40">
            Add every relevant skill — Claude will decide what's required vs. preferred.
          </p>
        </Field>

        <Field label="Key Responsibilities" required>
          <ResponsibilitiesEditor items={form.responsibilities} onChange={(v) => set('responsibilities', v)} />
        </Field>

        <Field label="Additional Notes">
          <textarea
            value={form.additionalNotes}
            maxLength={500}
            onChange={(e) => set('additionalNotes', e.target.value)}
            placeholder="Any specific requirements or notes…"
            rows={3}
            className="w-full resize-none rounded-md border border-border bg-surfaceMuted px-3 py-2 text-sm outline-none placeholder:text-white/30 focus:border-primary"
          />
          <p className="mt-1 text-right text-xs text-white/30">{form.additionalNotes?.length ?? 0} / 500</p>
        </Field>

        {jd && (
          <div className="rounded-md border border-border bg-surfaceMuted p-4">
            <QualityScore score={jd.qualityScore} />
          </div>
        )}

        {error && <p className="text-sm text-hexagon-errorRed">{error}</p>}

        <div className="flex gap-3 pt-2">
          <button
            onClick={clearAll}
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium text-white/70 hover:border-white/30"
          >
            Clear All
          </button>
          <button
            onClick={handleGenerate}
            disabled={loading || !form.position || !form.department}
            className="flex-1 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-hexagon-darkBlue transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? 'Generating…' : jd ? 'Regenerate JD' : 'Generate JD'}
          </button>
        </div>
      </div>

      {/* RIGHT: PREVIEW */}
      <div className="space-y-3 print:space-y-0">
        <div className="flex items-center justify-between print:hidden">
          <h2 className="text-base font-semibold">JD Preview</h2>
          {jd && <RefineToolbar disabled={loading} busyAction={refining} onAction={handleRefine} />}
        </div>

        <div className="flex gap-4 print:block print:gap-0">
          <div className="panel flex-1 overflow-hidden p-2 print:rounded-none print:border-none print:p-0 print:shadow-none print:overflow-visible">
            {loading ? <GenerationLoader /> : <JDPreview jd={jd} />}
          </div>
          <ExportToolbar jd={jd} />
        </div>
      </div>
    </div>
  );
}
