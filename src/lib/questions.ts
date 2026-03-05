// ============================================================
// Question Bank — Curated daily questions
// ============================================================
import { DailyQuestion, QuestionCategory } from '@/types';

export const QUESTION_BANK: Omit<DailyQuestion, 'id'>[] = [
  // === JOY & TASTE (Week 1 — Light & Fun) ===
  {
    text: "What song have you had on repeat lately?",
    category: 'joy_taste',
    answerType: 'text',
    sensitivityLevel: 0,
  },
  {
    text: "Pick your ideal weekend vibe:",
    category: 'joy_taste',
    answerType: 'mcq',
    options: ['Cozy at home', 'Out exploring', 'With close friends', 'Solo adventure'],
    sensitivityLevel: 0,
  },
  {
    text: "What's a comfort food that always hits?",
    category: 'joy_taste',
    answerType: 'text',
    sensitivityLevel: 0,
  },
  {
    text: "Morning person or night owl?",
    category: 'joy_taste',
    answerType: 'mcq',
    options: ['Early bird', 'Night owl', 'Depends on the day', 'I never sleep 😅'],
    sensitivityLevel: 0,
  },
  {
    text: "What's a place that makes you feel most alive?",
    category: 'joy_taste',
    answerType: 'text',
    sensitivityLevel: 0,
  },
  {
    text: "Pick the movie genre that matches your mood right now:",
    category: 'joy_taste',
    answerType: 'mcq',
    options: ['Romance', 'Thriller', 'Comedy', 'Sci-fi / Fantasy'],
    sensitivityLevel: 0,
  },

  // === VALUES (Week 2+) ===
  {
    text: "What matters more to you right now — freedom or stability?",
    category: 'values',
    answerType: 'slider',
    sensitivityLevel: 1,
  },
  {
    text: "When making a big decision, do you trust your gut or analyze everything?",
    category: 'values',
    answerType: 'mcq',
    options: ['Trust my gut', 'Analyze everything', 'Ask people I trust', 'Avoid deciding 😅'],
    sensitivityLevel: 1,
  },
  {
    text: "What does success look like for you — not what others expect, but what YOU want?",
    category: 'values',
    answerType: 'text',
    sensitivityLevel: 1,
  },
  {
    text: "Is family more of your anchor or your challenge right now?",
    category: 'values',
    answerType: 'mcq',
    options: ['My anchor', 'My challenge', 'Both honestly', 'Neither — I\'m independent'],
    sensitivityLevel: 1,
  },

  // === RELATIONSHIPS ===
  {
    text: "How do you usually show love to the people closest to you?",
    category: 'relationships',
    answerType: 'mcq',
    options: ['Words & messages', 'Quality time', 'Doing things for them', 'Gifts & surprises'],
    sensitivityLevel: 1,
  },
  {
    text: "When you're hurt by someone close, what's your first instinct?",
    category: 'relationships',
    answerType: 'mcq',
    options: ['Go quiet', 'Talk it out immediately', 'Need space first', 'Pretend I\'m fine'],
    sensitivityLevel: 2,
  },
  {
    text: "What's one thing you wish people understood about you without you having to say it?",
    category: 'relationships',
    answerType: 'text',
    sensitivityLevel: 2,
  },

  // === WORK STYLE ===
  {
    text: "What energizes you more — starting something new or finishing something?",
    category: 'work_style',
    answerType: 'mcq',
    options: ['Starting new things', 'Finishing what I start', 'Honestly neither 😅', 'Depends on what it is'],
    sensitivityLevel: 0,
  },
  {
    text: "How much risk are you comfortable with right now?",
    category: 'work_style',
    answerType: 'slider',
    sensitivityLevel: 1,
  },
  {
    text: "What kind of work environment brings out your best?",
    category: 'work_style',
    answerType: 'text',
    sensitivityLevel: 0,
  },

  // === STRESS ===
  {
    text: "What's been taking up the most mental space lately?",
    category: 'stress',
    answerType: 'text',
    sensitivityLevel: 2,
  },
  {
    text: "When you're overwhelmed, what actually helps you reset?",
    category: 'stress',
    answerType: 'text',
    sensitivityLevel: 1,
  },
  {
    text: "How's your energy been this week?",
    category: 'stress',
    answerType: 'slider',
    sensitivityLevel: 0,
  },

  // === IDENTITY ===
  {
    text: "What's something you're quietly proud of that not many people know?",
    category: 'identity',
    answerType: 'text',
    sensitivityLevel: 2,
  },
  {
    text: "If you could master one skill instantly, what would it be?",
    category: 'identity',
    answerType: 'text',
    sensitivityLevel: 0,
  },
  {
    text: "What part of yourself are you actively working on?",
    category: 'identity',
    answerType: 'text',
    sensitivityLevel: 2,
  },

  // === SPIRITUALITY (Optional) ===
  {
    text: "Is there a ritual or habit that grounds you — even a small one?",
    category: 'spirituality',
    answerType: 'text',
    sensitivityLevel: 1,
  },
  {
    text: "Do you believe things happen for a reason, or is life more random?",
    category: 'spirituality',
    answerType: 'mcq',
    options: ['Everything happens for a reason', 'Mostly random', 'Somewhere in between', 'I change my mind often'],
    sensitivityLevel: 1,
  },

  // === CULTURE ===
  {
    text: "Which festival or celebration fills you with the most joy?",
    category: 'culture',
    answerType: 'text',
    sensitivityLevel: 0,
  },
  {
    text: "What tradition from your childhood do you still carry with you?",
    category: 'culture',
    answerType: 'text',
    sensitivityLevel: 1,
  },
];

// Memory-referencing question templates
export const MEMORY_TEMPLATES = [
  "You said you feel most alive when {memory} — what's been inspiring you lately?",
  "Still vibing with {memory}? What else has caught your ear recently?",
  "Last time you mentioned {memory} was on your mind — how's that going?",
  "You once said {memory} — does that still feel true?",
  "Remember when you shared about {memory}? What would your advice be to yourself then?",
];

export function getQuestionForDay(dayNumber: number, answeredCategories: string[]): Omit<DailyQuestion, 'id'> {
  // First 5 days: joy_taste only
  if (dayNumber <= 5) {
    const joyQuestions = QUESTION_BANK.filter(q => q.category === 'joy_taste');
    return joyQuestions[dayNumber % joyQuestions.length];
  }

  // After day 5: rotate through categories, avoiding recent ones
  const available = QUESTION_BANK.filter(
    q => !answeredCategories.slice(-3).includes(q.category) && q.sensitivityLevel <= Math.min(3, Math.floor(dayNumber / 10))
  );

  if (available.length === 0) {
    return QUESTION_BANK[dayNumber % QUESTION_BANK.length];
  }

  return available[dayNumber % available.length];
}
