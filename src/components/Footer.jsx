import { getCurrentYear } from '../utils/helpers';
import logoPpns from '../assets/logo-ppns.png';

export default function Footer() {
  return (
    <footer className="mt-auto">
      {/* Gold ornament */}
      <div className="ornament-line-thin" />

      <div className="bg-[#0c1829] text-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Brand */}
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-3">
                <img src={logoPpns} alt="Logo PPNS" className="w-8 h-8 opacity-60 object-contain" />
                <div>
                  <h3 className="text-white/90 font-bold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                    Konsorsium Politeknik Negeri
                  </h3>
                  <p className="text-[0.6rem] text-white/30 tracking-[0.15em] uppercase">
                    Portal Pengumuman Resmi
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/40 max-w-sm">
                Sistem informasi pengumuman hasil seleksi mandiri resmi. Seluruh data yang ditampilkan
                bersifat resmi, terverifikasi, dan dapat dipertanggungjawabkan.
              </p>
            </div>

            {/* Selections */}
            <div className="md:col-span-3">
              <h3 className="text-white/70 font-semibold text-xs mb-3 uppercase tracking-wider">
                Jenis Seleksi
              </h3>
              <ul className="space-y-2 text-xs text-white/40">
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  SMKPN
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  Pascasarjana
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  Sertifikasi BNSP
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  Sertifikasi Kemnaker
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-white/20" />
                  Tes Online
                </li>
              </ul>
            </div>

            {/* Help */}
            <div className="md:col-span-4">
              <h3 className="text-white/70 font-semibold text-xs mb-3 uppercase tracking-wider">
                Pusat Bantuan
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-start gap-2 text-white/40">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mt-0.5 text-white/25 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                  helpdesk@konsorsium-politeknik.ac.id
                </li>
                <li className="flex items-start gap-2 text-white/40">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mt-0.5 text-white/25 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                  (031) 5947186
                </li>
                <li className="flex items-start gap-2 text-white/40">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mt-0.5 text-white/25 shrink-0">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Senin - Jumat, 08.00 - 16.00 WIB
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[0.65rem] text-white/25 text-center sm:text-left">
              © {getCurrentYear()} Konsorsium Politeknik Negeri. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <div className="flex items-center gap-1 text-[0.6rem] text-white/20">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
              </svg>
              Dokumen digital terverifikasi melalui QR Code
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
