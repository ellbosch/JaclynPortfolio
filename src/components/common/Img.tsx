import { forwardRef, useState } from 'react';
import type { ImgHTMLAttributes } from 'react';
import manifest from '../../data/mediaManifest.json';

type Entry = { w: number; h: number; variants?: [number, string][]; poster?: string };
const media = manifest as unknown as Record<string, Entry>;

export const mediaInfo = (src?: string): Entry | undefined => (src ? media[src] : undefined);
export const posterFor = (src?: string): string | undefined => mediaInfo(src)?.poster;

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  /** Load immediately (above-the-fold images). Default: lazy. */
  priority?: boolean;
};

/**
 * Drop-in <img> replacement. For bucket images listed in mediaManifest.json it serves
 * resized WebP copies via srcset so the browser downloads only what the layout needs.
 * Anything not in the manifest (e.g. a freshly imported upload) renders exactly as before.
 * If a variant ever fails to load, it falls back to the original file.
 */
const Img = forwardRef<HTMLImageElement, Props>(({ src, priority, sizes, ...rest }, ref) => {
  const [fallback, setFallback] = useState(false);
  const entry = mediaInfo(src);
  const variants = !fallback && entry?.variants?.length ? entry.variants : undefined;
  return (
    <img
      ref={ref}
      {...rest}
      src={variants ? variants[variants.length - 1][1] : src}
      srcSet={variants ? variants.map(([w, u]) => `${u} ${w}w`).join(', ') : undefined}
      sizes={variants ? sizes ?? '100vw' : undefined}
      width={rest.width ?? entry?.w}
      height={rest.height ?? entry?.h}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={(e) => {
        if (variants) setFallback(true);
        rest.onError?.(e);
      }}
    />
  );
});
Img.displayName = 'Img';
export default Img;
