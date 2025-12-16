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
      <div className="w-full sm:w-[496px] md:w-[760px] lg:w-[800px] flex flex-wrap gap-4 md:gap-8 items-center justify-start">
        {clients.map((client, index) => (
          <img
            key={client.name}
            src={client.logo}
            alt={`${client.name} logo`}
            className="h-4 sm:h-6 w-auto max-w-[90px] md:max-w-none object-contain grayscale brightness-0 dark:invert hover:opacity-100 transition-opacity duration-500"
            style={{
              opacity: index < visibleCount ? 0.7 : 0,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ClientLogos;
