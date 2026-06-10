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
          className="glass-card-dark overflow-hidden rounded-3xl"
        >
          {/* Card Header Section */}
          <div className="px-6 sm:px-10 pt-10 pb-2 text-center bg-transparent">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-6 flex justify-center"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#091124] border border-white/10 p-3 shadow-md hover:border-teal-500/30 transition-colors duration-300">
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
              className="text-[0.65rem] text-teal-400 font-extrabold uppercase tracking-[0.25em] mb-4"
            >
              POLITEKNIK NEGERI SURABAYA
            </motion.p>

            {/* Main Title & Subtitle */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-white text-center leading-snug tracking-tight mb-2"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="block text-lg sm:text-xl md:text-2xl font-extrabold uppercase">
                PENGUMUMAN SERTIFIKAT DAN HASIL NILAI UJIAN
              </span>
              <span className="block text-[0.7rem] sm:text-xs md:text-sm font-medium text-slate-300 uppercase tracking-wider mt-2">
                SELEKSI MANDIRI KONSORSIUM POLITEKNIK NEGERI
              </span>
            </motion.h1>

            {/* Year Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <span className="inline-flex items-center px-10 py-2.5 rounded-full bg-[#081e24]/75 border border-[#144f5b]/55 text-xs sm:text-sm font-extrabold tracking-widest text-[#2dd4bf] uppercase shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                SK-PPNS 2026
              </span>
            </motion.div>
          </div>

          {/* Form Body Section */}
          <div className="px-6 sm:px-10 py-6 sm:py-6">
            <SearchForm />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
