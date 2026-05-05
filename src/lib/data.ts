
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export interface Product {
  id: string;
  title: string;
  price: number;
  original_price?: number;
  currency_id: string;
  available_quantity: number;
  condition: "new" | "not_specified" | "used";
  thumbnail: string;
  pictures: { id: string, url: string }[];
  shipping: {
    free_shipping: boolean;
    logistic_type: string;
  };
  seller: {
    id: number;
    nickname: string;
  };
  attributes: { name: string; value_name: string }[];
  category_id: string;
  tags: string[];
  permalink: string;
  description: string;
}

export type ServiceAvailability = "Hoy" | "Esta semana" | "Próxima semana" | "Alta demanda";

export interface Service {
  id: string;
  name: string;
  professionalName: string;
  category: string;
  priceFrom: number;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  verified: boolean;
  license?: string;
  zone: string[];
  availability: ServiceAvailability;
  featured: boolean;
  protectedBooking: boolean;
  responseTime: string;
  completedJobs: number;
  education: string;
  experienceYears: number;
  availableSlots: string[];
}

export const ZONES = [
  "Centro", "Güemes", "La Perla", "Punta Mogotes", "Constitución", "Puerto", "Los Troncos", "Playa Grande", "San José", "Parque Luro", "Colinas de Peralta Ramos", "Batán",
];

export const PRODUCT_CATEGORIES = [
  "Celulares y tecnología", "Electrodomésticos", "Hogar y muebles", "Herramientas", "Indumentaria", "Bicicletas y movilidad", "Artículos infantiles", "Decoración", "Productos de emprendedores", "Comercios locales",
];

export const SERVICE_CATEGORIES = [
  "Plomería", "Gasistas", "Electricidad", "Cerrajería", "Técnicos de aire acondicionado", "Reparación de electrodomésticos", "Construcción y mantenimiento", "Profesionales legales y contables", "Salud y bienestar", "Educación y clases particulares",
];

const generateProducts = (): Product[] => {
  const products: Product[] = [
    {
      id: "PROD_BOSCH_GSB18V",
      title: "Taladro Percutor Atornillador Bosch Gsb 18v-50 Brushless 18v",
      price: 313016,
      original_price: 391270,
      currency_id: "ARS",
      available_quantity: 12,
      condition: "new",
      thumbnail: "https://http2.mlstatic.com/D_Q_NP_2X_992808-MLA99452908778_112025-E.webp",
      pictures: [
        { id: "1", url: "https://http2.mlstatic.com/D_Q_NP_2X_992808-MLA99452908778_112025-E.webp" }
      ],
      shipping: { free_shipping: true, logistic_type: "fulfillment" },
      seller: { id: 101, nickname: "BOSCH_OFFICIAL" },
      category_id: "Herramientas",
      tags: ["featured", "new_arrival"],
      permalink: "/productos/PROD_BOSCH_GSB18V",
      description: "El Bosch GSB 18V-50 es un taladro percutor inalámbrico con motor Brushless (sin escobillas) que garantiza una vida útil más larga y mayor autonomía. Cuenta con un mandril metálico de 13mm de alta resistencia para tareas pesadas. Torque máximo de 50 Nm y 2 velocidades para perforación y atornillado en madera, metal y mampostería. El sistema Professional 18V de Bosch permite usar cualquier batería de 18V de la línea profesional.",
      attributes: [
        { name: "Marca", value_name: "Bosch" },
        { name: "Modelo", value_name: "GSB 18V-50" },
        { name: "Voltaje", value_name: "18V" }
      ]
    },
    {
      id: "PROD_SKIP_DILUIR",
      title: "Jabón Líquido Para Diluir Skip Bio-enzimas Tecnologia Superior En Limpieza Y Cuidado 500 Ml",
      price: 8890,
      original_price: 13270,
      currency_id: "ARS",
      available_quantity: 1200,
      condition: "new",
      thumbnail: "https://http2.mlstatic.com/S_Q_NP_2X_615578-MLA99932747091_112025-V.webp",
      pictures: [
        { id: "1", url: "https://http2.mlstatic.com/S_Q_NP_2X_615578-MLA99932747091_112025-V.webp" }
      ],
      shipping: { free_shipping: true, logistic_type: "fulfillment" },
      seller: { id: 102, nickname: "UNILEVER_STORE" },
      category_id: "Hogar y muebles",
      tags: ["featured", "best_seller"],
      permalink: "/productos/PROD_SKIP_DILUIR",
      description: "Skip para diluir 500ml es la forma más práctica y sustentable de lavar tu ropa. Su fórmula concentrada con Fibercare Serum penetra profundamente en las fibras eliminando las manchas más difíciles sin dañar los tejidos. Un envase de 500ml rinde 3 litros de jabón líquido de alta calidad, equivalente a 30 lavados. Ideal para cuidar el medio ambiente reduciendo el uso de plástico.",
      attributes: [
        { name: "Marca", value_name: "Skip" },
        { name: "Contenido", value_name: "500 ml" }
      ]
    },
    {
      id: "PROD_IPHONE15_PM",
      title: "Apple iPhone 15 Pro Max 256GB Titanium Natural 5G A17 Pro",
      price: 2650000,
      original_price: 2900000,
      currency_id: "ARS",
      available_quantity: 5,
      condition: "new",
      thumbnail: "https://http2.mlstatic.com/D_Q_NP_2X_927779-CBT109651079284_042026-E.webp",
      pictures: [
        { id: "1", url: "https://http2.mlstatic.com/D_Q_NP_2X_927779-CBT109651079284_042026-E.webp" }
      ],
      shipping: { free_shipping: true, logistic_type: "fulfillment" },
      seller: { id: 1, nickname: "APPLE_OFFICIAL" },
      category_id: "Celulares y tecnología",
      tags: ["featured", "hot_deal"],
      permalink: "/productos/PROD_IPHONE15_PM",
      description: "El iPhone 15 Pro Max es el primer iPhone diseñado con titanio de calidad aeroespacial, lo que lo hace increíblemente fuerte y ligero. Cuenta con el nuevo chip A17 Pro, un sistema de cámaras Pro revolucionario con zoom óptico de 5x y el nuevo botón de Acción personalizable.",
      attributes: [
        { name: "Marca", value_name: "Apple" },
        { name: "Modelo", value_name: "iPhone 15 Pro Max" }
      ]
    },
    {
      id: "PROD_SONY_XM5",
      title: "Sony WH-1000XM5 Auriculares Inalámbricos Noise Cancelling Platinum Silver",
      price: 725000,
      original_price: 799000,
      currency_id: "ARS",
      available_quantity: 15,
      condition: "new",
      thumbnail: "https://http2.mlstatic.com/D_Q_NP_2X_719976-MLA99500633372_112025-E.webp",
      pictures: [
        { id: "1", url: "https://http2.mlstatic.com/D_Q_NP_2X_719976-MLA99500633372_112025-E.webp" }
      ],
      shipping: { free_shipping: true, logistic_type: "fulfillment" },
      seller: { id: 3, nickname: "SONY_STORE" },
      category_id: "Celulares y tecnología",
      tags: ["featured"],
      permalink: "/productos/PROD_SONY_XM5",
      description: "Los auriculares WH-1000XM5 de Sony redefinen la escucha sin distracciones con su cancelación de ruido líder en la industria y audio de alta resolución.",
      attributes: [
        { name: "Marca", value_name: "Sony" },
        { name: "Modelo", value_name: "WH-1000XM5" }
      ]
    },
    {
      id: "PROD_SAMSUNG_S24U",
      title: "Samsung Galaxy S24 Ultra 5G 256GB Titanium Black",
      price: 2250000,
      original_price: 2450000,
      currency_id: "ARS",
      available_quantity: 8,
      condition: "new",
      thumbnail: "https://http2.mlstatic.com/D_Q_NP_2X_759333-MLA99935491437_112025-E.webp",
      pictures: [
        { id: "1", url: "https://http2.mlstatic.com/D_Q_NP_2X_759333-MLA99935491437_112025-E.webp" }
      ],
      shipping: { free_shipping: true, logistic_type: "fulfillment" },
      seller: { id: 2, nickname: "SAMSUNG_OFFICIAL" },
      category_id: "Celulares y tecnología",
      tags: ["featured"],
      permalink: "/productos/PROD_SAMSUNG_S24U",
      description: "Galaxy S24 Ultra con Galaxy AI. Una experiencia móvil totalmente nueva con funciones inteligentes.",
      attributes: [
        { name: "Marca", value_name: "Samsung" },
        { name: "Modelo", value_name: "Galaxy S24 Ultra" }
      ]
    },
    {
      id: "PROD_WHIRLPOOL_INV",
      title: "Heladera Whirlpool Inverter 430L No Frost Acero Inoxidable WRM45",
      price: 1350000,
      original_price: 1550000,
      currency_id: "ARS",
      available_quantity: 4,
      condition: "new",
      thumbnail: "https://http2.mlstatic.com/D_Q_NP_2X_607694-MLA108425254926_032026-E.webp",
      pictures: [
        { id: "1", url: "https://http2.mlstatic.com/D_Q_NP_2X_607694-MLA108425254926_032026-E.webp" }
      ],
      shipping: { free_shipping: true, logistic_type: "fulfillment" },
      seller: { id: 444, nickname: "WHIRLPOOL_OFICIAL" },
      category_id: "Electrodomésticos",
      tags: ["featured"],
      permalink: "/productos/PROD_WHIRLPOOL_INV",
      description: "Heladera Whirlpool No Frost con tecnología Inverter para mayor ahorro de energía y durabilidad.",
      attributes: [
        { name: "Marca", value_name: "Whirlpool" },
        { name: "Capacidad", value_name: "430 Litros" }
      ]
    }
  ];

  for (let i = 1; i <= 30; i++) {
    const seed = i + 200;
    const cat = PRODUCT_CATEGORIES[i % PRODUCT_CATEGORIES.length];
    const price = Math.floor(pseudoRandom(seed) * 80000) + 20000;
    products.push({
      id: `PROD_GEN_${i}`,
      title: `Producto MDP - ${cat} - Modelo Premium ${i}`,
      price: price,
      original_price: price * 1.25,
      currency_id: "ARS",
      available_quantity: 25,
      condition: "new",
      thumbnail: `https://picsum.photos/seed/${seed}/400/400`,
      pictures: [{ id: "1", url: `https://picsum.photos/seed/${seed}/800/800` }],
      shipping: { free_shipping: pseudoRandom(seed + 1) > 0.4, logistic_type: i % 2 === 0 ? "fulfillment" : "drop_off" },
      seller: { id: 500 + i, nickname: `Tienda_MDP_${i}` },
      category_id: cat,
      tags: i < 10 ? ["featured"] : [],
      permalink: `/productos/PROD_GEN_${i}`,
      description: `Este es un producto de la categoría ${cat} disponible exclusivamente en MDP Market. Calidad garantizada.`,
      attributes: [{ name: "Marca", value_name: "MDP Premium" }]
    });
  }
  return products;
};

const generateServices = (): Service[] => {
  const services: Service[] = [];
  const categoryData: Record<string, { items: string[] }> = {
    "Plomería": { items: ["Reparación de pérdidas", "Instalación de grifería"] },
    "Gasistas": { items: ["Gasista matriculado", "Instalación de cocina"] },
    "Electricidad": { items: ["Electricista domiciliario", "Tableros eléctricos"] },
    "Cerrajería": { items: ["Apertura de puertas", "Cambio de cerraduras"] },
    "Técnicos de aire acondicionado": { items: ["Instalación split", "Limpieza de filtros"] },
    "Reparación de electrodomésticos": { items: ["Reparación de lavarropas", "Service de heladeras"] },
    "Construcción y mantenimiento": { items: ["Albañilería", "Pintura"] },
    "Profesionales legales y contables": { items: ["Abogado civil", "Contador monotributo"] },
    "Salud y bienestar": { items: ["Psicólogo", "Nutricionista"] },
    "Educación y clases particulares": { items: ["Clases de apoyo", "Inglés"] },
  };

  Object.entries(categoryData).forEach(([category, data], catIndex) => {
    data.items.forEach((item, index) => {
      const seed = catIndex * 100 + index;
      services.push({
        id: `s-${catIndex}-${index}`,
        name: item,
        professionalName: ["Roberto Gómez", "Elena Paz", "Marcos Soler"][index % 3],
        category,
        priceFrom: 5000 + (index * 1000),
        description: `Servicio profesional de ${item} en Mar del Plata.`,
        image: `https://images.unsplash.com/photo-1521791136064-7986c295944c?auto=format&fit=crop&q=80&w=800`,
        rating: 4.5,
        reviews: 25,
        verified: true,
        zone: ["Centro", "Güemes"],
        availability: "Hoy",
        featured: index === 0,
        protectedBooking: true,
        responseTime: "1 hora",
        completedJobs: 150,
        education: "Certificado",
        experienceYears: 10,
        availableSlots: ["09:00", "14:00"]
      });
    });
  });
  return services;
};

export const products = generateProducts();
export const services = generateServices();

export const businessMetrics = {
  registeredUsers: 12840,
  activeUsers: 4320,
  sellers: 980,
  professionals: 420,
  publishedProducts: 5400,
  activeServices: 860,
  monthlyOperations: 2500,
  averageTicket: 65000,
  monthlyGMV: 162500000,
  commissionRate: 0.10,
  monthlyCommission: 16250000,
  featuredRevenue: 2500000,
  logisticsMargin: 1500000,
  estimatedMonthlyRevenue: 20250000,
  estimatedAnnualRevenue: 243000000
};

export const projections = [
  { month: "Mes 1", operations: 300, ticket: 45000, venv: 13500000, commission: 1350000, ads: 300000, logistics: 200000, total: 1850000 },
  { month: "Mes 2", operations: 500, ticket: 48000, venv: 24000000, commission: 2400000, ads: 450000, logistics: 300000, total: 3150000 },
  { month: "Mes 3", operations: 800, ticket: 52000, venv: 41600000, commission: 4160000, ads: 700000, logistics: 450000, total: 5310000 },
  { month: "Mes 4", operations: 1000, ticket: 55000, venv: 55000000, commission: 5500000, ads: 1000000, logistics: 600000, total: 7100000 },
  { month: "Mes 5", operations: 1400, ticket: 58000, venv: 81200000, commission: 8120000, ads: 1300000, logistics: 850000, total: 10270000 },
  { month: "Mes 6", operations: 1800, ticket: 62000, venv: 111600000, commission: 11160000, ads: 1800000, logistics: 1100000, total: 14060000 },
];
