import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import { buildBreadcrumbSchema, buildServiceSchema } from '../services/seo';
import { services } from '../data/services';

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <main className="pt-20 min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Service not found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The service you are looking for does not exist or may have been moved.</p>
          <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-300">Back to Services <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </main>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <main className="pt-20 min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <SEO
        title={service.title}
        description={service.desc}
        pathname={`/services/${service.slug}`}
        schema={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.title, url: `/services/${service.slug}` },
          ]),
          buildServiceSchema({
            name: service.title,
            description: service.desc,
            url: `/services/${service.slug}`,
          }),
        ]}
      />
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-200 text-sm font-semibold mb-6">
                <ServiceIcon className="w-4 h-4" />
                {service.title}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">{service.title}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{service.desc}</p>
              <div className="grid gap-4 sm:grid-cols-2 mb-10">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 rounded-3xl border border-gray-200 dark:border-gray-800 p-5 bg-gray-50 dark:bg-gray-900">
                    <CheckCircle2 className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1" />
                    <p className="text-sm text-gray-700 dark:text-gray-300">{feature}</p>
                  </div>
                ))}
              </div>
              <div className="mb-10">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-4">Technology stack</h2>
                <div className="flex flex-wrap gap-3">
                  {service.tech.map((tech) => (
                    <span key={tech} className="px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-200 text-sm font-medium">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="mb-8 rounded-3xl border border-primary-200/60 dark:border-primary-700/50 bg-primary-50/80 dark:bg-primary-900/20 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-700 dark:text-primary-300 mb-2">Ready to build something powerful?</p>
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">Contact us today to discuss how {service.title} can drive your business forward. Our team will tailor the solution to your exact needs.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-300">Contact Us <ArrowRight className="w-4 h-4" /></Link>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link to="/services" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-300">Back to Services</Link>
              </div>
            </div>
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary-500/10">
              <img src={service.image} alt={service.title} className="w-full h-full object-cover min-h-[420px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
