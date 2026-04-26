import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiFile, FiGrid, FiImage, FiList, FiVideo } from 'react-icons/fi';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { AdminPageHero, AdminPanel } from '../components/AdminContentShell';

const MEDIA_ITEMS = [
  { id: 1, name: 'valorant-hero.jpg', type: 'image', size: '1.2 MB', date: '2026-04-22', preview: 'https://placehold.co/600x400/1e293b/ffffff?text=Valorant' },
  { id: 2, name: 'spring-cup-teaser.mp4', type: 'video', size: '48 MB', date: '2026-04-21', preview: null },
  { id: 3, name: 'brand-kit.pdf', type: 'file', size: '4.1 MB', date: '2026-04-19', preview: null },
  { id: 4, name: 'bgmi-map.png', type: 'image', size: '2.6 MB', date: '2026-04-18', preview: 'https://placehold.co/600x400/334155/ffffff?text=BGMI' },
];

function iconForType(type) {
  if (type === 'video') {
    return FiVideo;
  }
  if (type === 'file') {
    return FiFile;
  }
  return FiImage;
}

export default function MediaLibrary() {
  usePageTheme('admin');

  const [layout, setLayout] = useState('grid');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(MEDIA_ITEMS[0]?.id ?? null);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return MEDIA_ITEMS.filter((item) => !normalized || item.name.toLowerCase().includes(normalized));
  }, [query]);

  const selected = filtered.find((item) => item.id === selectedId) || filtered[0] || null;

  return (
    <div className="admin-page-shell">
      <Helmet>
        <title>Media Library | GzoneSphere Admin</title>
      </Helmet>

      <AdminPageHero
        kicker="Content"
        title="Media Library"
        description="Browse image, video, and document assets used across games, blogs, and tournament promotion."
      />

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <AdminPanel title="Library Assets" meta="Searchable asset browser">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <input className="admin-input max-w-md" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search media files" />
            <div className="flex gap-2">
              <button type="button" className={`admin-btn ${layout === 'grid' ? '' : 'admin-btn--ghost'}`} onClick={() => setLayout('grid')}>
                <FiGrid size={14} />
                Grid
              </button>
              <button type="button" className={`admin-btn ${layout === 'list' ? '' : 'admin-btn--ghost'}`} onClick={() => setLayout('list')}>
                <FiList size={14} />
                List
              </button>
            </div>
          </div>

          {layout === 'grid' ? (
            <div className="grid gap-4 md:grid-cols-2">
              {filtered.map((item) => {
                const Icon = iconForType(item.type);
                const isSelected = selected?.id === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`rounded-3xl border p-4 text-left transition ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-white'}`}
                    onClick={() => setSelectedId(item.id)}
                  >
                    <div className="mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                      {item.preview ? (
                        <img src={item.preview} alt={item.name} className="h-full w-full object-cover" />
                      ) : (
                        <Icon size={40} className="text-slate-400" />
                      )}
                    </div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.size} | {item.type}</p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Size</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => (
                    <tr key={item.id} onClick={() => setSelectedId(item.id)} className="cursor-pointer">
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item.size}</td>
                      <td>{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </AdminPanel>

        <AdminPanel title="Asset Details" meta="Selected media preview">
          {selected ? (
            <div className="space-y-4">
              <div className="flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                {selected.preview ? (
                  <img src={selected.preview} alt={selected.name} className="h-full w-full object-cover" />
                ) : (
                  (() => {
                    const Icon = iconForType(selected.type);
                    return <Icon size={48} className="text-slate-400" />;
                  })()
                )}
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Filename</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{selected.name}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Metadata</p>
                <p className="mt-2 text-sm text-slate-700">{selected.type} | {selected.size} | Added {selected.date}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-slate-500">Select an asset to inspect its details.</p>
          )}
        </AdminPanel>
      </section>
    </div>
  );
}
