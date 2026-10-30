import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  ExternalLink,
  Expand,
  Map as MapIcon,
  MapPin,
  Sparkles,
  X,
  Layers,
  Compass,
} from "lucide-react";
import {
  CULTURAL_MAP_CATEGORIES,
  CULTURAL_MAP_METADATA,
  CULTURAL_MAP_PLACES,
  type CulturalMapPlace,
} from "../data/culturalMap";
import { BrushStroke } from "../components/BrushMotifs";
import MapZoomViewer from "../components/MapZoomViewer";

export const CulturalMapPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"interactive" | "poster">("interactive");
  const [isMobileMapActive, setIsMobileMapActive] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const lightboxRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    document.title = "Otros proyectos culturales · Cartografía Comuna 11 | Revelado Cultural";
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = () => {
    setIsLightboxOpen(true);
    lightboxRef.current?.showModal();
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    lightboxRef.current?.close();
    document.body.style.overflow = "";
  };

  return (
    <div className="bg-[#170B25] text-[#FAF6FB] min-h-screen">
      {/* 1. Hero Header Section */}
      <section className="relative w-full border-b border-[#3D2254] bg-gradient-to-b from-[#29143B] via-[#170B25] to-[#170B25] pt-10 pb-14 sm:pt-14 sm:pb-20 overflow-hidden">
        {/* Glow orb background */}
        <div
          className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-[#902B90]/15 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="layout-container relative z-10">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Link
              to="/"
              className="btn-press inline-flex items-center gap-2 text-xs sm:text-sm font-mono-meta text-[#D1C6DA] hover:text-[#F9C63C] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#F9C63C]" aria-hidden="true" />
              <span>Volver al inicio</span>
            </Link>
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#170B25] border border-[#3D2254] font-mono-meta text-xs text-[#F9C63C] font-semibold mb-4">
              <Compass className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
              <span>Ecosistema territorial · Laureles–Estadio</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl text-[#FAF6FB] tracking-tight leading-tight">
              Otros proyectos culturales
            </h1>

            <div className="mt-3 -ml-2 pointer-events-none" aria-hidden="true">
              <BrushStroke className="w-60 h-8 sm:w-80 sm:h-10 opacity-70" color="#B184D5" accentColor="#F9C63C" />
            </div>

            <p className="mt-4 text-base sm:text-xl text-[#D1C6DA] leading-relaxed max-w-3xl">
              Cartografía cultural colaborativa de la <strong>Comuna 11</strong>. Un mapeo vivo de <strong>57 lugares, colectivos, teatros, cafés patrimoniales y escenarios</strong> que tejen la memoria y el arte barrial más allá de las convocatorias oficiales.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 pt-6 border-t border-[#3D2254] grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl">
              <div className="p-3.5 rounded-xl bg-[#29143B] border border-[#3D2254]">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#F9C63C] block">57</span>
                <span className="font-mono-meta text-xs text-[#D1C6DA] block mt-0.5">Lugares mapeados</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#29143B] border border-[#3D2254]">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#B184D5] block">10</span>
                <span className="font-mono-meta text-xs text-[#D1C6DA] block mt-0.5">Categorías</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#29143B] border border-[#3D2254]">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] block">01</span>
                <span className="font-mono-meta text-xs text-[#D1C6DA] block mt-0.5">Comuna viva (C-11)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#29143B] border border-[#3D2254]">
                <span className="font-display font-black text-2xl sm:text-3xl text-[#10B981] block">100%</span>
                <span className="font-mono-meta text-xs text-[#D1C6DA] block mt-0.5">Acceso libre</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href={CULTURAL_MAP_METADATA.googleMapsViewerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-press inline-flex items-center gap-2 min-h-12 px-5 sm:px-6 py-2.5 rounded-full bg-[#F9C63C] text-[#170B25] text-sm sm:text-base font-bold shadow-md hover:bg-[#EAB428] transition-colors"
                aria-label="Abrir mapa interactivo de la Comuna 11 en Google Maps (se abre en nueva pestaña)"
              >
                <span>Abrir en Google Maps</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </a>

              <a
                href={CULTURAL_MAP_METADATA.pdfDownloadUrl}
                download="mapa-cartografia-cultural-comuna-11.pdf"
                className="btn-press inline-flex items-center gap-2 min-h-12 px-5 sm:px-6 py-2.5 rounded-full bg-[#29143B] hover:bg-[#37105F] border border-[#3D2254] hover:border-[#F9C63C] text-[#FAF6FB] text-sm sm:text-base font-semibold transition-colors shadow-sm"
                aria-label="Descargar afiche cartográfico en formato PDF de alta resolución (2.4 MB)"
              >
                <Download className="w-4 h-4 text-[#F9C63C]" aria-hidden="true" />
                <span>Descargar mapa en PDF (2.4 MB)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Map Viewer Section with Dual-View Switcher */}
      <section className="w-full py-12 sm:py-16 bg-[#170B25]" aria-labelledby="map-viewer-heading">
        <div className="layout-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <h2
                id="map-viewer-heading"
                className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB] tracking-tight"
              >
                Explorador de la Cartografía Cultural
              </h2>
              <p className="mt-1 text-sm sm:text-base text-[#D1C6DA]">
                Elige entre el mapa interactivo de Google Maps o el mapa ilustrado original del taller.
              </p>
            </div>

            {/* Mode Switcher Buttons */}
            <div
              role="tablist"
              aria-label="Formato de visualización del mapa"
              className="inline-flex p-1 rounded-full bg-[#29143B] border border-[#3D2254] self-start md:self-auto shadow-inner"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "interactive"}
                aria-controls="panel-interactive"
                id="tab-interactive"
                onClick={() => setActiveTab("interactive")}
                className={`btn-press inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "interactive"
                    ? "bg-[#F9C63C] text-[#170B25] shadow-sm font-bold"
                    : "text-[#D1C6DA] hover:text-[#FAF6FB]"
                }`}
              >
                <MapIcon className="w-4 h-4" aria-hidden="true" />
                <span>Mapa interactivo</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "poster"}
                aria-controls="panel-poster"
                id="tab-poster"
                onClick={() => setActiveTab("poster")}
                className={`btn-press inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === "poster"
                    ? "bg-[#F9C63C] text-[#170B25] shadow-sm font-bold"
                    : "text-[#D1C6DA] hover:text-[#FAF6FB]"
                }`}
              >
                <Layers className="w-4 h-4" aria-hidden="true" />
                <span>Mapa ilustrado</span>
              </button>
            </div>
          </div>

          {/* Panel 1: Google My Maps Interactive Embed */}
          {activeTab === "interactive" && (
            <div
              id="panel-interactive"
              role="tabpanel"
              aria-labelledby="tab-interactive"
              className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-3 sm:p-5 shadow-[0_16px_40px_rgba(14,6,23,0.6)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1 text-xs font-mono-meta text-[#D1C6DA]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" aria-hidden="true" />
                  <span>Google My Maps en vivo · 57 capas georreferenciadas</span>
                </div>
                <a
                  href={CULTURAL_MAP_METADATA.googleMapsViewerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#F9C63C] hover:underline font-bold"
                >
                  <span>Abrir en ventana completa</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              {/* Responsive Iframe Container with Mobile Scroll Guard */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] min-h-[420px] max-h-[640px] rounded-xl overflow-hidden bg-[#170B25] border border-[#3D2254]">
                <iframe
                  src={CULTURAL_MAP_METADATA.googleMapsEmbedUrl}
                  title="Mapa Interactivo del Taller de Cartografía de la Comuna 11 en Google My Maps"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  className="w-full h-full border-0"
                  style={{ pointerEvents: isMobileMapActive ? "auto" : "none" }}
                />

                {/* Mobile scroll-trap blocker toggle */}
                {!isMobileMapActive && (
                  <div
                    onClick={() => setIsMobileMapActive(true)}
                    className="md:hidden absolute inset-0 bg-[#170B25]/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-opacity"
                    role="button"
                    tabIndex={0}
                    aria-label="Tocar para interactuar con el mapa táctil"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setIsMobileMapActive(true);
                      }
                    }}
                  >
                    <span className="px-4 py-2 rounded-full bg-[#F9C63C] text-[#170B25] text-xs font-bold shadow-lg">
                      Toca aquí para interactuar con el mapa
                    </span>
                    <span className="text-[11px] font-mono-meta text-[#FAF6FB] mt-2 drop-shadow">
                      (Evita que el mapa bloquee el desplazamiento vertical en tu pantalla)
                    </span>
                  </div>
                )}

                {isMobileMapActive && (
                  <button
                    type="button"
                    onClick={() => setIsMobileMapActive(false)}
                    className="md:hidden absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#170B25]/90 border border-[#3D2254] text-[#FAF6FB] text-xs font-mono-meta shadow-md"
                  >
                    Bloquear desplazamiento
                  </button>
                )}
              </div>

              <div className="mt-3 px-1 flex flex-wrap items-center justify-between gap-2 text-xs font-mono-meta text-[#A697B3]">
                <span>Navega con zoom (+ / -) y explora los barrios: Estadio, Suramericana, Laureles, Los Colores y Carlos E. Restrepo.</span>
                <span className="hidden sm:inline">Fuente: Taller de Cartografía Comuna 11</span>
              </div>
            </div>
          )}

          {/* Panel 2: Illustrated Cartographic Poster (PDF View) */}
          {activeTab === "poster" && (
            <div
              id="panel-poster"
              role="tabpanel"
              aria-labelledby="tab-poster"
              className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-4 sm:p-6 shadow-[0_16px_40px_rgba(14,6,23,0.6)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-display font-bold text-lg text-[#FAF6FB]">
                    Mapa ilustrado: Taller de Cartografía Cultural
                  </h3>
                  <p className="text-xs text-[#D1C6DA] font-mono-meta mt-0.5">
                    Diseño colaborativo elaborado por vecinos y creadores de la Comuna 11 · 300 DPI · Con lupa y zoom interactivo
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={openLightbox}
                    className="btn-press inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#170B25] hover:bg-[#37105F] border border-[#3D2254] hover:border-[#F9C63C] text-xs font-mono-meta text-[#FAF6FB] transition-colors"
                  >
                    <Expand className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                    <span>Ampliar afiche</span>
                  </button>

                  <a
                    href={CULTURAL_MAP_METADATA.pdfDownloadUrl}
                    download="mapa-cartografia-cultural-comuna-11.pdf"
                    className="btn-press inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F9C63C] text-[#170B25] text-xs font-bold shadow-sm hover:bg-[#EAB428] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Descargar PDF</span>
                  </a>
                </div>
              </div>

              {/* Interactive Zoom & Magnifier (Lupa) Viewer */}
              <MapZoomViewer
                imageSrc={CULTURAL_MAP_METADATA.posterImage1200}
                highResSrc={CULTURAL_MAP_METADATA.posterImageFull}
                alt="Afiche cartográfico ilustrado de la Comuna 11 con 57 puntos culturales y categorización"
                onOpenFullscreen={openLightbox}
              />
            </div>
          )}
        </div>
      </section>

      {/* 3. Simple Clean List of 57 Cultural Places */}
      <section className="w-full py-12 sm:py-16 border-t border-[#3D2254] bg-[#29143B]" aria-labelledby="directorio-heading">
        <div className="layout-container">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 font-mono-meta text-xs text-[#F9C63C] font-bold uppercase mb-2">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Directorio Territorial</span>
            </div>
            <h2
              id="directorio-heading"
              className="font-display font-black text-2xl sm:text-4xl text-[#FAF6FB] tracking-tight"
            >
              Los 57 lugares culturales mapeados
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#D1C6DA] leading-relaxed">
              Listado completo de colectivos, escenarios, librerías, parques y lugares de encuentro identificados en el taller de cartografía de la Comuna 11.
            </p>
          </div>

          {/* Simple Clean List */}
          <div className="rounded-2xl bg-[#170B25] border border-[#3D2254] p-4 sm:p-6 shadow-xl">
            <div className="pb-4 mb-4 border-b border-[#3D2254] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-meta text-[#D1C6DA]">
              <span className="font-semibold text-[#F9C63C]">
                57 lugares mapeados · Del #01 al #57
              </span>
              <span className="text-[#A697B3]">
                Haz clic en cualquier lugar para ubicarlo en Google Maps
              </span>
            </div>

            <ol
              id="directorio-lugares"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1"
            >
              {CULTURAL_MAP_PLACES.map((place) => {
                const cat = CULTURAL_MAP_CATEGORIES.find((c) => c.id === place.categoryId);
                const googleSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${place.name}, Medellín, Comuna 11`
                )}`;

                return (
                  <li key={place.id}>
                    <a
                      href={googleSearchUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-2 px-2.5 rounded-lg hover:bg-[#29143B] transition-colors border border-transparent hover:border-[#3D2254]"
                      title={`Ubicar ${place.name} en Google Maps`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        {/* Number bullet badge */}
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center font-mono-meta text-[11px] font-bold text-[#FAF6FB] shrink-0 shadow-sm"
                          style={{ backgroundColor: cat?.color ?? "#902B90" }}
                        >
                          {place.id < 10 ? `0${place.id}` : place.id}
                        </span>

                        <div className="min-w-0">
                          <span className="font-medium text-sm text-[#FAF6FB] group-hover:text-[#F9C63C] transition-colors block truncate">
                            {place.name}
                          </span>
                          <span className="text-[11px] font-mono-meta text-[#A697B3] block truncate">
                            {place.categoryName}
                            {place.outsideMap && (
                              <span className="text-[#F97316] font-semibold ml-1">
                                · Fuera del mapa
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      <ArrowUpRight
                        className="w-3.5 h-3.5 text-[#D1C6DA] group-hover:text-[#F9C63C] transition-colors shrink-0 opacity-40 group-hover:opacity-100"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* 4. Connection with Revelado Cultural 8 Initiatives */}
      <section className="w-full py-16 bg-[#170B25] border-t border-[#3D2254]">
        <div className="layout-container">
          <div className="rounded-2xl bg-[#29143B] border border-[#3D2254] p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_16px_40px_rgba(14,6,23,0.6)]">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono-meta text-xs text-[#F9C63C] font-bold uppercase mb-2">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>La cultura continúa en el barrio</span>
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FAF6FB]">
                Conoce las ocho iniciativas ganadoras de Presupuesto Participativo
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#D1C6DA] leading-relaxed">
                Este mapa cartográfico dialoga con proyectos como <em>«Pensar, narrar y habitar el territorio»</em> y espacios de creación comunitaria como <em>Sabbath Studio</em> (punto #01) y <em>Tinto de Verano</em> (punto #15).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/explorar"
                className="btn-press inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F9C63C] text-[#170B25] text-sm font-bold shadow-md hover:bg-[#EAB428] transition-colors"
              >
                <span>Explorar iniciativas</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" aria-hidden="true" />
              </Link>
              <Link
                to="/"
                className="btn-press inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#170B25] hover:bg-[#37105F] border border-[#3D2254] text-[#FAF6FB] text-sm font-medium transition-colors"
              >
                <span>Volver al inicio</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Accessible Modal Lightbox for Poster Image */}
      <dialog
        ref={lightboxRef}
        aria-label="Visor ampliado del afiche cartográfico de la Comuna 11"
        onCancel={closeLightbox}
        onClick={(e) => {
          if (e.target === lightboxRef.current) closeLightbox();
        }}
        className="w-full max-w-6xl rounded-2xl bg-[#170B25] border border-[#3D2254] text-[#FAF6FB] p-0 backdrop:bg-black/90 backdrop:backdrop-blur-md shadow-2xl m-auto"
      >
        <div className="p-4 sm:p-6 flex flex-col max-h-[96vh]">
          <div className="flex items-center justify-between gap-4 pb-3 border-b border-[#3D2254]">
            <div>
              <h3 className="font-display font-black text-lg sm:text-xl text-[#FAF6FB]">
                Taller de Cartografía Cultural · Comuna 11
              </h3>
              <p className="text-xs font-mono-meta text-[#D1C6DA] mt-0.5">
                Laureles · Estadio · Medellín · Afiche cartográfico con lupa y zoom de alta resolución (300 DPI)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={CULTURAL_MAP_METADATA.pdfDownloadUrl}
                download="mapa-cartografia-cultural-comuna-11.pdf"
                className="btn-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F9C63C] text-[#170B25] text-xs font-bold"
              >
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Descargar PDF</span>
              </a>

              <button
                type="button"
                autoFocus
                onClick={closeLightbox}
                className="btn-press p-2 rounded-full bg-[#29143B] border border-[#3D2254] hover:border-[#F9C63C] text-[#FAF6FB] text-xs cursor-pointer transition-colors"
                aria-label="Cerrar visor"
              >
                <X className="w-4 h-4 text-[#F9C63C]" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="py-3 flex-1 overflow-hidden">
            <MapZoomViewer
              imageSrc={CULTURAL_MAP_METADATA.posterImage1200}
              highResSrc={CULTURAL_MAP_METADATA.posterImageFull}
              alt="Afiche cartográfico ampliado de la Comuna 11 con lupa y zoom"
              isFullscreen={true}
            />
          </div>

          <div className="pt-2 border-t border-[#3D2254] flex flex-wrap items-center justify-between text-xs font-mono-meta text-[#A697B3]">
            <span>Usa el Modo Lupa o arrastra el mapa con zoom para explorar las 57 referencias territoriales.</span>
            <button
              type="button"
              onClick={closeLightbox}
              className="text-[#F9C63C] hover:underline font-semibold"
            >
              Cerrar visor
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default CulturalMapPage;
