import type { NextApiRequest, NextApiResponse } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://setlist.makenakong.com";

const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.8", changefreq: "monthly" },
];

export default function sitemap(req: NextApiRequest, res: NextApiResponse) {
  const urls = pages
    .map(
      ({ path, priority, changefreq }) => `
  <url>
    <loc>${SITE_URL}${path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate");
  res.status(200).send(xml);
}
