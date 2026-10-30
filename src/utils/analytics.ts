/**
 * Utilidad desacoplada de telemetría y eventos de interacción para Revelado Cultural.
 * No instala rastreadores externos invasivos; emite CustomEvents en window para
 * integración con cualquier suite analítica o monitor de rendimiento.
 */

export type AnalyticsEvent =
  | { type: "hero_cta_click"; label: string; destination: string }
  | { type: "project_open"; projectId: string; projectSlug: string; source: string }
  | { type: "media_play"; mediaType: "video" | "audio"; mediaId: string; projectName?: string }
  | { type: "filter_change"; category: string | null; query: string; resultsCount: number }
  | { type: "related_project_click"; fromSlug: string; toSlug: string }
  | { type: "external_social_click"; platform: string; url: string; projectName?: string };

export function trackEvent(event: AnalyticsEvent): void {
  try {
    if (typeof window !== "undefined") {
      const customEvent = new CustomEvent("revelado:analytics", {
        detail: {
          ...event,
          timestamp: Date.now(),
        },
      });
      window.dispatchEvent(customEvent);

      // Si existe un dataLayer (por ejemplo Google Tag Manager si el usuario lo conecta después)
      if (Array.isArray((window as unknown as { dataLayer?: unknown[] }).dataLayer)) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: event.type,
          ...event,
        });
      }

      // Enviar evento estructurado a Google Analytics 4 (gtag)
      const win = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof win.gtag === "function") {
        win.gtag("event", event.type, {
          ...event,
        });
      }
    }
  } catch {
    // Falla silenciosa para nunca interrumpir la experiencia de usuario
  }
}
