import { clients } from '../data/clients';
import { useEffect, useState } from 'react';

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

const ClientLogos = ({ startAnimation = true, skipAnimation = false }: ClientLogosProps) => {
  const [visibleCount, setVisibleCount] = useState(skipAnimation ? clients.length : 0);

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

  return (
    <section className="mb-16">
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 items-center">
        {clients.map((client, index) => (
          <div key={client.name} className="flex items-center justify-center">
            <img
              src={client.logo}
              alt={`${client.name} logo`}
              className="h-5 sm:h-6 md:h-7 lg:h-8 w-auto object-contain grayscale brightness-0 dark:invert hover:opacity-100 transition-opacity duration-500"
              style={{
                opacity: index < visibleCount ? 0.7 : 0,
                ...logoStyles[client.name],
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientLogos;
