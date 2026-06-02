import toast from 'react-hot-toast';
import React from 'react';

/**
 * Show a premium, custom glassmorphic error toast centered in the viewport.
 * @param {string} message - The error message to display
 * @param {string} [title="PENCARIAN GAGAL"] - Optional title
 */
export const showErrorToast = (message, title = "PENCARIAN GAGAL") => {
  toast.dismiss(); // Dismiss any active toasts to prevent stacking
  
  toast.custom((t) => (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999] pt-50">
      <div
        className={`${
          t.visible ? 'animate-fade-in' : 'animate-fade-out'
        } max-w-md w-full bg-slate-950/95 backdrop-blur-xl border border-red-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl pointer-events-auto flex p-4.5 transition-all duration-300`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(239, 68, 68, 0.15)',
        }}
      >
        <div className="flex-1 w-0">
          <div className="flex items-start gap-3.5">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-red-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12v-.008Z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[0.7rem] font-black text-red-400 uppercase tracking-widest leading-none mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                {title}
              </p>
              <p className="text-xs font-semibold text-slate-200 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-white/5 pl-4 ml-4 items-center">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-[0.675rem] font-bold text-slate-400 hover:text-white transition-colors duration-200 tracking-widest uppercase cursor-pointer bg-transparent border-0 outline-none p-1 focus:outline-none"
          >
            TUTUP
          </button>
        </div>
      </div>
    </div>
  ), {
    duration: 5000,
    position: 'top-center'
  });
};

/**
 * Show a premium, custom glassmorphic success toast centered in the viewport.
 * @param {string} message - The success message to display
 * @param {string} [title="BERHASIL"] - Optional title
 */
export const showSuccessToast = (message, title = "BERHASIL") => {
  toast.dismiss(); // Dismiss any active toasts
  
  toast.custom((t) => (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[9999] p-4">
      <div
        className={`${
          t.visible ? 'animate-fade-in' : 'animate-fade-out'
        } max-w-md w-full bg-slate-950/95 backdrop-blur-xl border border-teal-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.6)] rounded-2xl pointer-events-auto flex p-4.5 transition-all duration-300`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px rgba(20, 184, 166, 0.15)',
        }}
      >
        <div className="flex-1 w-0">
          <div className="flex items-start gap-3.5">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-teal-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-[0.7rem] font-black text-teal-400 uppercase tracking-widest leading-none mb-1.5" style={{ fontFamily: 'var(--font-heading)' }}>
                {title}
              </p>
              <p className="text-xs font-semibold text-slate-200 leading-relaxed">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-white/5 pl-4 ml-4 items-center">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-[0.675rem] font-bold text-slate-400 hover:text-white transition-colors duration-200 tracking-widest uppercase cursor-pointer bg-transparent border-0 outline-none p-1 focus:outline-none"
          >
            TUTUP
          </button>
        </div>
      </div>
    </div>
  ), {
    duration: 3000,
    position: 'top-center'
  });
};
