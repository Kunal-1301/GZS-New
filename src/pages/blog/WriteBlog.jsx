import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiChevronDown } from 'react-icons/hi';
import { FiArrowUpRight } from 'react-icons/fi';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { categories, blogTypes } from '../../data/blogData';
import { addUserBlog } from '../../data/blogService';

function WriteBlog() {
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
    <div className="min-h-screen bg-[#FEF9E7]">
      <Navbar logoVariant="yellow" loginVariant="yellow" isDark={false} />

      {/* Page Header */}
      <section className="py-12 bg-[#FEF9E7]">
        <div className="container mx-auto px-6 lg:px-16">
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide text-neutral-900 mb-2">
            Write a Blog
          </h1>
          <p className="text-neutral-600 text-sm">
            Share your insights, guides, or reviews with the GzoneSphere community.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16 bg-[#FEF9E7]">
        <div className="container mx-auto px-6 lg:px-16">
          <form onSubmit={handleSubmit} className="max-w-3xl">
            {/* Blog Title */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-bold uppercase tracking-wider text-neutral-800 mb-2"
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
                className={`w-full px-4 py-3 bg-white border rounded-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${errors.title ? 'border-red-500' : 'border-neutral-300'
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
                className="block text-sm font-bold uppercase tracking-wider text-neutral-800 mb-2"
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
                className={`w-full px-4 py-3 bg-white border rounded-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${errors.author ? 'border-red-500' : 'border-neutral-300'
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
                  className="block text-sm font-bold uppercase tracking-wider text-neutral-800 mb-2"
                >
                  Blog Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full appearance-none px-4 py-3 bg-white border rounded-sm text-neutral-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${errors.category ? 'border-red-500' : 'border-neutral-300'
                      } ${!formData.category ? 'text-neutral-400' : ''}`}
                  >
                    <option value="">Select category</option>
                    {categories.filter(c => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
                </div>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Type Dropdown */}
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-bold uppercase tracking-wider text-neutral-800 mb-2"
                >
                  Blog Type
                </label>
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full appearance-none px-4 py-3 bg-white border rounded-sm text-neutral-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors ${errors.type ? 'border-red-500' : 'border-neutral-300'
                      } ${!formData.type ? 'text-neutral-400' : ''}`}
                  >
                    <option value="">Select type</option>
                    {blogTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <HiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
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
                className="block text-sm font-bold uppercase tracking-wider text-neutral-800 mb-2"
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
                className={`w-full px-4 py-3 bg-white border rounded-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors resize-y ${errors.content ? 'border-red-500' : 'border-neutral-300'
                  }`}
              />
              {errors.content && (
                <p className="mt-1 text-xs text-red-500">{errors.content}</p>
              )}
              <p className="mt-2 text-xs text-neutral-500">
                {formData.content.length} characters
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 text-white text-sm font-bold uppercase tracking-wider rounded-sm transition-colors"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Blog'}
                <FiArrowUpRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/blog')}
                className="px-6 py-3 border border-neutral-400 text-neutral-700 text-sm font-bold uppercase tracking-wider rounded-sm hover:bg-neutral-100 transition-colors"
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
