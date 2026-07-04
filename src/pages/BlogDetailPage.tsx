import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import SEO from '../components/SEO';
import { buildArticleSchema, buildBreadcrumbSchema } from '../services/seo';
import { BlogPost, getBlogPostByIdOrLocal } from '../services/contentService';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    async function loadPost() {
      if (!id) {
        setLoading(false);
        return;
      }
      const fetched = await getBlogPostByIdOrLocal(Number(id));
      if (!canceled) {
        setPost(fetched);
        setLoading(false);
      }
    }

    loadPost();
    return () => {
      canceled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4">
        <p className="text-lg">Loading article...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white px-4">
        <div className="max-w-3xl text-center">
          <h1 className="text-4xl font-bold mb-4">Article not found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The blog article you are looking for does not exist or has been moved.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 px-5 py-3 bg-cyan-500 text-white rounded-xl shadow-lg hover:bg-cyan-400 transition-colors">
            Back to Blog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16 bg-white dark:bg-gray-950">
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        pathname={`/blog/${post.id}`}
        schema={[
          buildBreadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.id}` },
          ]),
          buildArticleSchema({
            title: post.title,
            description: post.excerpt,
            author: post.author,
            publishDate: post.date,
            image: post.image,
            url: `/blog/${post.id}`,
          }),
        ]}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-cyan-50 via-white to-white dark:from-slate-900 dark:via-gray-950 dark:to-gray-950 shadow-2xl shadow-cyan-500/5 p-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400 font-semibold">{post.category}</p>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-4">{post.title}</h1>
            </div>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-300 hover:text-cyan-400 transition-colors">
              Back to Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-10">
            <span className="flex items-center gap-2"><User className="w-4 h-4" /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
          </div>
          <img src={post.image} alt={post.title} className="w-full h-96 rounded-3xl object-cover mb-10" />
          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p>{post.excerpt}</p>
            <p>Discover practical tips, modern architecture patterns, and real-world examples that help you implement this strategy in your next project.</p>
            <p>From planning and execution to scaling, this article walks through the most important decisions teams make when building future-ready applications.</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Want more updates like this? Subscribe to our newsletter and never miss a new article.</p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
