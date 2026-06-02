import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { showErrorToast, showSuccessToast } from '../utils/customToast';
import html2pdf from 'html2pdf.js';
import QRVerification from './QRVerification';
import CertificatePDF from './CertificatePDF';
import logoPpns from '../assets/logo-ppns.png';

export default function ResultCard({ participant }) {
  const navigate = useNavigate();
  const isLulus = participant.status === 'LULUS';
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef(null);

  const handleDownloadPDF = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    
    const toastId = toast.loading('Sedang menyiapkan dokumen PDF...');

    try {
      const element = certificateRef.current;
      const opt = {
        margin:       0,
        filename:     `Sertifikat_Hasil_${participant.nomorPeserta}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true, 
          logging: false, 
          allowTaint: true,
          backgroundColor: '#ffffff'
        },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      await html2pdf().set(opt).from(element).save();
      toast.dismiss(toastId);
      showSuccessToast('Sertifikat hasil ujian berhasil diunduh.', 'UNDUH SUKSES');
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      showErrorToast('Gagal mengunduh sertifikat. Silakan coba lagi.', 'UNDUH GAGAL');
    } finally {
      setIsDownloading(false);
    }
  };

  // Format date to DD-MM-YYYY
  const formatTanggalLahirIndo = (dateStr) => {
    if (!dateStr) return '-';
    const [year, month, day] = dateStr.split('-');
    return `${day} - ${month} - ${year}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* ── PRIMARY CARD: SNPMB ANNOUNCEMENT UI ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 ${
          isLulus ? 'bg-[#61a3b4]' : 'bg-[#a94442]'
        }`}
      >
        {/* Banner Header Area */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10">
          {/* Logo Tut Wuri / SNPMB */}
          <div className="flex items-center gap-3 bg-white/95 px-5 py-2.5 rounded-xl shadow-md max-w-[320px]">
            <img src={logoPpns} alt="Logo PPNS" className="w-10 h-10 object-contain" />
            <div className="text-left leading-none">
              <div className="text-xl font-black text-[#1e3a8a] tracking-tight">SNPMB</div>
              <div className="text-[0.5rem] text-[#64748b] font-bold uppercase tracking-wider mt-1">
                SELEKSI NASIONAL PENERIMAAN MAHASISWA BARU
              </div>
            </div>
          </div>

          {/* Banner Title */}
          <div className="text-center sm:text-right">
            <h1 className="text-white font-black text-sm sm:text-base md:text-lg tracking-wider uppercase drop-shadow">
              PENGUMUMAN HASIL SELEKSI SNBT SNPMB 2026
            </h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-10">
          {isLulus ? (
            /* ── LULUS VIEW (BLUE) ── */
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 sm:gap-12 items-start">
              {/* Left Column: QR Code Box */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-5 rounded-2xl shadow-xl flex items-center justify-center w-full max-w-[280px] aspect-square border border-black/5 hover:scale-[1.02] transition-transform duration-300">
                  <QRVerification verificationId={participant.id} size={220} />
                </div>
              </div>

              {/* Right Column: Participant Details & Congrats */}
              <div className="text-white space-y-6 text-left">
                {/* Table Details */}
                <div className="grid grid-cols-[120px_15px_1fr] gap-y-2.5 text-xs sm:text-sm font-medium tracking-wide">
                  <div>Nomor peserta</div>
                  <div>:</div>
                  <div className="font-bold">{participant.nomorPeserta}</div>

                  <div>Nama</div>
                  <div>:</div>
                  <div className="font-bold uppercase">{participant.nama}</div>

                  <div>Tanggal lahir</div>
                  <div>:</div>
                  <div className="font-bold">{formatTanggalLahirIndo(participant.tanggalLahir)}</div>
                </div>

                {/* Congratulatory Text */}
                <div className="py-2">
                  <p className="text-sm sm:text-base font-bold leading-relaxed">
                    Selamat! Anda dinyatakan lulus seleksi SNBT SNPMB 2026 di
                  </p>
                </div>

                {/* College & Program Study */}
                <div className="grid grid-cols-[120px_15px_1fr] gap-y-2.5 text-xs sm:text-sm font-medium tracking-wide">
                  <div>PTN</div>
                  <div>:</div>
                  <div className="font-extrabold uppercase text-yellow-300">
                    {participant.perguruanTinggi || 'POLITEKNIK NEGERI SURABAYA'}
                  </div>

                  <div>Program Studi</div>
                  <div>:</div>
                  <div className="font-extrabold uppercase text-yellow-300">
                    {participant.programStudi}
                  </div>
                </div>

                {/* Instructions / Info Links */}
                <div className="pt-4 border-t border-white/20 space-y-2 text-[0.725rem] sm:text-xs text-white/90">
                  <p className="leading-relaxed">
                    Persyaratan pendaftaran ulang calon mahasiswa baru dapat dilihat di{' '}
                    <a
                      href="#daftar-ulang"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById('rincian-nilai');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="underline font-bold text-yellow-200 hover:text-white transition-colors"
                    >
                      sini
                    </a>.
                  </p>
                  <p className="leading-relaxed">
                    Anda dapat mencetak kembali Kartu Tanda Peserta UTBK-SNBT 2026 di{' '}
                    <a
                      href="#cetak-kartu"
                      onClick={(e) => {
                        e.preventDefault();
                        window.print();
                      }}
                      className="underline font-bold text-yellow-200 hover:text-white transition-colors"
                    >
                      sini
                    </a>.
                  </p>
                </div>

                {/* Action button inside card */}
                <div className="pt-2">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="w-full sm:w-auto bg-[#317185] hover:bg-[#255869] disabled:bg-slate-500 text-white font-bold py-2.5 px-6 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 shadow-md border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                        <span>MENGUNDUH...</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <span>UNDUH SERTIFIKAT HASIL (PDF)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ── TIDAK LULUS VIEW (RED) ── */
            <div className="text-white text-left space-y-6 max-w-2xl mx-auto py-4">
              {/* Detail Table */}
              <div className="grid grid-cols-[120px_15px_1fr] gap-y-2.5 text-xs sm:text-sm font-medium tracking-wide border-b border-white/15 pb-6">
                <div>Nomor peserta</div>
                <div>:</div>
                <div className="font-bold">{participant.nomorPeserta}</div>

                <div>Nama</div>
                <div>:</div>
                <div className="font-bold uppercase">{participant.nama}</div>

                <div>Tanggal lahir</div>
                <div>:</div>
                <div className="font-bold">{formatTanggalLahirIndo(participant.tanggalLahir)}</div>
              </div>

              {/* Negative Result Announcement */}
              <div className="space-y-4 py-2">
                <p className="text-base sm:text-lg font-extrabold leading-normal text-yellow-300">
                  Peserta dengan nomor peserta {participant.nomorPeserta} dinyatakan TIDAK LULUS SELEKSI SNBT SNPMB 2026.
                </p>
                <p className="text-sm sm:text-base font-bold text-white/90 leading-relaxed uppercase tracking-wider">
                  JANGAN PATAH SEMANGAT!
                </p>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                  Terima kasih telah berjuang dalam seleksi ini. Kegagalan hari ini bukanlah akhir dari segalanya. Masih ada banyak jalur penerimaan lain yang menanti Anda di masa depan. Tetaplah bersemangat dan teruslah berusaha!
                </p>
              </div>

              {/* Action button inside card */}
              <div className="pt-4 border-t border-white/15">
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="w-full sm:w-auto bg-[#853131] hover:bg-[#692525] disabled:bg-slate-500 text-white font-bold py-2.5 px-6 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 shadow-md border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isDownloading ? (
                    <>
                      <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                      <span>MENGUNDUH...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                      </svg>
                      <span>UNDUH SERTIFIKAT HASIL (PDF)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Green Bottom Bar (Back to Search) */}
        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#198754] hover:bg-[#157347] text-white font-bold py-3.5 text-center transition-colors duration-200 cursor-pointer text-xs sm:text-sm uppercase tracking-widest border-t border-black/10"
        >
          Kembali ke pencarian
        </button>
      </motion.div>

      {/* ── SECONDARY CARD: ADDITIONAL INFO & SCORES (GLASS CARD) ── */}
      <motion.div
        id="rincian-nilai"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full glass-card-dark overflow-hidden"
      >
        <div className="glass-card-dark-header px-6 sm:px-8 py-4">
          <h2 className="text-sm font-bold text-teal-400 uppercase tracking-widest">
            {isLulus ? 'Persyaratan & Rincian Informasi Kelulusan' : 'Rincian Informasi & Hasil Ujian'}
          </h2>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Section: Data Akademik Pendukung */}
          <div>
            <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1">
              Informasi Akademik Peserta
            </h3>
            <div className="data-table-dark">
              <DataRow label="Nama Peserta" value={participant.nama} bold />
              {participant.nisn && <DataRow label="NISN" value={participant.nisn} mono />}
              {participant.asalSekolah && (
                <DataRow
                  label="Asal Sekolah"
                  value={`${participant.asalSekolah} ${participant.npsn ? `(${participant.npsn})` : ''}`}
                />
              )}
              {participant.keterangan && (
                <DataRow label="Keterangan Seleksi" value={participant.keterangan} />
              )}
            </div>
          </div>

          {/* Section: Rincian Nilai Ujian */}
          {participant.nilaiAkhir !== undefined && participant.nilaiAkhir > 0 && (
            <div>
              <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1">
                Rincian Skor UTBK
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <div className="data-table-dark">
                  <DataRow label="Penalaran Umum (KPU)" value={participant.kpu} />
                  <DataRow label="Pemahaman Umum (PPU)" value={participant.ppu} />
                  <DataRow label="Bacaan & Menulis (KMBM)" value={participant.kmbm} />
                  <DataRow label="Pengetahuan Kuantitatif" value={participant.pk} />
                </div>
                <div className="data-table-dark">
                  <DataRow label="Literasi B. Indonesia" value={participant.literasiIndonesia} />
                  <DataRow label="Literasi B. Inggris" value={participant.literasiInggris} />
                  <DataRow label="Penalaran Matematika" value={participant.penalaranMatematika} />
                  <DataRow label="Nilai Rata-rata (Akhir)" value={participant.nilaiAkhir} bold />
                </div>
              </div>
            </div>
          )}

          {/* Section: Lulus Requirements / Instructions */}
          {isLulus ? (
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">
                Langkah Pendaftaran Ulang & Persyaratan
              </h3>
              <ul className="list-decimal pl-5 text-xs text-slate-300 space-y-2 leading-relaxed">
                <li>
                  Silakan mengunduh dokumen resmi Panduan Pendaftaran Ulang dari laman Politeknik Penerima.
                </li>
                <li>
                  Siapkan berkas administrasi seperti: Ijazah/SKL, Kartu Keluarga, Rapor, Surat Keterangan Sehat, dan dokumen pendukung UKT.
                </li>
                <li>
                  Lakukan pengisian biodata secara daring pada sistem informasi akademik kampus tujuan.
                </li>
                <li>
                  Verifikasi dokumen fisik akan diumumkan lebih lanjut melalui media informasi resmi kampus.
                </li>
              </ul>
            </div>
          ) : (
            <div className="pt-4 border-t border-white/5">
              <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3">
                Informasi & Alternatif Jalur Masuk
              </h3>
              <ul className="list-disc pl-5 text-xs text-slate-300 space-y-2 leading-relaxed">
                <li>
                  Anda masih dapat mengikuti seleksi penerimaan melalui Jalur Ujian Mandiri Kemitraan atau Mandiri Khusus.
                </li>
                <li>
                  Cek jadwal pendaftaran jalur Mandiri langsung pada portal penerimaan masing-masing Politeknik.
                </li>
                <li>
                  Simpan kartu ujian dan sertifikat skor UTBK ini sebagai syarat pendaftaran di beberapa perguruan tinggi swasta terkemuka.
                </li>
              </ul>
            </div>
          )}
        </div>
      </motion.div>

      {/* Hidden CertificatePDF template for html2pdf generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', pointerEvents: 'none' }}>
        <div ref={certificateRef}>
          <CertificatePDF participant={participant} />
        </div>
      </div>
    </div>
  );
}

function DataRow({ label, value, mono = false, bold = false }) {
  return (
    <div className="data-row-dark">
      <span className="data-label-dark">{label}</span>
      <span className={`data-value-dark ${mono ? 'mono' : ''} ${bold ? 'bold text-teal-300' : ''}`}>
        {value || '-'}
      </span>
    </div>
  );
}
