import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getTestimonials, Testimonial } from '../services/contentService';

const defaultImage = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setTestimonials(getTestimonials());
  }, []);
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

  if (testimonials.length === 0) {
    return (
      <main className="pt-20 text-center">
        <p className="text-gray-600 dark:text-gray-300">Loading testimonials...</p>
      </main>
    );
  }

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
                  <div key={`${t.name}-${idx}`} className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl" />
                    <Quote className="absolute top-3 left-3 w-8 h-8 text-white/10" />
                    <div className="relative">
                      <div className="flex gap-1 mb-2">{Array.from({ length: t.rating }).map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />))}</div>
                      <p className="text-sm sm:text-base text-white leading-relaxed mb-3 font-light">"{t.text}"</p>
                      <div className="flex items-center gap-2.5">
                        <img src={t.image || defaultImage} alt={t.name} className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/20 shadow-lg" />
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
              <motion.div key={`${t.name}-${i}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-lg transition-all">
                <div className="flex gap-0.5 mb-2">{Array.from({ length: t.rating }).map((_, j) => (<Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />))}</div>
                <p className="text-gray-700 dark:text-gray-300 text-xs leading-relaxed mb-2 italic line-clamp-4">"{t.text}"</p>
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <img src={t.image || defaultImage} alt={t.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-primary-100 dark:ring-primary-800" />
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
