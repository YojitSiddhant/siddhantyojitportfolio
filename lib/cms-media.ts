export type CmsMediaCollection = "education" | "certificate" | "experience" | "project";

type CmsMediaArgs = {
  collection: CmsMediaCollection;
  id: number;
  field: string;
  src?: string | null;
  updatedAt?: Date | string | null;
};

export function getCmsMediaSrc({ collection, id, field, src, updatedAt }: CmsMediaArgs) {
  if (!src) {
    return null;
  }

  if (!src.startsWith("data:")) {
    return src;
  }

  const version = updatedAt ? new Date(updatedAt).getTime() : Date.now();
  return `/api/cms-media?collection=${encodeURIComponent(collection)}&id=${id}&field=${encodeURIComponent(field)}&v=${version}`;
}
