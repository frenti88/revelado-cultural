import fs from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const isVercel = Boolean(process.env.VERCEL);
const base = process.env.VITE_BASE_PATH || (isVercel ? "/" : "/revelado-cultural/");
const cleanBase = base.endsWith("/") ? base : `${base}/`;

function resolvePath(p) {
  if (!p) return "";
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  const clean = p.startsWith("/") ? p.slice(1) : p;
  return `${cleanBase}${clean}`;
}

const baseHtml = await fs.readFile(path.join(distDir, "index.html"), "utf8");
const projects = JSON.parse(
  await fs.readFile(path.resolve("src/data/projects.json"), "utf8")
);

function injectMeta(html, { title, description, image, jsonLd }) {
  let out = html
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:description" content="${description}" />`
    );

  if (image) {
    out = out.replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:image" content="${image}" />`
    );
  }
  if (jsonLd) {
    out = out.replace(
      "</head>",
      `  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  </head>`
    );
  }
  return out;
}

const staticRoutes = [
  {
    route: "explorar",
    title: "Explorar las 8 iniciativas · Revelado Cultural",
    description:
      "Busca y filtra por disciplina las ocho iniciativas culturales del Presupuesto Participativo en Laureles y Estadio, Comuna 11, Medellín.",
  },
  {
    route: "revelado-cultural",
    title: "Revelado Cultural 2026 · Manifiesto y Presentación Oficial",
    description:
      "Manifiesto y presentación oficial de Revelado Cultural 2026: objetivos, componentes y memorias de las ocho iniciativas ganadoras de Presupuesto Participativo de la Comuna 11, Medellín.",
  },
  {
    route: "acerca-de",
    title: "Revelado Cultural 2026 · Manifiesto y Presentación Oficial",
    description:
      "Manifiesto y presentación oficial de Revelado Cultural 2026: objetivos, componentes y memorias de las ocho iniciativas ganadoras de Presupuesto Participativo de la Comuna 11, Medellín.",
  },
  {
    route: "otros-proyectos",
    title: "Otros proyectos culturales · Cartografía Cultural Comuna 11",
    description:
      "Mapa cultural y afiche cartográfico de la Comuna 11, Laureles–Estadio: directorio interactivo de 57 colectivos, escenarios, parques, bibliotecas y lugares de encuentro.",
    image: resolvePath("/images/mapa-cartografia-cultural-1200.webp"),
  },
  {
    route: "otros-proyectos-culturales",
    title: "Otros proyectos culturales · Cartografía Cultural Comuna 11",
    description:
      "Mapa cultural y afiche cartográfico de la Comuna 11, Laureles–Estadio: directorio interactivo de 57 colectivos, escenarios, parques, bibliotecas y lugares de encuentro.",
    image: resolvePath("/images/mapa-cartografia-cultural-1200.webp"),
  },
  {
    route: "cartografia-cultural",
    title: "Cartografía Cultural Comuna 11 · Mapa y Afiche Oficial",
    description:
      "Mapa cultural y afiche cartográfico de la Comuna 11, Laureles–Estadio: directorio interactivo de 57 colectivos, escenarios, parques, bibliotecas y lugares de encuentro.",
    image: resolvePath("/images/mapa-cartografia-cultural-1200.webp"),
  },
];

for (const item of staticRoutes) {
  const dir = path.join(distDir, item.route);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(
    path.join(dir, "index.html"),
    injectMeta(baseHtml, item),
    "utf8"
  );
}

for (const project of projects) {
  const dir = path.join(distDir, "proyectos", project.slug);
  await fs.mkdir(dir, { recursive: true });
  const description =
    project.shortDescription ??
    `Iniciativa cultural ${project.id}/08 del Presupuesto Participativo en Laureles y Estadio, Comuna 11, Medellín.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    identifier: project.id,
    genre: project.category ?? undefined,
    author: project.leader
      ? { "@type": "Person", name: project.leader }
      : undefined,
    description,
    locationCreated: {
      "@type": "Place",
      name: "Comuna 11, Laureles y Estadio, Medellín, Colombia",
    },
  };
  await fs.writeFile(
    path.join(distDir, "proyectos", project.slug, "index.html"),
    injectMeta(baseHtml, {
      title: `${project.name} (${project.id}/08) · Revelado Cultural`,
      description,
      image: resolvePath(project.coverImage || "/images/ferales-1-1200.webp"),
      jsonLd,
    }),
    "utf8"
  );
}

console.log(
  `Generated SEO static route HTML files for ${staticRoutes.length} pages and ${projects.length} project routes.`
);
