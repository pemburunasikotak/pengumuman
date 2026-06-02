import { useState, useEffect, useCallback, useRef } from 'react';
import { generateCaptcha } from '../utils/helpers';

export default function Captcha({ onCaptchaChange }) {
  const [captchaText, setCaptchaText] = useState('');
  const canvasRef = useRef(null);

  const drawCaptcha = useCallback((text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Background — clean dark
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += 12) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 12) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Noise dots
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = `rgba(${150 + Math.random() * 100}, ${150 + Math.random() * 100}, ${200 + Math.random() * 55}, ${0.2 + Math.random() * 0.15})`;
      ctx.beginPath();
      ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Distortion lines
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = `rgba(100, 160, 255, ${0.08 + Math.random() * 0.08})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.bezierCurveTo(
        Math.random() * width, Math.random() * height,
        Math.random() * width, Math.random() * height,
        Math.random() * width, Math.random() * height
      );
      ctx.stroke();
    }

    // Draw text
    const charWidth = width / (text.length + 1.5);

    text.split('').forEach((char, i) => {
      ctx.save();
      const x = charWidth * (i + 1);
      const y = height / 2 + (Math.random() * 6 - 3);
      const angle = (Math.random() - 0.5) * 0.3;

      ctx.translate(x, y);
      ctx.rotate(angle);

      const fontSize = 24 + Math.random() * 4;
      ctx.font = `bold ${fontSize}px 'SF Mono', 'Fira Code', monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Glow
      ctx.shadowColor = 'rgba(96, 165, 250, 0.6)';
      ctx.shadowBlur = 8;
      ctx.fillStyle = `hsl(${200 + i * 20}, 80%, ${75 + Math.random() * 10}%)`;
      ctx.fillText(char, 0, 0);

      ctx.restore();
    });
  }, []);

  const refreshCaptcha = useCallback(() => {
    const newCaptcha = generateCaptcha(5);
    setCaptchaText(newCaptcha);
    onCaptchaChange(newCaptcha);
  }, [onCaptchaChange]);

  useEffect(() => {
    refreshCaptcha();
  }, []);

  useEffect(() => {
    if (captchaText && canvasRef.current) {
      drawCaptcha(captchaText);
    }
  }, [captchaText, drawCaptcha]);

  return (
    <div className="flex items-center gap-2.5">
      <canvas
        ref={canvasRef}
        width={200}
        height={52}
        className="rounded-lg border border-white/10 select-none bg-slate-950"
        style={{ imageRendering: 'auto', height: '48px', width: '200px' }}
      />
      <button
        type="button"
        onClick={refreshCaptcha}
        className="flex items-center justify-center w-10 h-[48px] rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-slate-400 hover:text-white cursor-pointer"
        title="Refresh Captcha"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M21.024 4.66v4.993" />
        </svg>
      </button>
    </div>
  );
}
