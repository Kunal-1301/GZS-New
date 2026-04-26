import { motion } from 'framer-motion';
import { FiClock, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function ComingSoon({ title = 'Coming Soon', description = 'This feature is under construction.' }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] p-12 text-center gap-6"
    >
      <div className="w-16 h-16 rounded-2xl bg-[var(--theme-bg-alt)] border-2 border-[var(--theme-border)] flex items-center justify-center">
        <FiClock size={28} className="text-[var(--theme-text-muted)]" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-black uppercase tracking-tighter text-[var(--theme-text)]">{title}</h2>
        <p className="text-[var(--theme-text-muted)] max-w-sm">{description}</p>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-bold text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors"
      >
        <FiArrowLeft size={14} /> Go back
      </button>
    </motion.div>
  );
}
