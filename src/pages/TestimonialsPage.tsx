import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const testimonials = [
  { name: 'Sarah Johnson', role: 'CEO', company: 'TechFlow', text: 'Ananta Byte delivered our platform ahead of schedule with exceptional quality. Their cloud solutions expertise transformed our infrastructure, reducing costs by 40% while improving performance 3x.', rating: 5, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'Michael Chen', role: 'CTO', company: 'DataSync', text: 'The AI/ML solution they built transformed our data processing pipeline. We went from hours of batch processing to real-time analytics. Their team truly understands enterprise-scale challenges.', rating: 5, image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'Emily Rodriguez', role: 'VP of Product', company: 'HealthPlus', text: 'Our mobile app went from concept to App Store in just 4 months. The user feedback has been overwhelmingly positive, with a 4.8-star rating and 100K+ downloads in the first quarter.', rating: 5, image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'David Park', role: 'Founder', company: 'EduLearn', text: 'The chatbot they built handles 80% of our student inquiries automatically, saving our support team 200+ hours per month. It feels natural and students love the instant responses.', rating: 5, image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'Lisa Wang', role: 'Head of Design', company: 'CreativeHub', text: 'Ananta Byte\'s UI/UX team redesigned our entire platform. Conversion rates increased by 65% and user engagement doubled. They don\'t just design—they solve business problems.', rating: 5, image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'Robert Kim', role: 'Director of Engineering', company: 'FinanceCore', text: 'The web application they built handles millions of transactions daily with zero downtime. Their attention to security and performance is exactly what we needed in fintech.', rating: 5, image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'Amanda Torres', role: 'COO', company: 'RetailMax', text: 'From the initial discovery to post-launch support, Ananta Byte was transparent, responsive, and genuinely invested in our success. They feel like an extension of our team.', rating: 5, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'James Wilson', role: 'CEO', company: 'LogiTech', text: 'Their cloud migration strategy saved us $200K annually. The transition was seamless with zero downtime. I cannot recommend Ananta Byte enough for any organization considering cloud solutions.', rating: 5, image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
];

export default function TestimonialsPage() {
  const [currentPair, setCurrentPair] = useState(0);
  const totalPairs = Math.ceil(testimonials.length / 2);

  const nextPair = () => setCurrentPair((prev) => (prev + 1) % totalPairs);
  const prevPair = () => setCurrentPair((prev) => (prev - 1 + totalPairs) % totalPairs);

  useEffect(() => {
    const interval = setInterval(nextPair, 5000);
    return () => clearInterval(interval);
  }, []);

  const getTestimonialsForPair = () => {
    const start = currentPair * 2;
    return testimonials.slice(start, start + 2);
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="py-6 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Client Stories</span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mt-2 mb-2">What Our <span className="gradient-text">Clients Say</span></h1>
            <p className="text-base text-gray-600 dark:text-gray-300">Real stories from real businesses.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Carousel - 2 Testimonials */}
      <section className="py-6 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={currentPair} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 gap-4">
                {getTestimonialsForPair().map((t, idx) => (
                  <div key={t.name} className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl" />
                    <Quote className="absolute top-3 left-3 w-8 h-8 text-white/10" />
                    <div className="relative">
                      <div className="flex gap-1 mb-2">{Array.from({ length: t.rating }).map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />))}</div>
                      <p className="text-sm sm:text-base text-white leading-relaxed mb-3 font-light">"{t.text}"</p>
                      <div className="flex items-center gap-2.5">
                        <img src={t.image} alt={t.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/20 shadow-lg" />
                        <div><div className="text-white font-semibold text-sm">{t.name}</div><div className="text-primary-200 text-xs">{t.role}, {t.company}</div></div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
            <div className="flex items-center justify-center gap-2 mt-4">
              <button onClick={prevPair} className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"><ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" /></button>
              <div className="flex gap-1.5">{Array.from({ length: totalPairs }).map((_, i) => (<button key={i} onClick={() => setCurrentPair(i)} className={`w-2 h-2 rounded-full transition-all ${i === currentPair ? 'w-5 bg-primary-600 dark:bg-primary-400' : 'bg-gray-300 dark:bg-gray-600'}`} />))}</div>
              <button onClick={nextPair} className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-gray-700 flex items-center justify-center transition-colors"><ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-300" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* All Testimonials Grid */}
      <section className="py-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">All <span className="gradient-text">Testimonials</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-lg transition-all">
                <div className="flex gap-0.5 mb-2">{Array.from({ length: t.rating }).map((_, j) => (<Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />))}</div>
                <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed mb-2 italic line-clamp-4">"{t.text}"</p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <img src={t.image} alt={t.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-800" />
                  <div><div className="text-xs font-semibold text-gray-900 dark:text-white">{t.name}</div><div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">Ready to Be Our Next <span className="gradient-text">Success Story</span>?</h2>
          <Link to="/contact" className="group inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all hover:shadow-lg">Start Your Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></Link>
        </div>
      </section>
    </main>
  );
}
