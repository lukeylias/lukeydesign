/**
 * Media utilities — type detection, thumbnail resolution, embed URL sanitisation.
 *
 * Media object shape:
 *   { type: 'image' | 'gif' | 'video' | 'iframe', src: string, alt?: string, poster?: string }
 */

const VIDEO_PATTERNS = [
  /youtube\.com/i,
  /youtu\.be/i,
  /vimeo\.com/i,
  /loom\.com/i,
];

/**
 * Detect media type from a src URL.
 * Explicit `type` on the media object always wins — this is the fallback.
 */
export function getMediaType(src) {
  if (!src) return 'image';
  if (VIDEO_PATTERNS.some((p) => p.test(src))) return 'video';
  if (/\.gif(\?|$)/i.test(src)) return 'gif';
  return 'image';
}

/** Returns true for types that can open in the lightbox. */
export function isLightboxable(type) {
  return type === 'image' || type === 'gif';
}

/**
 * Resolve the thumbnail media object for an item.
 * Priority: explicit item.thumbnail → first image/gif in item.media → item.image (legacy) → null
 */
export function getThumbnail(item) {
  if (item.thumbnail) {
    return typeof item.thumbnail === 'string'
      ? { type: 'image', src: item.thumbnail, alt: item.headline }
      : item.thumbnail;
  }

  if (item.media?.length) {
    const first = item.media.find(
      (m) => (m.type || getMediaType(m.src)) === 'image' || (m.type || getMediaType(m.src)) === 'gif',
    );
    if (first) return { ...first, type: first.type || getMediaType(first.src) };
  }

  // Legacy fallback
  if (item.image) {
    return { type: 'image', src: item.image, alt: item.headline };
  }

  return null;
}

/**
 * Convert a video URL to an embeddable src.
 * Handles YouTube (watch + short URLs), Vimeo, and Loom.
 */
export function toEmbedUrl(src) {
  if (!src) return src;

  // YouTube watch URL
  const ytWatch = src.match(/youtube\.com\/watch\?v=([^&]+)/i);
  if (ytWatch) return `https://www.youtube.com/embed/${ytWatch[1]}`;

  // YouTube short URL
  const ytShort = src.match(/youtu\.be\/([^?]+)/i);
  if (ytShort) return `https://www.youtube.com/embed/${ytShort[1]}`;

  // Already an embed URL
  if (/youtube\.com\/embed\//i.test(src)) return src;

  // Vimeo
  const vimeo = src.match(/vimeo\.com\/(\d+)/i);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;

  // Loom
  const loom = src.match(/loom\.com\/share\/([a-z0-9]+)/i);
  if (loom) return `https://www.loom.com/embed/${loom[1]}`;

  return src;
}
