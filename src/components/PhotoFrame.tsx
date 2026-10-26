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
      className={`viewfinder-frame group relative overflow-hidden rounded-lg bg-[#151515] ${aspectRatio} ${className}`}
    >
      {children}

      {showCorners && (
        <>
          {/* Esquina superior izquierda ┌ */}
          <span
            className={`viewfinder-corner viewfinder-corner-tl border-t border-l border-[#FF5C38] ${sizeClasses}`}
            aria-hidden="true"
          />
          {/* Esquina superior derecha ┐ */}
          <span
            className={`viewfinder-corner viewfinder-corner-tr border-t border-r border-[#FF5C38] ${sizeClasses}`}
            aria-hidden="true"
          />
          {/* Esquina inferior izquierda └ */}
          <span
            className={`viewfinder-corner viewfinder-corner-bl border-b border-l border-[#FF5C38] ${sizeClasses}`}
            aria-hidden="true"
          />
          {/* Esquina inferior derecha ┘ */}
          <span
            className={`viewfinder-corner viewfinder-corner-br border-b border-r border-[#FF5C38] ${sizeClasses}`}
            aria-hidden="true"
          />
        </>
      )}

      {badgeText && (
        <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#151515]/90 font-mono-meta text-[11px] font-semibold text-[#F2EFE8] border border-[#2D2D2D] z-10 pointer-events-none">
          {badgeText}
        </span>
      )}
    </div>
  );
};

export default PhotoFrame;
