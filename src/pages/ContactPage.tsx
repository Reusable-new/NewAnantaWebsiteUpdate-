import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare, Building2, Globe } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAnimations';

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'contact@anantabyte.com', desc: 'We respond within 24 hours' },
  { icon: Phone, label: 'Phone', value: '+91-8009976304', desc: 'Mon-Fri 9am-6pm PST' },
  { icon: MapPin, label: 'Office', value: '123 Innovation Drive', desc: 'San Francisco, CA 94107' },
  { icon: Clock, label: 'Hours', value: '9:00 AM - 6:00 PM', desc: 'Monday to Friday, PST' },
];

const offices = [
  { city: 'San Francisco', country: 'USA', type: 'Headquarters' },
  { city: 'London', country: 'UK', type: 'European Office' },
  { city: 'Singapore', country: 'SG', type: 'Asia Pacific Office' },
];

const serviceOptions = ['Web Development', 'App Development', 'Chatbot Development', 'AI/ML Solutions', 'UI/UX Design', 'Cloud Solutions', 'Digital Marketing'];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', service: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const { ref, isVisible } = useScrollAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '25%']);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); setTimeout(() => setSubmitted(false), 4000); };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value })); };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 text-sm transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500";

  return (
    <main className="pt-20">
      {/* Hero */}
      <section ref={heroRef} className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <motion.div style={{ y: heroY }} className="absolute top-20 right-[10%] w-64 h-64 float-shape" />
        <motion.div style={{ y: useTransform(heroProgress, [0, 1], [0, -40]) }} className="absolute bottom-10 left-[5%] w-48 h-48 float-shape-circle" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2 mb-6">Let's <span className="gradient-text">Start a Conversation</span></h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">Have a project in mind? We'd love to hear about it. Reach out and let's explore how we can help.</p>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-16 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <motion.div key={info.label} initial={{ opacity: 0, y: 20, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-lg hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 transition-all duration-300 card-3d text-center">
                <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-600 transition-colors duration-300"><info.icon className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" /></div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{info.label}</h3>
                <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mt-1">{info.value}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">{info.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section ref={ref} className="py-24 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send Us a Message</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">Fill out the form and we'll get back to you within 24 hours.</p>
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" /></div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-400">We'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputCls} placeholder="John Smith" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputCls} placeholder="john@company.com" /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Company</label><input type="text" name="company" value={formData.company} onChange={handleChange} className={inputCls} placeholder="Company name" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Service</label><select name="service" value={formData.service} onChange={handleChange} className={inputCls}><option value="">Select a service</option>{serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
                    </div>
                    <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Budget Range</label><select name="budget" value={formData.budget} onChange={handleChange} className={inputCls}><option value="">Select budget range</option><option value="5k-15k">$5K - $15K</option><option value="15k-50k">$15K - $50K</option><option value="50k-100k">$50K - $100K</option><option value="100k+">$100K+</option></select></div>
                    <div><label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Project Details</label><textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className={`${inputCls} resize-none`} placeholder="Tell us about your project, goals, and timeline..." /></div>
                    <button type="submit" className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/25">Send Message <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" /></button>
                  </form>
                )}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"><Building2 className="w-5 h-5 text-primary-600 dark:text-primary-400" /> Our Offices</h3>
                <div className="space-y-4">
                  {offices.map((office) => (
                    <div key={office.city} className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors cursor-pointer group">
                      <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-600 transition-colors"><Globe className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" /></div>
                      <div><div className="text-sm font-semibold text-gray-900 dark:text-white">{office.city}, {office.country}</div><div className="text-xs text-gray-500 dark:text-gray-400">{office.type}</div></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-6 text-white">
                <h3 className="font-bold mb-2 flex items-center gap-2"><MessageSquare className="w-5 h-5" /> Quick Connect</h3>
                <p className="text-primary-200 text-sm mb-4">Need immediate assistance? Our team is available for urgent inquiries.</p>
                <div className="space-y-3">
                  <a href="tel:+15551234567" className="flex items-center gap-2 text-white/90 hover:text-white text-sm transition-colors"><Phone className="w-4 h-4" /> +1 (555) 123-4567</a>
                  <a href="mailto:contact@anantabyte.com" className="flex items-center gap-2 text-white/90 hover:text-white text-sm transition-colors"><Mail className="w-4 h-4" /> contact@anantabyte.com</a>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Frequently Asked</h3>
                <div className="space-y-3">
                  {['What is your typical project timeline?', 'Do you offer post-launch support?', 'Can you work with our existing tech stack?'].map((q) => (
                    <div key={q} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"><span className="text-primary-600 dark:text-primary-400 font-bold mt-0.5">Q</span>{q}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
