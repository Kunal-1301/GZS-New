import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowLeft, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useToast } from '@/shared/components/Toast';
import { mockApiService } from '@services/mockApiService';
import { AdminPageHero, AdminPanel, AdminMetrics, AdminEmptyState } from './AdminContentShell';
import { ensureArray, normalizeStatus, safeString, slugify, toIsoDate } from './adminFormUtils';

const CATEGORY_OPTIONS = ['Games', 'Esports', 'News', 'Articles', 'Health', 'Products', 'Trending'];
const TYPE_OPTIONS = {
  Games: ['Review', 'Guide', 'Walkthrough', 'Tier List', 'News'],
  Esports: ['Match Recap', 'Player Profile', 'Team Analysis', 'Opinion'],
  News: ['Announcement', 'Release', 'Patch Notes'],
  Articles: ['Opinion', 'Essay', 'Feature'],
  Health: ['Guide', 'Advice', 'Research'],
  Products: ['Review', 'Setup Guide', 'Deals'],
  Trending: ['Roundup', 'Feature', 'Analysis'],
};
const STATUS_OPTIONS = ['Draft', 'Published', 'Archived'];

const defaultForm = {
  category: 'Games',
  type: 'Review',
  title: '',
  slug: '',
  heroImage: '',
  thumbnailImage: '',
  author: 'Gzone Admin',
  gameTag: '',
  metaDescription: '',
  content: '',
  featuredBlogs: [],
  relatedBlogs: [],
  status: 'Draft',
  publishDate: '',
  heroSelection: '',
  globalFeaturedBlogs: [],
  mostReadOverride: '',
  categoryDisplayOrder: [...CATEGORY_OPTIONS],
  gameGallery: [],
};

function hydrateBlog(blog) {
  if (!blog) return defaultForm;
  const category = safeString(blog.category || defaultForm.category);
  const availableTypes = TYPE_OPTIONS[category] || TYPE_OPTIONS.Games;
  return {
    ...defaultForm,
    ...blog,
    category,
    type: safeString(blog.type || availableTypes[0]),
    title: safeString(blog.title),
    slug: safeString(blog.slug),
    heroImage: safeString(blog.heroImage || blog.featured_image_url),
    thumbnailImage: safeString(blog.thumbnailImage || blog.featured_image_url),
    author: safeString(blog.author || defaultForm.author),
    gameTag: safeString(blog.gameTag),
    metaDescription: safeString(blog.metaDescription || blog.description),
    content: safeString(blog.content || blog.body),
    featuredBlogs: ensureArray(blog.featuredBlogs),
    relatedBlogs: ensureArray(blog.relatedBlogs),
    status: normalizeStatus(blog.status),
    publishDate: safeString(blog.publishDate || blog.updated),
    heroSelection: safeString(blog.heroSelection),
    globalFeaturedBlogs: ensureArray(blog.globalFeaturedBlogs),
    mostReadOverride: safeString(blog.mostReadOverride),
    categoryDisplayOrder: ensureArray(blog.categoryDisplayOrder).length ? ensureArray(blog.categoryDisplayOrder) : [...CATEGORY_OPTIONS],
    gameGallery: ensureArray(blog.gameGallery),
  };
}

function Input({ label, value, onChange, hint, maxLength, placeholder, type = 'text' }) {
  return (
    <label>
      <span>{label}</span>
      <input type={type} value={value} onChange={onChange} maxLength={maxLength} placeholder={placeholder} />
      {hint ? <small className="admin-field-hint">{hint}</small> : null}
    </label>
  );
}

function Area({ label, value, onChange, hint, rows = 5, placeholder }) {
  return (
    <label>
      <span>{label}</span>
      <textarea value={value} onChange={onChange} rows={rows} placeholder={placeholder} />
      {hint ? <small className="admin-field-hint">{hint}</small> : null}
    </label>
  );
}

export default function BlogEditorForm({ mode = 'create' }) {
  const navigate = useNavigate();
  const params = useParams();
  const { showToast } = useToast();
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(mode === 'edit');
  const [saving, setSaving] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      const [allBlogs, allGames] = await Promise.all([
        mockApiService.getAllBlogs(),
        mockApiService.getAllGames(),
      ]);
      if (!mounted) return;
      setBlogs(allBlogs);
      setGames(allGames);
      if (mode === 'edit') {
        const current = allBlogs.find((item) => String(item.id) === String(params.id));
        if (!current) {
          showToast('Blog post not found.', 'error');
          navigate('/admin/blogs');
          return;
        }
        setForm(hydrateBlog(current));
      }
      setLoading(false);
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, [mode, navigate, params.id, showToast]);

  const availableTypes = TYPE_OPTIONS[form.category] || TYPE_OPTIONS.Games;
  const wordCount = useMemo(() => safeString(form.content).trim().split(/\s+/).filter(Boolean).length, [form.content]);
  const metrics = [
    { label: 'Status', value: form.status },
    { label: 'Word Count', value: `${wordCount}` },
    { label: 'Featured Links', value: `${form.featuredBlogs.length}` },
    { label: 'Gallery Games', value: `${form.gameGallery.length}` },
  ];

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateTitle(value) {
    setForm((prev) => ({ ...prev, title: value, slug: slugify(value) }));
  }

  function toggleSelection(key, value, limit = 99) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((item) => item !== value)
        : [...prev[key], value].slice(0, limit),
    }));
  }

  async function saveBlog(nextStatus) {
    if (!form.title.trim()) {
      showToast('Blog title is required.', 'error');
      return;
    }

    setSaving(true);
    const payload = {
      ...form,
      title: form.title.trim(),
      slug: form.slug || slugify(form.title),
      category: form.category,
      type: form.type,
      status: nextStatus,
      featured_image_url: form.thumbnailImage || form.heroImage,
      body: form.content,
      description: form.metaDescription,
      updated: toIsoDate(new Date()),
      published_at: nextStatus === 'Published' ? (form.publishDate || toIsoDate(new Date())) : form.publishDate,
      likes: form.likes || 0,
      view_count: form.view_count || 0,
    };

    try {
      if (mode === 'edit') {
        await mockApiService.updateBlog(Number(params.id) || params.id, payload);
        showToast(nextStatus === 'Published' ? 'Blog updated and published.' : 'Blog draft updated.', 'success');
      } else {
        await mockApiService.addBlog(payload);
        showToast(nextStatus === 'Published' ? 'Blog published.' : 'Blog draft saved.', 'success');
      }
      navigate('/admin/blogs');
    } catch {
      showToast('Unable to save the blog post.', 'error');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="admin-empty-state">Loading blog editor...</div>;
  }

  return (
    <div className="admin-page-shell admin-table-page">
      <Helmet>
        <title>{mode === 'edit' ? `Edit ${form.title}` : 'Create Blog'} | GzoneSphere Admin</title>
      </Helmet>

      <AdminPageHero
        kicker="Admin / Blogs"
        title={mode === 'edit' ? 'Edit Blog Post' : 'Create Blog Post'}
        description="Single-page blog editor aligned to the platform spec, including editorial settings, featured content controls, and cross-links back to games."
        actions={(
          <>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => navigate('/admin/blogs')}>
              <FiArrowLeft />
              Back to blogs
            </button>
            <button type="button" className="admin-btn admin-btn--ghost" onClick={() => saveBlog('Draft')} disabled={saving}>
              Save draft
            </button>
            <button type="button" className="admin-btn" onClick={() => saveBlog('Published')} disabled={saving}>
              {mode === 'edit' ? 'Update & publish' : 'Publish blog'}
            </button>
          </>
        )}
      />

      <AdminMetrics items={metrics} />

      <div className="admin-sticky-bar">
        <div className="admin-sticky-bar__meta">
          <strong>{form.title || 'Untitled blog post'}</strong>
          <span>{form.status}</span>
          <span>{wordCount} words</span>
        </div>
        <div className="admin-sticky-bar__actions">
          <button type="button" className="admin-btn admin-btn--ghost" onClick={() => saveBlog('Draft')} disabled={saving}>Save</button>
          <button type="button" className="admin-btn" onClick={() => saveBlog('Published')} disabled={saving}>Publish</button>
        </div>
      </div>

      <AdminPanel title="Blog Create / Edit Form" meta="All fields live on one scrollable page, matching the single-page editor spec.">
        <div className="admin-form-grid cols-2">
          <label>
            <span>Blog Category</span>
            <select value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value, type: (TYPE_OPTIONS[event.target.value] || [prev.type])[0] }))}>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Blog Type</span>
            <select value={form.type} onChange={(event) => updateField('type', event.target.value)}>
              {availableTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
          <Input label="Title" value={form.title} onChange={(event) => updateTitle(event.target.value)} maxLength={80} hint={`${form.title.length}/80 characters`} />
          <Input label="Slug" value={form.slug} onChange={(event) => updateField('slug', slugify(event.target.value))} />
          <Input label="Hero Image" value={form.heroImage} onChange={(event) => updateField('heroImage', event.target.value)} />
          <Input label="Thumbnail Image" value={form.thumbnailImage} onChange={(event) => updateField('thumbnailImage', event.target.value)} />
          <Input label="Author" value={form.author} onChange={(event) => updateField('author', event.target.value)} />
          <label>
            <span>Game Tag</span>
            <select value={form.gameTag} onChange={(event) => updateField('gameTag', event.target.value)}>
              <option value="">No game tag</option>
              {games.map((game) => (
                <option key={game.id} value={game.slug || game.title}>{game.title}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Status</span>
            <select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
              {STATUS_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
          </label>
          <Input label="Publish Date" type="date" value={form.publishDate} onChange={(event) => updateField('publishDate', event.target.value)} />
        </div>
        <Area label="Meta Description" value={form.metaDescription} onChange={(event) => updateField('metaDescription', event.target.value)} hint={`${form.metaDescription.length}/160 characters`} placeholder="Short SEO description for the article." />
        <Area label="Content Body" value={form.content} onChange={(event) => updateField('content', event.target.value)} rows={16} hint="Rich text placeholder for Phase 1. Supports headings, embeds, lists, quotes, and code blocks." />
      </AdminPanel>

      <AdminPanel title="Editorial Linking" meta="Choose sidebar and related content references for the article view.">
        <div className="admin-form-card">
          <div className="admin-form-card__header">
            <div>
              <h3 className="admin-form-card__title">Featured Blogs Sidebar</h3>
              <p className="admin-form-card__description">Select up to 3 posts.</p>
            </div>
          </div>
          <div className="admin-chip-group">
            {blogs
              .filter((blog) => String(blog.id) !== String(params.id))
              .map((blog) => (
                <button
                  key={`featured-${blog.id}`}
                  type="button"
                  className={`admin-chip ${form.featuredBlogs.includes(blog.id) ? 'is-active' : ''}`}
                  onClick={() => toggleSelection('featuredBlogs', blog.id, 3)}
                >
                  {blog.title}
                </button>
              ))}
          </div>
        </div>
        <div className="admin-form-card">
          <div className="admin-form-card__header">
            <div>
              <h3 className="admin-form-card__title">Related Blogs</h3>
              <p className="admin-form-card__description">Override automatic related content with up to 3 links.</p>
            </div>
          </div>
          <div className="admin-chip-group">
            {blogs
              .filter((blog) => String(blog.id) !== String(params.id))
              .map((blog) => (
                <button
                  key={`related-${blog.id}`}
                  type="button"
                  className={`admin-chip ${form.relatedBlogs.includes(blog.id) ? 'is-active' : ''}`}
                  onClick={() => toggleSelection('relatedBlogs', blog.id, 3)}
                >
                  {blog.title}
                </button>
              ))}
          </div>
        </div>
      </AdminPanel>

      <AdminPanel title="Featured Content Management" meta="Global blog settings requested in the admin spec.">
        <div className="admin-form-grid cols-2">
          <label>
            <span>Hero Blog Selection</span>
            <select value={form.heroSelection} onChange={(event) => updateField('heroSelection', event.target.value)}>
              <option value="">No override</option>
              {blogs.map((blog) => (
                <option key={`hero-${blog.id}`} value={blog.id}>{blog.title}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Most Read Override</span>
            <select value={form.mostReadOverride} onChange={(event) => updateField('mostReadOverride', event.target.value)}>
              <option value="">Automatic</option>
              {blogs.map((blog) => (
                <option key={`most-read-${blog.id}`} value={blog.id}>{blog.title}</option>
              ))}
            </select>
          </label>
        </div>
        <div className="admin-form-card">
          <div className="admin-form-card__header">
            <div>
              <h3 className="admin-form-card__title">Global Featured Sidebar</h3>
              <p className="admin-form-card__description">Default featured posts shown when an article has no manual selection.</p>
            </div>
          </div>
          <div className="admin-chip-group">
            {blogs.map((blog) => (
              <button
                key={`global-featured-${blog.id}`}
                type="button"
                className={`admin-chip ${form.globalFeaturedBlogs.includes(blog.id) ? 'is-active' : ''}`}
                onClick={() => toggleSelection('globalFeaturedBlogs', blog.id, 3)}
              >
                {blog.title}
              </button>
            ))}
          </div>
        </div>
        <div className="admin-form-card">
          <div className="admin-form-card__header">
            <div>
              <h3 className="admin-form-card__title">Category Display Order</h3>
              <p className="admin-form-card__description">Tap to toggle categories into the preferred display sequence.</p>
            </div>
          </div>
          <div className="admin-chip-group">
            {CATEGORY_OPTIONS.map((category) => (
              <button
                key={`category-order-${category}`}
                type="button"
                className={`admin-chip ${form.categoryDisplayOrder.includes(category) ? 'is-active' : ''}`}
                onClick={() => toggleSelection('categoryDisplayOrder', category, CATEGORY_OPTIONS.length)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="admin-form-card">
          <div className="admin-form-card__header">
            <div>
              <h3 className="admin-form-card__title">Game Gallery in Blogs</h3>
              <p className="admin-form-card__description">Select games to show in the gallery strip at the bottom of the blog hub.</p>
            </div>
          </div>
          <div className="admin-chip-group">
            {games.map((game) => (
              <button
                key={`gallery-${game.id}`}
                type="button"
                className={`admin-chip ${form.gameGallery.includes(game.slug || game.title) ? 'is-active' : ''}`}
                onClick={() => toggleSelection('gameGallery', game.slug || game.title, 8)}
              >
                {game.title}
              </button>
            ))}
          </div>
        </div>
      </AdminPanel>

      <div className="admin-form-footer">
        <button type="button" className="admin-btn admin-btn--ghost" onClick={() => saveBlog('Draft')} disabled={saving}>Save as draft</button>
        <button type="button" className="admin-btn" onClick={() => saveBlog('Published')} disabled={saving}>Publish blog</button>
      </div>

      {!blogs.length ? <AdminEmptyState title="No blog records yet" description="Once posts exist, featured and related selectors will fill in automatically." /> : null}
    </div>
  );
}
