import React from "react";

interface BrushProps {
  className?: string;
  color?: string;
  accentColor?: string;
}

/**
 * 1. Espiral Cultural — Espiral dinámica abierta con pincelada orgánica y giro expresivo
 */
export const BrushSpiral: React.FC<BrushProps> = ({
  className = "w-24 h-24",
  color = "#B184D5", // Lavender
  accentColor = "#F9C63C", // Yellow
}) => (
  <svg
    viewBox="0 0 160 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Trazo secundario de soporte en morado profundo */}
    <path
      d="M32 128C18 108 22 72 45 48C70 22 112 24 132 50C150 74 144 114 118 132C94 148 60 140 48 116C38 94 48 70 66 60C82 52 100 58 104 74C108 88 98 100 86 100"
      stroke="#902B90"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.4"
    />
    {/* Trazo principal de caligrafía y pincelada con variación */}
    <path
      d="M36 124C22 104 26 68 50 44C76 18 118 20 138 46C156 70 150 110 124 128C100 144 66 136 54 112C44 90 54 66 72 56C88 48 106 54 110 70C114 84 104 96 92 96"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Acento enérgico interior en amarillo */}
    <path
      d="M72 56C88 48 106 54 110 70C113 81 106 91 96 94"
      stroke={accentColor}
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {/* Toque suelto de brocha */}
    <circle cx="120" cy="38" r="3" fill={accentColor} />
    <circle cx="34" cy="52" r="2.5" fill={color} />
  </svg>
);

/**
 * 2. Trazo Expresivo — Curva fluida y rotunda que marca dirección, ritmo y dinamismo
 */
export const BrushStroke: React.FC<BrushProps> = ({
  className = "w-48 h-12",
  color = "#B184D5",
  accentColor = "#F9C63C",
}) => (
  <svg
    viewBox="0 0 240 60"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Sombra de pincel morado */}
    <path
      d="M10 44C45 48 95 18 145 22C185 25 210 38 230 32"
      stroke="#902B90"
      strokeWidth="6"
      strokeLinecap="round"
      opacity="0.35"
    />
    {/* Pincelada principal lavanda */}
    <path
      d="M8 40C45 44 92 14 142 18C182 21 208 34 228 28"
      stroke={color}
      strokeWidth="7"
      strokeLinecap="round"
    />
    {/* Trazo rápido superpuesto amarillo */}
    <path
      d="M40 38C80 20 120 16 160 20"
      stroke={accentColor}
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* Salpicaduras en los extremos */}
    <circle cx="234" cy="24" r="2" fill={accentColor} />
    <circle cx="225" cy="40" r="1.5" fill={color} />
  </svg>
);

/**
 * 3. Fragmentos Dinámicos — Salpicaduras, flecos y gotas de pintura festivalera
 */
export const BrushSplatter: React.FC<BrushProps> = ({
  className = "w-32 h-32",
  color = "#B184D5",
  accentColor = "#F9C63C",
}) => (
  <svg
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Gotas y salpicaduras amarillas */}
    <ellipse cx="68" cy="28" rx="8" ry="4" transform="rotate(-30 68 28)" fill={accentColor} />
    <circle cx="92" cy="46" r="3" fill={accentColor} />
    <circle cx="42" cy="22" r="2" fill={accentColor} />
    <path
      d="M84 72C88 66 94 68 96 74C97 80 91 84 86 82C82 80 80 76 84 72Z"
      fill={accentColor}
    />

    {/* Manchas y trazos lavanda */}
    <path
      d="M24 64C20 52 32 44 44 50C52 54 58 66 50 74C42 82 28 78 24 64Z"
      fill={color}
      opacity="0.85"
    />
    <circle cx="28" cy="38" r="3" fill={color} />
    <ellipse cx="38" cy="92" rx="6" ry="3" transform="rotate(25 38 92)" fill={color} />
    <circle cx="74" cy="98" r="2.5" fill={color} />

    {/* Trazo enérgico morado */}
    <path
      d="M52 38C62 48 64 64 60 76"
      stroke="#902B90"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * 4. Curva Envolvente — Marco orgánico que abraza esquinas de fotografías o tarjetas
 */
export const BrushFrameCurve: React.FC<BrushProps & { position?: "top-left" | "bottom-right" }> = ({
  className = "w-20 h-20",
  color = "#B184D5",
  accentColor = "#F9C63C",
  position = "top-left",
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} ${position === "bottom-right" ? "rotate-180" : ""}`}
    aria-hidden="true"
  >
    <path
      d="M8 88C10 50 30 20 70 12C85 9 94 10 94 10"
      stroke="#37105F"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <path
      d="M10 82C12 48 32 22 68 14C80 12 88 12 88 12"
      stroke={color}
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M18 55C24 35 42 22 64 16"
      stroke={accentColor}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <circle cx="8" cy="88" r="2.5" fill={accentColor} />
  </svg>
);

/**
 * 5. Divisor de Transición — Ola orgánica que une y separa secciones con ritmo visual
 */
export const BrushDivider: React.FC<{ className?: string }> = ({
  className = "w-full h-8",
}) => (
  <div className={`overflow-hidden relative pointer-events-none select-none ${className}`} aria-hidden="true">
    <svg
      viewBox="0 0 1200 40"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path
        d="M0 24C150 12 300 36 450 20C600 4 750 32 900 18C1050 4 1150 28 1200 22"
        stroke="#37105F"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M0 20C150 8 300 32 450 16C600 2 750 28 900 14C1050 2 1150 24 1200 18"
        stroke="#B184D5"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M320 28C420 18 520 14 620 24"
        stroke="#F9C63C"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  </div>
);
