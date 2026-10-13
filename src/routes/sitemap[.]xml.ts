import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import {
  isSitemapRouteIncluded,
  sitemapPathForLocation,
  sitemapStaticPaths,
  sitemapXML,
  type SitemapEntry,
} from "@/lib/sitemap";
import { areas } from "@/lib/site";
import { posts } from "@/lib/blog";

const BASE_URL = "https://edmommoraesadvocacia.com.br";

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));

        const areaId = "/areas-de-atuacao/$slug";
        if (isSitemapRouteIncluded(router.routesById[areaId])) {
          for (const a of areas) {
            const loc = router.buildLocation({
              to: "/areas-de-atuacao/$slug",
              params: { slug: a.slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, loc, areaId);
            if (path) entries.push({ path });
          }
        }
        const blogId = "/blog/$slug";
        if (isSitemapRouteIncluded(router.routesById[blogId])) {
          for (const p of posts) {
            const loc = router.buildLocation({
              to: "/blog/$slug",
              params: { slug: p.slug },
              search: () => ({}),
              hash: "",
            });
            const path = sitemapPathForLocation(router, loc, blogId);
            if (path) entries.push({ path, lastmod: p.date });
          }
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
