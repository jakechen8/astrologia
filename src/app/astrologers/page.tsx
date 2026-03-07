'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, MapPin, Clock, Phone, Video, MessageSquare, Search, X } from 'lucide-react';
import { useState } from 'react';

interface Astrologer {
  id: string;
  name: string;
  title: string;
  specialties: string[];
  experience: string;
  languages: string[];
  price: number;
  rating: number;
  reviews: number;
  online: boolean;
  initials: string;
  color: string;
}

const astrologers: Astrologer[] = [
  {
    id: '1',
    name: 'Pandit Raghunath Sharma',
    title: 'Vedic Astrologer & Nakshatra Specialist',
    specialties: ['Vedic', 'Nakshatras', 'Career'],
    experience: '20+ years',
    languages: ['Hindi', 'English', 'Sanskrit'],
    price: 1499,
    rating: 4.9,
    reviews: 342,
    online: true,
    initials: 'RS',
    color: 'from-ember-500 to-rose-500',
  },
  {
    id: '2',
    name: 'Dr. Meera Krishnamurthy',
    title: 'KP Astrology & Predictive Specialist',
    specialties: ['KP Astrology', 'Predictions', 'Health'],
    experience: '15+ years',
    languages: ['Tamil', 'English', 'Telugu'],
    price: 1299,
    rating: 4.8,
    reviews: 298,
    online: true,
    initials: 'MK',
    color: 'from-aurora-500 to-aurora-300',
  },
  {
    id: '3',
    name: 'Acharya Vikram Desai',
    title: 'Vedic Astrology & Vastu Consultant',
    specialties: ['Vedic', 'Vastu', 'Remedies'],
    experience: '25+ years',
    languages: ['Gujarati', 'Hindi', 'English'],
    price: 1999,
    rating: 4.9,
    reviews: 456,
    online: false,
    initials: 'VD',
    color: 'from-jade-500 to-jade-400',
  },
  {
    id: '4',
    name: 'Jyotishi Priya Nair',
    title: 'Nadi Astrology & Past Life Reader',
    specialties: ['Nadi Astrology', 'Past Lives', 'Relationships'],
    experience: '12+ years',
    languages: ['Malayalam', 'English', 'Hindi'],
    price: 999,
    rating: 4.7,
    reviews: 218,
    online: true,
    initials: 'PN',
    color: 'from-rose-500 to-rose-400',
  },
  {
    id: '5',
    name: 'Guruji Arjun Patel',
    title: 'Vedic & Numerology Expert',
    specialties: ['Vedic', 'Numerology', 'Business'],
    experience: '18+ years',
    languages: ['English', 'Hindi', 'Gujarati'],
    price: 1199,
    rating: 4.8,
    reviews: 334,
    online: true,
    initials: 'AP',
    color: 'from-gold-500 to-gold-400',
  },
  {
    id: '6',
    name: 'Dr. Lakshmi Sundaram',
    title: 'Western & Vedic Astrology Fusion',
    specialties: ['Western', 'Vedic', 'Psychology'],
    experience: '10+ years',
    languages: ['English', 'Tamil', 'Kannada'],
    price: 899,
    rating: 4.6,
    reviews: 267,
    online: true,
    initials: 'LS',
    color: 'from-aurora-400 to-ember-500',
  },
  {
    id: '7',
    name: 'Pandit Suresh Iyer',
    title: 'Horary Astrology Specialist',
    specialties: ['Horary', 'Questions', 'Decisions'],
    experience: '22+ years',
    languages: ['Tamil', 'Sanskrit', 'English'],
    price: 1599,
    rating: 4.9,
    reviews: 389,
    online: false,
    initials: 'SI',
    color: 'from-jade-500 to-emerald-500',
  },
  {
    id: '8',
    name: 'Tanvi Malhotra',
    title: 'Modern Western Astrology Coach',
    specialties: ['Western', 'Life Coaching', 'Wellness'],
    experience: '8+ years',
    languages: ['English', 'Hindi', 'Punjabi'],
    price: 799,
    rating: 4.5,
    reviews: 156,
    online: true,
    initials: 'TM',
    color: 'from-rose-500 to-pink-500',
  },
];

const filterOptions = [
  { label: 'Vedic', value: 'vedic' },
  { label: 'Western', value: 'western' },
  { label: 'Numerology', value: 'numerology' },
  { label: 'Tarot', value: 'tarot' },
  { label: 'Vastu', value: 'vastu' },
];

const sortOptions = [
  { label: 'Rating', value: 'rating' },
  { label: 'Price: Low to High', value: 'price_low' },
  { label: 'Price: High to Low', value: 'price_high' },
  { label: 'Experience', value: 'experience' },
];

interface BookingModalProps {
  astrologer: Astrologer | null;
  onClose: () => void;
}

function BookingModal({ astrologer, onClose }: BookingModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<'video' | 'phone' | 'chat'>('video');
  const [showSuccess, setShowSuccess] = useState(false);

  if (!astrologer) return null;

  const timeSlots = [
    { day: 'Today', slots: ['2:00 PM', '3:30 PM', '4:15 PM'] },
    { day: 'Tomorrow', slots: ['10:00 AM', '1:00 PM', '5:00 PM', '6:30 PM'] },
    { day: 'Day After', slots: ['11:00 AM', '2:00 PM', '3:00 PM'] },
  ];

  const handleConfirmBooking = () => {
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${astrologer.color} flex items-center justify-center font-bold text-white`}>
              {astrologer.initials}
            </div>
            <div>
              <h2 className="font-bold">{astrologer.name}</h2>
              <p className="text-white/60 text-sm">{astrologer.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {showSuccess ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 rounded-full bg-jade-500/20 flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <Star className="w-8 h-8 text-jade-400 fill-jade-400" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Booking Confirmed!</h3>
              <p className="text-white/60">
                Check your email for confirmation details. Your session is confirmed!
              </p>
            </motion.div>
          ) : (
            <>
              {/* Bio */}
              <div>
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-white/60 text-sm">
                  {astrologer.experience} of experience in {astrologer.specialties.join(', ')}. Speaks {astrologer.languages.join(', ')}.
                </p>
              </div>

              {/* Session Type Selection */}
              <div>
                <h3 className="font-semibold mb-3">Session Type</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { type: 'video' as const, icon: Video, label: 'Video Call' },
                    { type: 'phone' as const, icon: Phone, label: 'Phone Call' },
                    { type: 'chat' as const, icon: MessageSquare, label: 'Chat' },
                  ].map(({ type, icon: Icon, label }) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSessionType(type)}
                      className={`p-4 rounded-lg border transition-all ${
                        sessionType === type
                          ? 'border-aurora-500 bg-aurora-500/10'
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <p className="text-xs font-semibold">{label}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="font-semibold mb-3">Select Time Slot</h3>
                <div className="space-y-4">
                  {timeSlots.map((daySlot, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <p className="text-sm text-white/40 mb-2">{daySlot.day}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {daySlot.slots.map((slot) => (
                          <motion.button
                            key={slot}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedSlot(slot)}
                            className={`p-3 rounded-lg border text-sm font-semibold transition-all ${
                              selectedSlot === slot
                                ? 'border-aurora-500 bg-aurora-500/20'
                                : 'border-white/10 hover:border-white/20'
                            }`}
                          >
                            {slot}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="glass rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Session Price</p>
                  <p className="text-2xl font-bold">₹{astrologer.price}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-sm">Duration</p>
                  <p className="text-lg font-semibold">30 minutes</p>
                </div>
              </div>

              {/* Confirm Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmBooking}
                disabled={!selectedSlot}
                className={`w-full py-4 rounded-lg font-semibold transition-all ${
                  selectedSlot
                    ? 'bg-gradient-to-r from-aurora-500 to-ember-500 text-white hover:shadow-lg'
                    : 'bg-white/5 text-white/40 cursor-not-allowed'
                }`}
              >
                Confirm Booking
              </motion.button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AstrologersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('rating');
  const [selectedAstrologer, setSelectedAstrologer] = useState<Astrologer | null>(null);

  // Filter and sort astrologers
  let filtered = astrologers.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.some((filter) =>
        a.specialties.some((s) =>
          s.toLowerCase().includes(filter.toLowerCase())
        )
      );

    return matchesSearch && matchesFilters;
  });

  // Sort
  if (sortBy === 'rating') {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'price_low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'experience') {
    filtered = [...filtered].sort((a, b) => {
      const aYears = parseInt(a.experience);
      const bYears = parseInt(b.experience);
      return bYears - aYears;
    });
  }

  const toggleFilter = (value: string) => {
    setSelectedFilters((prev) =>
      prev.includes(value)
        ? prev.filter((f) => f !== value)
        : [...prev, value]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <main className="relative min-h-screen bg-cosmic-gradient overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-aurora-500 rounded-full mix-blend-screen blur-3xl opacity-5 animate-float" />
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-jade-500 rounded-full mix-blend-screen blur-3xl opacity-5 animate-float" style={{ animationDelay: '3s' }} />

      <div className="relative z-10">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-16 pb-8 px-4 sm:px-6 lg:px-8"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            Meet Our <span className="text-aurora-400">Astrologers</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl">
            Connect with expert astrologers for personalized consultations
          </p>
        </motion.section>

        {/* Search & Filters */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="sticky top-0 z-20 bg-cosmic-gradient/95 backdrop-blur border-b border-white/5 px-4 sm:px-6 lg:px-8 py-6"
        >
          {/* Search Bar */}
          <div className="max-w-7xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass rounded-lg placeholder-white/40 outline-none focus:ring-2 focus:ring-aurora-500"
              />
            </div>
          </div>

          {/* Filter & Sort */}
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-6">
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFilter(option.value)}
                  className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${
                    selectedFilters.includes(option.value)
                      ? 'bg-aurora-500 text-white'
                      : 'glass text-white/60 hover:text-white'
                  }`}
                >
                  {option.label}
                </motion.button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="glass px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-aurora-500 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </motion.section>

        {/* Astrologers Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((astrologer) => (
                <motion.div
                  key={astrologer.id}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="glass-strong rounded-2xl p-6 h-full flex flex-col transition-all hover:border-aurora-400 duration-300">
                    {/* Avatar & Online Status */}
                    <div className="relative mb-4">
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${astrologer.color} flex items-center justify-center font-bold text-white text-lg`}
                      >
                        {astrologer.initials}
                      </div>
                      {astrologer.online && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute bottom-0 right-0 w-4 h-4 bg-jade-400 rounded-full border-2 border-cosmic-900"
                        />
                      )}
                    </div>

                    {/* Name & Title */}
                    <h3 className="font-bold text-lg mb-1">{astrologer.name}</h3>
                    <p className="text-white/60 text-xs mb-4 line-clamp-2">
                      {astrologer.title}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(astrologer.rating)
                                ? 'text-gold-500 fill-gold-500'
                                : 'text-white/20'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-sm">
                        {astrologer.rating}
                      </span>
                      <span className="text-white/40 text-xs">
                        ({astrologer.reviews})
                      </span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {astrologer.specialties.slice(0, 2).map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 rounded-full bg-aurora-500/10 text-aurora-300 border border-aurora-500/20"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="text-xs text-white/50 space-y-1 mb-4 flex-grow">
                      <p className="flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {astrologer.experience}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {astrologer.languages[0]}, {astrologer.languages[1]}
                      </p>
                    </div>

                    {/* Price & Button */}
                    <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-white/40 text-xs">Per session</p>
                        <p className="font-bold text-aurora-400">₹{astrologer.price}</p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedAstrologer(astrologer)}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-aurora-500 to-ember-500 text-white text-sm font-semibold hover:shadow-lg transition-all"
                      >
                        Book Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-white/60 text-lg">
                No astrologers found. Try adjusting your filters.
              </p>
            </motion.div>
          )}
        </motion.section>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedAstrologer && (
          <BookingModal
            astrologer={selectedAstrologer}
            onClose={() => setSelectedAstrologer(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
