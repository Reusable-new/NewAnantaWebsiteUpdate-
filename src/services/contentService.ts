import { categories, blogPosts as initialBlogPosts, trendingTopics } from '../data/blogPosts';

const BLOG_STORAGE_KEY = 'anantabyte-blog-posts';
const TESTIMONIALS_STORAGE_KEY = 'anantabyte-testimonials';

export type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured: boolean;
  image: string;
};

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  image: string;
};

export type Lead = {
  id: number;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted';
};

const LEADS_STORAGE_KEY = 'anantabyte-leads';

export const initialTestimonials: Testimonial[] = [
  { name: 'Sarah Johnson', role: 'CEO', company: 'TechFlow', text: 'Ananta Byte delivered our platform ahead of schedule with exceptional quality. Their cloud solutions expertise transformed our infrastructure, reducing costs by 40% while improving performance 3x.', rating: 5, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'Michael Chen', role: 'CTO', company: 'DataSync', text: 'The AI/ML solution they built transformed our data processing pipeline. We went from hours of batch processing to real-time analytics. Their team truly understands enterprise-scale challenges.', rating: 5, image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'Emily Rodriguez', role: 'VP of Product', company: 'HealthPlus', text: 'Our mobile app went from concept to App Store in just 4 months. The user feedback has been overwhelmingly positive, with a 4.8-star rating and 100K+ downloads in the first quarter.', rating: 5, image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'David Park', role: 'Founder', company: 'EduLearn', text: 'The chatbot they built handles 80% of our student inquiries automatically, saving our support team 200+ hours per month. It feels natural and students love the instant responses.', rating: 5, image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'Lisa Wang', role: 'Head of Design', company: 'CreativeHub', text: 'Ananta Byte\'s UI/UX team redesigned our entire platform. Conversion rates increased by 65% and user engagement doubled. They don\'t just design—they solve business problems.', rating: 5, image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'Robert Kim', role: 'Director of Engineering', company: 'FinanceCore', text: 'The web application they built handles millions of transactions daily with zero downtime. Their attention to security and performance is exactly what we needed in fintech.', rating: 5, image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'Amanda Torres', role: 'COO', company: 'RetailMax', text: 'From the initial discovery to post-launch support, Ananta Byte was transparent, responsive, and genuinely invested in our success. They feel like an extension of our team.', rating: 5, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
  { name: 'James Wilson', role: 'CEO', company: 'LogiTech', text: 'Their cloud migration strategy saved us $200K annually. The transition was seamless with zero downtime. I cannot recommend Ananta Byte enough for any organization considering cloud solutions.', rating: 5, image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2' },
];

export function getBlogPosts(): BlogPost[] {
  const stored = localStorage.getItem(BLOG_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as BlogPost[];
    } catch {
      // ignore parse errors and fallback to initial data
    }
  }
  return initialBlogPosts;
}

export function getBlogPostById(id: number) {
  return getBlogPosts().find((post) => post.id === id);
}

export function saveBlogPosts(posts: BlogPost[]) {
  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(posts));
}

const defaultBlogImage = 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200';

export function addBlogPost(post: Omit<BlogPost, 'id'>) {
  const posts = getBlogPosts();
  const nextId = posts.length > 0 ? Math.max(...posts.map((item) => item.id)) + 1 : 1;
  const newPost = { ...post, id: nextId, image: post.image || defaultBlogImage };
  const updated = [newPost, ...posts];
  saveBlogPosts(updated);
  return newPost;
}

export function updateBlogPost(id: number, updates: Partial<Omit<BlogPost, 'id'>>) {
  const posts = getBlogPosts();
  const updatedPosts = posts.map((post) => {
    if (post.id !== id) return post;
    return {
      ...post,
      ...updates,
      image: updates.image ? updates.image : post.image || defaultBlogImage,
    };
  });
  saveBlogPosts(updatedPosts);
  return updatedPosts.find((post) => post.id === id);
}

export function getLeads(): Lead[] {
  const stored = localStorage.getItem(LEADS_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as Lead[];
    } catch {
      return [];
    }
  }
  return [];
}

export function saveLeads(leads: Lead[]) {
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
}

export function addLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'>) {
  const leads = getLeads();
  const newLead: Lead = {
    ...lead,
    id: leads.length > 0 ? Math.max(...leads.map((item) => item.id)) + 1 : 1,
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  const updated = [newLead, ...leads];
  saveLeads(updated);
  return newLead;
}

export function removeLead(id: number) {
  const updated = getLeads().filter((lead) => lead.id !== id);
  saveLeads(updated);
  return updated;
}

export function getTestimonials(): Testimonial[] {
  const stored = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
  if (stored !== null) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed as Testimonial[];
      }
      // Clear invalid stored data so a stale malformed payload doesn't restore default testimonials.
      localStorage.removeItem(TESTIMONIALS_STORAGE_KEY);
      return [];
    } catch {
      localStorage.removeItem(TESTIMONIALS_STORAGE_KEY);
      return [];
    }
  }
  return initialTestimonials;
}

export function saveTestimonials(testimonials: Testimonial[]) {
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
}

export function addTestimonial(testimonial: Omit<Testimonial, 'image'> & { image?: string }) {
  const entries = getTestimonials();
  const newTestimonial: Testimonial = {
    image: testimonial.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
    ...testimonial,
  } as Testimonial;
  const updated = [newTestimonial, ...entries];
  saveTestimonials(updated);
  return newTestimonial;
}

export { categories, trendingTopics };
