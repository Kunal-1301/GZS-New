import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiChevronDown } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Breadcrumb from '../../components/Breadcrumb';
import { usePageTheme } from '../../context/ThemeContext';
import { categories, blogTypes } from '../../data/blogData';
import { addUserBlog } from '../../data/blogService';

function WriteBlog() {
  usePageTheme('blog');
  const navigate = useNavigate();

  // Controlled form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    type: '',
    content: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.author.trim()) newErrors.author = 'Author name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';
    if (formData.content.trim().length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Create blog object matching assets.js schema
    const blogData = {
      title: formData.title.trim(),
      author: formData.author.trim(),
      category: formData.category,
      type: formData.type,
      content: formData.content.trim(),
    };

    // Save to localStorage via assets.js
    addUserBlog(blogData);

    // Redirect to blogs page
    navigate('/blog');
  };

  return (
    <div className="theme-blog min-h-screen bg-[var(--theme-bg)] text-[var(--theme-text)]">
      <Navbar />

      {/* Page Header */}
      <section className="section-padding !pb-0 bg-[var(--theme-bg)]">
        <div className="container-global">
          <Breadcrumb items={[
            { label: 'Home', to: '/' },
            { label: 'Blog', to: '/blog' },
            { label: 'Write a Blog' },
          ]} className="mb-4" />
          <h1 className="gzs-h1 mb-2">
            Write a Blog
          </h1>
          <p className="gzs-body-sm">
            Share your insights, guides, or reviews with the GzoneSphere community.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section-padding bg-[var(--theme-bg)]">
        <div className="container-global">
          <form onSubmit={handleSubmit} className="max-w-3xl">
            {/* Blog Title */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="gzs-label mb-2 block"
              >
                Blog Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter your blog title"
                className={`w-full px-4 py-3 bg-[var(--theme-card)] border rounded-sm text-[var(--theme-text)] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] transition-colors ${errors.title ? 'border-red-500' : 'border-[var(--theme-border)]'
                  }`}
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-500">{errors.title}</p>
              )}
            </div>

            {/* Author Name */}
            <div className="mb-6">
              <label
                htmlFor="author"
                className="gzs-label mb-2 block"
              >
                Author Name
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full px-4 py-3 bg-[var(--theme-card)] border rounded-sm text-[var(--theme-text)] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] transition-colors ${errors.author ? 'border-red-500' : 'border-[var(--theme-border)]'
                  }`}
              />
              {errors.author && (
                <p className="mt-1 text-xs text-red-500">{errors.author}</p>
              )}
            </div>

            {/* Category & Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Category Dropdown */}
              <div>
                <label
                  htmlFor="category"
                  className="gzs-label mb-2 block"
                >
                  Blog Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full appearance-none px-4 py-3 bg-[var(--theme-card)] border rounded-sm text-[var(--theme-text)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] transition-colors ${errors.category ? 'border-red-500' : 'border-[var(--theme-border)]'
                      } ${!formData.category ? 'text-[var(--theme-text-muted)]' : ''}`}
                  >
                    <option value="">Select category</option>
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--theme-text-muted)] pointer-events-none" />
                </div>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Type Dropdown */}
              <div>
                <label
                  htmlFor="type"
                  className="gzs-label mb-2 block"
                >
                  Blog Type
                </label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full appearance-none px-4 py-3 bg-[var(--theme-card)] border rounded-sm text-[var(--theme-text)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] transition-colors ${errors.type ? 'border-red-500' : 'border-[var(--theme-border)]'
                      } ${!formData.type ? 'text-[var(--theme-text-muted)]' : ''}`}
                  >
                    <option value="">Select type</option>
                    {blogTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--theme-text-muted)] pointer-events-none" />
                </div>
                {errors.type && (
                  <p className="mt-1 text-xs text-red-500">{errors.type}</p>
                )}
              </div>
            </div>

            {/* Blog Content */}
            <div className="mb-8">
              <label
                htmlFor="content"
                className="gzs-label mb-2 block"
              >
                Blog Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write your blog content here..."
                rows={12}
                className={`w-full px-4 py-3 bg-[var(--theme-card)] border rounded-sm text-[var(--theme-text)] placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[var(--theme-primary)] transition-colors resize-y ${errors.content ? 'border-red-500' : 'border-[var(--theme-border)]'
                  }`}
              />
              {errors.content && (
                <p className="mt-1 text-xs text-red-500">{errors.content}</p>
              )}
              <p className="mt-2 text-xs text-[var(--theme-text-muted)]">
                {formData.content.length} characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="gzs-btn-primary"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Blog'}
                <FiArrowUpRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/blog')}
                className="gzs-btn-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default WriteBlog;
