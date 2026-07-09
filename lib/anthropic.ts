import 'server-only';
import Anthropic from '@anthropic-ai/sdk';

// Server-only module — importing this from a client component will fail the build,
// which is the intended guardrail against ever shipping the API key to the browser.
if (!process.env.ANTHROPIC_API_KEY) {
  // Do not throw at module-eval time in dev/build; route handlers check again per-request.
  console.warn('[agent-hr] ANTHROPIC_API_KEY is not set.');
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const CLAUDE_MODEL = 'claude-sonnet-4-6';

/** Strips accidental markdown code fences before JSON.parse, since the model
 *  is instructed to return raw JSON but this guards against drift. */
export function parseClaudeJSON<T>(text: string): T {
  const cleaned = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
  return JSON.parse(cleaned) as T;
}
