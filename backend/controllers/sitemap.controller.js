import Product from "../models/Product.js";

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function getSitemap(req, res) {
  try {
    const siteUrl = (process.env.SITE_URL || process.env.FRONTEND_URL || "http://localhost:5173").replace(/\/$/, "");
    const products = await Product.find({ slug: { $exists: true, $ne: "" } }, { slug: 1, updatedAt: 1 }).lean();
    const urls = [
      `${siteUrl}/`,
      `${siteUrl}/about`,
      `${siteUrl}/products`,
      `${siteUrl}/manufacturing`,
      `${siteUrl}/contact`,
      ...products.map((product) => `${siteUrl}/products/${product.slug}`),
    ];
    const productLastModified = new Map(
      products.map((product) => [`${siteUrl}/products/${product.slug}`, product.updatedAt]),
    );
    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map((url) => [
        "  <url>",
        `    <loc>${escapeXml(url)}</loc>`,
        productLastModified.has(url) && productLastModified.get(url)
          ? `    <lastmod>${new Date(productLastModified.get(url)).toISOString()}</lastmod>`
          : null,
        "  </url>",
      ].filter(Boolean).join("\n")),
      "</urlset>",
    ].join("\n");

    res.type("application/xml").send(xml);
  } catch (error) {
    console.error("Sitemap generation failed:", error.message);
    res.status(500).type("text/plain").send("Unable to generate sitemap");
  }
}
