import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, UserCheck, Trash2, LogOut } from 'lucide-react';
import { loginAdmin, logoutAdmin, isAdminAuthenticated } from '../services/authService';
import { addBlogPost, addTestimonial, getBlogPosts, getTestimonials, updateBlogPost, categories, getLeads, removeLead, BlogPost, Testimonial, Lead } from '../services/contentService';

const defaultBlogForm = {
  title: '',
  excerpt: '',
  category: '',
  author: '',
  date: '',
  readTime: '',
  featured: false,
  image: '',
};

const defaultTestimonialForm = {
  name: '',
  role: '',
  company: '',
  text: '',
  rating: 5,
  image: '',
};

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [blogForm, setBlogForm] = useState(defaultBlogForm);
  const [editingBlogId, setEditingBlogId] = useState<number | null>(null);
  const [testimonialForm, setTestimonialForm] = useState(defaultTestimonialForm);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(getBlogPosts());
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getTestimonials());
  const [leads, setLeads] = useState<Lead[]>(getLeads());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (success) {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Invalid username or password.');
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const handleBlogChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked, files } = e.target as HTMLInputElement;

    if (name === 'imageFile' && type === 'file' && files?.[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setBlogForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
      return;
    }

    setBlogForm((prev) => ({ ...prev, [name]: name === 'featured' ? checked : value }));
  };

  const handleTestimonialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;

    if (name === 'imageFile' && type === 'file' && files?.[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setTestimonialForm((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
      return;
    }

    setTestimonialForm((prev) => ({ ...prev, [name]: name === 'rating' ? Number(value) : value }));
  };

  const submitBlog = (e: React.FormEvent) => {
    e.preventDefault();

    const entry = {
      ...blogForm,
      featured: Boolean(blogForm.featured),
      image: blogForm.image,
    };

    if (editingBlogId !== null) {
      const updatedPost = updateBlogPost(editingBlogId, entry);
      if (updatedPost) {
        setBlogPosts((prev) => prev.map((post) => (post.id === editingBlogId ? updatedPost : post)));
      }
      setEditingBlogId(null);
    } else {
      const newPost = addBlogPost(entry);
      setBlogPosts((prev) => [newPost, ...prev]);
    }

    setBlogForm(defaultBlogForm);
  };

  const submitTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry = addTestimonial(testimonialForm);
    setTestimonials((prev) => [newEntry, ...prev]);
    setTestimonialForm(defaultTestimonialForm);
  };

  const removeBlogPost = (id: number) => {
    const updated = blogPosts.filter((item) => item.id !== id);
    setBlogPosts(updated);
    localStorage.setItem('anantabyte-blog-posts', JSON.stringify(updated));
    if (editingBlogId === id) {
      setEditingBlogId(null);
      setBlogForm(defaultBlogForm);
    }
  };

  const editBlogPost = (post: BlogPost) => {
    setBlogForm(post);
    setEditingBlogId(post.id);
    setError('');
  };

  const cancelEditBlog = () => {
    setEditingBlogId(null);
    setBlogForm(defaultBlogForm);
  };

  const removeTestimonial = (name: string) => {
    const updated = testimonials.filter((item) => item.name !== name);
    setTestimonials(updated);
    localStorage.setItem('anantabyte-testimonials', JSON.stringify(updated));
  };

  const handleRemoveLead = (id: number) => {
    const updated = removeLead(id);
    setLeads(updated);
  };

  return (
    <main className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-primary-600 dark:text-primary-400 font-semibold">Admin Portal</p>
            <h1 className="text-4xl font-extrabold mt-3">Content Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Log in to upload blog posts and testimonials that appear on the site.</p>
          </div>
          <Link to="/" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">Back to site</Link>
        </div>

        {authenticated ? (
          <div className="space-y-10">
            <div className="flex items-center justify-between gap-4">
              <div className="rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full">
                <h2 className="text-xl font-semibold mb-3">Add Blog Post</h2>
                <form onSubmit={submitBlog} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="title" value={blogForm.title} onChange={handleBlogChange} required placeholder="Title" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                    <input name="author" value={blogForm.author} onChange={handleBlogChange} required placeholder="Author" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select name="category" value={blogForm.category} onChange={handleBlogChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm">
                      <option value="">Select service category</option>
                      {categories.filter((cat) => cat !== 'All').map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <input name="date" value={blogForm.date} onChange={handleBlogChange} required placeholder="Date" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="readTime" value={blogForm.readTime} onChange={handleBlogChange} required placeholder="Read time" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm">
                      <input id="featured" name="featured" type="checkbox" checked={blogForm.featured} onChange={handleBlogChange} className="h-4 w-4 text-primary-600" />
                      <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">Featured</label>
                    </div>
                  </div>
                  <textarea name="excerpt" value={blogForm.excerpt} onChange={handleBlogChange} required rows={4} placeholder="Excerpt" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                  <div className="grid grid-cols-1 gap-4">
                    <input name="image" value={blogForm.image} onChange={handleBlogChange} placeholder="Image URL (optional)" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image (optional)</label>
                    <input name="imageFile" type="file" accept="image/*" onChange={handleBlogChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary-600 file:text-white hover:file:bg-primary-700" />
                  </div>
                  {blogForm.image && (
                    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mt-2">
                      <img src={blogForm.image} alt="Selected blog" className="w-full h-40 object-cover" />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 items-center">
                    <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">{editingBlogId !== null ? 'Update Blog' : 'Publish Blog'} <Plus className="w-4 h-4" /></button>
                    {editingBlogId !== null && <button type="button" onClick={cancelEditBlog} className="inline-flex items-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition">Cancel</button>}
                  </div>
                </form>
              </div>
              <div className="rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 w-full">
                <h2 className="text-xl font-semibold mb-3">Add Testimonial</h2>
                <form onSubmit={submitTestimonial} className="space-y-4">
                  <input name="name" value={testimonialForm.name} onChange={handleTestimonialChange} required placeholder="Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                  <input name="role" value={testimonialForm.role} onChange={handleTestimonialChange} required placeholder="Role" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                  <input name="company" value={testimonialForm.company} onChange={handleTestimonialChange} required placeholder="Company" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                  <textarea name="text" value={testimonialForm.text} onChange={handleTestimonialChange} required rows={3} placeholder="Testimonial text" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="rating" value={testimonialForm.rating} onChange={handleTestimonialChange} type="number" min={1} max={5} placeholder="Rating" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                    <input name="image" value={testimonialForm.image} onChange={handleTestimonialChange} placeholder="Image URL (optional)" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Upload Image (optional)</label>
                    <input name="imageFile" type="file" accept="image/*" onChange={handleTestimonialChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-primary-600 file:text-white hover:file:bg-primary-700" />
                  </div>
                  {testimonialForm.image && (
                    <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mt-2">
                      <img src={testimonialForm.image} alt="Selected testimonial" className="w-full h-40 object-cover" />
                    </div>
                  )}
                  <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">Publish Testimonial <Plus className="w-4 h-4" /></button>
                </form>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4"><h2 className="text-xl font-semibold">Published Blog Posts</h2><button onClick={handleLogout} className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"><LogOut className="w-4 h-4" /> Logout</button></div>
                <div className="space-y-3">
                  {blogPosts.map((post) => (
                    <div key={post.id} className="rounded-2xl border border-gray-100 dark:border-gray-700 p-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{post.category} · {post.date}</p>
                        <h3 className="font-semibold text-gray-900 dark:text-white mt-1">{post.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => editBlogPost(post)} className="px-3 py-2 rounded-xl bg-primary-50 dark:bg-primary-900 text-primary-700 dark:text-primary-200 text-sm hover:bg-primary-100 transition">Edit</button>
                        <button type="button" onClick={() => removeBlogPost(post.id)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Published Testimonials</h2>
                <div className="space-y-3">
                  {testimonials.map((item) => (
                    <div key={item.name} className="rounded-2xl border border-gray-100 dark:border-gray-700 p-4 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.role} · {item.company}</p>
                        <h3 className="font-semibold text-gray-900 dark:text-white mt-1">{item.name}</h3>
                      </div>
                      <button onClick={() => removeTestimonial(item.name)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Contact Leads</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{leads.length} received</span>
              </div>
              <div className="space-y-3">
                {leads.map((lead) => (
                  <div key={lead.id} className="rounded-2xl border border-gray-100 dark:border-gray-700 p-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{lead.service || 'General inquiry'} · {new Date(lead.createdAt).toLocaleDateString()}</p>
                      <h3 className="font-semibold text-gray-900 dark:text-white mt-1">{lead.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{lead.email} · {lead.company}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{lead.message}</p>
                    </div>
                    <button type="button" onClick={() => handleRemoveLead(lead.id)} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
                {leads.length === 0 && <p className="text-sm text-gray-500 dark:text-gray-400">No contact leads yet.</p>}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto rounded-3xl bg-white dark:bg-gray-800 p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Use your admin credentials to access content management.</p>
            <form onSubmit={handleLogin} className="space-y-4">
              <input value={username} onChange={(e) => setUsername(e.target.value)} required placeholder="Username" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm" />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition">Sign In <UserCheck className="w-4 h-4" /></button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
