import React, { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Compass, Film, Headphones, MapPin, RotateCcw } from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import { CONFIRMED_CATEGORIES } from "../data/catalog";
import SearchField from "../components/SearchField";
import CategoryFilters from "../components/CategoryFilters";
import ProjectGrid from "../components/ProjectGrid";
import EmptyState from "../components/EmptyState";

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
    <div className="w-full min-h-[75vh] bg-[#151515] section-macro">
      <div className="layout-container">
        {/* Header Editorial */}
        <div className="pb-6 mb-8 border-b border-[#2E2E2E]">
          <span className="font-mono-meta text-xs uppercase tracking-widest text-[#FF5C38] font-semibold block mb-2">
            Catálogo Editorial · Comuna 11
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F2EFE8] leading-tight">
            Encuentra lo que te mueve
          </h1>
          <p className="mt-4 text-base sm:text-lg font-normal text-[#A7A39D] max-w-2xl">
            Filtra por disciplina, agrupación narrativa o busca por palabras clave para descubrir la cultura viva de Laureles–Estadio.
          </p>
        </div>

        {/* Agrupaciones editoriales solicitadas en el prompt maestro */}
        <div className="mb-8">
          <span className="font-mono-meta text-xs uppercase tracking-wider text-[#A7A39D] block mb-3 font-medium">
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
                      ? "bg-[#C9321B]text-white shadow-[0_4px_14px_rgba(235,68,42,0.35)]"
                      : "bg-[#222222] hover:bg-[#2E2E2E] border border-[#2E2E2E] text-[#A7A39D] hover:text-[#F2EFE8]"
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2.2]" aria-hidden="true" />
                  <span>{group.label}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full font-mono-meta text-[11px] leading-none ${
                      isActive ? "bg-[#151515]/40 text-[#F2EFE8]" : "bg-[#151515] text-[#A7A39D]"
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
                className="font-mono-meta text-xs sm:text-sm font-semibold text-[#FF5C38]"
              >
                Mostrando {filteredProjects.length} de {publishedProjects.length}{" "}
                {filteredProjects.length === 1 ? "iniciativa" : "iniciativas"}
              </p>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="inline-flex items-center gap-1.5 min-h-10 px-3.5 py-1.5 rounded-full bg-[#222222] hover:bg-[#2E2E2E] border border-[#2E2E2E] hover:border-[#FF5C38] text-[#F2EFE8] text-xs font-mono-meta transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#FF5C38]" aria-hidden="true" />
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