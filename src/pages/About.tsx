import { personalInfo } from '../data/personal';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-8">
          About
        </h1>

        <div className="prose prose-lg dark:prose-invert">
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {personalInfo.bio}
          </p>

          {/* Placeholder for expanded bio */}
          <p className="text-gray-600 dark:text-gray-400">
            Add more bio content here...
          </p>
        </div>

        {/* Contact Section */}
        <section className="mt-16">
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
    </div>
  );
};

export default About;
