import { motion } from 'framer-motion';

export default function Loading({ text = 'Memuat data...' }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center py-16 gap-4"
    >
      <div className="spinner w-10 h-10 border-t-teal-400" />
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-200" style={{ fontFamily: 'var(--font-heading)' }}>
          {text}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">
          Mohon tunggu sebentar
        </p>
      </div>
    </motion.div>
  );
}
