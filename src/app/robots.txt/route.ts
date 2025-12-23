import { NextResponse } from "next/server";

export function GET() {
  const site = process.env.SITE_URL || "http://localhost:3000";
  const content = [
    "User-agent: *",
    "Allow: /",
    `Sitemap: ${site}/sitemap.xml`,
  ].join("\n");
  return new NextResponse(content, {
    headers: { "Content-Type": "text/plain" },
  });
}
