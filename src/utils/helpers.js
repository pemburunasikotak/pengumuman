/**
 * Format date to DD-MM-YYYY
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  if (!date) return '-';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Format date to full Indonesian style (e.g., 13 OKTOBER 2004)
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {string}
 */
export function formatDateIndoFull(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('T')[0].split('-');
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  const months = [
    'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
    'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'
  ];
  const monthIdx = parseInt(month, 10) - 1;
  const monthName = months[monthIdx] || month;
  return `${parseInt(day, 10)} ${monthName} ${year}`;
}

/**
 * Generate random captcha string
 * @param {number} length
 * @returns {string}
 */
export function generateCaptcha(length = 5) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate unique verification ID
 * @returns {string}
 */
export function generateId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `VRF-${timestamp}-${random}`.toUpperCase();
}

/**
 * Get current year
 * @returns {number}
 */
export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Exam type labels
 */
export const EXAM_TYPES = [
  { value: 'smkpn', label: 'SMKPN' },
  { value: 'pascasarjana', label: 'Pascasarjana' },
  { value: 'sertifikasi-bnsp', label: 'Sertifikasi BNSP' },
  { value: 'sertifikasi-kemnaker', label: 'Sertifikasi Kemnaker' },
  { value: 'tes-online', label: 'Tes Online' },
  { value: 'lainnya', label: 'Lainnya' },
];

/**
 * Get exam label from value
 * @param {string} value
 * @returns {string}
 */
export function getExamLabel(value) {
  const exam = EXAM_TYPES.find(e => e.value === value);
  return exam ? exam.label : value;
}

/**
 * Check if exam type is PMB related
 * @param {string} type
 * @returns {boolean}
 */
export function isPMBType(type) {
  return ['smkpn', 'pascasarjana'].includes(type);
}

/**
 * Check if exam type is certification
 * @param {string} type
 * @returns {boolean}
 */
export function isCertificationType(type) {
  return ['sertifikasi-bnsp', 'sertifikasi-kemnaker'].includes(type);
}

/**
 * Get the base path of the application dynamically from window.location
 * @returns {string}
 */
export function getAppBasePath() {
  const pathname = window.location.pathname;
  let base = pathname;
  
  if (base.includes('/verify/')) {
    base = base.substring(0, base.indexOf('/verify/'));
  } else if (base.includes('/verify')) {
    base = base.substring(0, base.indexOf('/verify'));
  }
  
  if (base.includes('/result')) {
    base = base.substring(0, base.indexOf('/result'));
  }
  
  if (!base.endsWith('/')) {
    base = base + '/';
  }
  
  return base;
}

/**
 * Get basename suitable for React Router
 * @returns {string}
 */
export function getRouterBasename() {
  const base = getAppBasePath();
  if (base === '/') return '/';
  if (base.endsWith('/')) {
    return base.slice(0, -1);
  }
  return base;
}
