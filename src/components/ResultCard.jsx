import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { showErrorToast, showSuccessToast } from '../utils/customToast';
import html2pdf from 'html2pdf.js';
import QRVerification from './QRVerification';
import CertificatePDF from './CertificatePDF';
import logoPpns from '../assets/logo-ppns.png';
import logoTutWuri from '../assets/logo-tut-wuri.png';
import logoBlu from '../assets/logo-blu.png';

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
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all'] }
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

  // Format date to DD - MM - YYYY
  const formatTanggalLahirIndo = (dateStr) => {
    if (!dateStr) return '-';
    const [year, month, day] = dateStr.split('-');
    return `${day} - ${month} - ${year}`;
  };

  const formatTanggalUjian = (dateStr) => {
    if (!dateStr) return '6 JUNI 2026';
    if (participant.nomorPeserta === '2415100008') {
      return '6 JUNI 2026';
    }
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const [year, month, day] = parts;
    const months = [
      'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
      'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'
    ];
    const monthIdx = parseInt(month, 10) - 1;
    const monthName = months[monthIdx] || month;
    return `${parseInt(day, 10)} ${monthName} ${year}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* ── PRIMARY CARD: SNPMB ANNOUNCEMENT UI ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 ${
          isLulus ? 'bg-[#5896a6]' : 'bg-[#a94442]'
        }`}
      >
        <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between border-b border-white/10 ">
          {/* Logo Tut Wuri / PPNS / BLU / SM-KPN */}
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-md shrink-0 ">
            <img src={logoTutWuri} alt="Logo Tut Wuri" className="h-10 w-auto object-contain" />
            <img src={logoPpns} alt="Logo PPNS" className="h-10 w-auto object-contain" />
            <img src={logoBlu} alt="Logo BLU" className="h-8 w-auto object-contain" />
            <div className="text-left leading-none ml-1">
              <div className="text-2xl sm:text-3xl font-black text-black tracking-tighter">SM – KPN</div>
              <div className="text-[5px] sm:text-[5px] text-black font-bold uppercase tracking-normal mt-0 whitespace-nowrap">
                SELEKSI MANDIRI KONSORSIUM POLITEKNIK NEGERI
              </div>
            </div>
          </div>
          <div className="text-left text-white">
            <h1 className="font-extrabold text-sm sm:text-base md:text-lg tracking-normal uppercase leading-tight drop-shadow">
              PENGUMUMAN SERTIFIKAT DAN HASIL NILAI UJIAN
            </h1>
            <h1 className="font-extrabold text-sm sm:text-base md:text-lg tracking-normal uppercase leading-tight drop-shadow">
              SELEKSI MANDIRI KONSORSIUM POLITEKNIK NEGERI
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
                  <QRVerification verificationId={participant.nomorPeserta} size={220} />
                </div>
              </div>

              {/* Right Column: Participant Details & Congrats */}
              <div className="text-white space-y-5 text-left">
                {/* Table Details */}
                <div className="grid grid-cols-[110px_15px_1fr] gap-y-2.5 text-xs sm:text-sm font-medium tracking-wide">
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
                <div className="py-1">
                  <p className="text-xs sm:text-sm leading-relaxed font-medium">
                    Terima kasih Anda telah mengikuti <b>Ujian Seleksi Mandiri Seleksi Konsorsium Politeknik Negeri (SM-KPN)</b> yang diselenggarakan oleh
                  </p>
                </div>

                {/* College & Program Study */}
                <div className="grid grid-cols-[110px_15px_1fr] gap-y-2.5 text-xs sm:text-sm font-bold tracking-wide">
                  <div>PTN</div>
                  <div>:</div>
                  <div className="font-extrabold uppercase text-yellow-300">
                    {participant.perguruanTinggi === 'Politeknik Negeri Surabaya' ? 'POLITEKNIK PERKAPALAN NEGERI SURABAYA' : (participant.perguruanTinggi || 'POLITEKNIK PERKAPALAN NEGERI SURABAYA')}
                  </div>

                  <div>Tanggal Ujian</div>
                  <div>:</div>
                  <div className="font-extrabold uppercase text-yellow-300">
                    {formatTanggalUjian(participant.tanggalUjian)}
                  </div>
                </div>

                {/* Instructions / Info Links */}
                <div className="pt-2 text-xs sm:text-sm leading-relaxed text-white/95">
                  <p>
                    Pengumuman hasil seleksi bagi peserta yang dinyatakan lolos seleksi jalur SK-PPNS 2026 dapat dilihat di{' '}
                    <a
                      href="https://pmb.ppns.ac.id/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-bold text-yellow-300 hover:text-yellow-250 transition-colors"
                    >
                      sini
                    </a>{' '}
                    atau laman PMB di masing-masing Politeknik tujuan lain untuk melihat status diterima di Politeknik tersebut.
                  </p>
                </div>

                {/* Action button inside card */}
                <div className="pt-2">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="w-full sm:w-auto bg-[#2b5e6f] hover:bg-[#204957] disabled:bg-slate-500 text-white font-bold py-2.5 px-6 rounded-lg text-xs tracking-wider uppercase transition-all duration-300 shadow-md border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-white border-t-transparent" />
                        <span>MENGUNDUH...</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2050/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
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
                  Peserta dengan nomor peserta {participant.nomorPeserta} dinyatakan TIDAK LULUS SELEKSI SM-KPN 2026.
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
                      <svg xmlns="http://www.w3.org/2050/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
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
          className="w-full bg-[#198754] hover:bg-[#157347] text-white font-extrabold py-4 text-center transition-colors duration-200 cursor-pointer text-xs sm:text-sm uppercase tracking-widest border-t border-black/10"
        >
          KEMBALI KE PENCARIAN
        </button>
      </motion.div>

      {/* <motion.div
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
      </motion.div> */}

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
