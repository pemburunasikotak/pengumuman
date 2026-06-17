const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbyzRNVXkjndtMWU07V8jMaKijSQGkFBXo2-O3NkOnjaLelj0EMnxNWiZ7V-XZWh4LLQ/exec';
// https://script.google.com/macros/s/AKfycbyzRNVXkjndtMWU07V8jMaKijSQGkFBXo2-O3NkOnjaLelj0EMnxNWiZ7V-XZWh4LLQ/exec

// Helper to safely parse ISO dates from GAS to local YYYY-MM-DD
function parseBirthDate(isoStr) {
  if (!isoStr) return '';
  if (/^\d{4}-\d{2}-\d{2}$/.test(isoStr)) return isoStr;
  
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return isoStr;
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ── API Functions ───────────────────────────────────────────

/**
 * Search for participant result
 * @param {Object} data - { jenisUjian, nomorPeserta, tanggalLahir }
 * @returns {Promise<Object>} participant data
 */
export async function searchResult(data) {
  try {
    const url = new URL(GAS_API_URL);
    url.searchParams.append('action', 'search');
    url.searchParams.append('nomor_peserta', data.nomorPeserta);
    // if (data.tanggalLahir) {
      url.searchParams.append('tanggal_lahir', data.tanggalLahir);
    // }

    const response = await fetch(url.toString(), {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error('Gagal menghubungi server seleksi. Silakan periksa koneksi internet Anda.');
    }

    const resData = await response.json();
    if (!resData.success) {
      throw new Error(resData.message || 'Data peserta tidak ditemukan.');
    }

    const found = resData.data;
    const mapped = {
      id: `VRF-${found.nomor_peserta}`,
      nomorPeserta: String(found.nomor_peserta),
      nama: found.nama,
      tempatLahir: found.tempat_lahir,
      tanggalLahir: parseBirthDate(found.tanggal_lahir),
      nisn: String(found.nisn),
      asalSekolah: found.asal_sekolah,
      npsn: String(found.npsn),
      tanggalUjian: parseBirthDate(found.tanggal_ujian),
      nilaiAkhir: found.nilai_akhir || 0,
      kpu: found.kpu || 0,
      ppu: found.ppu || 0,
      kmbm: found.kmbm || 0,
      pk: found.pk || 0,
      literasiIndonesia: found.literasi_indonesia || 0,
      literasiInggris: found.literasi_inggris || 0,
      penalaranMatematika: found.penalaran_matematika || 0,
      foto: found.foto_url && found.foto_url.startsWith('http') ? found.foto_url : null,
      qrCodeUrl: found.qr_code_url,
      status: found.status_kelulusan.toUpperCase(),
      programStudi: found.program_studi,
      keterangan: found.keterangan,
      jenisSeleksi: data.jenisUjian,
      perguruanTinggi: data.perguruanTinggi,
      curang: found.curang,
    };

    return { data: mapped };
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Gagal menghubungi server seleksi. Silakan periksa koneksi internet Anda.');
    }
    throw error;
  }
}

/**
 * Verify document by ID
 * @param {string} id - verification ID
 * @returns {Promise<Object>} verification data
 */
export async function verifyDocument(id) {
  try {
    const nomorPeserta = id.replace('VRF-', '');
    const url = new URL(GAS_API_URL);
    url.searchParams.append('action', 'verif');
    url.searchParams.append('nomor_peserta', nomorPeserta);

    const response = await fetch(url.toString(), {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow'
    });

    if (!response.ok) {
      throw new Error('Gagal menghubungi server verifikasi. Silakan periksa koneksi internet Anda.');
    }

    const resData = await response.json();
    if (!resData.success) {
      throw new Error(resData.message || 'Dokumen tidak ditemukan atau ID verifikasi tidak valid.');
    }

    const found = resData.data;
    const mapped = {
      id: `VRF-${found.nomor_peserta}`,
      nomorPeserta: String(found.nomor_peserta),
      nama: found.nama,
      tempatLahir: found.tempat_lahir,
      tanggalLahir: parseBirthDate(found.tanggal_lahir),
      nisn: String(found.nisn),
      asalSekolah: found.asal_sekolah,
      npsn: String(found.npsn),
      tanggalUjian: parseBirthDate(found.tanggal_ujian),
      nilaiAkhir: found.nilai_akhir,
      kpu: found.kpu || 0,
      ppu: found.ppu || 0,
      kmbm: found.kmbm || 0,
      pk: found.pk || 0,
      literasiIndonesia: found.literasi_indonesia || 0,
      literasiInggris: found.literasi_inggris || 0,
      penalaranMatematika: found.penalaran_matematika || 0,
      foto: found.foto_url && found.foto_url.startsWith('http') ? found.foto_url : null,
      qrCodeUrl: found.qr_code_url,
      status: found.status_kelulusan.toUpperCase(),
      programStudi: found.program_studi,
      keterangan: found.keterangan,
      jenisSeleksi: 'smkpn',
      perguruanTinggi: found.perguruanTinggi,
      verified: true,
      verifiedAt: new Date().toISOString(),
      curang: found.curang,
    };

    return { data: mapped };
  } catch (error) {
    if (error.name === 'TypeError') {
      throw new Error('Gagal menghubungi server verifikasi. Silakan periksa koneksi internet Anda.');
    }
    throw error;
  }
}
