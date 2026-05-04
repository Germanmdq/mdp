



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
  // Meta keys to keep our UI routing simple but still matching ML extensions
  category_id: string;
  tags: string[];
  permalink: string;
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
  "Centro",
  "Güemes",
  "La Perla",
  "Punta Mogotes",
  "Constitución",
  "Puerto",
  "Los Troncos",
  "Playa Grande",
  "San José",
  "Parque Luro",
  "Colinas de Peralta Ramos",
  "Batán",
];

export const PRODUCT_CATEGORIES = [
  "Celulares y tecnología",
  "Electrodomésticos",
  "Hogar y muebles",
  "Herramientas",
  "Indumentaria",
  "Bicicletas y movilidad",
  "Artículos infantiles",
  "Decoración",
  "Productos de emprendedores",
  "Comercios locales",
];

export const SERVICE_CATEGORIES = [
  "Plomería",
  "Gasistas",
  "Electricidad",
  "Cerrajería",
  "Técnicos de aire acondicionado",
  "Reparación de electrodomésticos",
  "Construcción y mantenimiento",
  "Profesionales legales y contables",
  "Salud y bienestar",
  "Educación y clases particulares",
];

// Helper to generate products

const ML_IMAGES: Record<string, string[]> = {
  "Celulares y tecnología": [
    "https://http2.mlstatic.com/D_Q_NP_2X_700516-MLA99983707595_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_672502-MLA50422243819_062022-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_785493-MLA50422242770_062022-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_672502-MLA50422243819_062022-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_919962-MLA99998055051_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_640443-MLA99513866254_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_832478-MLA99513866258_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_611342-MLA99513945474_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_907865-MLA99513253592_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_617933-MLA99513530486_112025-E.webp"
  ],
  "Electrodomésticos": [
    "https://http2.mlstatic.com/D_Q_NP_2X_635529-MLA105238960382_012026-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_799130-MLA107121947692_022026-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_947686-MLA99396315482_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_828961-MLA109051800248_032026-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_715511-MLA99938389755_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_938794-MLA99990284005_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_884945-MLA99929532239_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_618838-MLA108506169491_032026-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_855564-MLA99458632386_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_820632-MLA107484343693_022026-E.webp"
  ],
  "Herramientas": [
    "https://http2.mlstatic.com/D_Q_NP_2X_939010-MLA83624772953_042025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_720110-MLA79743367166_102024-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_928135-MLA110701248637_042026-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_718608-MLA94161728482_102025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_866214-MLA108491206797_032026-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_803833-MLA103628510432_012026-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_957238-MLA107748189066_032026-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_862425-MLA92067236910_092025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_929378-MLA96776680226_112025-E.webp",
    "https://http2.mlstatic.com/D_Q_NP_2X_903966-MLA108968091766_032026-E.webp"
  ],
  "Hogar y muebles": [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800"
  ],
  "Indumentaria": [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800"
  ],
  "Bicicletas y movilidad": [
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800"
  ],
  "Artículos infantiles": [
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&q=80&w=800"
  ],
  "Decoración": [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800"
  ],
  "Productos de emprendedores": [
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&q=80&w=800"
  ],
  "Comercios locales": [
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800"
  ]
};

const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  const categoryData: Record<string, { items: string[], keywords: string }> = {
    "Celulares y tecnología": {
      items: ["iPhone 13 128GB", "Samsung Galaxy S22", "Notebook Lenovo IdeaPad", "Auriculares JBL Bluetooth", "Tablet Samsung A8", "Smartwatch Xiaomi", "Monitor Samsung 24\"", "PlayStation 4", "Cámara Canon usada", "Router WiFi TP-Link"],
      keywords: "smartphone,laptop,technology"
    },
    "Electrodomésticos": {
      items: ["Heladera Whirlpool", "Lavarropas Drean", "Microondas BGH", "Cafetera Oster", "Aspiradora Philips", "Freidora de aire", "Licuadora Atma", "Cocina Escorial", "Caloventor eléctrico", "Plancha a vapor"],
      keywords: "appliance,kitchen,home"
    },
    "Hogar y muebles": {
      items: ["Mesa comedor madera", "Sillón tres cuerpos", "Cama dos plazas", "Escritorio moderno", "Biblioteca blanca", "Rack TV", "Juego de sillas", "Mesa ratona", "Placard usado", "Cómoda vintage"],
      keywords: "furniture,sofa,interior"
    },
    "Herramientas": {
      items: ["Taladro Bosch", "Amoladora Black+Decker", "Caja de herramientas", "Sierra circular", "Soldadora inverter", "Hidrolavadora", "Escalera aluminio", "Compresor de aire", "Set destornilladores", "Cortadora de césped"],
      keywords: "tools,hardware,construction"
    },
    "Indumentaria": {
      items: ["Campera Columbia", "Zapatillas Nike", "Jean Levi's", "Vestido de fiesta", "Campera de cuero", "Mochila urbana", "Botas mujer", "Camisa hombre", "Ropa deportiva", "Abrigo invierno"],
      keywords: "clothing,fashion,shoes"
    },
    "Bicicletas y movilidad": {
      items: ["Bicicleta mountain bike", "Bicicleta playera", "Monopatín eléctrico", "Casco urbano", "Silla infantil para bici", "Bicicleta rodado 29", "Skate profesional", "Bicicleta plegable", "Luces LED para bici", "Inflador portátil"],
      keywords: "bicycle,scooter,mobility"
    },
    "Artículos infantiles": {
      items: ["Cochecito bebé", "Silla para auto", "Cuna funcional", "Andador", "Juguetes didácticos", "Bicicleta infantil", "Ropa bebé lote", "Mesa infantil", "Corralito", "Mochila escolar"],
      keywords: "toys,baby,kids"
    },
    "Decoración": {
      items: ["Cuadro moderno", "Lámpara de pie", "Espejo circular", "Alfombra nórdica", "Florero cerámico", "Cortinas blackout", "Macetas decorativas", "Reloj de pared", "Veladores", "Estantería minimalista"],
      keywords: "decor,homedecor,art"
    },
    "Productos de emprendedores": {
      items: ["Velas aromáticas", "Jabones artesanales", "Cuadernos personalizados", "Pastelería artesanal", "Tejidos a mano", "Kits de sahumerios", "Bijouterie artesanal", "Macramé decorativo", "Mates personalizados", "Plantas de interior"],
      keywords: "crafts,handmade,artisanal"
    },
    "Comercios locales": {
      items: ["Combo almacén", "Kit limpieza", "Pack librería escolar", "Set ferretería básico", "Combo perfumería", "Set bazar cocina", "Pack mascotas", "Kit oficina", "Combo dietética", "Pack cafetería"],
      keywords: "groceries,store,products"
    },
  };

  Object.entries(categoryData).forEach(([category, data], catIndex) => {
    data.items.forEach((item, index) => {
      const safeCategory = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-");
      const id = `MLA${Math.floor(pseudoRandom(catIndex * 100 + index + 999) * 1000000000)}`;
      const seed = catIndex * 100 + index;
      const price = Math.floor(pseudoRandom(seed) * 200000) + 5000;
      const originalPrice = pseudoRandom(seed + 1) > 0.7 ? price * 1.2 : undefined;
      const imageUrl = ML_IMAGES[category]?.[index] || `https://loremflickr.com/800/800/${data.keywords}?random=${index + 1}`;
      const isFeatured = pseudoRandom(seed + 7) > 0.8;
      
      products.push({
        id,
        title: item,
        price,
        original_price: originalPrice,
        currency_id: "ARS",
        available_quantity: Math.floor(pseudoRandom(seed + 6) * 50) + 1,
        condition: pseudoRandom(seed + 2) > 0.8 ? "used" : "new",
        thumbnail: imageUrl,
        pictures: [
          { id: `${id}-1`, url: imageUrl },
          { id: `${id}-2`, url: imageUrl }
        ],
        shipping: {
          free_shipping: pseudoRandom(seed + 8) > 0.2,
          logistic_type: pseudoRandom(seed + 3) > 0.5 ? "fulfillment" : "cross_docking"
        },
        seller: {
          id: Math.floor(pseudoRandom(seed + 4) * 100000),
          nickname: ["APPLE_OFFICIAL", "SAMSUNG_STORE", "ELECTRO_MUNDO", "MERCADO_LIBRE", "TECH_STORE"][Math.floor(pseudoRandom(seed + 2) * 5)]
        },
        attributes: [
          { name: "Marca", value_name: "Generica" },
          { name: "Modelo", value_name: "Standard" },
          { name: "Garantía", value_name: "12 meses" }
        ],
        category_id: category, // Using category name for simplicity in this demo
        tags: isFeatured ? ["good_quality_thumbnail", "featured"] : ["good_quality_thumbnail"],
        permalink: `https://articulo.mercadolibre.com.ar/${id}`
      });
    });
  });

  return products;
};

// Helper to generate services
const generateServices = (): Service[] => {
  const services: Service[] = [];
  const categoryData: Record<string, { items: string[], keywords: string }> = {
    "Plomería": {
      items: ["Reparación de pérdidas", "Instalación de grifería", "Destape de cañerías", "Cambio de flexibles", "Instalación de termotanque", "Reparación de tanque de agua", "Instalación de baño", "Urgencias 24 horas", "Mantenimiento consorcios", "Presupuesto de obra sanitaria"],
      keywords: "plumbing,plumber,pipes"
    },
    "Gasistas": {
      items: ["Gasista matriculado zona Centro", "Instalación de cocina", "Revisión de calefactor", "Prueba de hermeticidad", "Instalación de termotanque", "Reparación de pérdida de gas", "Habilitación para local", "Cambio de regulador", "Instalación de calefón", "Certificación técnica"],
      keywords: "gas,technician,heater"
    },
    "Electricidad": {
      items: ["Electricista domiciliario", "Tableros eléctricos", "Instalación de térmicas", "Luces LED", "Reparación de cortocircuitos", "Instalación comercial", "Cableado completo", "Porteros eléctricos", "Medición de consumo", "Urgencias eléctricas"],
      keywords: "electrician,electrical,wires"
    },
    "Cerrajería": {
      items: ["Apertura de puertas", "Cambio de cerraduras", "Copia de llaves", "Cerraduras digitales", "Cerrajería automotor", "Rejas y seguridad", "Urgencias 24 horas", "Cambio de combinación", "Reparación de picaportes", "Instalación de cerrojos"],
      keywords: "locksmith,keys,lock"
    },
    "Técnicos de aire acondicionado": {
      items: ["Instalación split", "Limpieza de filtros", "Carga de gas", "Reparación de unidad exterior", "Desinstalación", "Mantenimiento preventivo", "Aire acondicionado comercial", "Diagnóstico técnico", "Servicio pretemporada", "Instalación en altura"],
      keywords: "hvac,airconditioner,technician"
    },
    "Reparación de electrodomésticos": {
      items: ["Reparación de lavarropas", "Reparación de heladeras", "Reparación de microondas", "Reparación de cocinas", "Reparación de lavavajillas", "Reparación de pequeños electrodomésticos", "Service de freezer", "Diagnóstico a domicilio", "Cambio de repuestos", "Mantenimiento preventivo"],
      keywords: "repair,appliance,washingmachine"
    },
    "Construcción y mantenimiento": {
      items: ["Albañilería", "Pintura interior", "Pintura exterior", "Techos y filtraciones", "Colocación de cerámicos", "Durlock", "Impermeabilización", "Jardinería", "Limpieza de terrenos", "Mantenimiento integral"],
      keywords: "construction,builder,painting"
    },
    "Profesionales legales y contables": {
      items: ["Abogado civil", "Abogado laboral", "Abogado familia", "Contador monotributo", "Contador empresas", "Liquidación de sueldos", "Inscripción AFIP", "Contratos", "Sucesiones", "Asesoría legal inicial"],
      keywords: "lawyer,accountant,office"
    },
    "Salud y bienestar": {
      items: ["Psicólogo", "Nutricionista", "Kinesiólogo", "Masajista", "Entrenador personal", "Yoga", "Pilates", "Terapias holísticas", "Fonoaudiólogo", "Acompañamiento terapéutico"],
      keywords: "health,therapy,massage"
    },
    "Educación y clases particulares": {
      items: ["Matemática secundaria", "Inglés", "Programación", "Apoyo primario", "Física", "Química", "Contabilidad", "Música", "Diseño gráfico", "Preparación ingreso universidad"],
      keywords: "education,tutor,learning"
    },
  };

  Object.entries(categoryData).forEach(([category, data], catIndex) => {
    data.items.forEach((item, index) => {
      const safeCategory = category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ /g, "-");
      const id = `s-${safeCategory}-${index}`;
      const seed = catIndex * 100 + index;
      services.push({
        id,
        name: item,
        professionalName: ["Roberto Gómez", "Elena Paz", "Marcos Soler", "Julia Rossi", "Tito Plomero"][Math.floor(pseudoRandom(seed) * 5)],
        category,
        priceFrom: Math.floor(pseudoRandom(seed + 1) * 10000) + 2000,
        description: `Servicio profesional de ${item} en Mar del Plata. Experiencia comprobable y atención personalizada.`,
        image: ML_IMAGES[category]?.[index] || `https://loremflickr.com/800/800/${data.keywords},portrait?random=${index + 1}`,
        rating: 4.2 + pseudoRandom(seed + 2) * 0.8,
        reviews: Math.floor(pseudoRandom(seed + 3) * 100) + 5,
        verified: pseudoRandom(seed + 4) > 0.2,
        license: pseudoRandom(seed + 5) > 0.5 ? "MAT-" + Math.floor(pseudoRandom(seed + 6) * 10000) : undefined,
        zone: [ZONES[Math.floor(pseudoRandom(seed + 7) * ZONES.length)], ZONES[Math.floor(pseudoRandom(seed + 8) * ZONES.length)]],
        availability: ["Hoy", "Esta semana", "Próxima semana", "Alta demanda"][Math.floor(pseudoRandom(seed + 9) * 4)] as ServiceAvailability,
        featured: pseudoRandom(seed + 10) > 0.8,
        protectedBooking: true,
        responseTime: ["15 min", "1 hora", "4 horas", "24 horas"][Math.floor(pseudoRandom(seed + 11) * 4)],
        completedJobs: Math.floor(pseudoRandom(seed + 12) * 500) + 10,
        education: ["Técnico Superior", "Matriculado Provincial", "Especialista Certificado", "Universidad Nacional de Mar del Plata", "Institución CENS"][Math.floor(pseudoRandom(seed + 13) * 5)],
        experienceYears: Math.floor(pseudoRandom(seed + 14) * 20) + 2,
        availableSlots: [
          "09:00", "10:30", "14:00", "16:00", "17:30"
        ].filter((_, i) => pseudoRandom(seed + 15 + i) > 0.3),
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
  { month: "Mes 7", operations: 2200, ticket: 65000, venv: 143000000, commission: 14300000, ads: 2100000, logistics: 1300000, total: 17700000 },
  { month: "Mes 8", operations: 2500, ticket: 68000, venv: 170000000, commission: 17000000, ads: 2500000, logistics: 1500000, total: 21000000 },
  { month: "Mes 9", operations: 3000, ticket: 70000, venv: 210000000, commission: 21000000, ads: 3200000, logistics: 1900000, total: 26100000 },
  { month: "Mes 10", operations: 3600, ticket: 72000, venv: 259200000, commission: 25920000, ads: 4000000, logistics: 2300000, total: 32220000 },
  { month: "Mes 11", operations: 4300, ticket: 74000, venv: 318200000, commission: 31820000, ads: 5000000, logistics: 2900000, total: 39720000 },
  { month: "Mes 12", operations: 5000, ticket: 75000, venv: 375000000, commission: 37500000, ads: 6000000, logistics: 3500000, total: 47000000 },
];
