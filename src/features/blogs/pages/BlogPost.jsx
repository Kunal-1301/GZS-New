import { Link, useParams } from 'react-router-dom';
import {
  FiArrowUpRight,
  FiBookmark,
  FiHeart,
  FiLink,
  FiMessageSquare,
  FiShare2,
  FiTwitter,
} from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';

import { usePageTheme } from '@/app/providers/ThemeProvider';
import BlogCard from '../components/BlogCard';
import { images } from '@/shared/data/images';
import { useBlog, useBlogs } from '@/services/mutators/useBlogs';
import { adaptBlogRecord } from '@/shared/adapters/contentAdapters';

const HERO_BG = 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=1920';

export default function BlogPost() {
  const { slug } = useParams();
  usePageTheme('blog');

  const placeholderWhite = 'https://picsum.photos/200/120?random=sidebar';
  const { data: rawPost, isLoading: postLoading } = useBlog(slug);
  const { data: allBlogs = [], isLoading: blogsLoading } = useBlogs({ limit: 12 });

  const post = adaptBlogRecord(rawPost);
  const blogItems = allBlogs.map(adaptBlogRecord);
  const loading = postLoading || blogsLoading;

  if (loading) {
    return (
      <div className="bl-loading-state">
        <div className="bl-loading-state__spinner" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bl-empty-state">
        <div className="bl-empty-state__card">
          <h1 className="bl-empty-state__title">Post Not Found</h1>
          <Link to="/blog" className="bl-btn-primary">Back to Editorial Hub</Link>
        </div>
      </div>
    );
  }

  const related = blogItems
    .filter((blog) => blog.category === post.category && blog.slug !== slug)
    .slice(0, 3);

  const featuredBase = blogItems.filter((blog) => blog.featured);
  const featured = (featuredBase.length > 0 ? featuredBase : blogItems).slice(0, 3);

  const wordCount = (post.description || '').split(/\s+/).filter(Boolean).length || 500;
  const readTime = Math.ceil(wordCount / 200);
  const authorName = post.author?.name || post.author_name || 'GzoneSphere Staff';
  const authorPosts = blogItems.filter(
    (blog) => (blog.author?.name || blog.author_name) === authorName && blog.slug !== slug,
  );

  return (
    <div className="bl-post-page">
      <Helmet>
        <title>{post.title} | GzoneSphere Editorial</title>
        <meta name="description" content={post.description} />
      </Helmet>

      <section className="bl-post-hero">
        <div className="page-container">
          <div className="bl-post-hero__layout">
            <div className="bl-post-hero__content">
              <p className="bl-post-hero__eyebrow">{post.category || 'Editorial'}</p>
              <h1 className="bl-post-hero__title">{post.title}</h1>
              <p className="bl-post-hero__summary">
                {post.description || 'Insights, reviews, and editorial analysis from the GzoneSphere content network.'}
              </p>

              <div className="bl-post-hero__meta">
                <div className="bl-post-hero__author">
                  <img
                    src={post.author?.avatar || 'https://i.pravatar.cc/150?u=gs_gen'}
                    className="bl-post-hero__author-avatar"
                    alt={authorName}
                  />
                  <span>{authorName}</span>
                </div>
                <span>{post.date || 'April 13, 2026'}</span>
                <span>{readTime} min read</span>
              </div>
            </div>

            <div className="bl-post-hero__media">
              <img src={post.image || HERO_BG} className="bl-post-hero__image" alt={post.title} />
            </div>
          </div>
        </div>
      </section>

      <div className="page-container bl-post-shell">
        <div className="bl-post-layout">
          <article className="bl-post-main">
            <div className="bl-post-quote">
              "{post.description}"
            </div>

            <div
              className="bl-post-body"
              dangerouslySetInnerHTML={{ __html: post.content || `
                <p>In the rapidly evolving landscape of 2026, terminal-based community hubs like GzoneSphere represent the next logical step in digital identity consolidation. By bridging the gap between raw metric data and community-driven verification, we are building a more transparent gaming future.</p>
                <h3>Technical Integration</h3>
                <p>The core of our strategy relies on high-fidelity proof-of-work modules. Whether it's a verified kill-streak in a tournament or a concept art portfolio submitted through the art domain, every action compounds into a unified identity shard.</p>
                <p>This decentralized approach to reputation management ensures that skill is recognized across all seven core domains, from development to competitive esports.</p>
              ` }}
            />

            <div className="bl-post-engagement">
              <button className="bl-post-engagement__button">
                <FiHeart size={18} /> {post.likes || 0} Likes
              </button>
              <button className="bl-post-engagement__button">
                <FiShare2 size={18} /> Share Story
              </button>
              <button className="bl-post-engagement__button">
                <FiBookmark size={18} /> Save to Reading List
              </button>
            </div>

            <div className="bl-author-card">
              <img
                src={post.author?.avatar || 'https://i.pravatar.cc/150?u=gs_auth'}
                className="bl-author-card__avatar"
                alt={authorName}
              />

              <div className="bl-author-card__content">
                <div className="bl-author-card__copy">
                  <h3 className="bl-author-card__name">{authorName}</h3>
                  <p className="bl-author-card__bio">
                    {post.author?.bio || 'Strategic intelligence lead specializing in community meta-analysis and decentralized reputation systems within the Sphere.'}
                  </p>
                </div>

                <div className="bl-author-card__tags">
                  {['EDITORIAL_OPS', 'STRATEGY_NODE', 'COMMUNITY_COORD'].map((skill) => (
                    <span key={skill} className="bl-author-card__tag">{skill}</span>
                  ))}
                </div>

                <div className="bl-author-card__actions">
                  <button className="bl-btn-primary">Follow Author</button>
                  <Link
                    to={`/u/${authorName.toLowerCase().replace(/\s+/g, '-')}`}
                    className="bl-author-card__link"
                  >
                    View Sub Profile <FiArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            <section className="bl-comments">
              <div className="bl-comments__header">
                <h3 className="bl-comments__title">
                  <FiMessageSquare className="text-[var(--theme-primary)]" />
                  Comments
                  <span>(12 entries)</span>
                </h3>

                <div className="bl-comments__sort">
                  <span>Sort:</span>
                  <button className="is-active">Most Liked</button>
                  <button>Most Recent</button>
                </div>
              </div>

              <div className="bl-comments__list">
                {[1, 2].map((item) => (
                  <div key={item} className="bl-comment-card">
                    <div className="bl-comment-card__top">
                      <div className="bl-comment-card__author">
                        <div className="bl-comment-card__avatar">U_{item}</div>
                        <div>
                          <p className="bl-comment-card__name">Operator_0{item}_Node</p>
                          <span className="bl-comment-card__badge">Core Contributor</span>
                        </div>
                      </div>
                      <span className="bl-comment-card__time">{item}h ago</span>
                    </div>

                    <p className="bl-comment-card__text">
                      Critical assessment validated. The implementation of identity shards across multiple domains is the breakthrough the community has been waiting for.
                    </p>

                    <div className="bl-comment-card__actions">
                      <button>
                        <FiHeart size={14} /> 24 likes
                      </button>
                      <button>Reply</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bl-comments__locked">
                <p>Sign in to join the conversation and reply to this article.</p>
                <Link to="/login" className="bl-btn-outline">Sign In</Link>
              </div>
            </section>
          </article>

          <aside className="bl-post-sidebar">
            <div className="bl-post-sidebar__stack">
              <div className="bl-side-card">
                <h4 className="bl-side-card__title">Share Story</h4>
                <div className="bl-side-card__actions">
                  <button className="bl-side-card__social bl-side-card__social--twitter">
                    <FiTwitter size={18} /> Share to Twitter
                  </button>
                  <button className="bl-side-card__social">
                    <FiLink size={18} /> Copy Link
                  </button>
                </div>
              </div>

              {post.game_slug && (
                <Link to={`/games/${post.game_slug}`} className="bl-side-card bl-side-card--link">
                  <p className="bl-side-card__title">Tagged Game</p>
                  <div className="bl-game-tag">
                    <div className="bl-game-tag__thumb">
                      <img src={images.valorant} alt="game" />
                    </div>
                    <div className="bl-game-tag__copy">
                      <h5>{post.game_slug.replace('-', ' ')}</h5>
                      <span>View full game profile</span>
                    </div>
                  </div>
                </Link>
              )}

              <div className="bl-side-card">
                <h4 className="bl-side-card__title">Featured Blogs</h4>
                <div className="bl-side-list">
                  {featured.map((item) => (
                    <Link key={item.id} to={`/blog/${item.slug || item.id}`} className="bl-side-list__item">
                      <div className="bl-side-list__thumb">
                        <img src={item.image || placeholderWhite} alt={item.title} />
                      </div>
                      <div className="bl-side-list__copy">
                        <p>{item.title}</p>
                        <span>{item.category || 'Guide'}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bl-side-card">
                <h4 className="bl-side-card__title">Related Blogs</h4>
                <div className="bl-side-list">
                  {related.slice(0, 3).map((item) => (
                    <Link key={item.id} to={`/blog/${item.slug || item.id}`} className="bl-side-list__item">
                      <div className="bl-side-list__thumb bl-side-list__thumb--sm">
                        <img src={item.image || placeholderWhite} alt={item.title} />
                      </div>
                      <div className="bl-side-list__copy">
                        <p>{item.title}</p>
                        <span>{item.likes || 0} likes</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {authorPosts.length > 0 && (
                <div className="bl-side-card">
                  <h4 className="bl-side-card__title">More from {authorName}</h4>
                  <div className="bl-author-posts">
                    {authorPosts.slice(0, 3).map((item) => (
                      <Link key={item.id} to={`/blog/${item.slug || item.id}`} className="bl-author-posts__link">
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>

      <div className="bl-post-footer">
        <section className="page-container bl-post-footer__related">
          <div className="bl-section-heading">
            <p className="bl-section-heading__eyebrow">Related Reading</p>
            <h2 className="bl-section-heading__title">More from the editorial network</h2>
            <p className="bl-section-heading__description">
              Continue exploring guides, analysis, and opinion pieces connected to this topic.
            </p>
          </div>

          <div className="bl-post-footer__grid">
            {related.length > 0 ? related.map((item) => (
              <BlogCard key={item.id} blog={item} />
            )) : blogItems.slice(0, 3).map((item) => (
              <BlogCard key={item.id} blog={item} />
            ))}
          </div>
        </section>

        <section className="bl-post-cta">
          <div className="page-container bl-post-cta__inner">
            <h2 className="bl-post-cta__title">Have something worth sharing?</h2>
            <p className="bl-post-cta__text">
              Write guides, reviews, or analysis for the GzoneSphere community and build your reputation within the Sphere.
            </p>
            <Link to="/write-blog" className="bl-btn-primary">
              Write a Blog <FiArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
