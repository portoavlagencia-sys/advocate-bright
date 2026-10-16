import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { ContentDoc, DbPost } from "@/lib/cms";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const getPublishedContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<ContentDoc> => {
    try {
      const { data } = await publicClient()
        .from("site_content")
        .select("data")
        .eq("key", "published")
        .maybeSingle();
      const doc = (data?.data ?? { items: [] }) as unknown as ContentDoc;
      return { items: Array.isArray(doc.items) ? doc.items : [] };
    } catch {
      return { items: [] };
    }
  },
);

const POST_COLS = "id, slug, title, excerpt, category, body, cover_url, published, published_at";

export const listDbPosts = createServerFn({ method: "GET" }).handler(async (): Promise<DbPost[]> => {
  try {
    const { data } = await publicClient()
      .from("posts")
      .select(POST_COLS)
      .eq("published", true)
      .order("published_at", { ascending: false });
    return (data ?? []) as DbPost[];
  } catch {
    return [];
  }
});

export const getDbPost = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }): Promise<DbPost | null> => {
    try {
      const { data: row } = await publicClient()
        .from("posts")
        .select(POST_COLS)
        .eq("slug", data.slug)
        .eq("published", true)
        .maybeSingle();
      return (row as DbPost | null) ?? null;
    } catch {
      return null;
    }
  });
