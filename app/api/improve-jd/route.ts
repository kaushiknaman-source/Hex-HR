import { NextRequest, NextResponse } from 'next/server';
import { anthropic, CLAUDE_MODEL, parseClaudeJSON } from '@/lib/anthropic';
import { JD_SYSTEM_PROMPT } from '@/lib/prompts/system';
import { buildToolbarActionPrompt } from '@/lib/prompts/user';
import { GeneratedJD, ToolbarAction } from '@/lib/types/jd';

export const runtime = 'nodejs';
export const maxDuration = 60;

const VALID_ACTIONS: ToolbarAction[] = [
  'improve',
  'shorten',
  'more_formal',
  'more_technical',
  'ats_optimize',
  'regenerate',
];

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Server is not configured with an API key.' }, { status: 500 });
  }

  const body = await req.json().catch(() => null);
  const action: ToolbarAction | undefined = body?.action;
  const currentJD = body?.jd;

  if (!action || !VALID_ACTIONS.includes(action) || !currentJD) {
    return NextResponse.json({ error: 'Missing or invalid action/jd payload.' }, { status: 400 });
  }

  try {
    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2000,
      system: JD_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildToolbarActionPrompt(action, currentJD) }],
    });

    const textBlock = message.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'No content returned from model.' }, { status: 502 });
    }

    const jd = parseClaudeJSON<GeneratedJD>(textBlock.text);
    return NextResponse.json({ jd });
  } catch (err) {
    console.error('[improve-jd] error', err);
    return NextResponse.json({ error: 'Failed to update job description.' }, { status: 500 });
  }
}
