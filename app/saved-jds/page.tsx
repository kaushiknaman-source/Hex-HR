'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookmarkCheck, Eye, Trash2, MapPin, Briefcase } from 'lucide-react';
import { deleteSavedJD, getSavedJDs, SavedJD, setDraft } from '@/lib/localStore';

export default function SavedJDsPage() {
  const router = useRouter();
  const [saved, setSaved] = useState<SavedJD[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSaved(getSavedJDs());
    setLoaded(true);
  }, []);

  function handleView(item: SavedJD) {
    setDraft(
      {
        position: '', department: '', experience: '', employmentType: '',
        qualifications: [], state: '', city: '', skills: [], responsibilities: [], additionalNotes: '',
      },
      item.jd
    );
    router.push('/create-jd');
  }

  function handleDelete(id: string) {
    deleteSavedJD(id);
    setSaved(getSavedJDs());
  }

  if (!loaded) return null;

  if (saved.length === 0) {
    return (
      <div className="panel flex flex-col items-center gap-2 p-12 text-center">
        <BookmarkCheck className="h-8 w-8 text-white/20" />
        <h2 className="text-base font-semibold">No saved JDs yet</h2>
        <p className="max-w-sm text-sm text-white/50">
          Generate a job description in Create JD, then use "Save JD" to keep it here for later.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-semibold">Saved JDs</h2>
        <p className="mt-1 text-sm text-white/50">Job descriptions you've saved for reuse or later editing.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {saved.map((item) => (
          <div key={item.id} className="panel flex flex-col gap-3 p-5">
            <div>
              <h3 className="font-semibold leading-tight">{item.jd.title}</h3>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {item.jd.location.city}, {item.jd.location.state}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" /> {item.jd.department}
                </span>
              </div>
            </div>

            <p className="text-xs text-white/40">
              Saved {new Date(item.savedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>

            <div className="mt-1 flex gap-2">
              <button
                onClick={() => handleView(item)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:border-primary hover:text-primary"
              >
                <Eye className="h-3.5 w-3.5" />
                View
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm text-white/50 transition-colors hover:border-hexagon-errorRed hover:text-hexagon-errorRed"
                aria-label="Delete"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
