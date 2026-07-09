'use client';

import { GeneratedJD, JDFormInput } from '@/lib/types/jd';

/**
 * Lightweight localStorage-backed persistence.
 * There's no backend database in this app yet, so this is what keeps a user's
 * in-progress JD, saved JDs, and activity feed alive across tab switches and
 * page navigations within the same browser.
 */

const KEYS = {
  draft: 'hexhr:draft',
  savedJDs: 'hexhr:savedJDs',
  activity: 'hexhr:activity',
  events: 'hexhr:events',
  notificationsSeenAt: 'hexhr:notificationsSeenAt',
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable — fail silently, it's non-critical persistence.
  }
}

/* ---------------------------- In-progress draft --------------------------- */

export interface Draft {
  form: JDFormInput;
  jd: GeneratedJD | null;
  updatedAt: string;
}

export function getDraft(): Draft | null {
  return read<Draft | null>(KEYS.draft, null);
}

export function setDraft(form: JDFormInput, jd: GeneratedJD | null) {
  write(KEYS.draft, { form, jd, updatedAt: new Date().toISOString() });
}

export function clearDraft() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEYS.draft);
}

/* -------------------------------- Saved JDs -------------------------------- */

export interface SavedJD {
  id: string;
  jd: GeneratedJD;
  savedAt: string;
}

export function getSavedJDs(): SavedJD[] {
  return read<SavedJD[]>(KEYS.savedJDs, []);
}

export function saveJD(jd: GeneratedJD): SavedJD {
  const list = getSavedJDs();
  const record: SavedJD = { id: crypto.randomUUID(), jd, savedAt: new Date().toISOString() };
  write(KEYS.savedJDs, [record, ...list]);
  recordActivity(`Saved "${jd.title}"`);
  recordEvent('save');
  return record;
}

export function deleteSavedJD(id: string) {
  write(
    KEYS.savedJDs,
    getSavedJDs().filter((s) => s.id !== id)
  );
}

/* -------------------------------- Activity -------------------------------- */

export interface ActivityItem {
  id: string;
  message: string;
  at: string;
}

export function getActivity(limit = 8): ActivityItem[] {
  return read<ActivityItem[]>(KEYS.activity, []).slice(0, limit);
}

export function recordActivity(message: string) {
  const list = read<ActivityItem[]>(KEYS.activity, []);
  const item: ActivityItem = { id: crypto.randomUUID(), message, at: new Date().toISOString() };
  write(KEYS.activity, [item, ...list].slice(0, 30));
}

export function getUnseenActivityCount(): number {
  const seenAt = read<string | null>(KEYS.notificationsSeenAt, null);
  const activity = read<ActivityItem[]>(KEYS.activity, []);
  if (!seenAt) return Math.min(activity.length, 9);
  return Math.min(activity.filter((a) => a.at > seenAt).length, 9);
}

export function markActivitySeen() {
  write(KEYS.notificationsSeenAt, new Date().toISOString());
}

/* ----------------------------- Stat tracking ------------------------------ */

type EventType = 'generate' | 'export' | 'save' | 'refine';

interface StatEvent {
  type: EventType;
  at: string;
}

export function recordEvent(type: EventType) {
  const list = read<StatEvent[]>(KEYS.events, []);
  write(KEYS.events, [{ type, at: new Date().toISOString() }, ...list].slice(0, 500));
}

function isToday(iso: string) {
  const d = new Date(iso);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate()
  );
}

function isWithinDays(iso: string, days: number) {
  const d = new Date(iso).getTime();
  return Date.now() - d <= days * 24 * 60 * 60 * 1000;
}

export function getStats() {
  const events = read<StatEvent[]>(KEYS.events, []);
  return {
    jdsToday: events.filter((e) => e.type === 'generate' && isToday(e.at)).length,
    exportsThisWeek: events.filter((e) => e.type === 'export' && isWithinDays(e.at, 7)).length,
    savedCount: getSavedJDs().length,
  };
}
