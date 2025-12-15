import { clients } from '../data/clients';
import { useEffect, useState } from 'react';

interface ClientLogosProps {
  startAnimation?: boolean;
}

const ClientLogos = ({ startAnimation = true }: ClientLogosProps) => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!startAnimation) return;

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
      <div className="flex flex-wrap gap-6 md:gap-8 items-center justify-start">
        {clients.map((client, index) => (
          <img
            key={client.name}
            src={client.logo}
            alt={`${client.name} logo`}
            className="h-3 md:h-6 w-auto object-contain grayscale brightness-0 dark:invert hover:opacity-100 transition-opacity duration-500"
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
