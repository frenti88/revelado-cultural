export interface CulturalMapCategory {
  id: string;
  name: string;
  color: string;
  bgBadge: string;
}

export interface CulturalMapPlace {
  id: number;
  name: string;
  categoryId: string;
  categoryName: string;
  outsideMap?: boolean;
  notes?: string;
}

export const CULTURAL_MAP_METADATA = {
  title: "Taller de Cartografía Cultural de la Comuna 11",
  territory: "Comuna 11 · Laureles–Estadio, Medellín",
  description:
    "Mapa colaborativo que visibiliza colectivos, escenarios, parques, bibliotecas, cafés y lugares de encuentro y memoria viva del territorio.",
  attribution:
    "Calles, parques y río: © colaboradores de OpenStreetMap (ODbL). Lugares: mapa colaborativo del taller. Límite de la comuna trazado por el taller.",
  googleMapsViewerUrl:
    "https://www.google.com/maps/d/u/0/viewer?usp=sharing&mid=1w35K0dSACgU9CJuqrDDDSXTCoIQCDUY",
  googleMapsEmbedUrl:
    "https://www.google.com/maps/d/embed?mid=1w35K0dSACgU9CJuqrDDDSXTCoIQCDUY&ehbc=2E312F",
  pdfDownloadUrl: "/docs/mapa-cartografia-cultural-comuna-11.pdf",
  posterImage1200: "/images/mapa-cartografia-cultural-1200.webp",
  posterImageFull: "/images/mapa-cartografia-cultural-full.webp",
};

export const CULTURAL_MAP_CATEGORIES: CulturalMapCategory[] = [
  { id: "arte", name: "Arte, Escena y Cultura", color: "#902B90", bgBadge: "#37105F" },
  { id: "bibliotecas", name: "Bibliotecas y Librerías", color: "#F9C63C", bgBadge: "#3B2E10" },
  { id: "educacion", name: "Educación", color: "#3B82F6", bgBadge: "#14284B" },
  { id: "institucional", name: "Áreas Institucionales", color: "#2563EB", bgBadge: "#132347" },
  { id: "deporte", name: "Deporte", color: "#EF4444", bgBadge: "#421616" },
  { id: "parques", name: "Parques y Monumentos", color: "#10B981", bgBadge: "#103B2A" },
  { id: "social", name: "Desarrollo Social", color: "#14B8A6", bgBadge: "#103B36" },
  { id: "cafes", name: "Cafés y Bares", color: "#F97316", bgBadge: "#422312" },
  { id: "parroquias", name: "Parroquias y Otros", color: "#06B6D4", bgBadge: "#0F3842" },
  { id: "metro", name: "Metro · Línea B", color: "#EAB308", bgBadge: "#382D10" },
];

export const CULTURAL_MAP_PLACES: CulturalMapPlace[] = [
  // Arte, Escena y Cultura (1 a 15)
  { id: 1, name: "Sabbath Studio", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 2, name: "Casa de la Cultura Los Colores", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 3, name: "Facultad de Artes UdeA", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 4, name: "Club de Ilusionismo de Antioquia", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 5, name: "Colombia Canta y Encanta", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 6, name: "Digital Records", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 7, name: "Jazzdance", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 8, name: "La Korte", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 9, name: "Living in the Sky", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 10, name: "Org. Musical Arley Orejuela", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 11, name: "Parche Cultural La Trilla", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 12, name: "Sala A Puro Tango", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 13, name: "Teatro Laureles", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 14, name: "Teatro Suramericana", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },
  { id: 15, name: "Tinto de Verano Casa Cultural", categoryId: "arte", categoryName: "Arte, Escena y Cultura" },

  // Bibliotecas y Librerías (16 y 17)
  { id: 16, name: "Biblioteca Pública Piloto", categoryId: "bibliotecas", categoryName: "Bibliotecas y Librerías" },
  { id: 17, name: "Librería MUSA", categoryId: "bibliotecas", categoryName: "Bibliotecas y Librerías" },

  // Educación (18 a 22)
  { id: 18, name: "Colegio Bethlemitas", categoryId: "educacion", categoryName: "Educación" },
  { id: 19, name: "Colegio Corazonista", categoryId: "educacion", categoryName: "Educación" },
  { id: 20, name: "Colegio San Ignacio de Loyola", categoryId: "educacion", categoryName: "Educación" },
  { id: 21, name: "IU Salazar y Herrera", categoryId: "educacion", categoryName: "Educación" },
  { id: 22, name: "Universidad Católica Luis Amigó", categoryId: "educacion", categoryName: "Educación" },

  // Áreas Institucionales (23 a 25)
  { id: 23, name: "Cuarta Brigada del Ejército", categoryId: "institucional", categoryName: "Áreas Institucionales" },
  { id: 24, name: "Estadio Atanasio Girardot", categoryId: "institucional", categoryName: "Áreas Institucionales" },
  { id: 25, name: "Universidad Pontificia Bolivariana", categoryId: "institucional", categoryName: "Áreas Institucionales" },

  // Deporte (26 y 27)
  { id: 26, name: "Skatepark Estadio", categoryId: "deporte", categoryName: "Deporte" },
  { id: 27, name: "Velódromo Martín Emilio Cochise", categoryId: "deporte", categoryName: "Deporte" },

  // Parques y Monumentos (28 a 37)
  { id: 28, name: "Fuente de la Vida", categoryId: "parques", categoryName: "Parques y Monumentos" },
  { id: 29, name: "Monumento a la Vida", categoryId: "parques", categoryName: "Parques y Monumentos" },
  { id: 30, name: "Parque Carlos E. Restrepo", categoryId: "parques", categoryName: "Parques y Monumentos" },
  { id: 31, name: "Parque Lourdes", categoryId: "parques", categoryName: "Parques y Monumentos" },
  { id: 32, name: "Parque de San Joaquín", categoryId: "parques", categoryName: "Parques y Monumentos" },
  { id: 33, name: "Parque de los Mangos", categoryId: "parques", categoryName: "Parques y Monumentos" },
  { id: 34, name: "Parques del Río Medellín", categoryId: "parques", categoryName: "Parques y Monumentos" },
  { id: 35, name: "Plaza de Banderas", categoryId: "parques", categoryName: "Parques y Monumentos" },
  { id: 36, name: "Primer Parque de Laureles", categoryId: "parques", categoryName: "Parques y Monumentos" },
  { id: 37, name: "Segundo Parque de Laureles", categoryId: "parques", categoryName: "Parques y Monumentos" },

  // Desarrollo Social (38 y 39)
  { id: 38, name: "CDS Laureles", categoryId: "social", categoryName: "Desarrollo Social" },
  { id: 39, name: "CDS San Joaquín", categoryId: "social", categoryName: "Desarrollo Social" },

  // Cafés y Bares (40 a 49)
  { id: 40, name: "Café Típica", categoryId: "cafes", categoryName: "Cafés y Bares" },
  { id: 41, name: "El Tíbiri Bar", categoryId: "cafes", categoryName: "Cafés y Bares" },
  { id: 42, name: "Minerva Vintage · Renata Café", categoryId: "cafes", categoryName: "Cafés y Bares" },
  { id: 43, name: "Monstera Café, Tattoo y Supply", categoryId: "cafes", categoryName: "Cafés y Bares" },
  { id: 44, name: "Naturalia Café", categoryId: "cafes", categoryName: "Cafés y Bares" },
  { id: 45, name: "Patita Negra Specialty Coffee", categoryId: "cafes", categoryName: "Cafés y Bares" },
  { id: 46, name: "Sabbath Café", categoryId: "cafes", categoryName: "Cafés y Bares" },
  { id: 47, name: "Son Havana Bar", categoryId: "cafes", categoryName: "Cafés y Bares" },
  { id: 48, name: "Vinilo & Café", categoryId: "cafes", categoryName: "Cafés y Bares" },
  { id: 49, name: "Zacatecas Bolivariana", categoryId: "cafes", categoryName: "Cafés y Bares" },

  // Parroquias y Otros (50 a 54)
  { id: 50, name: "Parroquia de la Consolata", categoryId: "parroquias", categoryName: "Parroquias y Otros" },
  { id: 51, name: "Parroquia San Joaquín", categoryId: "parroquias", categoryName: "Parroquias y Otros" },
  { id: 52, name: "Múnera Eastman Radio", categoryId: "parroquias", categoryName: "Parroquias y Otros" },
  { id: 53, name: "Viajes La Buenaventura", categoryId: "parroquias", categoryName: "Parroquias y Otros" },
  { id: 54, name: "Viva Laureles", categoryId: "parroquias", categoryName: "Parroquias y Otros" },

  // Metro · Línea B (55 a 57)
  { id: 55, name: "Estación Estadio", categoryId: "metro", categoryName: "Metro · Línea B" },
  { id: 56, name: "Estación Floresta", categoryId: "metro", categoryName: "Metro · Línea B" },
  { id: 57, name: "Estación Suramericana", categoryId: "metro", categoryName: "Metro · Línea B" },
];
