import { writeFileSync } from "fs";

const BASE = "https://iraichikadai.in";

async function generate() {
  try {
    const products = await fetch("https://api.iraichikadai.in/api/products").then(r => r.json());
    const categories = await fetch("https://api.iraichikadai.in/api/categories").then(r => r.json());

    const routes = [
      "/",
      "/collections/All",
      "/checkout",
      "/profile",
      "/view-cart",
      ...products.data.map(p => `/products/${p._id}`),
      ...categories.map(c => `/collections/${c._id}`)
    ];

    const xml = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (url) => `
  <url>
    <loc>${BASE}${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`
  )
  .join("")}
</urlset>
`;

    writeFileSync("dist/sitemap.xml", xml.trim());
    console.log("✅ Sitemap generated!");
  } catch (err) {
    console.error("❌ Failed:", err);
  }
}

generate();
