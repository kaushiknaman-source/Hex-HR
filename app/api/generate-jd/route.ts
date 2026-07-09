import { NextRequest, NextResponse } from 'next/server';
import { anthropic, CLAUDE_MODEL, parseClaudeJSON } from '@/lib/anthropic';
import { JD_SYSTEM_PROMPT } from '@/lib/prompts/system';
import { buildGenerateJDPrompt } from '@/lib/prompts/user';
import { GeneratedJD, JDFormInput } from '@/lib/types/jd';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'Server is not configured with an API key.' }, { status: 500 });
  }

  let input: JDFormInput;
  try {
    input = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!input.position || !input.department) {
    return NextResponse.json({ error: 'Position and department are required.' }, { status: 400 });
  }

  try {
    const message = await anthropic.messages.create({
      model: CLAUDE_MODEL,
      max_tokens: 2000,
      system: JD_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildGenerateJDPrompt(input) }],
    });

    const textBlock = message.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'No content returned from model.' }, { status: 502 });
    }

    const jd = parseClaudeJSON<GeneratedJD>(textBlock.text);
    return NextResponse.json({ jd });
  } catch (err) {
    console.error('[generate-jd] error', err);
    return NextResponse.json({ error: 'Failed to generate job description.' }, { status: 500 });
  }
}
