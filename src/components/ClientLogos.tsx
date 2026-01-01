import { clients } from '../data/clients';
import { useEffect, useState, useRef } from 'react';
import { getAllProjects } from '../data/projects';

type AnimationMode = 'sequential' | 'stagger' | 'all-at-once' | 'random';

interface ClientLogosProps {
  startAnimation?: boolean;
  skipAnimation?: boolean;
}

// Custom positioning for specific logos (doesn't affect grid layout)
const logoStyles: Record<string, React.CSSProperties> = {
  'Amazon': { transform: 'translateY(3px)' },
  'Samsung': { transform: 'scale(0.85)' },
  'Bose': { transform: 'scale(0.85)' },
  'Best Buy': { transform: 'scale(1.15)' },
  'Netgear': { transform: 'scale(0.85)' },
  'Starkey': { transform: 'scale(1.5) translateY(-2px)' },
  'Arlo': { transform: 'scale(1.2) translateY(-3px)' },
  'Whistle': { transform: 'scale(0.9)' },
  'Jabra': { transform: 'scale(0.85)' },
  'Nocturne': { transform: 'scale(0.8)' },
  'Arc Boats': { transform: 'scale(0.9)' },
};

// Map client names to project slugs
const clientToProject: Record<string, string> = {
  'Arlo': 'arlo',
  'Control4': 'control4',
  'Mode': 'mode',
  'Nice': 'nice-hr40-remote',
  'Jabra': 'jabra-packaging',
  'Netgear': 'netgear-nighthawk',
  'Aura Glow': 'auraglow',
  'Whistle': 'whistle',
  'Spansive': 'spansive',
  'Starkey': 'starkey',
  'Nocturne': 'nocturne',
  'Arc Boats': 'arc',
};

const ClientLogos = ({ startAnimation = true, skipAnimation = false }: ClientLogosProps) => {
  const [visibleCount, setVisibleCount] = useState(skipAnimation ? clients.length : 0);
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);
  const [animationMode, setAnimationMode] = useState<AnimationMode>('sequential');
  const [randomOrder, setRandomOrder] = useState<number[]>([]);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const allProjects = getAllProjects();

  const resetAnimation = () => {
    setVisibleCount(0);
    // Generate new random order when resetting
    const indices = Array.from({ length: clients.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setRandomOrder(indices);
  };

  useEffect(() => {
    if (!startAnimation || skipAnimation) return;
    if (visibleCount >= clients.length) return;

    if (animationMode === 'all-at-once') {
      // All logos appear at once - wait for them to be hidden first, then show all
      if (visibleCount === 0) {
        const timeout = setTimeout(() => {
          setVisibleCount(clients.length);
        }, 500);
        return () => clearTimeout(timeout);
      }
      return;
    }

    if (animationMode === 'stagger') {
      // Stagger: animate by column (mod 6), showing columns 0, 1, 2, 3, 4, 5 sequentially
      const numColumns = 6;
      const delay = 100; // ms between columns

      const timeout = setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + 1, numColumns));
      }, delay);

      return () => clearTimeout(timeout);
    }

    if (animationMode === 'random') {
      // Random: show logos in random order
      const delay = 75;

      const timeout = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }

    // Sequential: one by one
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= clients.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 75);

    return () => clearInterval(interval);
  }, [startAnimation, skipAnimation, animationMode, visibleCount]);

  const handleLogoClick = (clientName: string) => {
    const projectSlug = clientToProject[clientName];
    if (!projectSlug) return;

    // Find the project element by its id
    const projectElement = document.getElementById(projectSlug);
    if (projectElement) {
      // Get header height for offset (h-12 = 48px on mobile, h-16 = 64px on md+, plus padding on lg+)
      const headerOffset = window.innerWidth >= 1024 ? 96 : window.innerWidth >= 768 ? 64 : 48;
      const elementPosition = projectElement.getBoundingClientRect().top + window.scrollY;

      // Update URL hash without triggering default scroll
      window.history.pushState(null, '', `#${projectSlug}`);

      // Smooth scroll with offset
      window.scrollTo({
        top: elementPosition - headerOffset,
        behavior: 'smooth',
      });
    }
  };

  const hasProject = (clientName: string) => {
    const projectSlug = clientToProject[clientName];
    return projectSlug && allProjects.some((p) => p.slug === projectSlug);
  };

  const handleModeChange = (mode: AnimationMode) => {
    setAnimationMode(mode);
    resetAnimation();
  };

  const isLogoVisible = (index: number) => {
    if (animationMode === 'stagger') {
      // In stagger mode, visibleCount represents number of columns visible (0-6)
      const column = index % 6;
      return column < visibleCount;
    }
    if (animationMode === 'random') {
      // In random mode, check if this index appears in the first visibleCount items of randomOrder
      const position = randomOrder.indexOf(index);
      return position !== -1 && position < visibleCount;
    }
    // Sequential and all-at-once use simple index comparison
    return index < visibleCount;
  };

  return (
    <section className="mb-16 pt-4 pb-10 overflow-hidden">
      <div className="grid grid-cols-6 gap-4 md:gap-6 items-center">
        {clients.map((client, index) => {
          const hasWork = hasProject(client.name);
          return (
            <div
              key={client.name}
              className="relative flex items-center justify-center group cursor-pointer"
              onMouseEnter={() => {
                hoverTimeoutRef.current = setTimeout(() => {
                  setVisibleTooltip(client.name);
                }, 300);
              }}
              onMouseLeave={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                }
                setVisibleTooltip(null);
              }}
            >
              <img
                src={client.logo}
                alt={`${client.name} logo`}
                onClick={() => hasWork && handleLogoClick(client.name)}
                className="h-5 sm:h-6 md:h-7 lg:h-8 w-auto object-contain grayscale brightness-0 dark:invert hover:opacity-100 transition-opacity duration-500"
                style={{
                  opacity: isLogoVisible(index) ? 0.35 : 0,
                  ...logoStyles[client.name],
                }}
              />
              {/* Tooltip */}
              <div
                className={`absolute -bottom-8 px-2 py-1 bg-white/90 text-gray-900 text-xs rounded whitespace-nowrap z-10 pointer-events-none backdrop-blur-sm shadow-md transition-opacity duration-200 ${
                  index % 6 === 0 ? 'left-0 sm:left-1/2 sm:-translate-x-1/2' : index % 6 === 5 ? 'right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2' : 'left-1/2 -translate-x-1/2'
                } ${visibleTooltip === client.name ? 'opacity-100' : 'opacity-0'}`}
              >
                {hasWork ? <span>View Work</span> : 'Confidential Work'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Animation Test Buttons */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {(['sequential', 'stagger', 'all-at-once', 'random'] as const).map((mode) => (
          <button
            key={mode}
            onClick={() => handleModeChange(mode)}
            className="px-3 py-1 text-xs rounded-full transition-colors bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            {mode === 'all-at-once' ? 'All at Once' : mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>
    </section>
  );
};

export default ClientLogos;
