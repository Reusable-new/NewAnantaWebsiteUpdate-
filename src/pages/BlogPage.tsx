import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight, Clock, User, Search, Calendar, BookOpen, TrendingUp, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useAnimations';
import { categories, getBlogPosts, trendingTopics } from '../services/contentService';

const trendingIconMap: Record<string, LucideIcon> = {
  'Generative AI': Zap,
  'Cloud Native': TrendingUp,
  'Web Performance': BookOpen,
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const posts = getBlogPosts();
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const featuredPost = posts.find((p) => p.featured);
  const { ref, isVisible } = useScrollAnimation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(heroProgress, [0, 1], ['0%', '25%']);

  return (
    <main className="pt-20">
      {/* Hero */}
      <section ref={heroRef} className="py-24 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <motion.div style={{ y: heroY }} className="absolute top-10 right-[15%] w-56 h-56 float-shape" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wider">Our Blog</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-2 mb-6">Insights & <span className="gradient-text">Ideas</span></h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">Thought leadership, technical deep-dives, and industry perspectives from our team.</p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {featuredPost && (
        <section className="py-16 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to={`/blog/${featuredPost.id}`} className="block">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}
          className="group relative bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-8 sm:p-12 overflow-hidden card-3d hover:no-underline">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-4"><span className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold">Featured</span><span className="px-3 py-1 rounded-lg bg-white/10 text-primary-200 text-xs font-medium">{featuredPost.category}</span></div>
            <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-64 rounded-3xl object-cover mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-primary-100 transition-colors">{featuredPost.title}</h2>
            <p className="text-primary-200 max-w-2xl mb-6 leading-relaxed">{featuredPost.excerpt}</p>
            <div className="flex flex-wrap items-center gap-4 text-primary-300 text-sm">
              <span className="flex items-center gap-1"><User className="w-4 h-4" /> {featuredPost.author}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {featuredPost.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {featuredPost.readTime}</span>
            </div>
          </div>
        </motion.div>
      </Link>
          </div>
        </section>
      )}

      {/* Search & Filter */}
      <section className="py-8 bg-white dark:bg-gray-950 sticky top-16 z-30 border-b border-gray-100 dark:border-gray-800 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input type="text" placeholder="Search articles..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-400 focus:ring-2 focus:ring-primary-100 dark:focus:ring-primary-900 text-sm transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500" />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat ? 'bg-primary-600 text-white shadow-md shadow-primary-500/25' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div ref={ref} className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div key={activeCategory + searchQuery} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid sm:grid-cols-2 gap-6">
                  {filteredPosts.map((post, i) => (
                    <Link key={post.id} to={`/blog/${post.id}`} className="group block hover:no-underline">
                      <motion.article initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="group bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-600 hover:shadow-xl hover:shadow-primary-500/5 dark:hover:shadow-primary-400/5 transition-all duration-300 card-3d cursor-pointer preserve-3d">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium">{post.category}</span>
                          <span className="text-gray-400 dark:text-gray-500 text-xs flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-snug">{post.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"><User className="w-3 h-3" /> {post.author}</div>
                          <span className="text-primary-600 dark:text-primary-400 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">Read <ArrowRight className="w-3 h-3" /></span>
                        </div>
                      </motion.article>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
              {filteredPosts.length === 0 && (<div className="text-center py-16"><p className="text-gray-500 dark:text-gray-400">No articles found matching your criteria.</p></div>)}
            </div>
            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Trending Topics</h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic) => {
                    const Icon = trendingIconMap[topic.title] || Zap;
                    return (
                      <div key={topic.title} className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-600 transition-colors"><Icon className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" /></div>
                        <div><div className="text-sm font-semibold text-gray-900 dark:text-white">{topic.title}</div><div className="text-xs text-gray-500 dark:text-gray-400">{topic.count}</div></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Subscribe to Newsletter</h3>
                <p className="text-primary-200 text-sm mb-4">Get the latest articles delivered to your inbox weekly.</p>
                <input type="email" placeholder="your@email.com" className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-primary-200 text-sm focus:outline-none focus:border-white/40 mb-3" />
                <button className="w-full py-2.5 bg-white text-primary-600 font-semibold rounded-xl text-sm hover:bg-primary-50 transition-colors">Subscribe</button>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['AI', 'React', 'Cloud', 'Mobile', 'Design', 'Security', 'Performance', 'DevOps', 'TypeScript', 'Node.js'].map((tag) => (
                    <button key={tag} className="px-3 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{tag}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
