const fs = require('fs');

const dataTsPath = 'src/lib/data.ts';
let dataCode = fs.readFileSync(dataTsPath, 'utf8');

// 1. Refactor data.ts interface
const oldInterface = `export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  oldPrice?: number;
  description: string;
  images: string[];
  sellerName: string;
  sellerRating: number;
  sellerVerified: boolean;
  zone: string;
  condition: ProductCondition;
  status: ProductStatus;
  featured: boolean;
  protectedPayment: boolean;
  deliveryAvailable: boolean;
  createdAt: string;
}`;

const newInterface = `export interface Product {
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
}`;

dataCode = dataCode.replace(oldInterface, newInterface);
// also remove ProductCondition and ProductStatus definitions if they exist (they might be above Product)
dataCode = dataCode.replace(/export type ProductCondition[^;]+;/g, '');
dataCode = dataCode.replace(/export type ProductStatus[^;]+;/g, '');

// 2. Refactor generateProducts
const newGenerateProducts = `const generateProducts = (): Product[] => {
  const products: Product[] = [];

  Object.entries(categoryData).forEach(([category, data], catIndex) => {
    data.items.forEach((item, index) => {
      const safeCategory = category.toLowerCase().normalize("NFD").replace(/[\\u0300-\\u036f]/g, "").replace(/ /g, "-");
      const id = \`MLA\${Math.floor(pseudoRandom(catIndex * 100 + index + 999) * 1000000000)}\`;
      const seed = catIndex * 100 + index;
      const price = Math.floor(pseudoRandom(seed) * 200000) + 5000;
      const originalPrice = pseudoRandom(seed + 1) > 0.7 ? price * 1.2 : undefined;
      const imageUrl = ML_IMAGES[category]?.[index] || \`https://loremflickr.com/800/800/\${data.keywords}?random=\${index + 1}\`;
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
          { id: \`\${id}-1\`, url: imageUrl },
          { id: \`\${id}-2\`, url: imageUrl }
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
        permalink: \`https://articulo.mercadolibre.com.ar/\${id}\`
      });
    });
  });

  return products;
};`;

// replace old generateProducts. Need to use a regex that matches until `return products;\n};`
dataCode = dataCode.replace(/const generateProducts = \(\): Product\[\] => \{[\s\S]*?return products;\n\};/, newGenerateProducts);
fs.writeFileSync(dataTsPath, dataCode);

// 3. Refactor ProductCard.tsx
const cardPath = 'src/components/products/ProductCard.tsx';
let cardCode = fs.readFileSync(cardPath, 'utf8');
cardCode = cardCode.replace(/product\.featured/g, 'product.tags.includes("featured")');
cardCode = cardCode.replace(/product\.images\[0\]/g, 'product.thumbnail');
cardCode = cardCode.replace(/product\.category/g, 'product.category_id');
cardCode = cardCode.replace(/product\.oldPrice/g, 'product.original_price');
cardCode = cardCode.replace(/product\.zone/g, '(product.shipping.logistic_type === "fulfillment" ? "Full" : "Envío a acordar")');
cardCode = cardCode.replace(/product\.sellerRating\.toFixed\(1\)/g, '"4.8"'); // Hardcode since it's removed
cardCode = cardCode.replace(/product\.protectedPayment/g, 'product.shipping.free_shipping');
cardCode = cardCode.replace(/PAGO PROTEGIDO/g, 'ENVÍO GRATIS');
fs.writeFileSync(cardPath, cardCode);

// 4. Refactor app/productos/[id]/page.tsx
const detailPath = 'src/app/productos/[id]/page.tsx';
let detailCode = fs.readFileSync(detailPath, 'utf8');
detailCode = detailCode.replace(/product\.category/g, 'product.category_id');
detailCode = detailCode.replace(/product\.images\[0\]/g, 'product.pictures[0].url');
detailCode = detailCode.replace(/product\.description/g, 'product.attributes.map(a => a.name + ": " + a.value_name).join(", ")');
detailCode = detailCode.replace(/product\.zone/g, '(product.shipping.logistic_type === "fulfillment" ? "Llega mañana" : "Envío normal")');
detailCode = detailCode.replace(/product\.featured/g, 'product.tags.includes("featured")');
detailCode = detailCode.replace(/product\.oldPrice/g, 'product.original_price');
detailCode = detailCode.replace(/product\.sellerName/g, 'product.seller.nickname');
detailCode = detailCode.replace(/product\.sellerVerified/g, '(product.seller.id > 0)');
detailCode = detailCode.replace(/product\.sellerRating/g, '4.8');
fs.writeFileSync(detailPath, detailCode);

// 5. Refactor app/productos/page.tsx
const listPath = 'src/app/productos/page.tsx';
let listCode = fs.readFileSync(listPath, 'utf8');
listCode = listCode.replace(/p\.category/g, 'p.category_id');
listCode = listCode.replace(/p\.condition === "Nuevo"/g, 'p.condition === "new"');
listCode = listCode.replace(/p\.condition === "Usado"/g, 'p.condition === "used"');
fs.writeFileSync(listPath, listCode);

// 6. Refactor app/page.tsx
const homePath = 'src/app/page.tsx';
let homeCode = fs.readFileSync(homePath, 'utf8');
homeCode = homeCode.replace(/product\.featured/g, 'product.tags.includes("featured")');
fs.writeFileSync(homePath, homeCode);

console.log("Refactoring complete");
