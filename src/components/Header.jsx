import { motion } from 'framer-motion';
import logoPpns from '../assets/logo-ppns.png';

export default function Header() {
  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      {/* Gold ornament line */}
      <div className="ornament-line" />

      <div className="glass-header">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Title */}
            <a href="/" className="flex items-center gap-3 no-underline">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 p-1.5 flex items-center justify-center">
                <img src={logoPpns} alt="Logo PPNS" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-[0.8rem] sm:text-sm font-bold text-white leading-tight tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
                  KONSORSIUM POLITEKNIK NEGERI
                </h1>
                <p className="text-[0.6rem] sm:text-[0.65rem] text-white/50 font-medium tracking-[0.15em] uppercase">
                  Portal Pengumuman Resmi
                </p>
              </div>
            </a>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-green-500/10 border border-green-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>
                <span className="text-[0.65rem] text-green-400 font-semibold tracking-wide uppercase">
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
