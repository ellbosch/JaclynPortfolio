import { personalInfo } from '../../data/personal';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="max-w-[1400px] mx-auto px-2 lg:px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400"
              >
                LinkedIn
              </a>
            )}
            {personalInfo.behance && (
              <a
                href={personalInfo.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400"
              >
                Behance
              </a>
            )}
            {personalInfo.instagram && (
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
