export function youtubeEmbed(url: string) {
  try {
    const u = new URL(url);
    let id = u.searchParams.get("v");
    if (!id && u.hostname.includes("youtu.be")) id = u.pathname.slice(1);
    if (!id && u.pathname.includes("/shorts/")) id = u.pathname.split("/shorts/")[1].split("/")[0];
    return id ? `https://www.youtube.com/embed/${id}` : "";
  } catch { return ""; }
}

export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
