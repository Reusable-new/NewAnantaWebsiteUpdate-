import { Link } from 'react-router-dom';
import { Cpu, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const footerLinks = {
  Services: [
    { name: 'Web Development', path: '/services' },
    { name: 'App Development', path: '/services' },
    { name: 'AI/ML Solutions', path: '/services' },
    // { name: 'Chatbot Development', path: '/services' },
    { name: 'UI/UX Design', path: '/services' },
    { name: 'Cloud Solutions', path: '/services' },
  ],
  Company: [
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 dark:bg-black text-gray-300 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/image/logo.png" alt="Ananta Byte" className="w-10 h-10 rounded-xl object-cover" />
              <span className="text-xl font-bold text-white">
                Ananta<span className="text-primary-400">Byte</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Transforming businesses through innovative technology solutions. We build digital experiences that drive growth.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-primary-400" />
                contact@anantabyte.com
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-primary-400" />
                +91-8009976304 
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-primary-400" />
                Hall no- 6, 7, Vikas Mall, vasant vihar, Dehradun
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-primary-400 transition-colors flex items-center gap-1 group"
                    >
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-white font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">Stay updated with our latest insights and trends.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 px-4 py-2.5 bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-800 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
              />
              <button className="px-4 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-medium hover:bg-primary-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            2026 Ananta Byte. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-primary-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
