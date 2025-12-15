import { clients } from '../data/clients';

const ClientLogos = () => {
  return (
    <section className="mb-16">
      <div className="flex flex-wrap gap-8 items-center justify-start">
        {clients.map((client) => (
          <img
            key={client.name}
            src={client.logo}
            alt={`${client.name} logo`}
            className="h-6 w-auto object-contain grayscale brightness-0 dark:invert opacity-70 hover:opacity-100 transition-opacity"
          />
        ))}
      </div>
    </section>
  );
};

export default ClientLogos;
