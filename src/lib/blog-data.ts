// ============================================================
// Blog Data — SEO-optimized astrology content
// Vedic-first + Gen Z viral content mix
// ============================================================

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: 'vedic' | 'western' | 'lifestyle' | 'guide' | 'compatibility';
  tags: string[];
  publishedAt: string;
  readTime: number;
  emoji: string;
  featured: boolean;
  content: string;
}

export const BLOG_CATEGORIES = [
  { slug: 'vedic', label: 'Vedic Astrology', emoji: '🕉️', description: 'Deep dives into Rashi, Nakshatra, and ancient wisdom' },
  { slug: 'western', label: 'Western Astrology', emoji: '✨', description: 'Sun signs, Moon signs, and planetary transits' },
  { slug: 'lifestyle', label: 'Cosmic Lifestyle', emoji: '🌙', description: 'How the stars shape your daily life' },
  { slug: 'guide', label: 'Guides', emoji: '📖', description: 'Everything you need to know, explained simply' },
  { slug: 'compatibility', label: 'Compatibility', emoji: '💕', description: 'How signs connect, clash, and complement' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'what-is-nakshatra-complete-guide',
    title: 'What Is Your Nakshatra? The Complete Guide to Vedic Birth Stars',
    description: 'Your Nakshatra reveals more about you than your Sun sign ever could. Learn what your Vedic birth star means, how to find it, and why it matters for relationships, career, and daily life.',
    category: 'vedic',
    tags: ['nakshatra', 'vedic astrology', 'birth star', 'kundli', 'indian astrology'],
    publishedAt: '2026-03-01',
    readTime: 12,
    emoji: '⭐',
    featured: true,
    content: `# What Is Your Nakshatra? The Complete Guide to Vedic Birth Stars

Your Nakshatra is perhaps the most powerful — and most overlooked — element of your cosmic identity. While Western astrology focuses on your Sun sign, Vedic astrology considers your Nakshatra (birth star) the true key to understanding who you are.

## What Is a Nakshatra?

In Vedic astrology, the zodiac is divided into 27 Nakshatras — lunar mansions that the Moon passes through during its monthly cycle. Each Nakshatra spans 13°20' of the zodiac and carries its own mythology, ruling deity, and personality blueprint.

Think of it this way: your Rashi (Moon sign) tells you *what room you're in*. Your Nakshatra tells you *which corner of that room you're sitting in* — and what the view looks like from there.

## The 27 Nakshatras at a Glance

### 1. Ashwini (0°–13°20' Aries)
**Ruling deity:** Ashwini Kumaras (divine physicians)
**Quality:** Swift, healing, pioneering
**You are:** The one who shows up first, fixes things fast, and hates waiting around.

### 2. Bharani (13°20'–26°40' Aries)
**Ruling deity:** Yama (god of transformation)
**Quality:** Intense, creative, transformative
**You are:** Someone who feels everything deeply and isn't afraid of life's extremes.

### 3. Krittika (26°40' Aries–10° Taurus)
**Ruling deity:** Agni (fire god)
**Quality:** Sharp, purifying, honest
**You are:** Direct, sometimes blunt, always principled. You burn away what doesn't serve you.

*[Each Nakshatra follows with similar detail...]*

## How to Find Your Nakshatra

You need your exact date, time, and place of birth. The Moon's position at your birth moment determines your Nakshatra. Unlike Sun signs which change monthly, Nakshatras shift every day — making birth time crucial.

**Try AstraPulse** — we calculate your Nakshatra instantly, for free, and show you what it means in the context of your actual life.

## Why Your Nakshatra Matters More Than You Think

Your Nakshatra influences:
- **Compatibility**: Traditional Indian matchmaking uses Nakshatra-based compatibility (Guna Milan) as a primary filter
- **Career tendencies**: Each Nakshatra has natural strengths that align with certain work styles
- **Health patterns**: Vedic astrology associates specific health tendencies with each birth star
- **Daily timing**: Nakshatras play a role in choosing auspicious dates (Muhurat) for important events

## Nakshatra vs Sun Sign: What's the Difference?

| Aspect | Sun Sign (Western) | Nakshatra (Vedic) |
|--------|-------------------|-------------------|
| Based on | Sun's position | Moon's position |
| Changes | Monthly | Daily |
| Divisions | 12 signs | 27 stars |
| Precision | Broad personality | Nuanced traits |
| Birth time needed? | No | Yes (ideally) |

## The Bottom Line

Your Nakshatra is like a fingerprint — far more specific than a Sun sign, and deeply rooted in thousands of years of Vedic wisdom. It doesn't just tell you *what* you are. It tells you *why* you are the way you are.

---

*Want to discover your Nakshatra and see how it shapes your daily readings? AstraPulse calculates it instantly and weaves it into personalized guidance that evolves with you.*`,
  },
  {
    slug: 'moon-sign-texting-style',
    title: 'What Your Moon Sign Says About Your Texting Style',
    description: 'Why do some people triple-text and others leave you on read for days? Blame it on the Moon. Here\'s what each Moon sign reveals about how you communicate digitally.',
    category: 'lifestyle',
    tags: ['moon sign', 'texting', 'communication', 'zodiac', 'gen z astrology'],
    publishedAt: '2026-03-03',
    readTime: 6,
    emoji: '📱',
    featured: true,
    content: `# What Your Moon Sign Says About Your Texting Style

Your Moon sign rules your emotions, instincts, and how you connect with people when nobody's watching. And in 2026, "how you connect" mostly means how you text.

## Aries Moon
**Texting style:** Fast, blunt, no fluff
You reply in 3 seconds or 3 days — no in-between. Your texts are short, direct, and often just a voice note because typing is too slow. You definitely start conversations with "yo" or just send a meme with zero context.

## Taurus Moon
**Texting style:** Warm but slow
You take your time replying because you're actually thinking about what to say. Your texts feel like a hug. You send food pics, playlist links, and "this reminded me of you" messages that make people feel special.

## Gemini Moon
**Texting style:** Chaotic energy
15 conversations going at once. You switch topics mid-sentence. You send screenshots of other conversations. Your group chats are legendary. You've definitely accidentally sent a message to the wrong person.

## Cancer Moon
**Texting style:** The emotional novelist
Your "quick reply" is 4 paragraphs. You use voice notes for feelings that words can't capture. You screenshot meaningful messages and save them. You notice when someone's energy shifts in texts before they even realize it themselves.

## Leo Moon
**Texting style:** Main character energy
Dramatic punctuation!!! Selfies as reactions. You hype people up in texts like it's your job. Your "good morning" messages could be motivational posters. You definitely have a signature emoji.

## Virgo Moon
**Texting style:** The editor
Perfect grammar, always. You proofread before sending. You notice when someone uses "your" instead of "you're" and it bothers you more than you'll admit. Your texts are helpful, practical, and always have a point.

## Libra Moon
**Texting style:** The diplomat
You take 20 minutes to craft a 2-line reply because you're considering how it'll be received. You use "haha" to soften everything. You're the one who smooths things over in group chats when it gets tense.

## Scorpio Moon
**Texting style:** The reader of subtext
You analyze every word, every emoji, every response time. You screenshot suspicious messages. You can tell someone's lying over text. Your replies are calculated, but when you trust someone, your texts are deeply vulnerable and real.

## Sagittarius Moon
**Texting style:** The random updater
You disappear for weeks then send a text at 2am that says "I just realized something about life" with no context. You text from airports, mountain tops, and random cities. Your texts make people want to travel.

## Capricorn Moon
**Texting style:** The minimalist
"Ok." "Got it." "Makes sense." You communicate maximum meaning in minimum words. Your texts are efficient. But once in a while, you send a late-night message that's surprisingly deep and makes everyone go "wait, are you okay?"

## Aquarius Moon
**Texting style:** The thought-provoker
You send articles, podcast clips, and conspiracy theories at midnight. Your texts start debates. You use texting to share ideas more than feelings. Your group chat contributions are weird, brilliant, or both.

## Pisces Moon
**Texting style:** The poet
You communicate in vibes. Music links, poetry screenshots, sunset photos. Your texts feel like art. You definitely have a note in your phone full of things you wanted to text someone but didn't.

---

*Your Moon sign is just the beginning. AstraPulse learns how you actually communicate — not just what the stars say — and weaves it into readings that feel impossibly personal.*`,
  },
  {
    slug: 'rashi-moon-sign-vedic-astrology',
    title: 'Understanding Your Rashi: Moon Sign in Vedic Astrology Explained',
    description: 'In Vedic astrology, your Rashi (Moon sign) is more important than your Sun sign. Learn how to find yours, what it means, and how it shapes your emotional world.',
    category: 'vedic',
    tags: ['rashi', 'moon sign', 'vedic astrology', 'indian astrology', 'jyotish'],
    publishedAt: '2026-02-28',
    readTime: 10,
    emoji: '🌙',
    featured: false,
    content: `# Understanding Your Rashi: Moon Sign in Vedic Astrology

In Western astrology, everyone knows their Sun sign. In Vedic astrology (Jyotish), your **Rashi** — your Moon sign — is considered far more important.

## Why the Moon Matters More in Vedic Astrology

The Sun changes signs roughly once a month. The Moon changes signs every 2.25 days. This makes your Moon sign far more specific to *you* — it depends not just on your birth date, but your exact birth time and location.

Your Rashi reveals your emotional nature, instinctive reactions, and inner self. While your Sun sign might describe your outward personality, your Rashi describes who you are when no one's watching.

## The 12 Rashis

### Mesha (Aries) — Ruled by Mars
Bold, independent, quick to act. You lead with courage and sometimes with impatience.

### Vrishabha (Taurus) — Ruled by Venus
Grounded, sensual, loyal. You value stability and beauty in equal measure.

### Mithuna (Gemini) — Ruled by Mercury
Curious, communicative, adaptable. Your mind moves faster than most people can follow.

### Karka (Cancer) — Ruled by Moon
Deeply nurturing, intuitive, emotionally intelligent. Home and family are your anchors.

### Simha (Leo) — Ruled by Sun
Generous, confident, creative. You bring warmth to every room and need recognition for your gifts.

### Kanya (Virgo) — Ruled by Mercury
Analytical, service-oriented, detail-focused. You improve everything you touch.

### Tula (Libra) — Ruled by Venus
Harmonious, fair-minded, relationship-oriented. Balance isn't a preference — it's a need.

### Vrishchika (Scorpio) — Ruled by Mars
Intense, transformative, deeply perceptive. You see what others miss and feel what others avoid.

### Dhanu (Sagittarius) — Ruled by Jupiter
Philosophical, optimistic, freedom-loving. You're always searching for meaning and truth.

### Makara (Capricorn) — Ruled by Saturn
Disciplined, ambitious, patient. You understand that real success takes time.

### Kumbha (Aquarius) — Ruled by Saturn
Innovative, humanitarian, independent. You think in systems and care about the collective.

### Meena (Pisces) — Ruled by Jupiter
Compassionate, imaginative, spiritual. You feel the world's emotions as if they were your own.

## How to Find Your Rashi

You need your exact Moon position at birth, which requires your date, time, and place of birth. Online Kundli calculators can help, but many use inaccurate ayanamsa calculations.

**AstraPulse** calculates your Rashi precisely and shows how it influences your daily readings — not as generic horoscope content, but as guidance woven with your actual life context.

---

*Your Rashi is the foundation. What you build on it — through daily reflection and self-awareness — is what makes astrology truly useful.*`,
  },
  {
    slug: 'zodiac-signs-attachment-styles',
    title: 'Your Zodiac Sign and Attachment Style: Why You Love the Way You Do',
    description: 'Secure, anxious, avoidant, or fearful? Your birth chart has clues about your attachment style — and understanding it can transform your relationships.',
    category: 'compatibility',
    tags: ['attachment style', 'relationships', 'zodiac', 'love', 'compatibility'],
    publishedAt: '2026-03-05',
    readTime: 8,
    emoji: '💕',
    featured: true,
    content: `# Your Zodiac Sign and Attachment Style

Attachment theory meets astrology. While your attachment style is shaped by life experience, your birth chart reveals the emotional wiring underneath — the patterns you might not even be aware of.

## What Are Attachment Styles?

**Secure:** You're comfortable with closeness and independence. You communicate needs clearly.
**Anxious:** You crave closeness, fear abandonment, and sometimes need reassurance.
**Avoidant:** You value independence, sometimes at the cost of intimacy. Closeness can feel overwhelming.
**Fearful-Avoidant:** You want closeness but fear it. Push-pull dynamics feel familiar.

## The Cosmic Clues

### Fire Signs (Aries, Leo, Sagittarius)
**Tendency:** Secure or Avoidant
Fire signs are naturally independent. Aries charges forward alone; Leo needs admiration but on their terms; Sagittarius runs from anything that feels confining. The key growth area: learning that needing someone isn't weakness.

### Earth Signs (Taurus, Virgo, Capricorn)
**Tendency:** Secure or Anxious
Earth signs crave stability. Taurus can become possessive when insecure; Virgo expresses anxiety through criticism (of self and partner); Capricorn may prioritize achievement over emotional vulnerability. The key growth area: trusting that love doesn't require perfection.

### Air Signs (Gemini, Libra, Aquarius)
**Tendency:** Avoidant or Fearful-Avoidant
Air signs intellectualize emotions. Gemini deflects with humor; Libra avoids conflict at all costs; Aquarius retreats into ideas when feelings get intense. The key growth area: sitting with feelings instead of analyzing them.

### Water Signs (Cancer, Scorpio, Pisces)
**Tendency:** Anxious or Fearful-Avoidant
Water signs feel everything deeply. Cancer fears abandonment; Scorpio tests loyalty through intensity; Pisces absorbs their partner's emotions and loses themselves. The key growth area: boundaries that protect without isolating.

## It's More Complex Than Your Sun Sign

Your Venus sign shapes how you express love. Your Moon sign reveals what you need emotionally. Your 7th house describes your partnership patterns. A full birth chart reading reveals layers that a Sun-sign-only approach can't touch.

## Using This Awareness

The point isn't to label yourself or your partner. It's to recognize patterns — and then choose consciously. Astrology doesn't determine your attachment style. But it illuminates the emotional terrain you're working with.

---

*AstraPulse goes deeper than generic compatibility content. Through daily questions, we learn your actual relationship patterns — not just what the stars suggest, but how you actually show up in love.*`,
  },
  {
    slug: 'sade-sati-survival-guide',
    title: 'Sade Sati Survival Guide: Saturn\'s 7.5 Year Transit Explained',
    description: 'Sade Sati is one of the most feared periods in Vedic astrology. But it doesn\'t have to be. Here\'s what it actually means, when it hits, and how to navigate it with grace.',
    category: 'vedic',
    tags: ['sade sati', 'saturn transit', 'vedic astrology', 'shani', 'indian astrology'],
    publishedAt: '2026-02-25',
    readTime: 11,
    emoji: '🪐',
    featured: false,
    content: `# Sade Sati Survival Guide: Saturn's 7.5 Year Transit

If you've ever heard an Indian aunty say "Shani is on them" with a knowing look — they're probably talking about Sade Sati.

## What Is Sade Sati?

Sade Sati (literally "seven and a half" in Hindi) is a 7.5-year period when Saturn (Shani) transits through the 12th, 1st, and 2nd houses from your natal Moon sign. Saturn spends approximately 2.5 years in each sign, and this three-sign transit creates a period of intense karmic learning.

## When Does Sade Sati Happen?

It depends on your Moon sign (Rashi). Saturn takes about 29.5 years to orbit the Sun, so most people experience Sade Sati 2-3 times in their lifetime.

## The Three Phases

### Phase 1: Rising (12th from Moon) — 2.5 years
Saturn enters the sign before your Moon sign. This phase often brings financial strain, increased expenses, and a sense of something shifting beneath the surface. Sleep might be disrupted. Old structures start to crack.

### Phase 2: Peak (1st from Moon — over your Moon) — 2.5 years
The most intense phase. Saturn sits directly on your natal Moon, which rules emotions, mind, and inner peace. This period can bring career changes, health challenges, relationship tests, and deep emotional processing. But it also brings maturity, discipline, and lasting growth.

### Phase 3: Setting (2nd from Moon) — 2.5 years
The pressure begins to ease, but Saturn now tests your resources — finances, family, and self-worth. This phase consolidates the lessons of the first two.

## What Sade Sati Is NOT

It is NOT a curse. It is NOT 7.5 years of suffering. Many people experience tremendous growth during Sade Sati — career breakthroughs, spiritual awakening, and the kind of resilience that only comes from being tested.

## How to Navigate Sade Sati

1. **Don't panic.** Fear is the worst response to Saturn energy.
2. **Work hard.** Saturn rewards discipline and effort, not shortcuts.
3. **Be patient.** Results during Sade Sati are delayed but lasting.
4. **Take care of your health.** Physical and mental wellness matter more than ever.
5. **Practice reflection.** This is a time for inner work, not just outer achievement.

## The Gift of Saturn

Saturn strips away what isn't real. Relationships that aren't built on truth will be tested. Career paths that don't align with your dharma will feel heavy. But what survives Sade Sati becomes unshakeable.

---

*AstraPulse tracks major Vedic transits including Sade Sati and weaves them into your daily readings — so you always know where Saturn is and what it's asking of you.*`,
  },
  {
    slug: 'kundli-matching-modern-guide',
    title: 'Kundli Matching for Modern Indians: Does It Still Matter?',
    description: 'Your family wants Kundli matching before the wedding. You\'re not sure it matters. Here\'s what Kundli matching actually measures, where it\'s useful, and where it falls short.',
    category: 'compatibility',
    tags: ['kundli matching', 'marriage', 'compatibility', 'guna milan', 'vedic astrology'],
    publishedAt: '2026-03-04',
    readTime: 9,
    emoji: '💍',
    featured: false,
    content: `# Kundli Matching for Modern Indians: Does It Still Matter?

Kundli matching (Guna Milan) has been central to Indian marriage traditions for centuries. In 2026, young Indians are asking: does it still matter?

The honest answer: it's complicated.

## How Kundli Matching Works

Traditional Kundli matching compares the birth charts (Kundlis) of two people across 8 categories called Ashtakoota, scoring up to 36 Gunas (points).

The 8 factors: Varna (spiritual compatibility), Vashya (mutual attraction), Tara (health and wellbeing), Yoni (sexual compatibility), Graha Maitri (mental compatibility), Gana (temperament), Bhakoot (love and finance), Nadi (health of children).

A score of 18+ out of 36 is traditionally considered acceptable.

## Where Kundli Matching Gets It Right

The system actually encodes some genuinely useful compatibility insights. Gana matching (temperament) maps roughly to modern personality compatibility. Graha Maitri (planetary friendship between Moon signs) reflects emotional compatibility. Bhakoot examines financial harmony between partners.

These aren't magic — they're pattern recognition refined over millennia.

## Where It Falls Short

Kundli matching has limitations. It's static — it captures who you were at birth, not who you've become. It doesn't account for personal growth, trauma healing, communication skills, or shared values developed through lived experience. A "perfect" 36/36 match can still fail if the humans involved don't put in the work.

## A Modern Approach

Use Kundli matching as one input among many. Let it highlight areas to explore — not as a verdict, but as a conversation starter. "Our Gana match is low" doesn't mean you're doomed. It means your temperaments are different, and you should discuss how you handle conflict.

## What AstraPulse Does Differently

We believe compatibility is dynamic, not fixed. AstraPulse will combine birth chart data with lived-experience signals — how you communicate, what you need in love, your attachment patterns — to create compatibility insights that grow more accurate over time.

---

*Coming soon to AstraPulse: compatibility that adapts as you answer questions. Not a score — a living understanding of how two people connect.*`,
  },
];
