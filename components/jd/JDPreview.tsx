import { GeneratedJD } from '@/lib/types/jd';
import { MapPin, Briefcase, Clock } from 'lucide-react';

export function JDPreview({ jd }: { jd: GeneratedJD | null }) {
  if (!jd) {
    return (
      <div className="flex h-full min-h-[400px] flex-col items-center justify-center text-center text-white/40">
        <p className="text-sm">Fill in the form and generate a job description to see the preview here.</p>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-white p-8 text-hexagon-darkBlue">
      <div className="mb-6 flex items-start justify-between border-b border-black/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold">{jd.title}</h2>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-black/60">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {jd.location.city}, {jd.location.state}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" /> {jd.department}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {jd.employmentType}
            </span>
            <span>{jd.experienceRange}</span>
          </div>
        </div>
        <span className="text-lg font-extrabold tracking-tight text-hexagon-darkBlue">HEXAGON</span>
      </div>

      <Section title="Job Summary">
        <p className="text-sm leading-relaxed text-black/80">{jd.jobSummary}</p>
      </Section>

      <Section title="Key Responsibilities">
        <ul className="list-disc space-y-1 pl-5 text-sm text-black/80">
          {jd.keyResponsibilities.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </Section>

      <div className="grid grid-cols-2 gap-6">
        <Section title="Qualifications">
          <ul className="list-disc space-y-1 pl-5 text-sm text-black/80">
            {jd.qualifications.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </Section>
        <Section title="Experience">
          <p className="text-sm text-black/80">{jd.experienceRange}</p>
        </Section>
      </div>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {[...jd.requiredSkills, ...jd.preferredSkills].map((s, i) => (
            <span key={i} className="rounded bg-hexagon-accentSky/40 px-2 py-1 text-xs font-medium text-hexagon-skyDark">
              {s}
            </span>
          ))}
        </div>
      </Section>

      {jd.softSkills.length > 0 && (
        <Section title="Soft Skills">
          <div className="flex flex-wrap gap-2">
            {jd.softSkills.map((s, i) => (
              <span key={i} className="rounded bg-hexagon-coolGrey1 px-2 py-1 text-xs font-medium text-black/70">
                {s}
              </span>
            ))}
          </div>
        </Section>
      )}

      <Section title="About Hexagon">
        <p className="text-sm text-black/70">{jd.aboutCompany}</p>
      </Section>

      <Section title="Equal Opportunity Statement" last>
        <p className="text-sm text-black/70">{jd.equalOpportunityStatement}</p>
      </Section>
    </div>
  );
}

function Section({ title, children, last }: { title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={last ? 'mt-6' : 'mb-6'}>
      <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-hexagon-skyDark">{title}</h3>
      {children}
    </div>
  );
}
