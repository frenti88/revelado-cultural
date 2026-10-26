import React from "react";
import { Link } from "react-router-dom";

interface BrandLogoProps {
  compact?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
}) => {
  return (
    <Link
      to="/"
      aria-label="Revelado Cultural — Inicio"
      className={`group inline-flex items-baseline gap-1.5 sm:gap-2 focus:outline-none select-none py-1 ${className}`}
    >
      <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-[#F9C63C] uppercase group-hover:text-[#FAF6FB] transition-colors leading-none">
        REVELADO
      </span>
      <span className="font-script text-2xl sm:text-3xl text-[#B184D5] group-hover:text-[#F9C63C] transition-colors leading-none">
        Cultural
      </span>
    </Link>
  );
};

export default BrandLogo;
