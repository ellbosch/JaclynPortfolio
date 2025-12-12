import { Link } from 'react-router-dom';
import { personalInfo } from '../data/personal';
import { getAllProjects } from '../data/projects';

const Home = () => {
  const projects = getAllProjects();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <section className="mb-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          {personalInfo.name}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl">
          {personalInfo.title}
        </p>
      </section>

      {/* Projects Grid */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
          Selected Work
        </h2>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.slug}
                to={`/project/${project.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-xl mb-4 overflow-hidden">
                  {project.thumbnail.src ? (
                    <img
                      src={project.thumbnail.src}
                      alt={project.thumbnail.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {project.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              No projects yet
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Add projects in src/data/projects.ts
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
