import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Compass, Film, Headphones, MapPin, RotateCcw } from "lucide-react";
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

const THEMATIC_GROUPS = [
  { id: "todos", label: "Todas las historias", icon: Compass },
  { id: "movimiento", label: "Arte en movimiento", icon: Film },
  { id: "sonido", label: "Historias para escuchar", icon: Headphones },
  { id: "territorio", label: "Historias sobre el territorio", icon: MapPin },
] as const;

export const ExplorePage: React.FC = () => {
  const { publishedProjects } = useCatalog();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawCategory = searchParams.get("categoria");
  const selectedCategory =
    rawCategory &&
    (CONFIRMED_CATEGORIES as readonly string[]).includes(rawCategory)
      ? rawCategory
      : null;
  const rawGroup = searchParams.get("grupo");
  const selectedGroup =
    rawGroup && ["movimiento", "sonido", "territorio"].includes(rawGroup)
      ? rawGroup
      : null;
  const query = searchParams.get("q") ?? "";

  useEffect(() => {
    document.title = selectedCategory
      ? `Explorar ${selectedCategory} · Revelado Cultural`
      : selectedGroup
      ? `Explorar grupo · Revelado Cultural`
      : "Explorar las 8 iniciativas · Revelado Cultural";
  }, [selectedCategory, selectedGroup]);

  const countsByCategory = useMemo(() => {
    return CONFIRMED_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
      acc[cat] = publishedProjects.filter((p) => p.category === cat).length;
      return acc;
    }, {});
  }, [publishedProjects]);

  const countsByGroup = useMemo(() => {
    return {
      movimiento: publishedProjects.filter((p) => p.thematicGroup === "movimiento").length,
      sonido: publishedProjects.filter((p) => p.thematicGroup === "sonido").length,
      territorio: publishedProjects.filter((p) => p.thematicGroup === "territorio").length,
    };
  }, [publishedProjects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = normalizeText(query.trim());
    return publishedProjects.filter((project) => {
      if (selectedCategory && project.category !== selectedCategory) {
        return false;
      }
      if (selectedGroup && project.thematicGroup !== selectedGroup) {
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
  }, [publishedProjects, selectedCategory, selectedGroup, query]);

  const updateFilters = (
    nextCategory: string | null,
    nextGroup: string | null,
    nextQuery: string
  ) => {
    const next = new URLSearchParams();
    if (nextCategory) {
      next.set("categoria", nextCategory);
    }
    if (nextGroup) {
      next.set("grupo", nextGroup);
    }
    if (nextQuery.trim()) {
      next.set("q", nextQuery);
    }
    setSearchParams(next, { replace: true });
  };

  const resetAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const hasActiveFilters = Boolean(selectedCategory || selectedGroup || query.trim());

  return (
    <div className="w-full min-h-[75vh] bg-[#170B25] text-[#FAF6FB] section-macro">
      <div className="layout-container">
        {/* Header Editorial */}
        <div className="pb-6 mb-8 border-b border-[#3D2254]">
          <span className="font-mono-meta text-xs uppercase tracking-widest text-[#F9C63C] font-bold block mb-2">
            Catálogo Editorial · Comuna 11
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#FAF6FB] leading-tight">
                Encuentra lo que te mueve
              </h1>
              <p className="mt-4 text-base sm:text-lg font-normal text-[#D1C6DA] max-w-2xl">
                Filtra por disciplina, agrupación narrativa o busca por palabras clave para descubrir la cultura viva de Laureles–Estadio.
              </p>
            </div>
            <div className="hidden lg:block pb-2" aria-hidden="true">
              <BrushStroke className="w-48 h-8 opacity-60" color="#B184D5" accentColor="#F9C63C" />
            </div>
          </div>
        </div>

        {/* Agrupaciones editoriales */}
        <div className="mb-8">
          <span className="font-mono-meta text-xs uppercase tracking-wider text-[#D1C6DA] block mb-3 font-semibold">
            Agrupaciones temáticas
          </span>
          <div className="flex flex-wrap items-center gap-2.5" role="group" aria-label="Agrupaciones editoriales">
            {THEMATIC_GROUPS.map((group) => {
              const Icon = group.icon;
              const isActive = group.id === "todos" ? !selectedGroup : selectedGroup === group.id;
              const count =
                group.id === "todos"
                  ? publishedProjects.length
                  : countsByGroup[group.id as keyof typeof countsByGroup] ?? 0;

              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() =>
                    updateFilters(
                      selectedCategory,
                      group.id === "todos" ? null : group.id,
                      query
                    )
                  }
                  aria-pressed={isActive}
                  className={`btn-press inline-flex items-center gap-2 min-h-11 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#F9C63C] text-[#170B25] shadow-[0_4px_14px_rgba(249,198,60,0.3)]"
                      : "bg-[#29143B] hover:bg-[#37105F] border border-[#3D2254] text-[#D1C6DA] hover:text-[#FAF6FB]"
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                  <span>{group.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono-meta text-[11px] leading-none ${
                      isActive ? "bg-[#170B25] text-[#F9C63C] font-bold" : "bg-[#170B25] text-[#D1C6DA]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Filters Controls */}
        <div className="space-y-6 mb-12">
          <div className="layout-grid-12 items-center">
            <div className="col-span-4 md:col-span-5 lg:col-span-8">
              <SearchField
                value={query}
                onChange={(nextQuery) =>
                  updateFilters(selectedCategory, selectedGroup, nextQuery)
                }
              />
            </div>

            {/* Live Result Counter + Clear Filters */}
            <div className="col-span-4 md:col-span-3 lg:col-span-4 flex items-center justify-between lg:justify-end gap-4">
              <p
                role="status"
                aria-live="polite"
                className="font-mono-meta text-xs sm:text-sm font-bold text-[#F9C63C]"
              >
                Mostrando {filteredProjects.length} de {publishedProjects.length}{" "}
                {filteredProjects.length === 1 ? "iniciativa" : "iniciativas"}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1.5 min-h-10 px-3.5 py-1.5 rounded-full bg-[#29143B] hover:bg-[#37105F] border border-[#3D2254] hover:border-[#F9C63C] text-[#FAF6FB] text-xs font-mono-meta transition-colors cursor-pointer shadow-sm"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#F9C63C]" aria-hidden="true" />
                  <span>Limpiar filtros</span>
                </button>
              )}
            </div>
          </div>

          <CategoryFilters
            selectedCategory={selectedCategory}
            onSelectCategory={(nextCategory) =>
              updateFilters(nextCategory, selectedGroup, query)
            }
            countsByCategory={countsByCategory}
            totalCount={publishedProjects.length}
          />
        </div>

        {/* Results Grid or Empty State */}
        {filteredProjects.length > 0 ? (
          <ProjectGrid
            projects={filteredProjects}
            columns={4}
            aspect="square"
          />
        ) : (
          <EmptyState
            query={query}
            category={selectedCategory}
            onReset={resetAllFilters}
            onSuggestQuery={(suggestion) => updateFilters(null, null, suggestion)}
          />
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
