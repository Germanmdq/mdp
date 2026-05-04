



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
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
  ],
  "Electrodomésticos": [
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
  ],
  "Herramientas": [
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
  ],
  "Hogar y muebles": [
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
  ],
  "Indumentaria": [
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
  ],
  "Bicicletas y movilidad": [
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
  ],
  "Artículos infantiles": [
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
  ],
  "Decoración": [
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
  ],
  "Productos de emprendedores": [
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
  ],
  "Comercios locales": [
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
    "/images/products/celulares.jpg",
  ],
};;



function getImageForItem(item: string) {
  return null; // Force fallback to category image
}

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
      const catImageMap: Record<string, string> = {
        'Celulares y tecnología': '/images/products/celulares.jpg',
        'Electrodomésticos': '/images/products/electrodomesticos.jpg',
        'Herramientas': '/images/products/herramientas.jpg',
        'Hogar y muebles': '/images/products/hogar.jpg',
        'Indumentaria': '/images/products/indumentaria.jpg',
        'Bicicletas y movilidad': '/images/products/bicicletas.jpg',
        'Artículos infantiles': '/images/products/infantiles.jpg',
        'Decoración': '/images/products/decoracion.jpg'
      };
      const imageUrl = catImageMap[category] || '/images/products/hogar.jpg';
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
          nickname: (() => {
            const t = item.toLowerCase();
            if (t.includes("apple") || t.includes("iphone") || t.includes("macbook")) return "APPLE_OFFICIAL";
            if (t.includes("samsung") || t.includes("galaxy")) return "SAMSUNG_STORE";
            if (t.includes("sony") || t.includes("playstation")) return "SONY_STORE";
            if (t.includes("nike")) return "NIKE_STORE";
            if (t.includes("adidas")) return "ADIDAS_STORE";
            if (t.includes("whirlpool")) return "WHIRLPOOL_OFICIAL";
            if (t.includes("philips")) return "PHILIPS_OFICIAL";
            if (category === "Indumentaria" || category === "Bicicletas y movilidad") return "SPORTS_STORE";
            if (category === "Electrodomésticos" || category === "Hogar y muebles" || category === "Herramientas") return "ELECTRO_MUNDO";
            if (category === "Celulares y tecnología") return "TECH_STORE";
            return "MDP_MARKET_OFERTAS";
          })()
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
        image: {
    "Plomería": "/images/services/plomeria.jpg",
    "Gasistas": "/images/services/gasista.jpg",
    "Electricidad": "/images/services/electricidad.jpg",
    "Cerrajería": "/images/services/cerrajeria.jpg",
    "Técnicos de aire acondicionado": "/images/services/aire.jpg",
    "Reparación de electrodomésticos": "/images/services/electrodomesticos.jpg",
    "Construcción y mantenimiento": "/images/services/construccion.jpg",
    "Profesionales legales y contables": "/images/services/legales.jpg",
    "Salud y bienestar": "/images/services/salud.jpg",
    "Educación y clases particulares": "/images/services/educacion.jpg"
  }[category] || "/images/services/construccion.jpg",
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


// 20 extra brand products for Tiendas Oficiales
const extraProducts: Product[] = [
  { id: 'SAMSUNG-S24-001', title: 'Samsung Galaxy S24 Ultra 256GB', price: 1299999, original_price: 1599999, currency_id: 'ARS', available_quantity: 10, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1001, nickname: 'SAMSUNG_STORE' }, attributes: [{ name: 'Marca', value_name: 'Samsung' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'SAMSUNG-TV-002', title: 'Samsung Smart TV 55" QLED 4K', price: 899999, original_price: 1099999, currency_id: 'ARS', available_quantity: 5, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1001, nickname: 'SAMSUNG_STORE' }, attributes: [{ name: 'Marca', value_name: 'Samsung' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'SAMSUNG-TAB-003', title: 'Samsung Galaxy Tab S9 128GB', price: 649999, currency_id: 'ARS', available_quantity: 8, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1001, nickname: 'SAMSUNG_STORE' }, attributes: [{ name: 'Marca', value_name: 'Samsung' }], category_id: 'Celulares y tecnología', tags: [], permalink: '' },
  { id: 'SAMSUNG-WATCH-004', title: 'Samsung Galaxy Watch6 Classic 47mm', price: 349999, original_price: 420000, currency_id: 'ARS', available_quantity: 15, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1001, nickname: 'SAMSUNG_STORE' }, attributes: [{ name: 'Marca', value_name: 'Samsung' }], category_id: 'Celulares y tecnología', tags: [], permalink: '' },
  { id: 'SAMSUNG-AURICULARES-005', title: 'Samsung Galaxy Buds2 Pro Inalámbricos', price: 129999, original_price: 159999, currency_id: 'ARS', available_quantity: 20, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1001, nickname: 'SAMSUNG_STORE' }, attributes: [{ name: 'Marca', value_name: 'Samsung' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'NIKE-ZAPATILLAS-001', title: 'Nike Air Max 270 React Hombre', price: 189999, original_price: 229999, currency_id: 'ARS', available_quantity: 12, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1002, nickname: 'NIKE_STORE' }, attributes: [{ name: 'Marca', value_name: 'Nike' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
  { id: 'NIKE-CAMPERA-002', title: 'Nike Windrunner Campera Deportiva', price: 129999, original_price: 159999, currency_id: 'ARS', available_quantity: 8, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1002, nickname: 'NIKE_STORE' }, attributes: [{ name: 'Marca', value_name: 'Nike' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
  { id: 'NIKE-SHORT-003', title: 'Nike Dri-FIT Shorts Running Hombre', price: 49999, currency_id: 'ARS', available_quantity: 25, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1002, nickname: 'NIKE_STORE' }, attributes: [{ name: 'Marca', value_name: 'Nike' }], category_id: 'Indumentaria', tags: [], permalink: '' },
  { id: 'NIKE-REMERA-004', title: 'Nike Tech Fleece Remera Manga Larga', price: 59999, original_price: 79999, currency_id: 'ARS', available_quantity: 18, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1002, nickname: 'NIKE_STORE' }, attributes: [{ name: 'Marca', value_name: 'Nike' }], category_id: 'Indumentaria', tags: [], permalink: '' },
  { id: 'NIKE-MOCHILA-005', title: 'Nike Brasilia Mochila 24L Deportiva', price: 69999, currency_id: 'ARS', available_quantity: 10, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1002, nickname: 'NIKE_STORE' }, attributes: [{ name: 'Marca', value_name: 'Nike' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
  { id: 'SONY-AURICULARES-001', title: 'Sony WH-1000XM5 Auriculares Noise Cancelling', price: 399999, original_price: 499999, currency_id: 'ARS', available_quantity: 6, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1003, nickname: 'SONY_STORE' }, attributes: [{ name: 'Marca', value_name: 'Sony' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'SONY-PS5-002', title: 'Sony PlayStation 5 Edición Digital', price: 899999, original_price: 999999, currency_id: 'ARS', available_quantity: 4, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1003, nickname: 'SONY_STORE' }, attributes: [{ name: 'Marca', value_name: 'Sony' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'SONY-CAMARA-003', title: 'Sony Alpha A7 III Cámara Mirrorless', price: 1499999, currency_id: 'ARS', available_quantity: 3, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1003, nickname: 'SONY_STORE' }, attributes: [{ name: 'Marca', value_name: 'Sony' }], category_id: 'Celulares y tecnología', tags: [], permalink: '' },
  { id: 'SONY-PARLANTE-004', title: 'Sony SRS-XB43 Parlante Bluetooth Extra Bass', price: 149999, original_price: 189999, currency_id: 'ARS', available_quantity: 14, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1003, nickname: 'SONY_STORE' }, attributes: [{ name: 'Marca', value_name: 'Sony' }], category_id: 'Celulares y tecnología', tags: [], permalink: '' },
  { id: 'SONY-TV-005', title: 'Sony Bravia 65" OLED 4K Google TV', price: 1999999, original_price: 2499999, currency_id: 'ARS', available_quantity: 2, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1003, nickname: 'SONY_STORE' }, attributes: [{ name: 'Marca', value_name: 'Sony' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'ADIDAS-ZAPATILLAS-001', title: 'Adidas Ultraboost 23 Running Hombre', price: 169999, original_price: 199999, currency_id: 'ARS', available_quantity: 10, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1004, nickname: 'ADIDAS_STORE' }, attributes: [{ name: 'Marca', value_name: 'Adidas' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
  { id: 'ADIDAS-CAMPERA-002', title: 'Adidas Tiro Track Jacket Hombre', price: 89999, currency_id: 'ARS', available_quantity: 15, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1004, nickname: 'ADIDAS_STORE' }, attributes: [{ name: 'Marca', value_name: 'Adidas' }], category_id: 'Indumentaria', tags: [], permalink: '' },
  { id: 'ADIDAS-PANTALON-003', title: 'Adidas Essentials 3 Stripes Pantalon', price: 59999, original_price: 74999, currency_id: 'ARS', available_quantity: 20, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1004, nickname: 'ADIDAS_STORE' }, attributes: [{ name: 'Marca', value_name: 'Adidas' }], category_id: 'Indumentaria', tags: [], permalink: '' },
  { id: 'ADIDAS-BOLSO-004', title: 'Adidas Linear Bolso Deportivo 30L', price: 54999, currency_id: 'ARS', available_quantity: 12, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1004, nickname: 'ADIDAS_STORE' }, attributes: [{ name: 'Marca', value_name: 'Adidas' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
  { id: 'ADIDAS-CAMISETA-005', title: 'Adidas Argentina Camiseta AFA 2024', price: 79999, original_price: 99999, currency_id: 'ARS', available_quantity: 30, condition: 'new', thumbnail: '/images/products/celulares.jpg', pictures: [{ id: '1', url: '/images/products/celulares.jpg' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1004, nickname: 'ADIDAS_STORE' }, attributes: [{ name: 'Marca', value_name: 'Adidas' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
];

export const products = [...generateProducts(), ...extraProducts];
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
