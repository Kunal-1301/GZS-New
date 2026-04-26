import React from 'react';

export function AdminPageHero({ kicker, title, description, actions }) {
  return (
    <section className="admin-page-hero">
      <div className="admin-page-hero__copy">
        <span className="admin-page-kicker">{kicker}</span>
        <h1 className="admin-page-heading">{title}</h1>
        {description ? <p className="admin-page-description">{description}</p> : null}
      </div>
      {actions ? <div className="admin-page-actions">{actions}</div> : null}
    </section>
  );
}

export function AdminPanel({ title, meta, children, padded = true }) {
  return (
    <section className={`admin-panel ${padded ? 'admin-panel--padded' : ''}`}>
      {(title || meta) && (
        <header className="admin-panel__header">
          <div>
            {title ? <h2 className="admin-panel__title">{title}</h2> : null}
            {meta ? <p className="admin-panel__meta">{meta}</p> : null}
          </div>
        </header>
      )}
      {children}
    </section>
  );
}

export function AdminMetrics({ items }) {
  return (
    <div className="admin-metric-grid">
      {items.map((item) => (
        <div key={item.label} className="admin-metric-card">
          <span className="admin-metric-card__label">{item.label}</span>
          <strong className="admin-metric-card__value">{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export function AdminStatusBadge({ children, tone = 'success' }) {
  return <span className={`admin-status-badge is-${tone}`}>{children}</span>;
}

export function AdminEmptyState({ title, description }) {
  return (
    <div className="admin-empty-state">
      <strong>{title}</strong>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

