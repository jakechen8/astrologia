'use client';

import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { useState } from 'react';

const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    subtitle: 'Current',
    description: 'Start your cosmic journey',
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Star,
    popular: false,
    features: [
      'Daily reading',
      'Basic birth chart',
      '3 Ask the Stars questions/day',
      'Share cards',
    ],
    cta: 'Get Started',
    ctaVariant: 'secondary',
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Most Popular',
    description: 'For cosmic enthusiasts',
    monthlyPrice: 199,
    yearlyPrice: 1499,
    savings: 37,
    icon: Zap,
    popular: true,
    features: [
      'Everything in Free',
      'Unlimited Ask the Stars',
      'Detailed birth chart PDF export',
      'Weekly deep-dive readings',
      'Priority reading generation',
      'Retrograde & transit alerts',
      'Remove ads',
    ],
    cta: 'Upgrade Now',
    ctaVariant: 'primary',
  },
  {
    id: 'cosmic',
    name: 'Cosmic',
    subtitle: 'Premium',
    description: 'Unlock full potential',
    monthlyPrice: 499,
    yearlyPrice: 3999,
    savings: 33,
    icon: Crown,
    popular: false,
    features: [
      'Everything in Pro',
      '1-on-1 astrologer consultation/month (30 min)',
      'Personalized annual forecast',
      'Relationship compatibility deep reports',
      'Custom Nakshatra analysis',
      'Early access to new features',
    ],
    cta: 'Upgrade Now',
    ctaVariant: 'primary',
  },
];

const faqs = [
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes, absolutely! You can cancel at any time from your account settings. No questions asked, no hidden fees.',
  },
  {
    q: 'Do you offer a money-back guarantee?',
    a: '100% money-back guarantee within 7 days of purchase. We\'re confident you\'ll love AstraPulse.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, debit cards, UPI, and net banking for Indian users. Your payments are secured with industry-standard encryption.',
  },
  {
    q: 'Is my personal data safe?',
    a: 'Your data is encrypted end-to-end. We never share your birth details or readings with anyone. See our privacy policy for details.',
  },
  {
    q: 'Can I switch between plans?',
    a: 'Yes! You can upgrade or downgrade anytime. Changes take effect on your next billing cycle. We\'ll prorate any differences.',
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <main className="relative min-h-screen bg-cosmic-gradient overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-aurora-500 rounded-full mix-blend-screen blur-3xl opacity-5 animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-ember-500 rounded-full mix-blend-screen blur-3xl opacity-5 animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-glow">
            Unlock your full
            <br />
            <span className="bg-gradient-to-r from-aurora-400 via-ember-500 to-aurora-400 bg-clip-text text-transparent">
              cosmic potential
            </span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your astrological journey. All plans include our core features. Upgrade anytime.
          </p>

          {/* Toggle */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="flex items-center justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                !isYearly
                  ? 'bg-aurora-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all relative ${
                isYearly
                  ? 'bg-aurora-500 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Yearly
              {isYearly && (
                <motion.span
                  layoutId="savings-badge"
                  className="absolute -top-8 -right-2 text-xs font-bold text-ember-500"
                >
                  Save up to 37%
                </motion.span>
              )}
            </button>
          </motion.div>
        </motion.section>

        {/* Pricing Cards */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => {
              const Icon = plan.icon;
              const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
              const displayPrice = price > 0 ? `₹${price.toLocaleString('en-IN')}` : 'Free';
              const priceLabel = isYearly ? '/year' : '/month';

              return (
                <motion.div
                  key={plan.id}
                  variants={itemVariants}
                  className={`relative rounded-2xl transition-all duration-300 ${
                    plan.popular
                      ? 'md:scale-105 md:-translate-y-4'
                      : ''
                  }`}
                >
                  {/* Glow effect for popular */}
                  {plan.popular && (
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(124, 91, 240, 0.3)',
                          '0 0 40px rgba(124, 91, 240, 0.5)',
                          '0 0 20px rgba(124, 91, 240, 0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-2xl"
                    />
                  )}

                  <div
                    className={`relative rounded-2xl p-8 h-full ${
                      plan.popular
                        ? 'glass-strong glow-aurora'
                        : 'glass'
                    }`}
                  >
                    {/* Popular badge */}
                    {plan.popular && (
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="absolute -top-4 -right-4 bg-gradient-to-r from-aurora-500 to-ember-500 text-white px-4 py-1 rounded-full text-sm font-bold"
                      >
                        {plan.subtitle}
                      </motion.div>
                    )}

                    {/* Icon */}
                    <div className="mb-6">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        plan.popular
                          ? 'bg-gradient-to-br from-aurora-500 to-ember-500'
                          : 'bg-aurora-500/20'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          plan.popular ? 'text-white' : 'text-aurora-400'
                        }`} />
                      </div>
                    </div>

                    {/* Plan name */}
                    <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                    <p className="text-white/40 text-sm mb-6">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-2 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{displayPrice}</span>
                      {price > 0 && <span className="text-white/40">{priceLabel}</span>}
                    </div>

                    {/* Savings label */}
                    {plan.savings && isYearly && (
                      <p className="text-emerald-400 text-sm font-semibold mb-6">
                        Save {plan.savings}% annually
                      </p>
                    )}
                    {!plan.savings && <div className="h-6 mb-6" />}

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full py-3 rounded-lg font-semibold transition-all mb-8 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-aurora-500 to-ember-500 text-white hover:shadow-lg'
                          : 'border border-aurora-500/30 text-aurora-400 hover:bg-aurora-500/10'
                      }`}
                    >
                      {plan.cta}
                    </motion.button>

                    {/* Features */}
                    <div className="space-y-4">
                      {plan.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <Check className="w-5 h-5 text-jade-400 mt-0.5 flex-shrink-0" />
                          <span className="text-white/70 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Social Proof */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-white/5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-aurora-500 to-ember-500 border border-cosmic-800"
                  />
                ))}
              </div>
              <div>
                <p className="font-semibold">Join 50,000+ cosmic explorers</p>
                <p className="text-white/40 text-sm">Who've transformed their lives with AstraPulse</p>
              </div>
            </div>

            <div className="flex items-center gap-2 px-4 py-3 glass rounded-lg">
              <Star className="w-5 h-5 text-gold-500 fill-gold-500" />
              <span className="font-semibold">4.8/5 stars</span>
              <span className="text-white/40">from 1,240+ reviews</span>
            </div>
          </div>
        </motion.section>

        {/* Money-back guarantee */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        >
          <div className="glass-strong rounded-2xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-jade-500/20 mb-4">
              <Check className="w-6 h-6 text-jade-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">100% Money-back Guarantee</h3>
            <p className="text-white/60">
              Not satisfied? Get a full refund within 7 days. No questions asked. We're confident you'll love AstraPulse.
            </p>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked <span className="text-aurora-400">Questions</span>
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + idx * 0.05 }}
                className="glass rounded-lg p-6 cursor-pointer group"
              >
                <summary className="flex items-center justify-between font-semibold text-lg hover:text-aurora-400 transition-colors">
                  {faq.q}
                  <span className="text-2xl group-open:rotate-180 transition-transform">+</span>
                </summary>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 text-white/60 text-sm"
                >
                  {faq.a}
                </motion.div>
              </motion.details>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to explore your cosmos?</h2>
          <p className="text-white/60 mb-8">Start with our free plan today. No credit card required.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-aurora-500 to-ember-500 text-white font-semibold hover:shadow-lg glow-aurora transition-all"
          >
            Get Started for Free
          </motion.button>
        </motion.section>
      </div>
    </main>
  );
}
