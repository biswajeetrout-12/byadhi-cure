export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/sitemap.xml") {
      try {
        const response = await fetch(
          "https://byadhi-cure.onrender.com/sitemap.xml"
        );

        return new Response(response.body, {
          status: response.status,
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "no-store",
          },
        });
      } catch {
        return new Response("Unable to fetch sitemap", {
          status: 502,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }
    }

    return env.ASSETS.fetch(request);
  },
};
