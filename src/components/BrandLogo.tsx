import React from "react";
import { Link } from "react-router-dom";

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  compact = false,
  className = "",
}) => {
  return (
    <Link
      to="/"
      aria-label="Revelado Cultural — Inicio"
      className={`group inline-flex items-center gap-2.5 sm:gap-3 focus:outline-none ${className}`}
    >
      {/* Símbolo "R" con pincelada gestual y fondo oscuro */}
      <span
        className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-[#29143B] border border-[#583178] transition-colors group-hover:border-[#F9C63C] shadow-sm overflow-hidden"
        aria-hidden="true"
      >
        {/* Curva sutil de pincelada en fondo morado */}
        <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#902B90]/40 blur-xs" />
        <span className="absolute -bottom-2 -left-1 w-7 h-4 rounded-full bg-[#B184D5]/25" />

        {/* Glifo tipográfico "R" condensado amarillo */}
        <span className="relative z-10 font-display font-black text-2xl text-[#F9C63C] select-none tracking-tight leading-none pt-0.5">
          R
        </span>
      </span>

      {!compact && (
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline gap-1.5 leading-none">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-[#F9C63C] uppercase group-hover:text-[#FAF6FB] transition-colors">
              REVELADO
            </span>
            <span className="font-script text-xl sm:text-2xl text-[#B184D5] group-hover:text-[#F9C63C] transition-colors">
              Cultural
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-mono-meta text-[10px] text-[#D1C6DA] uppercase tracking-wider leading-none mt-1">
            <span className="text-[#F9C63C] font-semibold">Comuna 11</span>
            <span>·</span>
            <span>Medellín</span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default BrandLogo;
