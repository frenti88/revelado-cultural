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
      className={`group inline-flex items-center gap-3 focus:outline-none ${className}`}
    >
      {/* Símbolo "R" con encuadre de revelado fotográfico y espacio negativo */}
      <span
        className="relative flex items-center justify-center w-10 h-10 rounded-md bg-[#222222] border border-[#2D2D2D] transition-colors group-hover:border-[#FF5C38]"
        aria-hidden="true"
      >
        {/* Esquinas de encuadre en rojo vermillion */}
        <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-[#FF5C38]" />
        <span className="absolute top-1 right-1 w-1.5 h-1.5 border-t border-r border-[#FF5C38]" />
        <span className="absolute bottom-1 left-1 w-1.5 h-1.5 border-b border-l border-[#FF5C38]" />
        <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-[#FF5C38]" />

        {/* Glifo tipográfico "R" en negativo */}
        <span className="font-display font-black text-lg text-[#F2EFE8] select-none tracking-tight">
          R
        </span>
      </span>

      {!compact && (
        <div className="flex flex-col">
          <span className="font-display font-black text-base sm:text-lg tracking-tight text-[#F2EFE8] leading-tight group-hover:text-[#FF5C38] transition-colors">
            REVELADO
          </span>
          <div className="flex items-center gap-1.5 font-mono-meta text-[10px] text-[#A7A39D] uppercase tracking-wider leading-none mt-0.5">
            <span className="text-[#FF5C38] font-bold">CULTURAL</span>
            <span>·</span>
            <span>Comuna 11</span>
          </div>
        </div>
      )}
    </Link>
  );
};

export default BrandLogo;
