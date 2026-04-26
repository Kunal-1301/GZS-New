import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { usePageTheme } from '@/app/providers/ThemeProvider';

const DOMAIN_OPTIONS = [
  { id: 'dev', label: 'Game Development', color: 'var(--domain-dev)', description: 'Engineering, systems, gameplay, and technical design.' },
  { id: 'esports', label: 'Esports', color: 'var(--domain-esports)', description: 'Competitive roles, coaching, strategy, and team play.' },
  { id: 'content', label: 'Content', color: 'var(--domain-content)', description: 'Streaming, journalism, education, and creator work.' },
  { id: 'business', label: 'Business', color: 'var(--domain-business)', description: 'Product, publishing, partnerships, and operations.' },
  { id: 'art', label: 'Art', color: 'var(--domain-art)', description: 'Concept art, animation, VFX, and visual craft.' },
  { id: 'writing', label: 'Writing', color: 'var(--domain-writing)', description: 'Narrative, worldbuilding, and editorial storytelling.' },
  { id: 'audio', label: 'Audio', color: 'var(--domain-audio)', description: 'Music, sound design, mixing, and implementation.' },
];

export default function CreateSubProfile() {
  usePageTheme('profile');

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialDomain = searchParams.get('domain');
  const [selected, setSelected] = useState(initialDomain || '');

  const activeDomain = useMemo(
    () => DOMAIN_OPTIONS.find((option) => option.id === selected),
    [selected],
  );

  return (
    <>
      <Helmet>
        <title>Create Sub-Profile | GzoneSphere</title>
      </Helmet>

      <div className="min-h-screen bg-[var(--theme-bg)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link to="/profile" className="text-sm font-medium text-violet-700">
              {'<-'} Back to profile
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h1 className="text-3xl font-semibold text-slate-900">Create a new sub-profile</h1>
            <p className="mt-2 text-sm text-slate-500">
              Pick the domain identity you want to build next. You can refine the details in the edit step.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {DOMAIN_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelected(option.id)}
                  className={`rounded-3xl border p-5 text-left transition ${
                    selected === option.id ? 'border-violet-300 bg-violet-50' : 'border-slate-200 bg-white hover:border-violet-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                      style={{ backgroundColor: `${option.color}18`, color: option.color }}
                    >
                      {option.label}
                    </span>
                    <span className={`h-4 w-4 rounded-full border ${selected === option.id ? 'border-violet-500 bg-violet-500' : 'border-slate-300'}`} />
                  </div>
                  <p className="mt-4 text-sm text-slate-600">{option.description}</p>
                </button>
              ))}
            </div>

            {activeDomain ? (
              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                You are setting up a <span className="font-semibold text-slate-900">{activeDomain.label}</span> profile.
              </div>
            ) : null}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => selected && navigate(`/profile/${selected}/edit`)}
                disabled={!selected}
                className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-600 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
