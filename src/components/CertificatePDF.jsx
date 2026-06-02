import React, { forwardRef } from 'react';
import { QRCode } from 'react-qr-code';
import { formatDateIndoFull } from '../utils/helpers';
import logoTutWuri from '../assets/logo-tut-wuri.png';
import logoPpns from '../assets/logo-ppns.png';
import logoBlu from '../assets/logo-blu.png';

// Helper to determine the exam/admission year from participant's registration number (e.g., 24... -> 2024)
const getExamYear = (nomorPeserta) => {
  if (nomorPeserta && nomorPeserta.length >= 2) {
    const prefix = nomorPeserta.substring(0, 2);
    const yearNum = parseInt(prefix, 10);
    if (!isNaN(yearNum) && yearNum >= 10 && yearNum <= 40) {
      return 2000 + yearNum;
    }
  }
  return new Date().getFullYear();
};

// Helper to format scores to exactly 2 decimal places
const formatScore = (num) => {
  if (num === undefined || num === null || isNaN(num)) return '0.00';
  return Number(num).toFixed(2);
};

// Helper to generate a gender-appropriate passport photo avatar on a red background based on candidate's name
const renderAvatar = (name) => {
  const lowercaseName = name.toLowerCase();
  const femaleKeywords = [
    'fitri', 'putri', 'ayu', 'sari', 'dewi', 'nur', 'indah', 'ika', 'ani', 'sholicha', 
    'anisa', 'dwi', 'siti', 'lia', 'retno', 'wulandari', 'rahma', 'tri', 'kartika', 
    'mega', 'lutfi', 'sholihah', 'maharani', 'lestari', 'astuti', 'rahayu'
  ];
  
  const isFemale = femaleKeywords.some(keyword => lowercaseName.includes(keyword));

  if (isFemale) {
    // Hijab profile on solid red background
    return (
      <svg viewBox="0 0 100 120" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="120" fill="#dc2626" />
        <ellipse cx="50" cy="48" rx="16" ry="20" fill="#ffedd5" />
        <path d="M50,24 C35,24 33,35 33,48 C33,59 36,66 50,66 C64,66 67,59 67,48 C67,35 65,24 50,24 Z" fill="#ffffff" />
        <path d="M50,28 C41,28 41,35 41,46 C41,54 45,58 50,58 C55,58 59,54 59,46 C59,35 59,28 50,28 Z" fill="#fed7aa" />
        <path d="M12,120 L88,120 L82,85 C77,74 68,71 62,71 L38,71 C32,71 23,74 18,85 Z" fill="#0c4a6e" />
        <path d="M50,71 L38,71 L45,85 L50,88 L55,85 L62,71 Z" fill="#ffffff" />
        <path d="M33,62 C33,62 37,76 50,76 C63,76 67,62 67,62 C67,62 69,85 50,88 C31,85 33,62 33,62 Z" fill="#ffffff" />
      </svg>
    );
  } else {
    // Short hair male/neutral profile on solid red background
    return (
      <svg viewBox="0 0 100 120" className="w-full h-full object-cover" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="120" fill="#dc2626" />
        <ellipse cx="50" cy="46" rx="16" ry="18" fill="#fed7aa" />
        <path d="M32,40 C32,24 42,19 50,19 C58,19 68,24 68,40 C68,40 68,27 60,25 C55,24 45,24 40,25 C32,27 32,40 32,40 Z" fill="#1e293b" />
        <circle cx="33" cy="46" r="4.5" fill="#fed7aa" />
        <circle cx="67" cy="46" r="4.5" fill="#fed7aa" />
        <path d="M12,120 L88,120 L82,80 C77,69 65,67 50,67 C35,67 23,69 18,80 Z" fill="#0c4a6e" />
        <polygon points="50,67 38,67 44,88 56,88 62,67" fill="#ffffff" />
        <polygon points="50,73 47,78 50,112 53,78" fill="#0f172a" />
        <polygon points="38,67 45,78 46,67" fill="#cbd5e1" />
        <polygon points="62,67 55,78 54,67" fill="#cbd5e1" />
      </svg>
    );
  }
};

const CertificatePDF = forwardRef(({ participant }, ref) => {
  const verifyUrl = `${window.location.origin}/verify/${participant.id}`;
  const examYear = getExamYear(participant.nomorPeserta);

  return (
    <div
      ref={ref}
      className="relative w-[794px] h-[1123px] p-12 box-border flex flex-col justify-between"
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        border: '15px double #0d4b75',
        lineHeight: '1.4',
        backgroundColor: '#ffffff',
        color: '#000000'
      }}
    >
      {/* Outer thin decorative border */}
      <div 
        className="absolute inset-2 pointer-events-none" 
        style={{ border: '1px solid rgba(13, 75, 117, 0.4)' }} 
      />

      {/* Header Container */}
      <div>
        {/* LOGOS ROW */}
        <div className="flex items-center justify-center gap-12 pt-4 pb-2">
          {/* Logo 1: Tut Wuri Handayani */}
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={logoTutWuri} alt="Logo Tut Wuri Handayani" className="w-full h-full object-contain" />
          </div>

          {/* Logo 2: PPNS Logo */}
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={logoPpns} alt="Logo PPNS" className="w-full h-full object-contain" />
          </div>

          {/* Logo 3: BLU Speed */}
          <div className="w-16 h-16 flex items-center justify-center">
            <img src={logoBlu} alt="Logo BLU" className="w-full h-full object-contain" />
          </div>
        </div>

        {/* TITLE TEXT AREA */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#1e293b' }}>
            SERTIFIKAT HASIL
          </h2>
          <h3 className="text-sm font-bold tracking-widest uppercase mt-1" style={{ color: '#334155' }}>
            UJIAN SELEKSI MANDIRI INTERNET-BASED TEST (SM iBT) 2026
          </h3>
          {/* Horizontal double separator */}
          <div className="w-full mt-3 h-[4px]" style={{ backgroundColor: '#000000' }} />
          <div className="w-full mt-[2px] h-[1px]" style={{ backgroundColor: '#000000' }} />
        </div>

        {/* CANDIDATE INFO SECTION WITH PHOTO */}
        <div className="grid grid-cols-[1fr_120px] gap-8 mt-8 items-start px-4">
          {/* Table Details */}
          <div className="text-[12px] space-y-2 font-medium" style={{ color: '#475569' }}>
            <div className="grid grid-cols-[180px_15px_1fr] items-baseline">
              <span>Nama</span>
              <span>:</span>
              <span className="font-bold uppercase" style={{ color: '#000000' }}>{participant.nama}</span>
            </div>
            <div className="grid grid-cols-[180px_15px_1fr] items-baseline">
              <span>Tempat / Tanggal Lahir</span>
              <span>:</span>
              <span className="uppercase" style={{ color: '#000000' }}>
                {participant.tempatLahir || 'SURABAYA'} / {formatDateIndoFull(participant.tanggalLahir)}
              </span>
            </div>
            <div className="grid grid-cols-[180px_15px_1fr] items-baseline">
              <span>Nomor Induk Siswa Nasional</span>
              <span>:</span>
              <span className="font-mono" style={{ color: '#000000' }}>{participant.nisn || '-'}</span>
            </div>
            <div className="grid grid-cols-[180px_15px_1fr] items-baseline">
              <span>Asal Sekolah / NPSN</span>
              <span>:</span>
              <span className="uppercase" style={{ color: '#000000' }}>
                {participant.asalSekolah} {participant.npsn ? `/ ${participant.npsn}` : ''}
              </span>
            </div>
            <div className="grid grid-cols-[180px_15px_1fr] items-baseline">
              <span>Nomor Peserta Ujian</span>
              <span>:</span>
              <span className="font-bold font-mono" style={{ color: '#000000' }}>{participant.nomorPeserta}</span>
            </div>
          </div>

          {/* Student Photo */}
          <div 
            className="w-[110px] h-[145px] border-2 shadow-md overflow-hidden flex items-center justify-center"
            style={{ borderColor: '#cbd5e1', backgroundColor: '#f1f5f9' }}
          >
            {participant.foto ? (
              <img src={participant.foto} alt="Foto Peserta" className="w-full h-full object-cover" />
            ) : (
              renderAvatar(participant.nama)
            )}
          </div>
        </div>

        {/* EXAM DATE CONFIRMATION TEXT */}
        <div className="px-4 mt-6 text-[12px] text-justify leading-relaxed" style={{ color: '#334155' }}>
          Telah mengikuti ujian SM iBT pada tanggal
          <span className="font-bold" style={{ color: '#000000' }}>{formatDateIndoFull(participant.tanggalUjian)}</span> dan berlaku
          untuk penerimaan mahasiswa baru {examYear} dengan hasil sebagai berikut:
        </div>

        {/* BOTTOM SECTION: QR CODE & SCORES TABLE */}
        <div className="grid grid-cols-[200px_1fr] gap-8 mt-8 px-4 items-start">
          {/* Left Column: Verification QR Code */}
          <div 
            className="flex flex-col items-center justify-center p-3 border rounded-lg shadow-sm"
            style={{ borderColor: '#e2e8f0', backgroundColor: '#ffffff' }}
          >
            <QRCode
              value={verifyUrl}
              size={140}
              level="H"
              fgColor="#0f172a"
              bgColor="#ffffff"
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            />
            <span className="text-[8px] font-bold mt-2 tracking-widest text-center" style={{ color: '#94a3b8' }}>
              PIN VERIFIKASI: {participant.id}
            </span>
          </div>

          {/* Right Column: Score Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline pb-1" style={{ borderBottom: '2px solid #000000' }}>
              <span className="font-bold text-sm" style={{ color: '#000000' }}>Nilai Akhir:</span>
              <span className="font-bold text-base font-mono" style={{ color: '#000000' }}>{formatScore(participant.nilaiAkhir)}</span>
            </div>

            {/* Test Categories */}
            <div className="space-y-3">
              {/* Tes Potensi Skolastik */}
              <div>
                <div 
                  className="font-bold text-[11px] uppercase tracking-wide pb-0.5 mb-1.5" 
                  style={{ color: '#1e293b', borderBottom: '1px solid #cbd5e1' }}
                >
                  Tes Potensi Skolastik:
                </div>
                <div className="space-y-1 text-[11px] pl-2" style={{ color: '#475569' }}>
                  <div className="flex justify-between">
                    <span>Kemampuan Penalaran Umum</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{formatScore(participant.kpu)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pengetahuan dan Pemahaman Umum</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{formatScore(participant.ppu)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kemampuan Memahami Bacaan dan Menulis</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{formatScore(participant.kmbm)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pengetahuan Kuantitatif</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{formatScore(participant.pk)}</span>
                  </div>
                </div>
              </div>

              {/* Tes Literasi */}
              <div>
                <div 
                  className="font-bold text-[11px] uppercase tracking-wide pb-0.5 mb-1.5" 
                  style={{ color: '#1e293b', borderBottom: '1px solid #cbd5e1' }}
                >
                  Tes Literasi:
                </div>
                <div className="space-y-1 text-[11px] pl-2" style={{ color: '#475569' }}>
                  <div className="flex justify-between">
                    <span>Literasi dalam Bahasa Indonesia</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{formatScore(participant.literasiIndonesia)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Literasi dalam Bahasa Inggris</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{formatScore(participant.literasiInggris)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Penalaran Matematika</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{formatScore(participant.penalaranMatematika)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER AREA */}
      <div className="px-4 pt-4 pb-2" style={{ borderTop: '1px solid #e2e8f0' }}>
        <div className="flex justify-between items-end text-[8px] font-medium" style={{ color: '#64748b' }}>
          <div>
            <span>Diterbitkan oleh:</span>
            <span className="block font-bold uppercase" style={{ color: '#334155' }}>Panitia Seleksi Mandiri PPNS</span>
            <span className="block mt-0.5">Dokumen ini sah dan diverifikasi secara elektronik. Pindai QR code untuk verifikasi keaslian.</span>
          </div>
          <div className="text-right">
            <span>Halaman 1 dari 1</span>
            <span className="block font-mono mt-0.5">ID: {participant.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

CertificatePDF.displayName = 'CertificatePDF';

export default CertificatePDF;
