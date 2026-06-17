import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Loading from '../components/Loading';
import { verifyDocument } from '../services/api';
import { formatDate, getExamLabel, isPMBType, isCertificationType } from '../utils/helpers';
import QRVerification from '../components/QRVerification';
import logoPpns from '../assets/logo-ppns.png';

export default function Verify() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await verifyDocument(id);
        setData(response.data);
      } catch (err) {
        setError(err.message || 'Verifikasi gagal.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="full-page-bg">
        <div className="text-center bg-slate-900/50 p-8 rounded-2xl border border-white/5 backdrop-blur-md">
          <div className="spinner mx-auto mb-4 w-10 h-10 border-t-teal-400" />
          <p className="text-sm text-teal-400 font-bold uppercase tracking-wider">Memverifikasi Dokumen...</p>
          <p className="text-xs text-slate-400 mt-1">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  if (data.curang ==="ya") {
    return (
      <div className="full-page-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-dark p-8 max-w-md w-full text-center"
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-rose-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-white mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
            Dokumen Terdeteksi Adanya Kecurangan
          </h2>
          <p className="text-slate-300 text-xs mb-6 leading-relaxed">{error}</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-teal text-xs font-bold w-full cursor-pointer"
          >
            KEMBALI KE BERANDA
          </button>
        </motion.div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="full-page-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card-dark p-8 max-w-md w-full text-center"
        >
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7 text-rose-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-white mb-2 uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)' }}>
            Verifikasi Gagal
          </h2>
          <p className="text-slate-300 text-xs mb-6 leading-relaxed">{error}</p>
          <button 
            onClick={() => navigate('/')} 
            className="btn btn-teal text-xs font-bold w-full cursor-pointer"
          >
            KEMBALI KE BERANDA
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="full-page-bg">
      <div className="max-w-3xl w-full mx-auto py-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Top Institutional Header badge */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 p-2.5 shadow-md backdrop-blur-sm">
                <img src={logoPpns} alt="Logo PPNS" className="w-full h-full object-contain" />
              </div>
              <span className="badge badge-success px-4 py-2 text-xs border border-teal-500/20 font-extrabold tracking-wider">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-teal-400 shrink-0">
                  <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
                DOKUMEN ASLI TERVERIFIKASI
              </span>
            </motion.div>
          </div>

          {/* Verification Record Card */}
          <div className="glass-card-dark overflow-hidden">
            {/* Header banner */}
            <div className="status-header-lulus-dark px-6 sm:px-8 py-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 shadow-inner">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-teal-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-white font-extrabold text-base tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                    Verifikasi Dokumen Digital
                  </h1>
                  <p className="text-teal-400 text-xs font-semibold">
                    Seleksi Konsorsium Politeknik Perkapalan Negeri Surabaya (SKPPNS) 
                  </p>
                </div>
              </div>
            </div>

            {/* Verification notice box */}
            <div className="px-6 sm:px-8 pt-6">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-teal-500/10 border border-teal-500/25">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-teal-400 mt-0.5 shrink-0">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-xs font-bold text-teal-400 uppercase tracking-wider">Status Dokumen: VALID</p>
                  <p className="text-[0.725rem] text-slate-300 mt-0.5 leading-relaxed">
                    Data di bawah ini merupakan informasi resmi hasil ujian peserta yang sah dan terdaftar pada pangkalan data Seleksi Konsorsium Politeknik Perkapalan Negeri Surabaya. 
                  </p>
                </div>
              </div>
            </div>

            {/* Body Info */}
            <div className="px-6 sm:px-8 py-6">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8">
                {/* Data Column */}
                <div>
                  <div className="mb-5">
                    <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1">
                      Data Peserta
                    </h3>
                    <div className="data-table-dark">
                      <VerifyRow label="Nomor Peserta" value={data.nomorPeserta} mono />
                      <VerifyRow label="Nama Peserta" value={data.nama} bold />
                      {data.nisn && <VerifyRow label="NISN" value={data.nisn} mono />}
                      {data.asalSekolah && (
                        <VerifyRow label="Asal Sekolah" value={`${data.asalSekolah} ${data.npsn ? `(${data.npsn})` : ''}`} />
                      )}
                      <VerifyRow label="Tanggal Lahir" value={formatDate(data.tanggalLahir)} />
                      <VerifyRow label="Jenis Seleksi" value={getExamLabel(data.jenisSeleksi)} />
                      {/* <div className="data-row-dark">
                        <span className="data-label-dark">Status</span>
                        <span className="data-value-dark">
                          <span className={`badge ${data.status === 'LULUS' ? 'badge-success' : 'badge-danger'}`}>
                            {data.status}
                          </span>
                        </span>
                      </div> */}
                      {/* {data.keterangan && (
                        <VerifyRow label="Keterangan" value={data.keterangan} />
                      )} */}
                    </div>
                  </div>

                  {/* Section: Rincian Nilai Ujian */}
                  {data.nilaiAkhir !== undefined && data.nilaiAkhir > 0 && (
                    <div className="mb-5">
                      <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1">
                        Rincian Nilai Ujian
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                        <div className="data-table-dark">
                          <VerifyRow label="Penalaran Umum (KPU)" value={data.kpu} />
                          <VerifyRow label="Pemahaman Umum (PPU)" value={data.ppu} />
                          <VerifyRow label="Bacaan & Menulis (KMBM)" value={data.kmbm} />
                          <VerifyRow label="Pengetahuan Kuantitatif" value={data.pk} />
                        </div>
                        <div className="data-table-dark">
                          <VerifyRow label="Literasi B. Indonesia" value={data.literasiIndonesia} />
                          <VerifyRow label="Literasi B. Inggris" value={data.literasiInggris} />
                          <VerifyRow label="Penalaran Matematika" value={data.penalaranMatematika} />
                          <VerifyRow label="Nilai Akhir (Rerata)" value={data.nilaiAkhir} bold />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* {data.programStudi && data.status === 'LULUS' && (
                    <div className="mb-5">
                      <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1">
                        Penerimaan Perguruan Tinggi
                      </h3>
                      <div className="data-table-dark">
                        <VerifyRow label="Perguruan Tinggi" value={data.perguruanTinggi} />
                        <VerifyRow label="Program Studi" value={data.programStudi} bold />
                      </div>
                    </div>
                  )} */}

                  {isCertificationType(data.jenisSeleksi) && (
                    <div className="mb-5">
                      <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1">
                        Informasi Sertifikasi
                      </h3>
                      <div className="data-table-dark">
                        <VerifyRow label="Lembaga Sertifikasi" value={data.lembagaSertifikasi} />
                        <VerifyRow label="Skema Sertifikasi" value={data.skemaSertifikasi} bold />
                      </div>
                    </div>
                  )}

                  {data.nomorSertifikat && (
                    <div className="mb-5">
                      <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest mb-3 border-b border-white/5 pb-1">
                        Dokumen Sertifikat
                      </h3>
                      <div className="data-table-dark">
                        <VerifyRow label="Nomor Sertifikat" value={data.nomorSertifikat} mono />
                        <VerifyRow label="Tanggal Terbit" value={formatDate(data.tanggalTerbit)} />
                      </div>
                    </div>
                  )}
                </div>

                {/* QR Column */}
                <div className="flex flex-col items-center justify-start gap-4 lg:pl-8 lg:border-l border-white/5 w-full lg:w-48 shrink-0">
                  <div className="p-3 bg-white rounded-xl shadow-md">
                    <QRVerification verificationId={id} size={120} />
                  </div>
                  <div className="text-center">
                    <p className="text-[0.625rem] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
                      VERIFIKASI ID
                    </p>
                    <p className="text-[0.55rem] text-slate-500 font-mono break-all max-w-[140px]">
                      {id}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stamp Footer */}
            <div className="px-6 sm:px-8 py-4 bg-slate-900/50 border-t border-white/5">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.65rem] text-slate-400">
                <span>
                  Diverifikasi secara sistem pada {new Date(data.verifiedAt || Date.now()).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-teal-400 uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 shrink-0">
                    <path fillRule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clipRule="evenodd" />
                  </svg>
                  SELEKSI KONSORSIUM PPNS
                </span>
              </div>
            </div>
          </div>

          {/* Action Back Button */}
          <div className="text-center mt-6">
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-teal-outline text-xs px-5 py-2.5 font-bold cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              KEMBALI KE BERANDA UTAMA
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function VerifyRow({ label, value, mono = false, bold = false }) {
  return (
    <div className="data-row-dark">
      <span className="data-label-dark">{label}</span>
      <span className={`data-value-dark ${mono ? 'mono' : ''} ${bold ? 'bold text-teal-300' : ''}`}>
        {value || '-'}
      </span>
    </div>
  );
}
