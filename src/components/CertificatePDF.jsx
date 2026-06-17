import { forwardRef } from 'react';
import { QRCode } from 'react-qr-code';
import { formatDateIndoFull, getAppBasePath } from '../utils/helpers';
import logoTutWuri from '../assets/logo-tut-wuri.png';
import logoPpns from '../assets/logo-ppns.png';
import logoBlu from '../assets/logo-blu.png';

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

// const formatScore = (num) => {
//   if (num === undefined || num === null || isNaN(num)) return '0.00 (0.00)';
//   const firstPart = Number(num / 7.4874).toFixed(2);
//   const secondPart = Number(num).toFixed(2);
//   return `${firstPart}  (${secondPart})`;
// };

const CertificatePDF = forwardRef(({ participant }, ref) => {
  const verifyUrl = `${window.location.origin}${getAppBasePath()}verify/${participant.nomorPeserta}`;
  const examYear = getExamYear(participant.nomorPeserta);

  return (
    <div
      ref={ref}
      className="relative w-[794px] h-[1118px] p-10 box-border flex flex-col justify-between"
      style={{
        fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
        border: '15px double #0d4b75',
        lineHeight: '1.4',
        backgroundColor: '#ffffff',
        color: '#000000'
      }}
    >
      <div 
        className="absolute inset-2 pointer-events-none" 
        style={{ border: '1px solid rgba(13, 75, 117, 0.4)' }} 
      />
      <div>
        <div className="flex items-center justify-center pt-4 pb-2">
          <div className="flex items-center gap-3 px-5 py-3 shrink-0" style={{ backgroundColor: '#ffffff', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
            <img src={logoTutWuri} alt="Logo Tut Wuri" className="h-10 w-auto object-contain" />
            <img src={logoPpns} alt="Logo PPNS" className="h-10 w-auto object-contain" />
            <img src={logoBlu} alt="Logo BLU" className="h-8 w-auto object-contain" />
            <div className="text-left leading-none ml-1">
              <div className="text-2xl font-black tracking-tighter" style={{ fontFamily: "'Inter', sans-serif", color: '#000000' }}>SM–KPN</div>
              <div className="text-[6px] font-bold uppercase tracking-normal mt-1 whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif", color: '#000000' }}>
                SELEKSI MANDIRI KONSORSIUM POLITEKNIK NEGERI
              </div>
              <div className="text-[6px] font-bold uppercase tracking-normal mt-1 whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif", color: '#000000' }}>
                JALUR SELEKSI KONSORSIUM PPNS 
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold tracking-widest" style={{ fontFamily: 'Georgia, serif', color: '#1e293b' }}>
            SERTIFIKAT HASIL
          </h2>
          <h3 className="text-sm font-bold tracking-widest uppercase mt-1" style={{ color: '#334155' }}>
            UJIAN SELEKSI MANDIRI KONSORSIUM POLITEKNIK NEGERI (SM-KPN) 2026
          </h3>
          <h3 className="text-sm font-bold tracking-widest uppercase mt-1" style={{ color: '#334155' }}>
            SELEKSI KONSORSIUM POLITEKNIK PERKAPALAN NEGERI SURABAYA (SKPPNS) 
          </h3>
          {/* <h3 className="text-sm font-bold tracking-widest uppercase mt-1" style={{ color: '#334155' }}>
            JALUR SELEKSI KONSORSIUM PPNS 2026
          </h3> */}
          <div className="w-full mt-3 h-[4px]" style={{ backgroundColor: '#000000' }} />
          <div className="w-full mt-[2px] h-[1px]" style={{ backgroundColor: '#000000' }} />
        </div>
        <div className="grid grid-cols-[1fr_120px] gap-8 mt-8 items-start px-4">
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
        </div>
        <div className="px-4 mt-6 text-[12px] text-justify leading-relaxed" style={{ color: '#334155' }}>
          Telah mengikuti ujian Seleksi Mandiri Konsorsium Politeknik Negeri (SM-KPN) melalui Jalur Seleksi Konsorsium Politeknik Perkapalan Negeri Surabaya (SKPPNS) pada tanggal
          <span className="font-bold" style={{ color: '#000000' }}> {participant.nomorPeserta === '2415100008' ? '6 JUNI 2026' : formatDateIndoFull(participant.tanggalUjian)}</span> dan berlaku untuk penerimaan mahasiswa baru {participant.nomorPeserta === '2415100008' ? '2026' : examYear} dengan hasil sebagai berikut:
        </div>
        <div className="grid grid-cols-[170px_1fr] gap-4 mt-12 px-4 items-start">
          <div 
            className="flex flex-col items-center justify-center p-3 rounded-lg mt-2"
            style={{ border: '1px solid #e2e8f0', backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
          >
            <QRCode
              value={verifyUrl}
              size={140}
              level="H"
              fgColor="#0f172a"
              bgColor="#ffffff"
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            />
            {/* <span className="text-[8px] font-bold mt-2 tracking-widest text-center" style={{ color: '#94a3b8' }}>
              PIN VERIFIKASI: {participant.id}
            </span> */}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-baseline pb-1" style={{ borderBottom: '2px solid #000000' }}>
              <span className="font-bold text-[12px] whitespace-nowrap" style={{ color: '#000000' }}>Nilai Akhir : Nilai Skor Ujian (Nilai Standar Rata-rata)</span>
              <span className="font-bold text-sm font-mono whitespace-nowrap" style={{ color: '#000000' }}>{participant?.nilaiAkhir || ""}</span>
            </div>
            <div className="space-y-3">
              <div>
                <div 
                  className="font-bold text-[11px] uppercase tracking-wide pb-1.5 mb-1.5" 
                  style={{ color: '#1e293b', borderBottom: '1px solid #cbd5e1' }}
                >
                  Tes Potensi Skolastik:
                </div>
                <div className="space-y-1 text-[11px] pl-2" style={{ color: '#475569' }}>
                  <div className="flex justify-between">
                    <span>Kemampuan Penalaran Umum</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{participant?.kpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pengetahuan dan Pemahaman Umum</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{participant?.ppu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kemampuan Memahami Bacaan dan Menulis</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{participant?.kmbm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pengetahuan Kuantitatif</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{participant?.pk}</span>
                  </div>
                </div>
              </div>
              <div>
                <div 
                  className="font-bold text-[11px] uppercase tracking-wide pb-1.5 mb-1.5" 
                  style={{ color: '#1e293b', borderBottom: '1px solid #cbd5e1' }}
                >
                  Tes Literasi:
                </div>
                <div className="space-y-1 text-[11px] pl-2" style={{ color: '#475569' }}>
                  <div className="flex justify-between">
                    <span>Literasi dalam Bahasa Indonesia</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{participant.literasiIndonesia || ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Literasi dalam Bahasa Inggris</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{participant.literasiInggris|| ""}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Penalaran Matematika</span>
                    <span className="font-mono font-semibold" style={{ color: '#000000' }}>{participant.penalaranMatematika|| ""}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pt-4 pb-2" style={{ borderTop: '1px solid #e2e8f0' }}>
        <div className="flex justify-between items-end text-[8px] font-medium" style={{ color: '#64748b' }}>
          <div>
            <span>Diterbitkan oleh:</span>
            <span className="block font-bold uppercase" style={{ color: '#334155' }}>Panitia Seleksi KONSORSIUM PPNS</span>
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
