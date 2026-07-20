// Build-time discovery of /src/photos/{zone}-{N}.{jpg,jpeg}.
// Drop a new file matching the pattern and it appears in the carousel on next build.
const modules = import.meta.glob("../photos/*.{jpg,jpeg,JPG,JPEG}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export type PhotoZone =
  | "cardio"
  | "weights"
  | "machines"
  | "floor"
  | "entrance";

export function zonePhotos(zone: PhotoZone): string[] {
  const re = new RegExp(`/${zone}-(\\d+)\\.(jpg|jpeg)$`, "i");
  return Object.entries(modules)
    .map(([path, url]) => {
      const m = path.match(re);
      return m ? { n: Number(m[1]), url } : null;
    })
    .filter((x): x is { n: number; url: string } => x !== null)
    .sort((a, b) => a.n - b.n)
    .map((x) => x.url);
}
