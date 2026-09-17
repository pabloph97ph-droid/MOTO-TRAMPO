// src/components/Logo.tsx
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon-only';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  onClick
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.26em]',
    lg: 'text-xs tracking-[0.3em]',
    xl: 'text-sm tracking-[0.35em]'
  };

  return (
    <div
      id="brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Emblem SVG Icon */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        {/* Subtle gold ambient glow */}
        <div className="absolute inset-0 rounded-xl bg-amber-500/20 blur-sm transform scale-110" />
        
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full relative z-10 drop-shadow-md"
        >
          {/* Outer Shield with Gold Edge */}
          <path
            d="M24 3L8 9V22C8 32.5 15 42 24 45C33 42 40 32.5 40 22V9L24 3Z"
            fill="#090F1B"
            stroke="#F59E0B"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          {/* Inner Road Curve from bottom left to top right with perspective */}
          <path
            d="M13 36 C15 28, 20 20, 34 14 L36 18 C25 24, 20 32, 19 39 Z"
            fill="#FFFFFF"
          />
          <path
            d="M17 38 C18.5 31, 23 23, 35 16.5"
            stroke="#090F1B"
            strokeWidth="1.2"
            strokeDasharray="2 2"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {variant === 'full' && (
        <div className="flex flex-col justify-center leading-none text-left">
          <span
            className={`font-extrabold text-white uppercase tracking-wider font-['Outfit',sans-serif] ${titleSizes[size]}`}
          >
            ROTA <span className="text-amber-400 font-black">SEGURA</span>
          </span>
          <span
            className={`font-semibold text-amber-500/90 uppercase font-['Plus_Jakarta_Sans',sans-serif] mt-0.5 ${subtitleSizes[size]}`}
          >
            ENTREGAS EXPRESSAS
          </span>
        </div>
      )}
    </div>
  );
};
