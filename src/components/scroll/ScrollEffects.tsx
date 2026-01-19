import { useEffect, useRef, useState } from 'react';

// Detect if device is mobile/touch - disable scroll effects on mobile for performance
const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;
};

// Scroll-based video component with autoplay on visibility
export const ScrollVideo = ({ src, className }: { src: string; className: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay may be blocked by browser
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.01, rootMargin: '600px 0px' }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden w-full h-full">
      <video
        ref={videoRef}
        src={src}
        preload="auto"
        muted
        loop
        playsInline
        className={className}
      />
    </div>
  );
};

// Scroll-based image component with scale effect
export const ScrollImage = ({ src, alt, className, style }: { src: string; alt: string; className: string; style?: React.CSSProperties }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the viewport the element is (0 = top, 1 = bottom)
      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Scale from 1.0 to 1.05 based on scroll progress
      const newScale = 1 + clampedProgress * 0.05;
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden w-full h-full">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} block`}
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.1s ease-out',
          ...style,
        }}
      />
    </div>
  );
};

// Scroll-based image component with pan effect (bottom-left to top-right)
// Uses object-position to pan without extra zoom
// Disabled on mobile for performance
export const ScrollPanImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile()) return; // Skip scroll effects on mobile

    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Pan diagonally from bottom-left to top-right using object-position
      const panRange = 15;
      const startX = 35;
      const startY = 70;
      const x = startX + clampedProgress * panRange;
      const y = startY - clampedProgress * panRange;

      imgRef.current.style.objectPosition = `${x}% ${y}%`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden w-full h-full">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} block`}
        style={{
          objectPosition: '50% 50%', // Center on mobile
        }}
      />
    </div>
  );
};

// Scroll-based image with pan from top-left to bottom-right (with zoom for pan room)
// Disabled on mobile for performance
export const ScrollPanImageTLBR = ({ src, alt, className, panSpeed = 1 }: { src: string; alt: string; className: string; panSpeed?: number }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile()) return; // Skip scroll effects on mobile

    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Pan diagonally from top-left to bottom-right
      const panRange = 80 * panSpeed;
      const x = Math.round((40 * panSpeed) - clampedProgress * panRange);
      const y = Math.round((40 * panSpeed) - clampedProgress * panRange);

      imgRef.current.style.transform = `scale(1.2) translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [panSpeed]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full h-full">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} block`}
      />
    </div>
  );
};

// Scroll-based image with pan from top-right to bottom-left (with zoom for pan room)
// Disabled on mobile for performance
export const ScrollPanImageTRBL = ({ src, alt, className, panSpeed = 1 }: { src: string; alt: string; className: string; panSpeed?: number }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile()) return; // Skip scroll effects on mobile

    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Pan diagonally from top-right to bottom-left (start higher)
      const panRange = 100 * panSpeed;
      const x = Math.round((-40 * panSpeed) + clampedProgress * (80 * panSpeed));
      const y = Math.round((40 * panSpeed) - clampedProgress * panRange);

      imgRef.current.style.transform = `scale(1.2) translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [panSpeed]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full h-full">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} block`}
      />
    </div>
  );
};

// Scroll-based image with vertical pan from top to bottom (GPU-accelerated)
// Disabled on mobile for performance
export const ScrollPanImageTB = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile()) return; // Skip scroll effects on mobile

    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Pan vertically from top to bottom
      const panRange = 120;
      const y = Math.round(60 - clampedProgress * panRange);

      imgRef.current.style.transform = `scale(1.25) translate3d(0, ${y}px, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden w-full h-full">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} block`}
      />
    </div>
  );
};

// Scroll-based image with horizontal pan from left to right (GPU-accelerated)
// Disabled on mobile for performance
export const ScrollPanImageLR = ({ src, alt, className, panSpeed = 1 }: { src: string; alt: string; className: string; panSpeed?: number }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile()) return; // Skip scroll effects on mobile

    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Pan horizontally from right to left
      const panRange = 100 * panSpeed;
      const x = Math.round((50 * panSpeed) - clampedProgress * panRange);

      imgRef.current.style.transform = `scale(1.2) translate3d(${x}px, 0, 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [panSpeed]);

  return (
    <div ref={containerRef} className="overflow-hidden w-full h-full">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} block`}
      />
    </div>
  );
};

// Scroll-based crossfade between multiple images
export const ScrollCrossfadeImages = ({
  images,
  className,
  useParentScroll = false,
}: {
  images: Array<{ src: string; alt: string }>;
  className: string;
  useParentScroll?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      // If useParentScroll is true, find the parent container and use its scroll position
      const scrollElement = useParentScroll
        ? containerRef.current.parentElement?.parentElement
        : containerRef.current;

      if (!scrollElement) return;

      const rect = scrollElement.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Extended scroll range: starts when top enters, ends when bottom leaves
      // This gives more scroll distance for each image transition
      const scrollStart = windowHeight; // element top at bottom of viewport
      const scrollEnd = -rect.height; // element bottom at top of viewport
      const scrollRange = scrollStart - scrollEnd;
      const currentPosition = rect.top;
      const progress = (scrollStart - currentPosition) / scrollRange;
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Map progress to image index (divide into N segments)
      const newIndex = Math.min(
        Math.floor(clampedProgress * images.length),
        images.length - 1
      );
      setActiveIndex(newIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [images.length, useParentScroll]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={`${className} absolute inset-0 transition-opacity duration-700`}
          style={{
            opacity: index === activeIndex ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
};

// Parallax container that moves children slower than scroll
// Note: This component had rendering issues (horizontal lines, masking) when used.
// Preserved here for future experimentation.
export const ParallaxContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate position relative to viewport center
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;

      // Parallax: move content opposite to scroll direction at reduced rate
      const parallaxFactor = 0.1;
      const newTranslateY = Math.round(distanceFromCenter * parallaxFactor);

      setTranslateY(newTranslateY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <div
        style={{
          transform: `translate3d(0, ${translateY}px, 0)`,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
};
