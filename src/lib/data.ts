



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
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80",
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    "https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=600&q=80",
    "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80",
    "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  ],
  "Electrodomésticos": [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80",
    "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=600&q=80",
    "https://images.unsplash.com/photo-1567538096621-38d2284b23ff?w=600&q=80",
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&q=80",
    "https://images.unsplash.com/photo-1601598851547-4302969d0614?w=600&q=80",
    "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&q=80",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80",
    "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&q=80",
    "https://images.unsplash.com/photo-1625961332071-f1673d5f3c14?w=600&q=80",
  ],
  "Herramientas": [
    "https://images.unsplash.com/photo-1581147036324-c47a03a81d48?w=600&q=80",
    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&q=80",
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80",
    "https://images.unsplash.com/photo-1416339442236-8ceb164046f8?w=600&q=80",
    "https://images.unsplash.com/photo-1553777756-1e26fd48deaf?w=600&q=80",
    "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80",
    "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80",
    "https://images.unsplash.com/photo-1609942071751-c4f4b8da1f03?w=600&q=80",
    "https://images.unsplash.com/photo-1567634611647-5b6e1e4bfb92?w=600&q=80",
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&q=80",
  ],
  "Hogar y muebles": [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80",
    "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=600&q=80",
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=600&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
    "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&q=80",
    "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=600&q=80",
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80",
    "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&q=80",
  ],
  "Indumentaria": [
    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    "https://images.unsplash.com/photo-1558171813-8a8bc07de7b7?w=600&q=80",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    "https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=600&q=80",
    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
  ],
  "Bicicletas y movilidad": [
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80",
    "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80",
    "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80",
    "https://images.unsplash.com/photo-1526401485004-46910ecc8e51?w=600&q=80",
    "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=600&q=80",
    "https://images.unsplash.com/photo-1544191696-102dbeb3f473?w=600&q=80",
    "https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=600&q=80",
    "https://images.unsplash.com/photo-1601779285859-66b67eaffa21?w=600&q=80",
    "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=600&q=80",
    "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&q=80",
  ],
  "Artículos infantiles": [
    "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=600&q=80",
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&q=80",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&q=80",
    "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?w=600&q=80",
    "https://images.unsplash.com/photo-1471286174890-9c112ac6823f?w=600&q=80",
    "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80",
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80",
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=80",
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600&q=80",
  ],
  "Decoración": [
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80",
    "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=600&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80",
    "https://images.unsplash.com/photo-1556702571-3e11dd2b1a92?w=600&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  ],
  "Productos de emprendedores": [
    "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=600&q=80",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80",
    "https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80",
    "https://images.unsplash.com/photo-1593618998160-e34014e67546?w=600&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=600&q=80",
    "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80",
    "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=600&q=80",
    "https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=600&q=80",
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80",
    "https://images.unsplash.com/photo-1556702571-3e11dd2b1a92?w=600&q=80",
  ],
  "Comercios locales": [
    "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=600&q=80",
    "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=600&q=80",
    "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=600&q=80",
    "https://images.unsplash.com/photo-1574279606130-09958dc756f7?w=600&q=80",
    "https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=600&q=80",
    "https://images.unsplash.com/photo-1540189549336-e6e99eb4b951?w=600&q=80",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
    "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&q=80",
  ],
};;


function getImageForItem(item: string) {
  const productImages = {
    'iPhone': 'photo-1511707171634-5f897ff02aa9',
    'Samsung Galaxy': 'photo-1592750475338-74b7b21085ab',
    'Notebook': 'photo-1517336714731-489689fd1ca8',
    'Auriculares': 'photo-1505740420928-5e560c06d30e',
    'Tablet': 'photo-1589739900266-43b2843f4c12',
    'Smartwatch': 'photo-1546868871-7041f2a55e12',
    'Monitor': 'photo-1608043152269-423dbba4e7e1',
    'PlayStation': 'photo-1493711662062-fa541adb3fc8',
    'Router': 'photo-1558618666-fcd25c85cd64',
    'Heladera': 'photo-1584568694244-14fbdf83bd30',
    'Lavarropas': 'photo-1585771724684-38269d6639fd',
    'Microondas': 'photo-1574269909862-7e1d70bb8078',
    'Cafetera': 'photo-1556909114-f6e7ad7d3136',
    'Aspiradora': 'photo-1558618047-3c8c76ca7d13',
    'Freidora': 'photo-1625961332071-f1673d5f3c14',
    'Licuadora': 'photo-1527515637462-cff94eecc1ac',
    'Cocina': 'photo-1601598851547-4302969d0614',
    'Caloventor': 'photo-1581092160607-ee22621dd758',
    'Plancha': 'photo-1567538096621-38d2284b23ff',
    'Taladro': 'photo-1581147036324-c47a03a81d48',
    'Amoladora': 'photo-1572981779307-38b8cabb2407',
    'Sierra': 'photo-1416339442236-8ceb164046f8',
    'Soldadora': 'photo-1553777756-1e26fd48deaf',
    'Hidrolavadora': 'photo-1530124566582-a618bc2615dc',
    'Escalera': 'photo-1621905251918-48416bd8575a',
    'Compresor': 'photo-1609942071751-c4f4b8da1f03',
    'Cortadora': 'photo-1567634611647-5b6e1e4bfb92',
    'Mesa comedor': 'photo-1555041469-a586c61ea9bc',
    'Sill': 'photo-1524758631624-e2822e304c36',
    'Cama': 'photo-1505693314120-0d443867891c',
    'Escritorio': 'photo-1538688525198-9b88f6f53126',
    'Biblioteca': 'photo-1493663284031-b7e3aefcae8e',
    'Rack': 'photo-1518455027359-f3f8164ba6bd',
    'Campera': 'photo-1542272604-787c3835535d',
    'Zapatillas': 'photo-1542291026-7eec264c27ff',
    'Jean': 'photo-1515886657613-9f3515b0c78f',
    'Vestido': 'photo-1558171813-8a8bc07de7b7',
    'Mochila': 'photo-1548036328-c9fa89d128fa',
    'Botas': 'photo-1465453869711-7e174808ace9',
    'Camisa': 'photo-1602810318383-e386cc2a3ccf',
    'Abrigo': 'photo-1512436991641-6745cdb1723f',
    'mountain bike': 'photo-1485965120184-e220f721d03e',
    'Bicicleta': 'photo-1532298229144-0ec0c57515c7',
    'Monopatín': 'photo-1571068316344-75bc76f77890',
    'Casco': 'photo-1526401485004-46910ecc8e51',
    'Skate': 'photo-1502744688674-c619d1586c9e',
    'Cochecito': 'photo-1566576721346-d4a3b4eaeb55',
    'Cuna': 'photo-1587654780291-39c9404d746b',
    'Juguetes': 'photo-1560089000-7433a4ebbd64',
  };
  for (const [kw, pid] of Object.entries(productImages)) {
    if (item.toLowerCase().includes(kw.toLowerCase())) {
      return 'https://images.unsplash.com/' + pid + '?w=600&q=80';
    }
  }
  return null;
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
      const imageUrl = (item && getImageForItem(item)) || ML_IMAGES[category]?.[index] || `https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80`;
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


// 20 extra brand products for Tiendas Oficiales
const extraProducts: Product[] = [
  { id: 'SAMSUNG-S24-001', title: 'Samsung Galaxy S24 Ultra 256GB', price: 1299999, original_price: 1599999, currency_id: 'ARS', available_quantity: 10, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1001, nickname: 'SAMSUNG_STORE' }, attributes: [{ name: 'Marca', value_name: 'Samsung' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'SAMSUNG-TV-002', title: 'Samsung Smart TV 55" QLED 4K', price: 899999, original_price: 1099999, currency_id: 'ARS', available_quantity: 5, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1001, nickname: 'SAMSUNG_STORE' }, attributes: [{ name: 'Marca', value_name: 'Samsung' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'SAMSUNG-TAB-003', title: 'Samsung Galaxy Tab S9 128GB', price: 649999, currency_id: 'ARS', available_quantity: 8, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1589739900266-43b2843f4c12?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1001, nickname: 'SAMSUNG_STORE' }, attributes: [{ name: 'Marca', value_name: 'Samsung' }], category_id: 'Celulares y tecnología', tags: [], permalink: '' },
  { id: 'SAMSUNG-WATCH-004', title: 'Samsung Galaxy Watch6 Classic 47mm', price: 349999, original_price: 420000, currency_id: 'ARS', available_quantity: 15, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1001, nickname: 'SAMSUNG_STORE' }, attributes: [{ name: 'Marca', value_name: 'Samsung' }], category_id: 'Celulares y tecnología', tags: [], permalink: '' },
  { id: 'SAMSUNG-AURICULARES-005', title: 'Samsung Galaxy Buds2 Pro Inalámbricos', price: 129999, original_price: 159999, currency_id: 'ARS', available_quantity: 20, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1001, nickname: 'SAMSUNG_STORE' }, attributes: [{ name: 'Marca', value_name: 'Samsung' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'NIKE-ZAPATILLAS-001', title: 'Nike Air Max 270 React Hombre', price: 189999, original_price: 229999, currency_id: 'ARS', available_quantity: 12, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1002, nickname: 'NIKE_STORE' }, attributes: [{ name: 'Marca', value_name: 'Nike' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
  { id: 'NIKE-CAMPERA-002', title: 'Nike Windrunner Campera Deportiva', price: 129999, original_price: 159999, currency_id: 'ARS', available_quantity: 8, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1002, nickname: 'NIKE_STORE' }, attributes: [{ name: 'Marca', value_name: 'Nike' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
  { id: 'NIKE-SHORT-003', title: 'Nike Dri-FIT Shorts Running Hombre', price: 49999, currency_id: 'ARS', available_quantity: 25, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1002, nickname: 'NIKE_STORE' }, attributes: [{ name: 'Marca', value_name: 'Nike' }], category_id: 'Indumentaria', tags: [], permalink: '' },
  { id: 'NIKE-REMERA-004', title: 'Nike Tech Fleece Remera Manga Larga', price: 59999, original_price: 79999, currency_id: 'ARS', available_quantity: 18, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1002, nickname: 'NIKE_STORE' }, attributes: [{ name: 'Marca', value_name: 'Nike' }], category_id: 'Indumentaria', tags: [], permalink: '' },
  { id: 'NIKE-MOCHILA-005', title: 'Nike Brasilia Mochila 24L Deportiva', price: 69999, currency_id: 'ARS', available_quantity: 10, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1002, nickname: 'NIKE_STORE' }, attributes: [{ name: 'Marca', value_name: 'Nike' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
  { id: 'SONY-AURICULARES-001', title: 'Sony WH-1000XM5 Auriculares Noise Cancelling', price: 399999, original_price: 499999, currency_id: 'ARS', available_quantity: 6, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1003, nickname: 'SONY_STORE' }, attributes: [{ name: 'Marca', value_name: 'Sony' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'SONY-PS5-002', title: 'Sony PlayStation 5 Edición Digital', price: 899999, original_price: 999999, currency_id: 'ARS', available_quantity: 4, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1003, nickname: 'SONY_STORE' }, attributes: [{ name: 'Marca', value_name: 'Sony' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'SONY-CAMARA-003', title: 'Sony Alpha A7 III Cámara Mirrorless', price: 1499999, currency_id: 'ARS', available_quantity: 3, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1003, nickname: 'SONY_STORE' }, attributes: [{ name: 'Marca', value_name: 'Sony' }], category_id: 'Celulares y tecnología', tags: [], permalink: '' },
  { id: 'SONY-PARLANTE-004', title: 'Sony SRS-XB43 Parlante Bluetooth Extra Bass', price: 149999, original_price: 189999, currency_id: 'ARS', available_quantity: 14, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1003, nickname: 'SONY_STORE' }, attributes: [{ name: 'Marca', value_name: 'Sony' }], category_id: 'Celulares y tecnología', tags: [], permalink: '' },
  { id: 'SONY-TV-005', title: 'Sony Bravia 65" OLED 4K Google TV', price: 1999999, original_price: 2499999, currency_id: 'ARS', available_quantity: 2, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1003, nickname: 'SONY_STORE' }, attributes: [{ name: 'Marca', value_name: 'Sony' }], category_id: 'Celulares y tecnología', tags: ['featured'], permalink: '' },
  { id: 'ADIDAS-ZAPATILLAS-001', title: 'Adidas Ultraboost 23 Running Hombre', price: 169999, original_price: 199999, currency_id: 'ARS', available_quantity: 10, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1004, nickname: 'ADIDAS_STORE' }, attributes: [{ name: 'Marca', value_name: 'Adidas' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
  { id: 'ADIDAS-CAMPERA-002', title: 'Adidas Tiro Track Jacket Hombre', price: 89999, currency_id: 'ARS', available_quantity: 15, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1004, nickname: 'ADIDAS_STORE' }, attributes: [{ name: 'Marca', value_name: 'Adidas' }], category_id: 'Indumentaria', tags: [], permalink: '' },
  { id: 'ADIDAS-PANTALON-003', title: 'Adidas Essentials 3 Stripes Pantalon', price: 59999, original_price: 74999, currency_id: 'ARS', available_quantity: 20, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1465453869711-7e174808ace9?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1004, nickname: 'ADIDAS_STORE' }, attributes: [{ name: 'Marca', value_name: 'Adidas' }], category_id: 'Indumentaria', tags: [], permalink: '' },
  { id: 'ADIDAS-BOLSO-004', title: 'Adidas Linear Bolso Deportivo 30L', price: 54999, currency_id: 'ARS', available_quantity: 12, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1004, nickname: 'ADIDAS_STORE' }, attributes: [{ name: 'Marca', value_name: 'Adidas' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
  { id: 'ADIDAS-CAMISETA-005', title: 'Adidas Argentina Camiseta AFA 2024', price: 79999, original_price: 99999, currency_id: 'ARS', available_quantity: 30, condition: 'new', thumbnail: 'https://images.unsplash.com/photo-1558171813-8a8bc07de7b7?w=600&q=80', pictures: [{ id: '1', url: 'https://images.unsplash.com/photo-1558171813-8a8bc07de7b7?w=600&q=80' }], shipping: { free_shipping: true, logistic_type: 'fulfillment' }, seller: { id: 1004, nickname: 'ADIDAS_STORE' }, attributes: [{ name: 'Marca', value_name: 'Adidas' }], category_id: 'Indumentaria', tags: ['featured'], permalink: '' },
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
