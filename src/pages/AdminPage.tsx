import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Lock,
  LogOut,
  Plus,
  RotateCcw,
  Save,
  Star,
} from "lucide-react";
import { useCatalog } from "../context/CatalogContext";
import { CONFIRMED_CATEGORIES } from "../data/catalog";
import type { CulturalProject, MediaAsset } from "../types/cultural";

export const AdminPage: React.FC = () => {
  const {
    allProjects,
    isAuthenticated,
    loginCurator,
    logoutCurator,
    updateProject,
    createProject,
    reorderProjects,
    resetCatalog,
  } = useCatalog();

  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");
  const [selectedId, setSelectedId] = useState<string>(
    allProjects[0]?.id ?? "01"
  );
  const [savedBanner, setSavedBanner] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [mediaError, setMediaError] = useState<string | null>(null);

  const selectedProject =
    allProjects.find((p) => p.id === selectedId) ?? allProjects[0];

  const [draft, setDraft] = useState<CulturalProject | null>(
    selectedProject ?? null
  );

  const [newMediaType, setNewMediaType] = useState<"image" | "video" | "audio">(
    "image"
  );
  const [newMediaTitle, setNewMediaTitle] = useState("");
  const [newMediaUrl, setNewMediaUrl] = useState("");
  const [newMediaAlt, setNewMediaAlt] = useState("");

  useEffect(() => {
    document.title = "Panel de edición · Revelado Cultural";
  }, []);

  useEffect(() => {
    if (selectedProject) {
      setDraft(selectedProject);
    }
  }, [selectedProject]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginCurator(passcode)) {
      setAuthError("");
      setPasscode("");
    } else {
      setAuthError(
        "Esa clave no coincide. Escribe COMUNA11-PP para entrar al panel."
      );
    }
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    updateProject(draft);
    setSavedBanner(`Cambios guardados en «${draft.name}».`);
    setTimeout(() => setSavedBanner(null), 3500);
  };

  const handleAddMedia = () => {
    if (!draft) return;
    if (!newMediaUrl.trim()) {
      setMediaError("Ingresa la URL pública o ruta del archivo antes de adjuntarlo.");
      return;
    }
    setMediaError(null);
    const asset: MediaAsset = {
      id: `${draft.id}-${newMediaType}-${Date.now()}`,
      type: newMediaType,
      title: newMediaTitle.trim() || `${draft.name} (${newMediaType})`,
      sourceUrl: newMediaUrl.trim(),
      publicUrl: newMediaUrl.trim(),
      alt: newMediaAlt.trim() || `Recurso de ${draft.name}`,
      status: "ready",
    };
    const updated: CulturalProject = {
      ...draft,
      coverImage:
        newMediaType === "image" && !draft.coverImage
          ? newMediaUrl.trim()
          : draft.coverImage,
      media: [...draft.media, asset],
    };
    setDraft(updated);
    updateProject(updated);
    setNewMediaTitle("");
    setNewMediaUrl("");
    setNewMediaAlt("");
    setSavedBanner(`Recurso ${newMediaType} agregado a «${draft.name}».`);
    setTimeout(() => setSavedBanner(null), 3500);
  };

  const handleCreateNewProject = () => {
    const nextNumber = String(allProjects.length + 1).padStart(2, "0");
    const newProj: CulturalProject = {
      id: nextNumber,
      slug: `iniciativa-${nextNumber}`,
      name: `Nueva Iniciativa Cultural ${nextNumber}`,
      category: "Gestión cultural",
      shortDescription: "Breve gancho editorial de la iniciativa.",
      fullDescription: null,
      leader: null,
      coverImage: null,
      media: [],
      featured: false,
      order: allProjects.length + 1,
      publicationStatus: "draft",
      gallerySource: null,
      podcastStatus: "not_provided",
    };
    createProject(newProj);
    setSelectedId(newProj.id);
    setDraft(newProj);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
        <div className="rounded-2xl bg-[#211820] p-6 sm:p-8 shadow-2xl">
          <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#742940] text-[#F5F0E7] mb-4">
            <Lock className="w-5 h-5 text-[#A8B69C]" aria-hidden="true" />
          </span>

          <span className="font-mono-meta text-xs font-medium text-[#A8B69C] block">
            Edición del catálogo · Comuna 11
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-[#F5F0E7] mt-2">
            Panel de edición
          </h1>
          <p className="mt-4 text-base font-normal text-[#D8CDC8] leading-relaxed">
            Desde aquí puedes actualizar textos, fotografías, videos y episodios
            de pódcast de las ocho iniciativas. Para entrar en este entorno
            local, escribe la clave{" "}
            <code className="px-2 py-1 rounded bg-[#161317] text-[#A8B69C] font-mono-meta">
              COMUNA11-PP
            </code>
            .
          </p>

          <form onSubmit={handleLogin} className="mt-6 space-y-6">
            <div>
              <label
                htmlFor="curator-passcode"
                className="block text-sm font-medium text-[#F5F0E7] mb-2"
              >
                Clave de acceso
              </label>
              <input
                id="curator-passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Ingresa COMUNA11-PP"
                className="w-full min-h-12 px-4 py-3 rounded-xl bg-[#161317] border border-[#433840] focus:border-[#A8B69C] text-[#F5F0E7] text-base"
              />
            </div>

            {authError && (
              <p role="alert" className="text-sm text-[#ffb4ab]">
                {authError}
              </p>
            )}

            <button
              type="submit"
              className="w-full min-h-12 py-3 px-6 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] text-sm font-medium transition-colors cursor-pointer"
            >
              Ingresar al estudio
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="layout-container py-12 sm:py-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#433840]/60">
        <div>
          <span className="font-mono-meta text-xs font-medium text-[#A8B69C]">
            Panel de edición · Los cambios se guardan en este navegador
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-[#F5F0E7] mt-2">
            Editar iniciativas de Revelado Cultural
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCreateNewProject}
            className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] text-sm font-medium cursor-pointer"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Nueva iniciativa</span>
          </button>

          {confirmReset ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-[#482332] px-4 py-1.5">
              <span className="text-xs font-medium text-[#F5F0E7]">
                ¿Volver a las 8 fichas originales?
              </span>
              <button
                type="button"
                onClick={() => {
                  resetCatalog();
                  setConfirmReset(false);
                  setSavedBanner("Restauramos las 8 fichas originales del catálogo.");
                  setTimeout(() => setSavedBanner(null), 3500);
                }}
                className="px-3 py-1 rounded-full bg-[#742940] text-xs font-semibold text-[#F5F0E7] cursor-pointer"
              >
                Restaurar fichas
              </button>
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="px-2 py-1 text-xs text-[#D8CDC8] hover:text-[#F5F0E7] cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-full bg-[#211820] hover:bg-[#482332] text-[#D8CDC8] text-sm font-medium cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Restaurar las 8 fichas originales</span>
            </button>
          )}

          <button
            type="button"
            onClick={logoutCurator}
            className="inline-flex items-center gap-2 min-h-10 px-4 py-2 rounded-full bg-[#211820] hover:bg-[#2c202a] text-[#D8CDC8] text-sm font-medium cursor-pointer"
          >
            <LogOut className="w-4 h-4" aria-hidden="true" />
            <span>Salir</span>
          </button>
        </div>
      </div>

      {savedBanner && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 rounded-xl bg-[#211820] px-4 py-4 text-base text-[#A8B69C] flex items-center gap-2"
        >
          <Check className="w-4 h-4" aria-hidden="true" />
          <span>{savedBanner}</span>
        </div>
      )}

      <div className="layout-grid-12 items-start">
        {/* Left List: Reorder, Publish Status & Select */}
        <div className="col-span-4 md:col-span-8 lg:col-span-5 rounded-xl bg-[#211820] p-4 sm:p-6 space-y-2">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-[#433840]/60">
            <span className="font-mono-meta text-xs font-medium text-[#A8B69C]">
              Orden de tarjetas ({allProjects.length})
            </span>
            <span className="font-mono-meta text-xs text-[#D8CDC8]">
              Reordenar
            </span>
          </div>

          {allProjects.map((proj, idx) => {
            const isSelected = proj.id === selectedId;
            return (
              <div
                key={proj.id}
                className={`rounded-lg p-4 transition-colors flex items-center justify-between gap-2 ${
                  isSelected
                    ? "bg-[#742940]/45"
                    : "bg-[#161317] hover:bg-[#1b161c]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(proj.id)}
                  className="text-left min-w-0 flex-1 cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-mono-meta text-xs">
                    <span className="text-[#A8B69C] font-medium">
                      {proj.id} / 08
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        proj.publicationStatus === "published"
                          ? "bg-[#A8B69C]/20 text-[#A8B69C]"
                          : "bg-[#433840] text-[#D8CDC8]"
                      }`}
                    >
                      {proj.publicationStatus === "published"
                        ? "Publicado"
                        : "Borrador"}
                    </span>
                    {proj.featured && (
                      <Star
                        className="w-4 h-4 text-[#A8B69C] fill-[#A8B69C]"
                        aria-label="Proyecto destacado"
                      />
                    )}
                  </div>
                  <p className="font-display font-semibold text-base text-[#F5F0E7] truncate mt-1">
                    {proj.name}
                  </p>
                </button>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => reorderProjects(proj.id, "up")}
                    aria-label={`Subir ${proj.name}`}
                    className="p-2 rounded bg-[#211820] hover:bg-[#742940] disabled:opacity-30 text-[#F5F0E7] cursor-pointer"
                  >
                    <ArrowUp className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === allProjects.length - 1}
                    onClick={() => reorderProjects(proj.id, "down")}
                    aria-label={`Bajar ${proj.name}`}
                    className="p-2 rounded bg-[#211820] hover:bg-[#742940] disabled:opacity-30 text-[#F5F0E7] cursor-pointer"
                  >
                    <ArrowDown className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Form: Edit Selected Project (8px label->input proximity, 24px field->field separation) */}
        {draft && (
          <div className="col-span-4 md:col-span-8 lg:col-span-7 space-y-6">
            <form
              onSubmit={handleSaveProject}
              className="rounded-xl bg-[#211820] p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#433840]/60 pb-4">
                <div>
                  <span className="font-mono-meta text-xs font-medium text-[#A8B69C]">
                    Editando iniciativa #{draft.id}
                  </span>
                  <h2 className="font-display font-bold text-2xl text-[#F5F0E7] mt-1">
                    {draft.name}
                  </h2>
                </div>
                <Link
                  to={`/proyectos/${draft.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-[#A8B69C] hover:text-[#F5F0E7]"
                >
                  <span>Ver ficha pública</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="edit-name"
                    className="block text-sm font-medium text-[#D8CDC8] mb-2"
                  >
                    Nombre del proyecto
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    value={draft.name}
                    onChange={(e) =>
                      setDraft({ ...draft, name: e.target.value })
                    }
                    className="w-full min-h-10 px-4 py-2 rounded-lg bg-[#161317] border border-[#433840] text-base text-[#F5F0E7]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-category"
                    className="block text-sm font-medium text-[#D8CDC8] mb-2"
                  >
                    Disciplina confirmada
                  </label>
                  <select
                    id="edit-category"
                    value={draft.category ?? ""}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        category: e.target.value ? e.target.value : null,
                      })
                    }
                    className="w-full min-h-10 px-4 py-2 rounded-lg bg-[#161317] border border-[#433840] text-base text-[#F5F0E7]"
                  >
                    <option value="">Pendiente de confirmación</option>
                    {CONFIRMED_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="edit-leader"
                    className="block text-sm font-medium text-[#D8CDC8] mb-2"
                  >
                    Responsable (opcional)
                  </label>
                  <input
                    id="edit-leader"
                    type="text"
                    value={draft.leader ?? ""}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        leader: e.target.value.trim() ? e.target.value : null,
                      })
                    }
                    placeholder="Pendiente o no suministrado"
                    className="w-full min-h-10 px-4 py-2 rounded-lg bg-[#161317] border border-[#433840] text-base text-[#F5F0E7]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-cover"
                    className="block text-sm font-medium text-[#D8CDC8] mb-2"
                  >
                    Imagen de portada (URL)
                  </label>
                  <input
                    id="edit-cover"
                    type="text"
                    value={draft.coverImage ?? ""}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        coverImage: e.target.value.trim()
                          ? e.target.value
                          : null,
                      })
                    }
                    placeholder="/images/..."
                    className="w-full min-h-10 px-4 py-2 rounded-lg bg-[#161317] border border-[#433840] text-base text-[#F5F0E7]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="edit-short"
                  className="block text-sm font-medium text-[#D8CDC8] mb-2"
                >
                  Gancho o descripción corta
                </label>
                <input
                  id="edit-short"
                  type="text"
                  value={draft.shortDescription ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      shortDescription: e.target.value.trim()
                        ? e.target.value
                        : null,
                    })
                  }
                  placeholder="Pendiente de entrega"
                  className="w-full min-h-10 px-4 py-2 rounded-lg bg-[#161317] border border-[#433840] text-base text-[#F5F0E7]"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-full"
                  className="block text-sm font-medium text-[#D8CDC8] mb-2"
                >
                  Descripción editorial completa
                </label>
                <textarea
                  id="edit-full"
                  rows={4}
                  value={draft.fullDescription ?? ""}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      fullDescription: e.target.value.trim()
                        ? e.target.value
                        : null,
                    })
                  }
                  placeholder="Sinopsis oficial pendiente de entrega"
                  className="w-full px-4 py-3 rounded-lg bg-[#161317] border border-[#433840] text-base text-[#F5F0E7]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#433840]/60">
                <div className="flex flex-wrap items-center gap-6">
                  <label className="inline-flex items-center gap-2 text-sm font-medium text-[#F5F0E7] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.publicationStatus === "published"}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          publicationStatus: e.target.checked
                            ? "published"
                            : "draft",
                        })
                      }
                      className="accent-[#A8B69C]"
                    />
                    <span>Publicado en catálogo</span>
                  </label>

                  <label className="inline-flex items-center gap-2 text-sm font-medium text-[#F5F0E7] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.featured}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          featured: e.target.checked,
                        })
                      }
                      className="accent-[#A8B69C]"
                    />
                    <span>Destacar en portada</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 min-h-10 px-6 py-2 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] text-sm font-medium cursor-pointer"
                >
                  <Save className="w-4 h-4" aria-hidden="true" />
                  <span>Guardar cambios</span>
                </button>
              </div>
            </form>

            {/* Add Media Asset Card */}
            <div className="rounded-xl bg-[#211820] p-6 space-y-6">
              <span className="font-display font-semibold text-base text-[#A8B69C] block">
                Agregar fotografía, video o pódcast a «{draft.name}»
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="new-media-type"
                    className="block text-sm font-medium text-[#D8CDC8] mb-2"
                  >
                    Tipo de recurso
                  </label>
                  <select
                    id="new-media-type"
                    value={newMediaType}
                    onChange={(e) =>
                      setNewMediaType(
                        e.target.value as "image" | "video" | "audio"
                      )
                    }
                    className="w-full min-h-10 px-4 py-2 rounded-lg bg-[#161317] border border-[#433840] text-base text-[#F5F0E7]"
                  >
                    <option value="image">Fotografía</option>
                    <option value="video">Video / Reel</option>
                    <option value="audio">Pódcast / Audio</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="new-media-url"
                    className="block text-sm font-medium text-[#D8CDC8] mb-2"
                  >
                    URL pública o fuente autorizada
                  </label>
                  <input
                    id="new-media-url"
                    type="text"
                    value={newMediaUrl}
                    onChange={(e) => setNewMediaUrl(e.target.value)}
                    placeholder="https://... o /images/..."
                    className="w-full min-h-10 px-4 py-2 rounded-lg bg-[#161317] border border-[#433840] text-base text-[#F5F0E7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="new-media-title"
                    className="block text-sm font-medium text-[#D8CDC8] mb-2"
                  >
                    Título del recurso
                  </label>
                  <input
                    id="new-media-title"
                    type="text"
                    value={newMediaTitle}
                    onChange={(e) => setNewMediaTitle(e.target.value)}
                    placeholder="Ej. Episodio 01: Conversación en el barrio"
                    className="w-full min-h-10 px-4 py-2 rounded-lg bg-[#161317] border border-[#433840] text-base text-[#F5F0E7]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="new-media-alt"
                    className="block text-sm font-medium text-[#D8CDC8] mb-2"
                  >
                    Descripción alternativa (alt)
                  </label>
                  <input
                    id="new-media-alt"
                    type="text"
                    value={newMediaAlt}
                    onChange={(e) => setNewMediaAlt(e.target.value)}
                    placeholder="Descripción para lectores de pantalla"
                    className="w-full min-h-10 px-4 py-2 rounded-lg bg-[#161317] border border-[#433840] text-base text-[#F5F0E7]"
                  />
                </div>
              </div>

              {mediaError && (
                <p role="alert" className="text-sm text-[#ffb4ab]">
                  {mediaError}
                </p>
              )}

              <button
                type="button"
                onClick={handleAddMedia}
                className="inline-flex items-center gap-2 min-h-10 px-6 py-2 rounded-full bg-[#742940] hover:bg-[#8c324e] text-[#F5F0E7] text-sm font-medium cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[#A8B69C]" aria-hidden="true" />
                <span>Adjuntar recurso al proyecto</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
