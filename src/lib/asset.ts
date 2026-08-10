// Prefixes asset URLs with an optional base path so the site also works when it
// is served from a sub-path (e.g. GitHub Pages at /<repo>/). On Lovable
// VITE_ASSET_BASE is unset and the URL is returned unchanged.
const ASSET_BASE = (import.meta.env["VITE_ASSET_BASE"] ?? "").replace(/\/$/, "");

export function withBase(path: string): string {
  return `${ASSET_BASE}${path}`;
}

export function assetUrl(asset: { url: string }): string {
  return withBase(asset.url);
}
