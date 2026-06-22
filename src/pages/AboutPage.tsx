import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Target, Heart, Lightbulb, Users, Award, Globe, Zap, Shield, CheckCircle2, Linkedin, Twitter } from 'lucide-react';
import { useScrollAnimation, useCountUp } from '../hooks/useAnimations';

const values = [
  { icon: Target, title: 'Innovation', desc: 'We push boundaries and embrace emerging technologies to solve complex problems.' },
  { icon: Heart, title: 'Passion', desc: 'We are driven by genuine enthusiasm for creating impactful digital experiences.' },
  { icon: Lightbulb, title: 'Excellence', desc: 'We hold ourselves to the highest standards in every line of code and pixel.' },
  { icon: Users, title: 'Collaboration', desc: 'We believe the best solutions come from working closely with our clients.' },
];

const team = [
  { name: 'Alex Rivera', role: 'CEO & Founder', bio: 'Visionary leader with 15+ years in tech. Former engineering lead at top Silicon Valley firms.' },
  { name: 'Priya Sharma', role: 'CTO', bio: 'Expert in cloud architecture and AI. Built platforms serving millions of users.' },
  { name: 'James Chen', role: 'Head of Design', bio: 'Award-winning designer. Passionate about creating intuitive, beautiful interfaces.' },
  { name: 'Sarah Kim', role: 'VP of Engineering', bio: 'Full-stack expert with deep expertise in scalable distributed systems.' },
  { name: 'Marcus Johnson', role: 'AI/ML Lead', bio: 'Published researcher in NLP and computer vision. Builds production-grade ML systems.' },
  { name: 'Elena Volkov', role: 'Project Director', bio: 'PMP certified. Ensures every project is delivered on time and exceeds expectations.' },
];

const stats = [
  { value: 15, suffix: '+', label: 'Years in Business' },
  { value: 200, suffix: '+', label: 'Projects Completed' },
  { value: 85, suffix: '+', label: 'Team Members' },
  { value: 20, suffix: '+', label: 'Countries Served' },
];

const milestones = [
  { year: '2011', title: 'Founded', desc: 'Ananta Byte was born in a small San Francisco office with a team of 5.' },
  { year: '2014', title: 'First Major Client', desc: 'Secured our first enterprise contract, building a platform for 100K+ users.' },
  { year: '2017', title: 'AI Division Launched', desc: 'Expanded into AI/ML, hiring top researchers and engineers.' },
  { year: '2020', title: 'Global Expansion', desc: 'Opened offices in London and Singapore, serving clients worldwide.' },
  { year: '2023', title: '200+ Projects', desc: 'Milestone reached: over 200 successful project deliveries.' },
  { year: '2026', title: 'Next Chapter', desc: 'Pioneering next-gen solutions with generative AI and edge computing.' },
];

export default function AboutPage() {
  const { ref: teamRef, isVisible: teamVisible } = useScrollAnimation();
  const { ref: milestoneRef, isVisible: milestoneVisible } = useScrollAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '30%']);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section ref={heroRef} className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <motion.div style={{ y: heroY }} className="absolute top-20 left-[5%] w-48 h-48 float-shape" />
        <motion.div style={{ y: useTransform(heroProgress, [0, 1], [0, -40]) }} className="absolute bottom-10 right-[10%] w-64 h-64 float-shape-circle" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2 mb-6">Building the <span className="gradient-text">Digital Future</span></h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">Since 2011, Ananta Byte has been at the forefront of digital innovation. We combine deep technical expertise with creative thinking to deliver solutions that transform businesses.</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"><Globe className="w-4 h-4 text-primary-600 dark:text-primary-400" /><span className="text-sm font-medium text-gray-700 dark:text-gray-300">20+ Countries</span></div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"><Award className="w-4 h-4 text-primary-600 dark:text-primary-400" /><span className="text-sm font-medium text-gray-700 dark:text-gray-300">15+ Awards</span></div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm"><Zap className="w-4 h-4 text-primary-600 dark:text-primary-400" /><span className="text-sm font-medium text-gray-700 dark:text-gray-300">99% Satisfaction</span></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative perspective-1000">
              <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-primary-500/10 dark:shadow-primary-400/5 p-8 border border-primary-100 dark:border-primary-700/30">
                <div className="grid grid-cols-2 gap-6">
                  {stats.map((stat) => { const { count, ref: countRef } = useCountUp(stat.value, 2000); return (<div key={stat.label} ref={countRef} className="text-center p-4 rounded-2xl bg-primary-50/50 dark:bg-primary-900/20"><div className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">{count}{stat.suffix}</div><div className="text-xs text-gray-600 dark:text-gray-400 font-medium mt-1">{stat.label}</div></div>); })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">What <span className="gradient-text">Drives Us</span></h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div key={value.title} initial={{ opacity: 0, y: 30, rotateY: 10 }} whileInView={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true }}
                className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-xl hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 transition-all duration-300 card-3d text-center preserve-3d">
                <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors duration-300"><value.icon className="w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" /></div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section ref={milestoneRef} className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={milestoneVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">Key <span className="gradient-text">Milestones</span></h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800 -translate-x-1/2 hidden sm:block" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30, rotateY: i % 2 === 0 ? -5 : 5 }} animate={milestoneVisible ? { opacity: 1, x: 0, rotateY: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`flex items-center gap-6 ${i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-300 card-3d inline-block">
                      <span className="text-primary-600 dark:text-primary-400 font-bold text-lg">{m.year}</span>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1">{m.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">{m.desc}</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex w-4 h-4 rounded-full bg-primary-600 border-4 border-primary-100 dark:border-primary-900 flex-shrink-0 relative z-10" />
                  <div className="flex-1 hidden sm:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={teamRef} className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={teamVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-16">
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">Meet the <span className="gradient-text">Leaders</span></h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">Experienced professionals driving innovation and delivering excellence.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30, rotateX: 8 }} animate={teamVisible ? { opacity: 1, y: 0, rotateX: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white dark:bg-gray-900 rounded-2xl p-7 border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-xl hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 transition-all duration-300 card-3d">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg"><span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span></div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{member.name}</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 flex items-center justify-center transition-colors"><Linkedin className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400" /></a>
                  <a href="#" className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/30 flex items-center justify-center transition-colors"><Twitter className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400" /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center perspective-1000">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="preserve-3d">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">Want to <span className="gradient-text">Join Our Team</span>?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-8 text-lg">We're always looking for talented individuals who share our passion for innovation and excellence.</p>
            <Link to="/contact" className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:-translate-y-0.5">Get In Touch <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
