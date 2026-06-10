import { QRCode } from 'react-qr-code';
import { motion } from 'framer-motion';
import { getAppBasePath } from '../utils/helpers';

export default function QRVerification({ verificationId, size = 160 }) {
  const verifyUrl = `${window.location.origin}${getAppBasePath()}verify/${verificationId}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex flex-col items-center justify-center"
    >
      <QRCode
        value={verifyUrl}
        size={size}
        level="H"
        fgColor="#0F172A"
        bgColor="#FFFFFF"
        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
      />
    </motion.div>
  );
}
