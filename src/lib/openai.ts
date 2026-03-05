// ============================================================
// OpenAI Integration — The "Brain" of AstraPulse
// ============================================================
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function selectDailyQuestion(context: {
  traits: Record<string, number>;
  recentCategories: string[];
  depthLevel: number;
  currentMood: number;
  memories: string[];
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You are AstraPulse's question curator. Select the best daily question from the bank.
Rules:
- Start light/fun for new users (depthLevel < 7), deepen gradually.
- Never repeat recent categories (${context.recentCategories.join(', ')}).
- If mood < 3, avoid sensitive topics.
- 2-3x/week, reference a past memory to create "it remembers me" magic.
- Return JSON: { questionText, category, answerType, options?, memoryReference? }`,
      },
      {
        role: 'user',
        content: JSON.stringify(context),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function interpretAnswer(context: {
  question: string;
  answer: string;
  currentLifeprint: Record<string, unknown>;
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `Extract structured signals from this user's answer to their daily question.
Return JSON: {
  memories: [{ key, value, type: "fact"|"preference"|"feeling" }],
  traitDeltas: [{ trait, delta: -0.1 to 0.1, reason }],
  stateSignals: { mood?, energy?, stress? },
  themes: string[]
}
Be nuanced. Never overfit from a single answer. Small deltas only.`,
      },
      {
        role: 'user',
        content: JSON.stringify(context),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export async function generateReading(context: {
  astroFeatures: Record<string, unknown>;
  traits: Record<string, unknown>;
  currentState: Record<string, unknown>;
  memories: string[];
  tonePref: string;
  language: string;
}) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You are AstraPulse's reading generator. Create a hyper-personalized daily reading.

Tone: ${context.tonePref}
Language: ${context.language}

Rules:
- NEVER be fatalistic or fear-mongering.
- Always warm, grounded, empowering.
- Reference 1-2 personal memories naturally.
- Be specific, not generic.
- Include explainability.

Return JSON: {
  theme: "short theme string",
  leanInto: ["point 1", "point 2"],
  watchFor: ["point 1", "point 2"],
  tinyAction: "one specific behavioral action",
  reflectionPrompt: "one journaling question",
  explainAstro: ["why from astrology perspective"],
  explainYou: ["why from personal context"]
}`,
      },
      {
        role: 'user',
        content: JSON.stringify(context),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content || '{}');
}

export default openai;
