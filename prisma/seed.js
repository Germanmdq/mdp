const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Clean database
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Categories
  const categories = [
    { name: "Celulares y tecnología", slug: "tecnologia", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800" },
    { name: "Electrodomésticos", slug: "electrodomesticos", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=800" },
    { name: "Hogar y muebles", slug: "hogar", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800" },
    { name: "Herramientas", slug: "herramientas", image: "https://http2.mlstatic.com/D_Q_NP_2X_992808-MLA99452908778_112025-E.webp" },
    { name: "Indumentaria", slug: "moda", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800" },
    { name: "Bicicletas y movilidad", slug: "bicicletas", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800" },
    { name: "Artículos infantiles", slug: "infantiles", image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=800" },
    { name: "Decoración", slug: "decoracion", image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&q=80&w=800" },
    { name: "Supermercado", slug: "supermercado", image: "https://http2.mlstatic.com/S_Q_NP_2X_615578-MLA99932747091_112025-V.webp" },
    { name: "Comercios locales", slug: "comercios", image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=800" }
  ];

  const dbCategories = {};
  for (const cat of categories) {
    const dbCat = await prisma.category.create({ data: cat });
    dbCategories[cat.slug] = dbCat;
  }

  // 3. Create Sellers
  const sellers = [
    { email: "german@example.com", password: "password123", name: "Germán González", nickname: "GERMAN_MDQ", role: "VENDOR", reputation: 4.9 },
    { email: "bosch@example.com", password: "password123", name: "Bosch Tools", nickname: "BOSCH_OFFICIAL", role: "VENDOR", reputation: 5.0 },
    { email: "unilever@example.com", password: "password123", name: "Unilever Store", nickname: "UNILEVER_STORE", role: "VENDOR", reputation: 4.8 },
    { email: "apple@example.com", password: "password123", name: "Apple Store", nickname: "APPLE_OFFICIAL", role: "VENDOR", reputation: 5.0 },
    { email: "sony@example.com", password: "password123", name: "Sony Store", nickname: "SONY_STORE", role: "VENDOR", reputation: 4.9 },
    { email: "samsung@example.com", password: "password123", name: "Samsung Official", nickname: "SAMSUNG_OFFICIAL", role: "VENDOR", reputation: 4.9 },
    { email: "whirlpool@example.com", password: "password123", name: "Whirlpool Oficial", nickname: "WHIRLPOOL_OFICIAL", role: "VENDOR", reputation: 4.7 },
  ];

  const dbSellers = {};
  for (const s of sellers) {
    const dbS = await prisma.user.create({ data: s });
    dbSellers[s.nickname] = dbS;
  }

  // 4. Create all featured products with real ML images
  const featuredProducts = [
    {
      title: "Taladro Percutor Atornillador Bosch Gsb 18v-50 Brushless 18v",
      description: "El Bosch GSB 18V-50 es un taladro percutor inalámbrico con motor Brushless (sin escobillas) que garantiza una vida útil más larga y mayor autonomía. Cuenta con un mandril metálico de 13mm de alta resistencia para tareas pesadas. Torque máximo de 50 Nm y 2 velocidades para perforación y atornillado en madera, metal y mampostería.",
      price: 313016,
      originalPrice: 391270,
      stock: 12,
      thumbnail: "https://http2.mlstatic.com/D_Q_NP_2X_992808-MLA99452908778_112025-E.webp",
      images: JSON.stringify(["https://http2.mlstatic.com/D_Q_NP_2X_992808-MLA99452908778_112025-E.webp"]),
      categoryId: dbCategories["herramientas"].id,
      sellerId: dbSellers["BOSCH_OFFICIAL"].id,
      freeShipping: true, logisticType: "fulfillment",
      attributes: JSON.stringify([{ name: "Marca", value_name: "Bosch" }, { name: "Modelo", value_name: "GSB 18V-50" }, { name: "Voltaje", value_name: "18V" }]),
      tags: JSON.stringify(["featured", "new_arrival"])
    },
    {
      title: "Jabón Líquido Para Diluir Skip Bio-enzimas Tecnologia Superior En Limpieza Y Cuidado 500 Ml",
      description: "Skip para diluir 500ml es la forma más práctica y sustentable de lavar tu ropa. Su fórmula concentrada con Fibercare Serum penetra profundamente en las fibras eliminando las manchas más difíciles sin dañar los tejidos. Un envase de 500ml rinde 3 litros de jabón líquido de alta calidad.",
      price: 8890,
      originalPrice: 13270,
      stock: 1200,
      thumbnail: "https://http2.mlstatic.com/S_Q_NP_2X_615578-MLA99932747091_112025-V.webp",
      images: JSON.stringify(["https://http2.mlstatic.com/S_Q_NP_2X_615578-MLA99932747091_112025-V.webp"]),
      categoryId: dbCategories["hogar"].id,
      sellerId: dbSellers["UNILEVER_STORE"].id,
      freeShipping: true, logisticType: "fulfillment",
      attributes: JSON.stringify([{ name: "Marca", value_name: "Skip" }, { name: "Contenido", value_name: "500 ml" }]),
      tags: JSON.stringify(["featured", "best_seller"])
    },
    {
      title: "Apple iPhone 15 Pro Max 256GB Titanium Natural 5G A17 Pro",
      description: "El iPhone 15 Pro Max es el primer iPhone diseñado con titanio de calidad aeroespacial, lo que lo hace increíblemente fuerte y ligero. Cuenta con el nuevo chip A17 Pro, un sistema de cámaras Pro revolucionario con zoom óptico de 5x y el nuevo botón de Acción personalizable.",
      price: 2650000,
      originalPrice: 2900000,
      stock: 5,
      thumbnail: "https://http2.mlstatic.com/D_Q_NP_2X_927779-CBT109651079284_042026-E.webp",
      images: JSON.stringify(["https://http2.mlstatic.com/D_Q_NP_2X_927779-CBT109651079284_042026-E.webp"]),
      categoryId: dbCategories["tecnologia"].id,
      sellerId: dbSellers["APPLE_OFFICIAL"].id,
      freeShipping: true, logisticType: "fulfillment",
      attributes: JSON.stringify([{ name: "Marca", value_name: "Apple" }, { name: "Modelo", value_name: "iPhone 15 Pro Max" }]),
      tags: JSON.stringify(["featured", "hot_deal"])
    },
    {
      title: "Sony WH-1000XM5 Auriculares Inalámbricos Noise Cancelling Platinum Silver",
      description: "Los auriculares WH-1000XM5 de Sony redefinen la escucha sin distracciones con su cancelación de ruido líder en la industria y audio de alta resolución.",
      price: 725000,
      originalPrice: 799000,
      stock: 15,
      thumbnail: "https://http2.mlstatic.com/D_Q_NP_2X_719976-MLA99500633372_112025-E.webp",
      images: JSON.stringify(["https://http2.mlstatic.com/D_Q_NP_2X_719976-MLA99500633372_112025-E.webp"]),
      categoryId: dbCategories["tecnologia"].id,
      sellerId: dbSellers["SONY_STORE"].id,
      freeShipping: true, logisticType: "fulfillment",
      attributes: JSON.stringify([{ name: "Marca", value_name: "Sony" }, { name: "Modelo", value_name: "WH-1000XM5" }]),
      tags: JSON.stringify(["featured"])
    },
    {
      title: "Samsung Galaxy S24 Ultra 5G 256GB Titanium Black",
      description: "Galaxy S24 Ultra con Galaxy AI. Una experiencia móvil totalmente nueva con funciones inteligentes.",
      price: 2250000,
      originalPrice: 2450000,
      stock: 8,
      thumbnail: "https://http2.mlstatic.com/D_Q_NP_2X_759333-MLA99935491437_112025-E.webp",
      images: JSON.stringify(["https://http2.mlstatic.com/D_Q_NP_2X_759333-MLA99935491437_112025-E.webp"]),
      categoryId: dbCategories["tecnologia"].id,
      sellerId: dbSellers["SAMSUNG_OFFICIAL"].id,
      freeShipping: true, logisticType: "fulfillment",
      attributes: JSON.stringify([{ name: "Marca", value_name: "Samsung" }, { name: "Modelo", value_name: "Galaxy S24 Ultra" }]),
      tags: JSON.stringify(["featured"])
    },
    {
      title: "Heladera Whirlpool Inverter 430L No Frost Acero Inoxidable WRM45",
      description: "Heladera Whirlpool No Frost con tecnología Inverter para mayor ahorro de energía y durabilidad.",
      price: 1350000,
      originalPrice: 1550000,
      stock: 4,
      thumbnail: "https://http2.mlstatic.com/D_Q_NP_2X_607694-MLA108425254926_032026-E.webp",
      images: JSON.stringify(["https://http2.mlstatic.com/D_Q_NP_2X_607694-MLA108425254926_032026-E.webp"]),
      categoryId: dbCategories["electrodomesticos"].id,
      sellerId: dbSellers["WHIRLPOOL_OFICIAL"].id,
      freeShipping: true, logisticType: "fulfillment",
      attributes: JSON.stringify([{ name: "Marca", value_name: "Whirlpool" }, { name: "Capacidad", value_name: "430 Litros" }]),
      tags: JSON.stringify(["featured"])
    }
  ];

  for (const prod of featuredProducts) {
    await prisma.product.create({ data: prod });
  }

  // 5. Generate bulk products (like the original data.ts)
  const categoryNames = [
    "Celulares y tecnología", "Electrodomésticos", "Hogar y muebles", "Herramientas",
    "Indumentaria", "Bicicletas y movilidad", "Artículos infantiles", "Decoración",
    "Comercios locales", "Supermercado"
  ];

  const pseudoRandom = (seed) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const vendorKeys = Object.keys(dbSellers);

  for (let i = 1; i <= 30; i++) {
    const seed = i + 200;
    const catName = categoryNames[i % categoryNames.length];
    const catSlug = categories.find(c => c.name === catName)?.slug;
    const catId = dbCategories[catSlug]?.id;
    if (!catId) continue;

    const sellerKey = vendorKeys[i % vendorKeys.length];
    const price = Math.floor(pseudoRandom(seed) * 80000) + 20000;
    const originalPrice = Math.round(price * 1.25);
    const hasFreeShipping = pseudoRandom(seed + 1) > 0.4;

    await prisma.product.create({
      data: {
        title: `Producto MDP - ${catName} - Modelo Premium ${i}`,
        description: `Este es un producto de la categoría ${catName} disponible exclusivamente en MDP Market. Calidad garantizada con envío a todo Mar del Plata.`,
        price,
        originalPrice,
        stock: 25,
        thumbnail: `https://picsum.photos/seed/${seed}/400/400`,
        images: JSON.stringify([`https://picsum.photos/seed/${seed}/800/800`]),
        categoryId: catId,
        sellerId: dbSellers[sellerKey].id,
        freeShipping: hasFreeShipping,
        logisticType: i % 2 === 0 ? "fulfillment" : "drop_off",
        attributes: JSON.stringify([{ name: "Marca", value_name: "MDP Premium" }]),
        tags: JSON.stringify(i < 10 ? ["featured"] : []),
      }
    });
  }

  // 6. Create a test buyer user
  await prisma.user.create({
    data: {
      email: "comprador@example.com",
      password: "password123",
      name: "Comprador Test",
      nickname: "COMPRADOR_TEST",
      role: "USER",
      reputation: 5.0
    }
  });

  console.log("✅ Seeding completed! 36 products, 10 categories, 8 users created. 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
