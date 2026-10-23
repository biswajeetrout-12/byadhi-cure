const BACKEND_SITEMAP_URL = "https://byadhi-cure.onrender.com/sitemap.xml";

export async function onRequest({ request }) {
  try {
    const upstream = await fetch(BACKEND_SITEMAP_URL, {
      method: request.method,
      headers: { Accept: "application/xml, text/xml;q=0.9, */*;q=0.8" },
      cache: "no-store",
    });

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "application/xml; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new Response("Unable to retrieve sitemap", {
      status: 502,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
}
