import { NextRequest, NextResponse } from 'next/server';
import { getQuestionForDay } from '@/lib/questions';
import { getDailyTransits } from '@/lib/astrology';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const dayNumber = parseInt(searchParams.get('day') || '1');
    const answeredCategories = (searchParams.get('categories') || '').split(',').filter(Boolean);

    const question = getQuestionForDay(dayNumber, answeredCategories);
    const transits = getDailyTransits(new Date().toISOString());

    return NextResponse.json({
      question: { id: `q-${dayNumber}`, ...question },
      transits,
      date: new Date().toISOString().split('T')[0],
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get today data' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { answer, questionId, isPrivate, userId } = body;

    // In production: call OpenAI to interpret answer and generate reading
    // For now, return a mock reading
    const reading = {
      id: crypto.randomUUID(),
      userId,
      date: new Date().toISOString().split('T')[0],
      theme: 'Trust the process today',
      leanInto: [
        'You thrive when you give yourself permission to be imperfect.',
        'Small steps forward count more than you think.',
      ],
      watchFor: [
        'The urge to compare yourself to others.',
        'Overthinking before taking action.',
      ],
      tinyAction: 'Write down one thing that went well today, no matter how small.',
      reflectionPrompt: 'What would you do differently if you knew no one was watching?',
      explainAstro: ['Moon transit supports introspection today', 'Mercury helps organize your thoughts'],
      explainYou: ['You mentioned focusing on career growth', 'Your analytical nature sometimes needs a gentler touch'],
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ reading, lifeprintUpdates: [] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process answer' }, { status: 500 });
  }
}
