import { clients } from '../data/clients';
import { useEffect, useState, useRef } from 'react';
import { getAllProjects } from '../data/projects';

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
};

const ClientLogos = ({ startAnimation = true, skipAnimation = false }: ClientLogosProps) => {
  const [visibleCount, setVisibleCount] = useState(skipAnimation ? clients.length : 0);
  const [visibleTooltip, setVisibleTooltip] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const allProjects = getAllProjects();

  useEffect(() => {
    if (!startAnimation || skipAnimation) return;

    // Start cascading animation when startAnimation becomes true
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setVisibleCount(count);
      if (count >= clients.length) {
        clearInterval(interval);
      }
    }, 75); // 75ms delay between each logo

    return () => clearInterval(interval);
  }, [startAnimation]);

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

  return (
    <section className="mb-16">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 items-center">
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
                  opacity: index < visibleCount ? 0.7 : 0,
                  ...logoStyles[client.name],
                }}
              />
              {/* Tooltip */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/90 text-gray-900 text-xs rounded whitespace-nowrap z-10 pointer-events-none backdrop-blur-sm shadow-md transition-opacity duration-200 ${visibleTooltip === client.name ? 'opacity-100' : 'opacity-0'}`}
              >
                {hasWork ? <span>View Work</span> : 'Confidential Work'}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ClientLogos;
