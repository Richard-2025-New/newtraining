export default function sitemap() {
  const base = process.env.SITE_URL || "http://localhost:3000";
  const routes = ["/", "/program", "/tracks", "/resources", "/blog", "/pricing", "/contact"];
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date() }));
}
