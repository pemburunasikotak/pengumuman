import { motion } from 'framer-motion';
import SearchForm from '../components/SearchForm';
import logoPpns from '../assets/logo-ppns.png';

export default function Home() {
  return (
    <div className="full-page-bg">
      <div className="w-full max-w-lg mx-auto py-6 px-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="glass-card-dark overflow-hidden "
        >
          {/* Card Header Section */}
          <div className="px-6 sm:px-10 pt-10 pb-8 text-center border-b border-white/5 bg-slate-900/20">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-6 flex justify-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/5 border border-white/10 p-2.5 backdrop-blur-md shadow-inner shadow-teal-500/10 hover:border-teal-500/30 transition-colors duration-300">
                <img 
                  src={logoPpns} 
                  alt="Logo PPNS" 
                  className="w-full h-full drop-shadow-[0_2px_8px_rgba(45,212,191,0.3)] object-contain" 
                />
              </div>
            </motion.div>

            {/* Sub-label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[0.65rem] text-teal-400 font-extrabold uppercase tracking-[0.25em] mb-3"
            >
              POLITEKNIK NEGERI SURABAYA
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-2xl sm:text-3xl font-black text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              PENGUMUMAN HASIL SELEKSI
            </motion.h1>

            {/* Year Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/25 text-[0.675rem] font-bold tracking-wider text-teal-300 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                TAHUN SELEKSI 2026/2027
              </span>
            </motion.div>
          </div>

          {/* Form Body Section */}
          <div className="px-6 sm:px-10 py-8 sm:py-4">
            <SearchForm />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
