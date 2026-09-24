// Prefix a /public path with the basePath (e.g. /mulin on GitHub Pages).
// next/image doesn't do this for string src, only for static imports.
export function assetPath(src: string): string {
  return src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}` : src;
}
