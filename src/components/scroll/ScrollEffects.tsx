import { useEffect, useRef, useState } from 'react';

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
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden w-full h-full">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className={className}
      />
    </div>
  );
};

// Scroll-based image component with scale effect
export const ScrollImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
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
        }}
      />
    </div>
  );
};

// Scroll-based image component with pan effect (bottom-left to top-right)
// Uses object-position to pan without extra zoom
export const ScrollPanImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [objectPosition, setObjectPosition] = useState('0% 100%'); // bottom-left

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the viewport the element is (0 = top, 1 = bottom)
      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Pan diagonally from bottom-left to top-right using object-position
      // Start more centered so the boat is visible initially
      const panRange = 15;
      const startX = 35; // Start at 35% from left (more centered)
      const startY = 70; // Start at 70% from top (lower portion)
      // Pan toward top-right as scroll progresses
      const x = startX + clampedProgress * panRange; // 30% to 45%
      const y = startY - clampedProgress * panRange; // 70% to 55%

      setObjectPosition(`${x}% ${y}%`);
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
          objectPosition,
        }}
      />
    </div>
  );
};

// Scroll-based image with pan from top-left to bottom-right (with zoom for pan room)
export const ScrollPanImageTLBR = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Pan diagonally from top-left to bottom-right
      const panRange = 50; // pixels to pan
      const x = Math.round(25 - clampedProgress * panRange);
      const y = Math.round(25 - clampedProgress * panRange);

      imgRef.current.style.transform = `scale(1.15) translate3d(${x}px, ${y}px, 0)`;
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
          willChange: 'transform',
        }}
      />
    </div>
  );
};

// Scroll-based image with pan from top-right to bottom-left (with zoom for pan room)
export const ScrollPanImageTRBL = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Pan diagonally from top-right to bottom-left (start higher)
      const panRange = 80; // pixels to pan
      const x = Math.round(-30 + clampedProgress * 60);
      const y = Math.round(60 - clampedProgress * panRange);

      imgRef.current.style.transform = `scale(1.2) translate3d(${x}px, ${y}px, 0)`;
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
          willChange: 'transform',
        }}
      />
    </div>
  );
};

// Scroll-based image with vertical pan from top to bottom (GPU-accelerated)
export const ScrollPanImageTB = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Pan vertically from top to bottom (faster animation)
      const panRange = 120; // pixels to pan
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
        style={{
          willChange: 'transform',
        }}
      />
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
