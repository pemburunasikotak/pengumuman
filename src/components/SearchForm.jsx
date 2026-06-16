import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { showErrorToast, showSuccessToast } from '../utils/customToast';
import { searchResult } from '../services/api';
import CertificatePDF from './CertificatePDF';

export default function SearchForm() {
  const [isLoading, setIsLoading] = useState(false);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
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
        jenisUjian: 'smkpn',
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Nomor Peserta */}
      <div>
        <label htmlFor="nomorPeserta" className="form-label-teal font-extrabold text-[0.75rem] tracking-wider mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-teal-400 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
          </svg>
          <span>NOMOR PESERTA</span> <span className="text-red-500 font-bold">*</span>
        </label>
        <input
          id="nomorPeserta"
          type="text"
          className={`form-input-dark h-12 rounded-xl border-white/10 bg-[#0c1427]/70 text-slate-100 placeholder-slate-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all ${errors.nomorPeserta ? 'error' : ''}`}
          placeholder="Contoh: 0000000000"
          {...register('nomorPeserta', {
            required: 'Nomor peserta wajib diisi',
            minLength: { value: 6, message: 'Nomor peserta minimal 6 karakter' },
          })}
        />
        {errors.nomorPeserta ? (
          <p className="form-error-dark mt-1.5 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
              <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
            {errors.nomorPeserta.message}
          </p>
        ) : (
          <p className="form-desc-dark mt-1.5 text-xs text-slate-400">Masukkan nomor peserta sesuai kartu ujian</p>
        )}
      </div>

      {/* Tanggal Lahir (Split) */}
      <div>
        <label className="form-label-teal font-extrabold text-[0.75rem] tracking-wider mb-2 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4.5 h-4.5 text-teal-400 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          <span>TANGGAL LAHIR</span> <span className="text-red-500 font-bold">*</span>
        </label>
        
        <div className="date-input-container flex items-center gap-2.5">
          <input
            type="text"
            maxLength={2}
            placeholder="DD"
            className={`form-input-dark date-input-field h-12 w-16 rounded-xl border-white/10 bg-[#0c1427]/70 text-slate-100 text-center placeholder-slate-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all ${hasDateError ? 'error' : ''}`}
            {...register('day', {
              required: true,
              pattern: /^(0[1-9]|[12]\d|3[01])$/
            })}
          />
          <span className="date-separator text-slate-500 text-lg">/</span>
          <input
            type="text"
            maxLength={2}
            placeholder="MM"
            className={`form-input-dark date-input-field h-12 w-16 rounded-xl border-white/10 bg-[#0c1427]/70 text-slate-100 text-center placeholder-slate-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all ${hasDateError ? 'error' : ''}`}
            {...register('month', {
              required: true,
              pattern: /^(0[1-9]|1[0-2])$/
            })}
          />
          <span className="date-separator text-slate-500 text-lg">/</span>
          <input
            type="text"
            maxLength={4}
            placeholder="YYYY"
            className={`form-input-dark date-input-field year h-12 w-24 rounded-xl border-white/10 bg-[#0c1427]/70 text-slate-100 text-center placeholder-slate-600 focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all ${hasDateError ? 'error' : ''}`}
            {...register('year', {
              required: true,
              pattern: /^(19|20)\d{2}$/
            })}
          />
        </div>

        {hasDateError ? (
          <p className="form-error-dark mt-1.5 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
              <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
            Format tanggal lahir tidak valid (DD/MM/YYYY)
          </p>
        ) : (
          <p className="form-desc-dark mt-1.5 text-xs text-slate-400">Masukkan tanggal, bulan, dan tahun lahir Anda</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <motion.button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 rounded-xl bg-[#009b86] hover:bg-[#008c79] text-white font-bold tracking-wider cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-teal-900/30 active:scale-[0.99] transition-all"
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
      </div>

      {/* Hidden CertificatePDF template for html2pdf generation */}
      <div style={{ position: 'absolute', left: '-9999px', top: '-9999px', pointerEvents: 'none' }}>
        <div ref={certificateRef}>
          <CertificatePDF participant={demoParticipant} />
        </div>
      </div>
    </form>
  );
}
