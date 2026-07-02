import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-20">
      <SEO
        title="404 Not Found"
        description="The page you are looking for cannot be found. Explore Ananta Byte's services, blog, and contact pages to continue." 
        robots="noindex,nofollow"
      />
      <div className="max-w-3xl text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 mb-4">Page not found</p>
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6">404</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10">We couldn’t find the page you were looking for. Check the URL or return to the homepage.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-300">Go to Homepage <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </main>
  );
}
