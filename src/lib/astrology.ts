// ============================================================
// Astrology Engine — Vedic + Western Calculations
// ============================================================

// Sign data
const WESTERN_SIGNS = [
  { name: 'Aries', symbol: '♈', element: 'Fire', dates: [3, 21, 4, 19] },
  { name: 'Taurus', symbol: '♉', element: 'Earth', dates: [4, 20, 5, 20] },
  { name: 'Gemini', symbol: '♊', element: 'Air', dates: [5, 21, 6, 20] },
  { name: 'Cancer', symbol: '♋', element: 'Water', dates: [6, 21, 7, 22] },
  { name: 'Leo', symbol: '♌', element: 'Fire', dates: [7, 23, 8, 22] },
  { name: 'Virgo', symbol: '♍', element: 'Earth', dates: [8, 23, 9, 22] },
  { name: 'Libra', symbol: '♎', element: 'Air', dates: [9, 23, 10, 22] },
  { name: 'Scorpio', symbol: '♏', element: 'Water', dates: [10, 23, 11, 21] },
  { name: 'Sagittarius', symbol: '♐', element: 'Fire', dates: [11, 22, 12, 21] },
  { name: 'Capricorn', symbol: '♑', element: 'Earth', dates: [12, 22, 1, 19] },
  { name: 'Aquarius', symbol: '♒', element: 'Air', dates: [1, 20, 2, 18] },
  { name: 'Pisces', symbol: '♓', element: 'Water', dates: [2, 19, 3, 20] },
];

const VEDIC_RASHIS = [
  { name: 'Mesha', western: 'Aries', lord: 'Mars' },
  { name: 'Vrishabha', western: 'Taurus', lord: 'Venus' },
  { name: 'Mithuna', western: 'Gemini', lord: 'Mercury' },
  { name: 'Karka', western: 'Cancer', lord: 'Moon' },
  { name: 'Simha', western: 'Leo', lord: 'Sun' },
  { name: 'Kanya', western: 'Virgo', lord: 'Mercury' },
  { name: 'Tula', western: 'Libra', lord: 'Venus' },
  { name: 'Vrishchika', western: 'Scorpio', lord: 'Mars' },
  { name: 'Dhanu', western: 'Sagittarius', lord: 'Jupiter' },
  { name: 'Makara', western: 'Capricorn', lord: 'Saturn' },
  { name: 'Kumbha', western: 'Aquarius', lord: 'Saturn' },
  { name: 'Meena', western: 'Pisces', lord: 'Jupiter' },
];

const NAKSHATRAS = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati',
];

export function getSunSign(dob: string): typeof WESTERN_SIGNS[0] {
  const date = new Date(dob);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  for (const sign of WESTERN_SIGNS) {
    const [sm, sd, em, ed] = sign.dates;
    if (
      (month === sm && day >= sd) ||
      (month === em && day <= ed)
    ) {
      return sign;
    }
  }
  return WESTERN_SIGNS[9]; // Capricorn default for edge cases
}

export function getMoonSign(dob: string): typeof WESTERN_SIGNS[0] {
  // Simplified — in production, use Swiss Ephemeris
  const date = new Date(dob);
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = (dayOfYear * 13 + date.getFullYear()) % 12;
  return WESTERN_SIGNS[index];
}

export function getRisingSign(dob: string, birthTime?: string): typeof WESTERN_SIGNS[0] {
  if (!birthTime) return WESTERN_SIGNS[0];
  const [hours] = birthTime.split(':').map(Number);
  const date = new Date(dob);
  const sunIndex = WESTERN_SIGNS.findIndex(s => s.name === getSunSign(dob).name);
  const risingIndex = (sunIndex + Math.floor(hours / 2)) % 12;
  return WESTERN_SIGNS[risingIndex];
}

export function getVedicRashi(dob: string): typeof VEDIC_RASHIS[0] {
  const moonSign = getMoonSign(dob);
  // Vedic uses sidereal — approximately 23° offset from tropical
  // This shifts the sign back by roughly one position
  const moonIndex = WESTERN_SIGNS.findIndex(s => s.name === moonSign.name);
  const vedicIndex = (moonIndex + 11) % 12; // shift back ~1 sign for ayanamsa
  return VEDIC_RASHIS[vedicIndex];
}

export function getNakshatra(dob: string): string {
  const date = new Date(dob);
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = (dayOfYear * 3 + date.getFullYear()) % 27;
  return NAKSHATRAS[index];
}

export function getVedicLagna(dob: string, birthTime?: string): string | undefined {
  if (!birthTime) return undefined;
  const [hours] = birthTime.split(':').map(Number);
  const sunSign = getSunSign(dob);
  const sunIndex = VEDIC_RASHIS.findIndex(r => r.western === sunSign.name);
  const lagnaIndex = (sunIndex + Math.floor(hours / 2) + 11) % 12;
  return VEDIC_RASHIS[lagnaIndex].name;
}

export function computeChart(dob: string, birthTime?: string) {
  const sunSign = getSunSign(dob);
  const moonSign = getMoonSign(dob);
  const risingSign = getRisingSign(dob, birthTime);
  const rashi = getVedicRashi(dob);
  const nakshatra = getNakshatra(dob);
  const lagna = getVedicLagna(dob, birthTime);

  return {
    western: {
      sunSign: sunSign.name,
      sunSymbol: sunSign.symbol,
      sunElement: sunSign.element,
      moonSign: moonSign.name,
      moonSymbol: moonSign.symbol,
      risingSign: risingSign.name,
      risingSymbol: risingSign.symbol,
    },
    vedic: {
      rashi: rashi.name,
      rashiLord: rashi.lord,
      nakshatra,
      lagna,
    },
  };
}

export function getDailyTransits(date: string) {
  // Simplified transit data — in production, compute from ephemeris
  const d = new Date(date);
  const dayOfYear = Math.floor(
    (d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000
  );

  const moonTransitSign = WESTERN_SIGNS[dayOfYear % 12];
  const themes = [
    'communication and connection',
    'inner reflection and rest',
    'bold action and new beginnings',
    'creativity and self-expression',
    'practical planning and focus',
    'partnership and harmony',
    'transformation and release',
    'adventure and expansion',
    'discipline and structure',
    'innovation and freedom',
    'compassion and intuition',
    'nurturing and home',
  ];

  return {
    moonSign: moonTransitSign.name,
    moonElement: moonTransitSign.element,
    dayTheme: themes[dayOfYear % themes.length],
    highlights: [
      `Moon in ${moonTransitSign.name} emphasizes ${themes[dayOfYear % themes.length]}`,
      dayOfYear % 3 === 0
        ? 'Venus aspects support relationships today'
        : dayOfYear % 3 === 1
        ? 'Mercury retrograde energy calls for patience'
        : 'Jupiter brings expansion and optimism',
    ],
  };
}
