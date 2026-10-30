import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import { CONFIRMED_CATEGORIES } from "../data/catalog";
import SearchField from "../components/SearchField";
import CategoryFilters from "../components/CategoryFilters";
import ProjectGrid from "../components/ProjectGrid";
import EmptyState from "../components/EmptyState";
import { BrushStroke } from "../components/BrushMotifs";

function normalizeText(value: string | null | undefined): string {
  if (!value) return "";
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export const ExplorePage: React.FC = () => {
  const { publishedProjects } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawCategory = searchParams.get("categoria");
  const selectedCategory =
    rawCategory &&
    (CONFIRMED_CATEGORIES as readonly string[]).includes(rawCategory)
      ? rawCategory
      : null;
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    document.title = selectedCategory
      ? `Explorar ${selectedCategory} · Revelado Cultural`
      : "Explorar las 8 iniciativas · Revelado Cultural";
  }, [selectedCategory]);

  const countsByCategory = useMemo(() => {
    return CONFIRMED_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
      acc[cat] = publishedProjects.filter((p) => p.category === cat).length;
      return acc;
    }, {});
  }, [publishedProjects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());
    return publishedProjects.filter((project) => {
      if (selectedCategory && project.category !== selectedCategory) {
        return false;
      }
      if (!normalizedQuery) {
        return true;
      }
      const haystack = [
        project.name,
        project.shortDescription,
        project.fullDescription,
        project.editorialHeadline,
        project.leader,
        project.category,
        project.id,
      ]
        .map(normalizeText)
        .join(" ");

      return haystack.includes(normalizedQuery);
    });
  }, [publishedProjects, selectedCategory, query]);

  const updateFilters = (nextCategory: string | null, nextQuery: string) => {
    const next = new URLSearchParams();
    if (nextCategory) {
      next.set("categoria", nextCategory);
    }
    if (nextQuery.trim()) {
      next.set("q", nextQuery);
    }
    setSearchParams(next, { replace: true });
  };

  const resetAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const hasActiveFilters = Boolean(selectedCategory || query.trim());

  return (
    <div className="w-full min-h-[75vh] bg-[#170B25] text-[#FAF6FB] section-macro">
      <div className="layout-container">
        {/* Header Editorial */}
        <div className="pb-6 mb-8 border-b border-[#3D2254]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#FAF6FB] leading-tight">
                Encuentra lo que te mueve
              </h1>
              <p className="mt-4 text-base sm:text-lg font-normal text-[#D1C6DA] max-w-2xl">
                Filtra por disciplina cultural o busca por palabras clave para descubrir las ocho iniciativas de Laureles–Estadio.
              </p>
            </div>
            <div className="hidden lg:block pb-2" aria-hidden="true">
              <BrushStroke className="w-48 h-8 opacity-60" color="#B184D5" accentColor="#F9C63C" />
            </div>
          </div>
        </div>

        {/* Discovery Control Surface: Búsqueda unificada y disciplinas */}
        <div className="rounded-2xl bg-[#29143B]/60 border border-[#3D2254] p-5 sm:p-6 mb-10 space-y-4 shadow-md">
          {/* Fila 1: Búsqueda y estado de resultados */}
          <div className="layout-grid-12 items-center gap-4">
            <div className="col-span-4 md:col-span-5 lg:col-span-8">
              <SearchField
                value={query}
                onChange={(nextQuery) => updateFilters(selectedCategory, nextQuery)}
              />
            </div>

            {/* Live Result Counter + Clear Filters */}
            <div className="col-span-4 md:col-span-3 lg:col-span-4 flex items-center justify-between lg:justify-end gap-3">
              <p
                role="status"
                aria-live="polite"
                className="font-mono-meta text-xs sm:text-sm font-bold text-[#F9C63C] shrink-0"
              >
                Mostrando {filteredProjects.length} de {publishedProjects.length}{" "}
                {filteredProjects.length === 1 ? "iniciativa" : "iniciativas"}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="btn-press inline-flex items-center gap-1.5 min-h-10 px-3.5 py-1.5 rounded-full bg-[#170B25] hover:bg-[#37105F] border border-[#583178] hover:border-[#F9C63C] text-[#FAF6FB] text-xs font-mono-meta transition-colors cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                  <span>Limpiar</span>
                </button>
              )}
            </div>
          </div>

          {/* Fila 2: Filtro por Disciplinas Culturales */}
          <div className="pt-3 border-t border-[#3D2254]">
            <CategoryFilters
              selectedCategory={selectedCategory}
              onSelectCategory={(nextCategory) => updateFilters(nextCategory, query)}
              countsByCategory={countsByCategory}
              totalCount={publishedProjects.length}
            />
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <ProjectGrid
            projects={filteredProjects}
            columns={3}
            aspect="square"
          />
        ) : (
          <EmptyState
            query={query}
            category={selectedCategory}
            onReset={resetAllFilters}
            onSuggestQuery={(suggestion) => updateFilters(null, suggestion)}
          />
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
