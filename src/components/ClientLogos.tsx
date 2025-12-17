import { clients } from '../data/clients';
import { useEffect, useState } from 'react';

interface ClientLogosProps {
  startAnimation?: boolean;
  skipAnimation?: boolean;
}

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
              className="h-6 sm:h-7 md:h-8 w-auto object-contain grayscale brightness-0 dark:invert hover:opacity-100 transition-opacity duration-500"
              style={{
                opacity: index < visibleCount ? 0.7 : 0,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientLogos;
