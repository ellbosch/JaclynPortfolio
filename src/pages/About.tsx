import { personalInfo } from '../data/personal';
import ClientLogos from '../components/ClientLogos';

const About = () => {
  const yearsExperience = Math.floor((Date.now() - new Date('2015-11-01').getTime()) / (1000 * 60 * 60 * 24 * 365));

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
        <img
          src="/images/jaclyn-portrait.jpg"
          alt="Jaclyn Lowery"
          className="w-48 h-48 object-cover"
        />
        <div>
          <h1
            className="font-bold text-black dark:text-white"
            style={{
              fontFamily: "'pragmatica', sans-serif",
              fontSize: '34px',
              lineHeight: '40.8px',
            }}
          >
            JACLYN<br />LOWERY
          </h1>
          <p
            className="text-black dark:text-white mt-4"
            style={{
              fontFamily: '"adobe-garamond-pro", serif',
              fontSize: '20px',
              fontWeight: 400,
            }}
          >
            Jaclyn is an Industrial Designer and 3D Generalist with over {yearsExperience} years of professional experience in the Bay Area. She specializes in Industrial Design, photo-realistic 3D rendering, and animation.
          </p>
        </div>
      </div>

      {/* Client Logos */}
      <ClientLogos />

      {/* Contact Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Get in Touch
        </h2>

        <div className="flex flex-col gap-4">
          {personalInfo.email && (
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {personalInfo.email}
            </a>
          )}

          <div className="flex gap-6">
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                LinkedIn
              </a>
            )}
            {personalInfo.behance && (
              <a
                href={personalInfo.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Behance
              </a>
            )}
            {personalInfo.instagram && (
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
