import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Code2, Smartphone, Bot, Brain, Palette, Cloud, ArrowRight, CheckCircle2, X, Zap, Layers, Shield, Users, BarChart3, Megaphone } from 'lucide-react';
import { useScrollAnimation, use3DTilt } from '../hooks/useAnimations';
import { services } from '../data/services';

const processSteps = [
  { icon: Users, title: 'Discovery', desc: 'Understanding your goals, challenges, and vision through deep collaboration.' },
  { icon: Layers, title: 'Design', desc: 'Creating blueprints and prototypes that map the user journey and system architecture.' },
  { icon: Code2, title: 'Develop', desc: 'Building with precision using agile sprints and continuous integration.' },
  { icon: Shield, title: 'Deploy', desc: 'Launching with confidence through rigorous testing and monitoring.' },
  { icon: BarChart3, title: 'Optimize', desc: 'Iterating based on data, feedback, and evolving business needs.' },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '25%']);
  const heroRotate = useTransform(heroProgress, [0, 1], [0, 8]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  return (
    <main className="pt-20">
      {/* Hero */}
      <section ref={heroRef} className="py-24 hero-gradient relative overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 mesh-gradient" />
        <motion.div style={{ y: heroY }} className="absolute top-20 right-[10%] w-64 h-64 float-shape" />
        <motion.div style={{ y: heroY, rotate: heroRotate }} className="absolute bottom-10 left-[5%] w-48 h-48 float-shape-circle" />
        <motion.div style={{ y: useTransform(heroProgress, [0, 1], [0, -60]) }} className="absolute top-[30%] left-[40%] w-32 h-32 float-shape rotate-45" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2 mb-6">Solutions That <span className="gradient-text">Drive Growth</span></h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">Comprehensive technology services designed to solve real business challenges and unlock new opportunities.</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={sectionRef} className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const tiltRef = use3DTilt();
              const cardY = useTransform(sectionProgress, [0.05 + i * 0.04, 0.3 + i * 0.04], [50, 0]);
              const cardRotate = useTransform(sectionProgress, [0.05 + i * 0.04, 0.3 + i * 0.04], [6, 0]);
              const cardOpacity = useTransform(sectionProgress, [0.05 + i * 0.04, 0.25 + i * 0.04], [0, 1]);
              return (
                <motion.div key={service.title} ref={tiltRef} style={{ y: cardY, rotateX: cardRotate, opacity: cardOpacity }} onClick={() => setSelectedService(i)}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-600 shadow-sm hover:shadow-2xl hover:shadow-primary-500/15 dark:hover:shadow-primary-400/10 transition-all duration-500 cursor-pointer preserve-3d">
                  <div className="relative h-52 overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-white/20 dark:via-gray-900/20 to-transparent" />
                    <div className={`absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300`}><service.icon className="w-6 h-6 text-white" /></div>
                    <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-colors duration-500" />
                  </div>
                  <div className="p-6 pt-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{service.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{service.desc.slice(0, 100)}...</p>
                    <div className="flex flex-wrap gap-2 mb-4">{service.tech.slice(0, 3).map((t) => (<span key={t} className="px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium">{t}</span>))}</div>
                    <span className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:gap-2 transition-all">Explore <ArrowRight className="w-4 h-4" /></span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>{selectedService !== null && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md" onClick={() => setSelectedService(null)}>
          <motion.div initial={{ scale: 0.85, rotateX: 15, rotateY: -5 }} animate={{ scale: 1, rotateX: 0, rotateY: 0 }} exit={{ scale: 0.85, rotateX: -15, rotateY: 5 }} transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="bg-white dark:bg-gray-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl preserve-3d" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-56 sm:h-72 overflow-hidden rounded-t-3xl">
              <img src={services[selectedService].image} alt={services[selectedService].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 flex items-center gap-3">
                {(() => { const ServiceIcon = services[selectedService].icon; return (<div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${services[selectedService].color} flex items-center justify-center shadow-lg`}><ServiceIcon className="w-6 h-6 text-white" /></div>); })()}
                <span className="px-3 py-1 rounded-lg bg-white/90 dark:bg-gray-900/90 text-primary-700 dark:text-primary-300 text-sm font-semibold backdrop-blur-sm">{services[selectedService].title}</span>
              </div>
              <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 flex items-center justify-center backdrop-blur-sm transition-colors"><X className="w-5 h-5 text-gray-600 dark:text-gray-300" /></button>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{services[selectedService].title}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{services[selectedService].desc}</p>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Key Features</h3>
              <div className="space-y-2 mb-6">{services[selectedService].features.map((f) => (<div key={f} className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary-600 dark:text-primary-400 flex-shrink-0" /><span className="text-gray-700 dark:text-gray-300 text-sm">{f}</span></div>))}</div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-8">{services[selectedService].tech.map((t) => (<span key={t} className="px-3 py-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">{t}</span>))}</div>
              <Link to="/contact" className="group inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all">Start a Project <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
            </div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>

      {/* Process */}
      <section ref={processRef} className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={processVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Our Process</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">How We <span className="gradient-text">Deliver Results</span></h2>
          </motion.div>
          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 dark:from-primary-800 via-primary-400 dark:via-primary-500 to-primary-200 dark:to-primary-800" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {processSteps.map((step, i) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 30, rotateX: 15 }} animate={processVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.15 }} className="relative text-center group">
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 border-2 border-primary-200 dark:border-primary-700 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 group-hover:border-primary-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm"><step.icon className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" /></div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
        <div className="absolute inset-0"><div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" /></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-primary-200 max-w-xl mx-auto mb-8 text-lg">Tell us about your project and we'll craft a solution that fits your needs and budget.</p>
            <Link to="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">Get a Free Consultation <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
