import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center p-8">
      <h1 className="text-8xl font-black text-[var(--theme-text)] tracking-tighter">404</h1>
      <p className="text-xl text-[var(--theme-text-muted)]">Page not found.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-[var(--theme-accent)] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}
