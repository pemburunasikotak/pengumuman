import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoPpns from '../assets/logo-ppns.png';

export default function Countdown({ targetDate, onComplete }) {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - Date.now();
    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { timeLeft, difference };
  };

  const [timeLeftObj, setTimeLeftObj] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const { timeLeft, difference } = calculateTimeLeft();
      setTimeLeftObj({ timeLeft, difference });

      if (difference <= 0) {
        clearInterval(timer);
        if (onComplete) {
          onComplete();
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const { timeLeft, difference } = timeLeftObj;

  // Formatter for padding zero
  const formatNumber = (num) => String(num).padStart(2, '0');

  // Format full local release date (Senin, 15 Juni 2026 pukul 16:10 WIB)
  const formatReleaseDate = () => {
    const date = new Date(targetDate);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateStr = date.toLocaleDateString('id-ID', options);
    const timeStr = date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }).replace('.', ':');
    return `${dateStr} pukul ${timeStr} WIB`;
  };

  const timeUnits = [
    { label: 'HARI', value: timeLeft.days },
    { label: 'JAM', value: timeLeft.hours },
    { label: 'MENIT', value: timeLeft.minutes },
    { label: 'DETIK', value: timeLeft.seconds },
  ];

  return (
    <div className="full-page-bg">
      <div className="w-full max-w-xl mx-auto py-6 px-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
          className="glass-card-dark overflow-hidden rounded-3xl"
        >
          {/* Card Header Section */}
          <div className="px-6 sm:px-10 pt-10 pb-2 text-center bg-transparent">
            {/* Logo with pulsating glow */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-6 flex justify-center animate-pulse"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#FAFAFA] border border-white/10 p-3 shadow-lg shadow-teal-500/10 hover:border-teal-500/30 transition-colors duration-300">
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
              POLITEKNIK PERKAPALAN NEGERI SURABAYA
            </motion.p>

            {/* Main Title & Subtitle */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-white text-center leading-snug tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="block text-lg sm:text-xl md:text-2xl font-extrabold uppercase">
                PENGUMUMAN SERTIFIKAT DAN HASIL NILAI UJIAN
              </span>
              <span className="block text-[0.7rem] sm:text-xs md:text-sm font-medium text-slate-300 uppercase tracking-wider mt-2">
                SELEKSI MANDIRI KONSORSIUM POLITEKNIK NEGERI 
              </span>
            </motion.h1>

            {/* Target Date Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8 p-3.5 rounded-xl bg-teal-500/5 border border-teal-500/20 text-center"
            >
              <p className="text-[0.65rem] sm:text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
                Akan dibuka secara resmi pada:
              </p>
              <p className="text-xs sm:text-sm text-teal-300 font-extrabold">
                {formatReleaseDate()}
              </p>
            </motion.div>
          </div>

          {/* Countdown Clock Section */}
          <div className="px-6 sm:px-10 pb-8 pt-2">
            <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
              <AnimatePresence mode="popLayout">
                {timeUnits.map((unit, index) => (
                  <motion.div
                    key={unit.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35 + index * 0.05 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-full aspect-square sm:h-24 sm:w-24 rounded-2xl bg-[#091526]/75 border border-white/5 shadow-inner flex items-center justify-center relative overflow-hidden group">
                      {/* Decorative internal glow */}
                      <div className="absolute inset-0 bg-radial-gradient from-teal-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Big Digital Text */}
                      <span className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]">
                        {formatNumber(unit.value)}
                      </span>
                    </div>
                    
                    <span className="text-[0.55rem] sm:text-xs text-teal-400 font-extrabold tracking-widest uppercase mt-3">
                      {unit.label}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center text-[0.65rem] sm:text-xs text-slate-400 leading-relaxed font-medium"
            >
              Halaman pengumuman akan otomatis dialihkan ketika waktu hitung mundur selesai. Harap tidak menutup halaman ini.
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
