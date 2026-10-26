import React from "react";

interface PhotoFrameProps {
  children: React.ReactNode;
  aspectRatio?: string;
  className?: string;
  showCorners?: boolean;
  cornerSize?: "sm" | "md" | "lg";
  badgeText?: string;
}

export const PhotoFrame: React.FC<PhotoFrameProps> = ({
  children,
  aspectRatio = "aspect-[4/3]",
  className = "",
  showCorners = true,
  cornerSize = "md",
  badgeText,
}) => {
  const sizeClasses = {
    sm: "w-2.5 h-2.5 border-[1.5px]",
    md: "w-3.5 h-3.5 border-2",
    lg: "w-5 h-5 border-2",
  }[cornerSize];

  return (
    <div
      className={`viewfinder-frame group relative overflow-hidden rounded-xl bg-[#170B25] ${aspectRatio} ${className}`}
    >
      {children}

      {showCorners && (
        <>
          {/* Esquina superior izquierda ┌ en amarillo dinámico */}
          <span
            className={`viewfinder-corner viewfinder-corner-tl border-t border-l border-[#F9C63C] ${sizeClasses}`}
            aria-hidden="true"
          />
          {/* Esquina superior derecha ┐ en lavanda */}
          <span
            className={`viewfinder-corner viewfinder-corner-tr border-t border-r border-[#B184D5] ${sizeClasses}`}
            aria-hidden="true"
          />
          {/* Esquina inferior izquierda └ en lavanda */}
          <span
            className={`viewfinder-corner viewfinder-corner-bl border-b border-l border-[#B184D5] ${sizeClasses}`}
            aria-hidden="true"
          />
          {/* Esquina inferior derecha ┘ en amarillo dinámico */}
          <span
            className={`viewfinder-corner viewfinder-corner-br border-b border-r border-[#F9C63C] ${sizeClasses}`}
            aria-hidden="true"
          />
        </>
      )}

      {badgeText && (
        <span className="absolute bottom-2.5 left-2.5 px-2.5 py-0.5 rounded-md bg-[#170B25]/90 font-mono-meta text-[11px] font-semibold text-[#FAF6FB] border border-[#3D2254] z-10 pointer-events-none">
          {badgeText}
        </span>
      )}
    </div>
  );
};

export default PhotoFrame;
