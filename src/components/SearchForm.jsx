import { useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { showErrorToast, showSuccessToast } from '../utils/customToast';
import html2pdf from 'html2pdf.js';
import { searchResult } from '../services/api';
import { EXAM_TYPES } from '../utils/helpers';
import CertificatePDF from './CertificatePDF';

export default function SearchForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const navigate = useNavigate();
  const certificateRef = useRef(null);

  const demoParticipant = {
    id: "VRF-2415100008",
    nomorPeserta: "2415100008",
    nama: "NIKMATUS SHOLICHA",
    tempatLahir: "SURABAYA",
    tanggalLahir: "2004-10-13",
    nisn: "0043005934",
    asalSekolah: "SMK KESEHATAN SURABAYA",
    npsn: "20568499",
    tanggalUjian: "2024-06-22",
    nilaiAkhir: 271.50,
    kpu: 200,
    ppu: 450,
    kmbm: 500,
    pk: 200,
    literasiIndonesia: 250,
    literasiInggris: 300,
    penalaranMatematika: 50,
    foto: null,
    status: "LULUS",
    programStudi: "Teknik Informatika",
    keterangan: "Diterima Jalur Mandiri",
    jenisSeleksi: "smkpn"
  };

  const handleDownloadDemoPDF = async (e) => {
    e.preventDefault();
    if (isDownloading) return;
    setIsDownloading(true);
    
    const toastId = toast.loading('Sedang menyiapkan dokumen PDF...');

    try {
      const element = certificateRef.current;
      const opt = {
        margin:       0,
        filename:     `Sertifikat_Hasil_${demoParticipant.nomorPeserta}.pdf`,
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
      showSuccessToast('Sertifikat demo hasil seleksi berhasil diunduh.', 'UNDUH SUKSES');
    } catch (error) {
      console.error(error);
      toast.dismiss(toastId);
      showErrorToast('Gagal mengunduh sertifikat. Silakan coba lagi.', 'UNDUH GAGAL');
    } finally {
      setIsDownloading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({ mode: 'onSubmit' });

  const onSubmit = async (data) => {
    // Check date inputs
    const { day, month, year } = data;
    if (!day || !month || !year) {
      showErrorToast('Silakan isi tanggal lahir dengan lengkap.', 'VALIDASI GAGAL');
      return;
    }

    const formattedDate = `${year}-${month}-${day}`;

    setIsLoading(true);

    try {
      const response = await searchResult({
        jenisUjian: data.jenisUjian,
        nomorPeserta: data.nomorPeserta,
        tanggalLahir: formattedDate,
      });

      showSuccessToast('Data peserta berhasil ditemukan.', 'PENCARIAN BERHASIL');

      sessionStorage.setItem('last_participant', JSON.stringify(response.data));
      navigate('/result', { state: { participant: response.data } });
    } catch (error) {
      showErrorToast(error.message || 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const hasDateError = errors.day || errors.month || errors.year;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
      {/* Grid Container for Jenis Ujian and Nomor Peserta */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Jenis Ujian */}
        <div>
          <label htmlFor="jenisUjian" className="form-label-teal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-teal-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
            </svg>
            Jenis Ujian <span className="required">*</span>
          </label>
          <select
            id="jenisUjian"
            className={`form-input-dark ${errors.jenisUjian ? 'error' : ''}`}
            {...register('jenisUjian', { required: 'Jenis ujian wajib dipilih' })}
          >
            <option value="">— Pilih Jenis Ujian / Seleksi —</option>
            {EXAM_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
          {errors.jenisUjian ? (
            <p className="form-error-dark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              {errors.jenisUjian.message}
            </p>
          ) : (
            <p className="form-desc-dark">Pilih jenis seleksi yang Anda ikuti</p>
          )}
        </div>

        {/* Nomor Peserta */}
        <div>
          <label htmlFor="nomorPeserta" className="form-label-teal">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-teal-400 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
            </svg>
            Nomor Peserta <span className="required">*</span>
          </label>
          <input
            id="nomorPeserta"
            type="text"
            className={`form-input-dark ${errors.nomorPeserta ? 'error' : ''}`}
            placeholder="Contoh: SMK001"
            {...register('nomorPeserta', {
              required: 'Nomor peserta wajib diisi',
              minLength: { value: 6, message: 'Nomor peserta minimal 6 karakter' },
            })}
          />
          {errors.nomorPeserta ? (
            <p className="form-error-dark">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              {errors.nomorPeserta.message}
            </p>
          ) : (
            <p className="form-desc-dark">Masukkan nomor peserta sesuai kartu ujian</p>
          )}
        </div>
      </div>

      {/* Tanggal Lahir (Split) */}
      <div>
        <label className="form-label-teal">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-teal-400 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          Tanggal Lahir <span className="required">*</span>
        </label>
        
        <div className="date-input-container">
          <input
            type="text"
            maxLength={2}
            placeholder="DD"
            className={`form-input-dark date-input-field ${hasDateError ? 'error' : ''}`}
            {...register('day', {
              required: true,
              pattern: /^(0[1-9]|[12]\d|3[01])$/
            })}
          />
          <span className="date-separator">/</span>
          <input
            type="text"
            maxLength={2}
            placeholder="MM"
            className={`form-input-dark date-input-field ${hasDateError ? 'error' : ''}`}
            {...register('month', {
              required: true,
              pattern: /^(0[1-9]|1[0-2])$/
            })}
          />
          <span className="date-separator">/</span>
          <input
            type="text"
            maxLength={4}
            placeholder="YYYY"
            className={`form-input-dark date-input-field year ${hasDateError ? 'error' : ''}`}
            {...register('year', {
              required: true,
              pattern: /^(19|20)\d{2}$/
            })}
          />
        </div>

        {hasDateError ? (
          <p className="form-error-dark">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
              <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
            Format tanggal lahir tidak valid (DD/MM/YYYY)
          </p>
        ) : (
          <p className="form-desc-dark">Masukkan tanggal, bulan, dan tahun lahir Anda</p>
        )}
      </div>

      {/* Submit / Actions */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <motion.button
          type="submit"
          disabled={isLoading}
          className="btn btn-teal btn-lg flex-1 font-bold cursor-pointer"
          whileHover={!isLoading ? { scale: 1.01 } : {}}
          whileTap={!isLoading ? { scale: 0.99 } : {}}
        >
          {isLoading ? (
            <>
              <div className="spinner" />
              <span>Mencari Data...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <span>LIHAT HASIL</span>
            </>
          )}
        </motion.button>

        {/* <a
          href="#download-demo-sertifikat"
          onClick={handleDownloadDemoPDF}
          className="btn btn-teal-outline btn-lg font-bold flex items-center justify-center cursor-pointer gap-2"
        >
          {isDownloading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-teal-400 border-t-transparent" />
              <span>MENGUNDUH...</span>
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              <span>PANDUAN PDF</span>
            </>
          )}
        </a> */}
      </div>

      {/* Demo notice */}
      {/* <div className="pt-1">
        <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-slate-900/40 border border-white/5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-teal-400 mt-0.5 shrink-0">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
          </svg>
          <p className="text-[0.675rem] text-slate-400 leading-relaxed">
            <span className="font-semibold text-teal-400">Mode Demo</span> — Coba gunakan Nomor Peserta:{' '}
            <code className="px-1 py-0.5 rounded bg-slate-850 border border-white/5 text-teal-300 text-[0.65rem]">SMK001</code>{' '}
            <code className="px-1 py-0.5 rounded bg-slate-850 border border-white/5 text-teal-300 text-[0.65rem]">SMK002</code>{' '}
            <code className="px-1 py-0.5 rounded bg-slate-850 border border-white/5 text-teal-300 text-[0.65rem]">BNS001</code>
          </p>
        </div>
      </div> */}
      {/* Hidden CertificatePDF template for html2pdf generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', pointerEvents: 'none' }}>
        <div ref={certificateRef}>
          <CertificatePDF participant={demoParticipant} />
        </div>
      </div>
    </form>
  );
}
