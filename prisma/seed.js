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
    { name: "Celulares y tecnología", slug: "tecnologia", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9" },
    { name: "Hogar y muebles", slug: "hogar", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7" },
    { name: "Herramientas", slug: "herramientas", image: "https://http2.mlstatic.com/D_Q_NP_2X_992808-MLA99452908778_112025-E.webp" },
    { name: "Indumentaria", slug: "moda", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff" },
    { name: "Supermercado", slug: "supermercado", image: "https://http2.mlstatic.com/S_Q_NP_2X_615578-MLA99932747091_112025-V.webp" }
  ];

  const dbCategories = [];
  for (const cat of categories) {
    const dbCat = await prisma.category.create({ data: cat });
    dbCategories.push(dbCat);
  }

  // 3. Create Test User (Vendor)
  const vendor = await prisma.user.create({
    data: {
      email: "german@example.com",
      password: "password123", 
      name: "Germán González",
      nickname: "GERMAN_MDQ",
      role: "VENDOR",
      reputation: 4.9
    }
  });

  // 4. Create Products
  const products = [
    {
      title: "Apple iPhone 15 Pro Max 256GB Titanium Natural",
      description: "El iPhone más potente jamás creado con chip A17 Pro y cámara de 48MP.",
      price: 2499999,
      originalPrice: 2899999,
      stock: 10,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_834070-MLA71783088034_092023-F.webp",
      categoryId: dbCategories.find(c => c.slug === "tecnologia").id,
      sellerId: vendor.id,
      freeShipping: true,
      logisticType: "fulfillment",
      images: JSON.stringify(["https://http2.mlstatic.com/D_NQ_NP_2X_834070-MLA71783088034_092023-F.webp"]),
      attributes: JSON.stringify([{ name: "Marca", value_name: "Apple" }, { name: "Modelo", value_name: "iPhone 15 Pro Max" }]),
      tags: JSON.stringify(["featured", "new"])
    },
    {
      title: "Taladro Atornillador Percutor Bosch GSB 18V-50",
      description: "Motor Brushless para mayor vida útil y eficiencia. Incluye 2 baterías de 2.0Ah.",
      price: 459900,
      stock: 50,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_992808-MLA74077648354_012024-F.webp",
      categoryId: dbCategories.find(c => c.slug === "herramientas").id,
      sellerId: vendor.id,
      freeShipping: true,
      logisticType: "fulfillment",
      images: JSON.stringify(["https://http2.mlstatic.com/D_NQ_NP_2X_992808-MLA74077648354_012024-F.webp"]),
      attributes: JSON.stringify([{ name: "Marca", value_name: "Bosch" }, { name: "Potencia", value_name: "18V" }]),
      tags: JSON.stringify(["featured", "bestseller"])
    },
    {
      title: "Jabón Líquido Para Diluir Skip Bio-enzimas 500 Ml",
      description: "Rinde 3 litros. Tecnología superior en limpieza y cuidado de tus prendas.",
      price: 8500,
      stock: 100,
      thumbnail: "https://http2.mlstatic.com/D_NQ_NP_2X_615578-MLA74184650531_012024-F.webp",
      categoryId: dbCategories.find(c => c.slug === "supermercado").id,
      sellerId: vendor.id,
      freeShipping: false,
      logisticType: "default",
      images: JSON.stringify(["https://http2.mlstatic.com/D_NQ_NP_2X_615578-MLA74184650531_012024-F.webp"]),
      attributes: JSON.stringify([{ name: "Marca", value_name: "Skip" }, { name: "Volumen", value_name: "500ml" }]),
      tags: JSON.stringify(["oferta"])
    }
  ];

  for (const prod of products) {
    await prisma.product.create({ data: prod });
  }

  console.log("Seeding completed! 🚀");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
