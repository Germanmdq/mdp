const fs = require('fs');

async function fetchMLImages() {
  const queries = [
    { q: "celular", cat: "Celulares y tecnología" },
    { q: "heladera", cat: "Electrodomésticos" },
    { q: "sillon", cat: "Hogar y muebles" },
    { q: "taladro", cat: "Herramientas" },
    { q: "zapatillas", cat: "Indumentaria" },
    { q: "bicicleta", cat: "Bicicletas y movilidad" },
    { q: "juguete", cat: "Artículos infantiles" },
    { q: "lampara", cat: "Decoración" },
    { q: "vela artesanal", cat: "Productos de emprendedores" },
    { q: "yerba mate", cat: "Comercios locales" }
  ];

  const results = {};

  for (const query of queries) {
    try {
      const res = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(query.q)}&limit=10`);
      const data = await res.json();
      const images = data.results.map(r => r.thumbnail.replace('I.jpg', 'O.webp')); // Get high res webp
      results[query.cat] = images;
    } catch (e) {
      console.error(e);
    }
  }

  fs.writeFileSync('ml_images.json', JSON.stringify(results, null, 2));
  console.log('Saved to ml_images.json');
}

fetchMLImages();
