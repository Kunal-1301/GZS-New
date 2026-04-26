import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { usePageTheme } from '@/app/providers/ThemeProvider';

const SUBJECT_OPTIONS = ['General Inquiry', 'Bug Report', 'Partnership', 'Press', 'Support'];

export default function Contact() {
  usePageTheme('contact');

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: SUBJECT_OPTIONS[0],
    message: '',
  });

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Helmet>
        <title>Contact | GzoneSphere</title>
      </Helmet>

      <section className="section-padding">
        <div className="container-global">
          <div className="mb-10 max-w-2xl">
            <h1 className="font-display text-4xl uppercase leading-none text-slate-900 md:text-6xl">Contact</h1>
            <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
              Reach out for support, partnerships, press, or general questions. We will route your message to the right team.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="gzs-card-elevated rounded-3xl p-6 md:p-8">
              {submitted ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <h2 className="text-xl font-bold text-emerald-700">Message sent successfully</h2>
                  <p className="mt-2 text-sm leading-7 text-emerald-700/80">
                    Thanks for reaching out. This is a mock success state, but your message flow is now represented in the UI.
                  </p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-900">Name</label>
                    <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" value={form.name} onChange={(event) => updateField('name', event.target.value)} required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-900">Email</label>
                    <input type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" value={form.email} onChange={(event) => updateField('email', event.target.value)} required />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-900">Subject</label>
                    <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" value={form.subject} onChange={(event) => updateField('subject', event.target.value)}>
                      {SUBJECT_OPTIONS.map((option) => <option key={option}>{option}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-900">Message</label>
                    <textarea className="min-h-40 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3" value={form.message} onChange={(event) => updateField('message', event.target.value)} required />
                  </div>
                  <button type="submit" className="gzs-btn-primary w-full">
                    Submit
                  </button>
                </form>
              )}
            </div>

            <div className="gzs-card-elevated rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900">Contact Info</h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
                <p><span className="font-semibold text-slate-900">Email:</span> hello@gzonesphere.dev</p>
                <p><span className="font-semibold text-slate-900">Discord:</span> <a href="https://discord.gg/gzonesphere" target="_blank" rel="noreferrer" className="text-[var(--theme-primary)]">discord.gg/gzonesphere</a></p>
                <p><span className="font-semibold text-slate-900">Response time:</span> Usually within 2 business days</p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-900">FAQ Links</h3>
                <div className="mt-4 flex flex-col gap-3">
                  <Link to="/about/details" className="text-sm font-semibold text-[var(--theme-primary)]">About the platform</Link>
                  <Link to="/career" className="text-sm font-semibold text-[var(--theme-primary)]">Careers and opportunities</Link>
                  <Link to="/blog" className="text-sm font-semibold text-[var(--theme-primary)]">Latest updates</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
