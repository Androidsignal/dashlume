// Prefixes asset URLs with an optional base path so the site also works when it
// is served from a sub-path (e.g. GitHub Pages at /<repo>/). On Lovable
// __ASSET_BASE__ is replaced with "" and the URL is returned unchanged.
declare const __ASSET_BASE__: string | undefined;

const ASSET_BASE = (typeof __ASSET_BASE__ === "string" ? __ASSET_BASE__ : "").replace(/\/$/, "");

export function withBase(path: string): string {
  return `${ASSET_BASE}${path}`;
}

export function assetUrl(asset: { url: string }): string {
  return withBase(asset.url);
}
