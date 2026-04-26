import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePageTheme } from '@/app/providers/ThemeProvider';
import { MOCK_SKILLS, MOCK_SUB_PROFILES } from '@/shared/data/profileData';

export default function EditSubProfile() {
  usePageTheme('profile');

  const navigate = useNavigate();
  const { type } = useParams();
  const subProfile = MOCK_SUB_PROFILES.find((profile) => profile.type === type) || MOCK_SUB_PROFILES[0];
  const skills = MOCK_SKILLS.filter((skill) => skill.sub_profile_id === subProfile.id);

  const [form, setForm] = useState({
    display_name: '',
    primary_role: '',
    experience_level: 'advanced',
    about: '',
  });

  useEffect(() => {
    setForm({
      display_name: subProfile.display_name || '',
      primary_role: subProfile.primary_role || '',
      experience_level: subProfile.experience_level || 'advanced',
      about: subProfile.about || '',
    });
  }, [subProfile]);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  return (
    <>
      <Helmet>
        <title>Edit {subProfile.display_name} | GzoneSphere</title>
      </Helmet>

      <div className="min-h-screen bg-[var(--theme-bg)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <Link to={`/profile/${type}`} className="text-sm font-medium text-violet-700">
              {'<-'} Back to sub-profile
            </Link>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h1 className="text-3xl font-semibold text-slate-900">Edit {type} sub-profile</h1>
              <p className="mt-2 text-sm text-slate-500">Refresh the identity signals people see when they open this domain profile.</p>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Display name</span>
                  <input
                    value={form.display_name}
                    onChange={(event) => updateField('display_name', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-300"
                  />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700">Primary role</span>
                  <input
                    value={form.primary_role}
                    onChange={(event) => updateField('primary_role', event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-300"
                  />
                </label>
              </div>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-medium text-slate-700">Experience level</span>
                <select
                  value={form.experience_level}
                  onChange={(event) => updateField('experience_level', event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-300"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </label>

              <label className="mt-5 block space-y-2">
                <span className="text-sm font-medium text-slate-700">About</span>
                <textarea
                  value={form.about}
                  onChange={(event) => updateField('about', event.target.value)}
                  rows={6}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-violet-300"
                />
              </label>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Current top skills</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className={`rounded-full px-3 py-1 text-sm ${skill.verified ? 'bg-violet-50 text-violet-700' : 'bg-slate-100 text-slate-600'}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </section>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => navigate(`/profile/${type}`)}
                className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-600"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
