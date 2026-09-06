import { useEffect } from "react";

const DEFAULT_SITE_URL = "https://byadhicure.in";
const DEFAULT_SITE_NAME = "Byadhi Cure Lab Private Limited";

export function getSiteUrl() {
  return (import.meta.env["VITE_SITE_URL"] || DEFAULT_SITE_URL).replace(/\/$/, "");
}

type PageMetadataProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

function removeMeta(attribute: "name" | "property", key: string) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
}

export function PageMetadata({ title, description, path, image, structuredData }: PageMetadataProps) {
  useEffect(() => {
    const siteUrl = getSiteUrl();
    const canonicalUrl = `${siteUrl}${path === "/" ? "/" : path}`;
    const previousTitle = document.title;
    const previousCanonical = document.head.querySelector('link[rel="canonical"]');
    const previousStructuredData = document.head.querySelector('script[data-page-structured-data]');
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    canonical.href = canonicalUrl;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:site_name", DEFAULT_SITE_NAME);
    upsertMeta("name", "twitter:card", image ? "summary_large_image" : "summary");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    } else {
      removeMeta("property", "og:image");
      removeMeta("name", "twitter:image");
    }
    document.head.appendChild(canonical);

    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.pageStructuredData = "true";
      script.textContent = JSON.stringify(structuredData).replace(/</g, "\\u003c");
      document.head.appendChild(script);
    }

    return () => {
      document.title = previousTitle;
      canonical.remove();
      if (previousCanonical) document.head.appendChild(previousCanonical);
      document.head.querySelector('script[data-page-structured-data]')?.remove();
      if (previousStructuredData) document.head.appendChild(previousStructuredData);
    };
  }, [description, image, path, structuredData, title]);

  return null;
}

export default PageMetadata;
