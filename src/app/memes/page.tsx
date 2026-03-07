'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Share2, Download } from 'lucide-react';
import { useState, useRef } from 'react';

interface MemeData {
  sign: string;
  emoji: string;
  category: string;
  text: string;
  gradient: string;
  id: string;
}

const zodiacSigns = [
  { name: 'Aries', emoji: '♈', element: 'fire' },
  { name: 'Taurus', emoji: '♉', element: 'earth' },
  { name: 'Gemini', emoji: '♊', element: 'air' },
  { name: 'Cancer', emoji: '♋', element: 'water' },
  { name: 'Leo', emoji: '♌', element: 'fire' },
  { name: 'Virgo', emoji: '♍', element: 'earth' },
  { name: 'Libra', emoji: '♎', element: 'air' },
  { name: 'Scorpio', emoji: '♏', element: 'water' },
  { name: 'Sagittarius', emoji: '♐', element: 'fire' },
  { name: 'Capricorn', emoji: '♑', element: 'earth' },
  { name: 'Aquarius', emoji: '♒', element: 'air' },
  { name: 'Pisces', emoji: '♓', element: 'water' },
];

const categories = [
  'Relationship',
  'Work Life',
  'Daily Mood',
  'Roast Me',
  'Bestie Energy',
];

const elementGradients: Record<string, string> = {
  fire: 'from-red-600 via-orange-500 to-amber-500',
  earth: 'from-green-800 via-emerald-600 to-cyan-500',
  air: 'from-blue-600 via-cyan-500 to-teal-400',
  water: 'from-purple-700 via-indigo-600 to-blue-500',
};

const memeTexts: Record<string, Record<string, string[]>> = {
  Aries: {
    'Relationship': [
      "*Plans entire wedding after one good morning text*",
      "Aries in love: 'Let\\'s marry next weekend' | Also Aries: *ghosted after 2 weeks*",
      "Aries: *falls in love* | Also Aries: *picks a fight over literally nothing*",
    ],
    'Work Life': [
      "Aries at work: 'I\\'ll have it done in 5 mins' | The task: *takes 3 weeks*",
      "Aries in meetings: 'I have a better idea' | Boss: *already rejected it twice*",
      "Aries during deadlines: speed, no accuracy, only chaos",
    ],
    'Daily Mood': [
      "Aries mood: 😤🔥😤🥰😤 *in one hour*",
      "Aries energy: 'I\\'m invincible' | Me: *loses one game*",
      "Aries to themselves: 'Why am I like this?' | Also Aries: *does the same thing again*",
    ],
    'Roast Me': [
      "Aries: the human equivalent of red bull energy drink",
      "Aries: all confidence, zero chill, 100% chaos",
      "Aries: 'patience is a virtue' | Aries 0.5 seconds later: 💥",
    ],
    'Bestie Energy': [
      "Aries bestie: 'I\\'ll fight anyone who hurts you' | Also them: *forgets ur birthday*",
      "Your Aries bestie: the most loyal until they\\'re not",
      "Aries friends hit different. Chaos level: expert.",
    ],
  },
  Taurus: {
    'Relationship': [
      "Taurus in love: let\\'s stay in bed all weekend",
      "Taurus: I\\'m loyal and devoted | Also Taurus: *takes 6 months to text back*",
      "Taurus romance: fancy dinner, expensive gift, then disappears for 2 weeks",
    ],
    'Work Life': [
      "Taurus: 'slow and steady wins the race' | Boss: *we had a deadline yesterday*",
      "Taurus at work: ✨ procrastination energy ✨",
      "Taurus productivity: maybe tomorrow. or next week. or never.",
    ],
    'Daily Mood': [
      "Taurus mood: sleeping, eating, repeat",
      "Taurus vibes: cozy sweater, warm bed, don\\'t talk to me",
      "Taurus energy: 🛏️ 🍕 🛏️ *forever*",
    ],
    'Roast Me': [
      "Taurus: the human equivalent of a comfortable couch",
      "Taurus moves at turtle speed but complains about being slow",
      "Taurus: stubborn, lazy, but make it aesthetic",
    ],
    'Bestie Energy': [
      "Taurus bestie: will let you crash on their couch rent-free",
      "Your Taurus friend: the therapist who brings snacks",
      "Taurus friends: slow to anger but NEVER forget a betrayal",
    ],
  },
  Gemini: {
    'Relationship': [
      "Gemini explaining why they\\'re texting 3 different people: *multitasking*",
      "Gemini: I\\'m committed | Also Gemini: *falls for 5 people this week*",
      "Gemini in relationships: 'let\\'s communicate' | Also: *sends 47 conflicting texts*",
    ],
    'Work Life': [
      "Gemini: 'I\\'ve got 10 projects going' | Reality: completed 0",
      "Gemini attention span: ooh shiny! | Work deadline: *forgotten*",
      "Gemini productivity: starting tasks is fun, finishing them: overrated",
    ],
    'Daily Mood': [
      "Gemini mood: depends on which personality shows up today",
      "Gemini energy: chaotic good meets chaotic neutral meets chaotic evil",
      "Gemini in 5 minutes: 😊😭😠🤪😊 repeat",
    ],
    'Roast Me': [
      "Gemini: two-faced, flaky, but make it charming",
      "Gemini: the human version of browser tabs. Too many open. Can\\'t close any.",
      "Gemini: 'sorry I wasn\\'t listening' | Also: *speaks 10000 words per minute*",
    ],
    'Bestie Energy': [
      "Gemini bestie: will keep you entertained for HOURS",
      "Your Gemini friend: gossip central, relationship coach, chaos agent",
      "Gemini: your bestie who\\'s fun but also exhausting",
    ],
  },
  Cancer: {
    'Relationship': [
      "Cancer in love: *plans entire future* | Also: *gets insecure about nothing*",
      "Cancer: I need emotional support | Also: *says nothing when asked what\\'s wrong*",
      "Cancer when someone doesn\\'t text back: *assumes they\\'re dead or hate me*",
    ],
    'Work Life': [
      "Cancer on a Zoom call: camera off, crying in the background",
      "Cancer: takes feedback as personal attack | Boss: *just gave feedback*",
      "Cancer at work: emotional labor energy. Running on fumes and vibes.",
    ],
    'Daily Mood': [
      "Cancer mood: overthinking since 6 AM",
      "Cancer energy: sensitive queen, protects at all costs, needs therapy",
      "Cancer in bed: spiral thoughts until 3 AM",
    ],
    'Roast Me': [
      "Cancer: professional overthinker and emotional wreck",
      "Cancer: 'I\\'m fine' | Cancer: *is not fine, will never tell*",
      "Cancer: cries at everything. Movie ads? Crying. Puppy video? Crying.",
    ],
    'Bestie Energy': [
      "Cancer bestie: remembers EVERYTHING you\\'ve ever said (will use it against you)",
      "Your Cancer friend: mama bear energy, will fight anyone for you, then cry",
      "Cancer friends: the ones who actually care, even when you don\\'t deserve it",
    ],
  },
  Leo: {
    'Relationship': [
      "Leo in love: 'worship me' | Also: *forget your anniversary*",
      "Leo: I deserve the best | Also: *is objectively not the best*",
      "Leo romance: grand gestures in public, ignores you at home",
    ],
    'Work Life': [
      "Leo at work: 'this is MY project' | Team: *yeah we did 90% of it*",
      "Leo: steals credit like it\\'s an Olympic sport",
      "Leo meetings: 90% talking about themselves, 10% work",
    ],
    'Daily Mood': [
      "Leo energy: *flips hair* confident and wrong",
      "Leo mood: I\\'m the main character | Reality: extra in someone else\\'s story",
      "Leo vibes: diva energy with no off switch",
    ],
    'Roast Me': [
      "Leo: narcissist but make it fabulous",
      "Leo: 'look at me' | Everyone: *not looking*",
      "Leo\\'s biggest enemy: not being the center of attention",
    ],
    'Bestie Energy': [
      "Leo bestie: hypes you up (as long as you hype them more)",
      "Your Leo friend: will show up looking better than you, then offer fashion advice",
      "Leo friends: fun and loyal until you steal their spotlight",
    ],
  },
  Virgo: {
    'Relationship': [
      "Virgo in love: *critiques everything you do* | Also: 'why are you leaving me?'",
      "Virgo romance: analyzing feelings instead of feeling them",
      "Virgo: I can fix them | *cannot fix them* | Virgo: *why is this happening*",
    ],
    'Work Life': [
      "Virgo: everything must be PERFECT | Boss: *just needs it done*",
      "Virgo spreadsheet: 47 columns for a 3-minute task",
      "Virgo employee: does the work, then redoes it, then redoes it again",
    ],
    'Daily Mood': [
      "Virgo mood: anxiety meets perfectionism",
      "Virgo energy: stressed about being stressed about being stressed",
      "Virgo: *notices one tiny flaw* | Also: *entire day is ruined*",
    ],
    'Roast Me': [
      "Virgo: control freak with a color-coded life",
      "Virgo: 'I\\'m not being critical' | *is literally criticizing everything*",
      "Virgo: perfection is the standard, everything else is failure",
    ],
    'Bestie Energy': [
      "Virgo bestie: will reorganize your life and judge you the entire time",
      "Your Virgo friend: the reason your house is clean and your life is organized",
      "Virgo friends: caring through criticism",
    ],
  },
  Libra: {
    'Relationship': [
      "Libra in love: *can\\'t decide* | Libra: 'let\\'s break up?' | Also: *stays forever*",
      "Libra: I value balance | Also: *most unbalanced relationship ever*",
      "Libra romance: ghosting is an art form and they\\'re the artist",
    ],
    'Work Life': [
      "Libra: 'what do you think I should do?' | Everyone: *just pick something*",
      "Libra meetings: takes 3 hours to decide on coffee order",
      "Libra productivity: will they show up? only scales know",
    ],
    'Daily Mood': [
      "Libra mood: depends on how pretty the day is",
      "Libra energy: aesthetic queen, no personality",
      "Libra vibes: 50/50 on everything, committed to nothing",
    ],
    'Roast Me': [
      "Libra: the human equivalent of sitting on the fence",
      "Libra: 'I\\'ll let you decide' | You decide | Libra: 'nah, other option'",
      "Libra: indecisive, flaky, but at least they look good",
    ],
    'Bestie Energy': [
      "Libra bestie: always down for fun, never down for responsibility",
      "Your Libra friend: will charm their way out of any apology",
      "Libra friends: fun dates, terrible reliability",
    ],
  },
  Scorpio: {
    'Relationship': [
      "Scorpio: I\\'ll trust you | Also: *monitors everything you do*",
      "Scorpio in love: dark and intense | Also: *will sting you first chance they get*",
      "Scorpio romance: passionate, possessive, possibly illegal",
    ],
    'Work Life': [
      "Scorpio: knows EVERYONE\\'s secrets and uses them strategically",
      "Scorpio at work: boss officially terrified of them",
      "Scorpio meetings: everyone nervous, Scorpio sleeping",
    ],
    'Daily Mood': [
      "Scorpio mood: plotting something probably",
      "Scorpio energy: dark, mysterious, will destroy you",
      "Scorpio vibes: vendetta energy, takes YEARS to forgive",
    ],
    'Roast Me': [
      "Scorpio: vengeful scorned lover who forgets nothing ever",
      "Scorpio: \\'I didn\\'t care anyway\\' | Scorpio: *remembers for 10 years*",
      "Scorpio: death stare champion, holds grudges like Pokemon cards",
    ],
    'Bestie Energy': [
      "Scorpio bestie: loyal AF unless you betray them",
      "Your Scorpio friend: protective dragon, will hurt anyone who hurts you",
      "Scorpio friends: best ride or dies, worst enemies",
    ],
  },
  Sagittarius: {
    'Relationship': [
      "Sagittarius in love: 'let\\'s travel' | Also: *never commits*",
      "Sagittarius romance: overpromises, underdelivers, leaves",
      "Sagittarius: freedom is more important than you, sorry not sorry",
    ],
    'Work Life': [
      "Sagittarius: 'I can do anything!' | Also: *does nothing well*",
      "Sagittarius employee: at 5 PM on the dot, they\\'re GONE",
      "Sagittarius productivity: maybe next Monday. or next year.",
    ],
    'Daily Mood': [
      "Sagittarius energy: YOLO meets ADHD",
      "Sagittarius mood: chaotic optimism about everything",
      "Sagittarius vibes: wanderlust queen, broke queen",
    ],
    'Roast Me': [
      "Sagittarius: commitment-phobic adventure addict",
      "Sagittarius: 'actually...' | Everyone: *not listening*",
      "Sagittarius: freedom, travel, broke, repeat",
    ],
    'Bestie Energy': [
      "Sagittarius bestie: will take you on random adventures at 3 AM",
      "Your Sagittarius friend: fun times guaranteed but will disappear for months",
      "Sagittarius friends: best travel buddy, worst at returning texts",
    ],
  },
  Capricorn: {
    'Relationship': [
      "Capricorn in love: *creates 5-year business plan for relationship*",
      "Capricorn: romance is scheduling time for dinner (at office)",
      "Capricorn romance: emotionally unavailable but financially stable",
    ],
    'Work Life': [
      "Capricorn: work is their entire personality",
      "Capricorn at parties: 'can we talk about quarterly reports?'",
      "Capricorn employee: CEO energy, makes everyone uncomfortable",
    ],
    'Daily Mood': [
      "Capricorn mood: work, stress, sleep, repeat",
      "Capricorn energy: no time for emotions, only profit margins",
      "Capricorn vibes: rich aunt/uncle energy, no fun allowed",
    ],
    'Roast Me': [
      "Capricorn: workaholic with no personality outside their job",
      "Capricorn: 'let\\'s have fun' | Also: *goes home to spreadsheets*",
      "Capricorn: corporate drone meets cold-hearted CEO",
    ],
    'Bestie Energy': [
      "Capricorn bestie: will help you but also make you feel judged",
      "Your Capricorn friend: successful, respectable, boring AF",
      "Capricorn friends: reliable but like... have fun sometimes please",
    ],
  },
  Aquarius: {
    'Relationship': [
      "Aquarius in love: 'I need my space' | Also: *never replies to texts*",
      "Aquarius romance: emotionally detached but intellectually obsessed",
      "Aquarius: loves humanity, hates individual humans",
    ],
    'Work Life': [
      "Aquarius: too smart for the job but won\\'t put in effort",
      "Aquarius at work: 'that\\'s not how we should do it' | Does nothing to fix it",
      "Aquarius employee: genius ideas, zero execution",
    ],
    'Daily Mood': [
      "Aquarius mood: in their own world, you\\'re just a side character",
      "Aquarius energy: detached observer of life",
      "Aquarius vibes: weird and proud of it",
    ],
    'Roast Me': [
      "Aquarius: too cool for emotions, too weird for friends",
      "Aquarius: 'I\\'m one of a kind' | Also: *exactly like every other Aquarius*",
      "Aquarius: emotionally unavailable and zero self-awareness about it",
    ],
    'Bestie Energy': [
      "Aquarius bestie: friendship is confusing because they\\'re confusing",
      "Your Aquarius friend: interesting but will ghost for 6 months",
      "Aquarius friends: amazing conversations at 4 AM, nothing else",
    ],
  },
  Pisces: {
    'Relationship': [
      "Pisces in love: *writes poetry about someone they\\'ve never spoken to*",
      "Pisces romance: idealize partner | Meet them | Disappointed | Repeat",
      "Pisces: soulmate energy but also victim mentality energy",
    ],
    'Work Life': [
      "Pisces at work: daydreaming about literally anything else",
      "Pisces employee: talented but emotionally drained every 5 mins",
      "Pisces productivity: rode the struggle bus then took a nap",
    ],
    'Daily Mood': [
      "Pisces mood: crying, daydreaming, feeling all the feelings",
      "Pisces energy: victim of the universe\\'s cruelty",
      "Pisces vibes: depressed artist energy, no art in progress",
    ],
    'Roast Me': [
      "Pisces: escapist dreamer who\\'s escaping their own life",
      "Pisces: 'I\\'m fine' | *is in a 3-day funk*",
      "Pisces: delusional optimist meets depressed pessimist",
    ],
    'Bestie Energy': [
      "Pisces bestie: will absorb all your problems like a sponge",
      "Your Pisces friend: emotional support animal in human form",
      "Pisces friends: deep connections, messy drama, never boring",
    ],
  },
};

export default function MemesPage() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentMeme, setCurrentMeme] = useState<MemeData | null>(null);
  const [generatedMemes, setGeneratedMemes] = useState<MemeData[]>([]);
  const memeCardRef = useRef<HTMLDivElement>(null);

  const generateMeme = () => {
    if (!selectedSign || !selectedCategory) return;

    const sign = zodiacSigns.find((s) => s.name === selectedSign);
    if (!sign) return;

    const memes = memeTexts[selectedSign]?.[selectedCategory] || [];
    if (memes.length === 0) return;

    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    const newMeme: MemeData = {
      sign: selectedSign,
      emoji: sign.emoji,
      category: selectedCategory,
      text: randomMeme,
      gradient: elementGradients[sign.element],
      id: Date.now().toString(),
    };

    setCurrentMeme(newMeme);
    setGeneratedMemes((prev) => [newMeme, ...prev.slice(0, 5)]);
  };

  const handleShare = async () => {
    if (!currentMeme) return;

    const shareText = `Check out this ${currentMeme.sign} meme: "${currentMeme.text}" - via AstraPulse 🌙`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Zodiac Meme',
          text: shareText,
        });
      } catch (err) {
        console.log('Share failed');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
    }
  };

  const elementSteps = [
    {
      title: 'Pick Your Sign',
      active: selectedSign !== null,
      icon: '♈',
    },
    {
      title: 'Choose Vibe',
      active: selectedCategory !== null,
      icon: '✨',
    },
    {
      title: 'Get Roasted',
      active: currentMeme !== null,
      icon: '🔥',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <main className="relative min-h-screen bg-cosmic-gradient overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-rose-500 rounded-full mix-blend-screen blur-3xl opacity-5 animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-aurora-500 rounded-full mix-blend-screen blur-3xl opacity-5 animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            Zodiac <span className="text-rose-400">Meme</span> Generator
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Get roasted by the stars. Your sign has never been this funny.
          </p>
        </motion.section>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="flex items-center justify-between">
            {elementSteps.map((step, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <motion.div
                  animate={{
                    scale: step.active ? 1.1 : 1,
                    boxShadow: step.active
                      ? '0 0 30px rgba(124, 91, 240, 0.3)'
                      : 'none',
                  }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all ${
                    step.active
                      ? 'bg-aurora-500 text-white'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {step.icon}
                </motion.div>
                <p className={`ml-3 font-semibold ${
                  step.active ? 'text-aurora-400' : 'text-white/40'
                }`}>
                  {step.title}
                </p>
                {idx < elementSteps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded-full ${
                      step.active ? 'bg-aurora-500' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Selection Panel */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              {/* Zodiac Signs */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Pick your sign</h2>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-4 gap-3"
                >
                  {zodiacSigns.map((sign) => (
                    <motion.button
                      key={sign.name}
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSign(sign.name)}
                      className={`p-4 rounded-lg text-center transition-all ${
                        selectedSign === sign.name
                          ? 'glass-strong glow-aurora border-aurora-400'
                          : 'glass hover:border-aurora-400/50'
                      }`}
                    >
                      <div className="text-3xl mb-1">{sign.emoji}</div>
                      <p className="text-xs font-semibold">{sign.name}</p>
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Categories */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Choose your vibe</h2>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-2"
                >
                  {categories.map((cat) => (
                    <motion.button
                      key={cat}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full p-4 rounded-lg text-left font-semibold transition-all ${
                        selectedCategory === cat
                          ? 'glass-strong bg-aurora-500/20 border-aurora-400'
                          : 'glass hover:border-aurora-400/50'
                      }`}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </motion.div>
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateMeme}
                disabled={!selectedSign || !selectedCategory}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  selectedSign && selectedCategory
                    ? 'bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:shadow-lg glow-ember'
                    : 'bg-white/5 text-white/40 cursor-not-allowed'
                }`}
              >
                Generate Meme 🔥
              </motion.button>
            </motion.div>

            {/* Meme Display */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              {/* Current Meme */}
              <AnimatePresence mode="wait">
                {currentMeme ? (
                  <motion.div
                    ref={memeCardRef}
                    key={currentMeme.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`bg-gradient-to-br ${currentMeme.gradient} rounded-2xl p-12 min-h-96 flex flex-col items-center justify-center text-center relative overflow-hidden group`}
                  >
                    {/* Animated background */}
                    <motion.div
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 10, 0],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="absolute inset-0 opacity-10"
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-8xl mb-6"
                      >
                        {currentMeme.emoji}
                      </motion.div>

                      <h3 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">
                        {currentMeme.sign}
                      </h3>

                      <p className="text-xl text-white drop-shadow-lg font-semibold leading-relaxed">
                        {currentMeme.text}
                      </p>

                      <p className="text-sm text-white/60 mt-6 font-semibold">
                        {currentMeme.category}
                      </p>
                    </div>

                    {/* Watermark */}
                    <div className="absolute bottom-4 right-4 text-white/40 text-xs font-bold">
                      AstraPulse
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass rounded-2xl p-12 min-h-96 flex items-center justify-center text-center"
                  >
                    <div>
                      <p className="text-2xl mb-2">✨</p>
                      <p className="text-white/60">
                        Pick your sign and vibe, then click the button to get roasted!
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              {currentMeme && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={generateMeme}
                    className="flex-1 py-3 rounded-lg bg-aurora-500/20 border border-aurora-500 text-aurora-400 font-semibold flex items-center justify-center gap-2 hover:bg-aurora-500/30 transition-all"
                  >
                    <RefreshCw className="w-5 h-5" />
                    Generate Another
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="flex-1 py-3 rounded-lg bg-rose-500/20 border border-rose-500 text-rose-400 font-semibold flex items-center justify-center gap-2 hover:bg-rose-500/30 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Recent Memes Gallery */}
          {generatedMemes.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-20"
            >
              <h2 className="text-3xl font-bold mb-8">Recent Memes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedMemes.map((meme) => (
                  <motion.div
                    key={meme.id}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentMeme(meme)}
                    className={`bg-gradient-to-br ${meme.gradient} rounded-xl p-6 cursor-pointer transition-all min-h-40 flex flex-col items-center justify-center text-center group`}
                  >
                    <div className="text-5xl mb-2">{meme.emoji}</div>
                    <p className="text-white text-sm font-semibold drop-shadow">
                      {meme.sign}
                    </p>
                    <p className="text-white/80 text-xs mt-2 drop-shadow">
                      {meme.category}
                    </p>
                    <p className="text-white/70 text-xs mt-3 line-clamp-2 drop-shadow">
                      "{meme.text}"
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </div>
    </main>
  );
}
