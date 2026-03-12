import { NextResponse } from "next/server";

export const revalidate = 3600; // 30 minutes

type NewsletterItem = {
  title: string;
  link: string;
  image?: string;
  pubDate?: string;
  source: "Medium" | "Featured";
  categories?: string[];
  readingTimeMins?: number;
  excerpt?: string;
};

const FEATURED_URL =
  "https://medium.com/@vidulawickramasingha/list/newsletter-articles-b621783ddba9";

function decodeCdata(v: string) {
  return v.replace("<![CDATA[", "").replace("]]>", "").trim();
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function pickTag(xml: string, tag: string) {
  const re = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i");
  const m = xml.match(re);
  if (!m?.[1]) return "";
  return decodeCdata(m[1]).trim();
}

function pickAttrUrl(xml: string, tagName: string) {
  // e.g. <media:thumbnail url="..."/>
  const re = new RegExp(`<${tagName}[^>]*?\\surl="([^"]+)"[^>]*?>`, "i");
  const m = xml.match(re);
  return m?.[1]?.trim();
}

function pickImgFromHtml(html: string) {
  const m =
    html.match(/<img[^>]+src="([^"]+)"/i) ||
    html.match(/<figure[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"/i);
  return m?.[1]?.trim();
}

function pickCategories(itemXml: string): string[] {
  const cats = itemXml.match(/<category>([\s\S]*?)<\/category>/gi) ?? [];
  const out = cats
    .map((c) => c.replace(/<\/?category>/gi, "").trim())
    .map(decodeCdata)
    .map((s) => stripHtml(s))
    .filter(Boolean);

  // de-dup
  return Array.from(new Set(out)).slice(0, 6);
}

function estimateReadingTimeMins(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  // 200 wpm typical reading speed
  return Math.max(1, Math.round(words / 200));
}

function parseRssItems(rssXml: string): NewsletterItem[] {
  const items: NewsletterItem[] = [];
  const blocks = rssXml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];

  for (const block of blocks) {
    const title = stripHtml(pickTag(block, "title"));
    const link = pickTag(block, "link");
    const pubDate = pickTag(block, "pubDate");

    // Medium content often in content:encoded
    const contentEncoded =
      block.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i)?.[1] ?? "";
    const description = pickTag(block, "description");

    const html = decodeCdata(contentEncoded || description || "");
    const plain = stripHtml(html);

    // Images: try multiple RSS patterns first, then HTML
    const mediaThumb = pickAttrUrl(block, "media:thumbnail");
    const mediaContent = pickAttrUrl(block, "media:content");
    const enclosure = pickAttrUrl(block, "enclosure");
    const htmlImg = pickImgFromHtml(html);

    const image = mediaThumb || mediaContent || enclosure || htmlImg || undefined;

    const categories = pickCategories(block);
    const excerpt = plain ? plain.slice(0, 140) + (plain.length > 140 ? "…" : "") : undefined;
    const readingTimeMins = plain ? estimateReadingTimeMins(plain) : undefined;

    if (!title || !link) continue;

    items.push({
      title,
      link: link.trim(),
      image,
      pubDate: pubDate || undefined,
      source: "Medium",
      categories,
      excerpt,
      readingTimeMins
    });
  }

  return items;
}

async function fetchOgMeta(url: string): Promise<{ title?: string; image?: string }> {
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; NewsletterBot/1.0)"
      },
      next: { revalidate }
    });
    if (!res.ok) return {};

    const html = await res.text();
    const ogTitle =
      html.match(/<meta[^>]+property="og:title"[^>]+content="([^"]+)"/i)?.[1] ||
      html.match(/<meta[^>]+name="title"[^>]+content="([^"]+)"/i)?.[1];

    const ogImage =
      html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i)?.[1] ||
      html.match(/<meta[^>]+name="twitter:image"[^>]+content="([^"]+)"/i)?.[1];

    return { title: ogTitle?.trim(), image: ogImage?.trim() };
  } catch {
    return {};
  }
}

async function fetchFeaturedMeta(): Promise<NewsletterItem> {
  const fallback: NewsletterItem = {
    title:"",
    link: FEATURED_URL,
    source: "Featured",
    image: "/projects/newslettersm.jpg",
    categories: ["Data", "Web", "Systems"],
    readingTimeMins: 10
  };

  const meta = await fetchOgMeta(FEATURED_URL);
  return {
    ...fallback,
    title: meta.title ?? fallback.title,
    image: meta.image ?? fallback.image
  };
}

export async function GET() {
  const FEED_URL =
    process.env.MEDIUM_FEED_URL || "https://medium.com/feed/@vidulawickramasingha/list/newsletter-articles-b621783ddba9";

  const RESOLVE_OG =
    process.env.NEWSLETTER_RESOLVE_OG_IMAGES === "1" ||
    process.env.NEWSLETTER_RESOLVE_OG_IMAGES === "true";

  try {
    const [rssRes, featured] = await Promise.all([
      fetch(FEED_URL, { next: { revalidate } }),
      fetchFeaturedMeta()
    ]);

    if (!rssRes.ok) {
      return NextResponse.json(
        { items: [featured], error: `Failed to fetch feed: ${rssRes.status}` },
        { status: 200 }
      );
    }

    const rssXml = await rssRes.text();
    const items = parseRssItems(rssXml);

    // sort desc by date
    items.sort((a, b) => {
      const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return db - da;
    });

    // Ensure featured is present
    const hasFeatured = items.some((x) => x.link === FEATURED_URL);
    let final: NewsletterItem[] = hasFeatured ? items : [featured, ...items];

    // Optional: fill missing images by reading OG meta (limited for performance)
    if (RESOLVE_OG) {
      const toFix = final
        .filter((x) => !x.image && x.link?.startsWith("http"))
        .slice(0, 8);

      const metas = await Promise.all(toFix.map((x) => fetchOgMeta(x.link)));

      final = final.map((item) => {
        if (item.image) return item;
        const idx = toFix.findIndex((t) => t.link === item.link);
        if (idx === -1) return item;
        const meta = metas[idx];
        return {
          ...item,
          title: meta.title ?? item.title,
          image: meta.image ?? item.image
        };
      });
    }

    return NextResponse.json({ items: final }, { status: 200 });
  } catch {
    const featured = await fetchFeaturedMeta();
    return NextResponse.json(
      { items: [featured], error: "Unexpected error fetching newsletters." },
      { status: 200 }
    );
  }
}