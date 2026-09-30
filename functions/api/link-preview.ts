export async function onRequestGet(context: { request: Request }) {
  const url = new URL(context.request.url).searchParams.get("url");

  if (!url) {
    return Response.json({ error: "Missing url parameter" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();

    const extractMeta = (property: string) => {
      const regex = new RegExp(`<meta[^>]*property=["']og:${property}["'][^>]*content=["']([^"']+)["'][^>]*>`, 'i');
      const regexAlt = new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:${property}["'][^>]*>`, 'i');

      const match = html.match(regex) || html.match(regexAlt);
      if (match && match[1]) {
        return match[1].replace(/&amp;/g, '&');
      }
      return null;
    };

    let title = extractMeta('title');
    if (!title) {
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      title = titleMatch ? titleMatch[1] : null;
    }

    let description = extractMeta('description');
    if (!description) {
      // fallback to regular meta description
      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
      description = descMatch ? descMatch[1] : null;
    }

    let image = extractMeta('image');
    if (image && image.startsWith('/')) {
      const urlObj = new URL(url);
      image = `${urlObj.origin}${image}`;
    }

    return Response.json({
      title: title || '',
      description: description || '',
      image: image || ''
    });

  } catch (error) {
    console.error("Error fetching link preview:", error);
    return Response.json({ error: "Failed to fetch link preview" }, { status: 500 });
  }
}
