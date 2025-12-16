import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getProjectBySlug, getAllProjects, formatCategories } from '../data/projects';

const FadeInVideo = ({ src, className }: { src: string; className?: string }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <video
      src={src}
      controls
      muted
      playsInline
      autoPlay
      loop
      onLoadedData={() => setLoaded(true)}
      className={`${className} transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const allProjects = getAllProjects();

  if (!project) {
    return (
      <div className="max-w-[1400px] mx-auto px-2 lg:px-4 py-16">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The project "{slug}" doesn't exist.
          </p>
          <Link
            to="/"
            className="text-gray-900 dark:text-white hover:underline"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Find next/previous projects
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : undefined;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : undefined;

  return (
    <div className="max-w-[1400px] mx-auto px-2 lg:px-4 py-16">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
      >
        &larr; Back to Work
      </Link>

      {/* Project Header */}
      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {project.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap gap-6 text-sm text-gray-500 dark:text-gray-500">
          <span>{formatCategories(project.categories)}</span>
          {project.client && <span>Client: {project.client}</span>}
        </div>
      </header>

      {/* Hero Image */}
      {project.heroImage && (
        <div className="mb-12">
          <img
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            className="w-full h-auto"
          />
        </div>
      )}

      {/* Description */}
      <section className="mb-12">
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">
            {project.fullDescription}
          </p>
        </div>
      </section>

      {/* Skills */}
      {project.skills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Tools & Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Media Gallery (Videos + Images) */}
      {(project.videos.length > 0 || project.images.length > 0) && (
        <section className="mb-12">
          <div className="flex flex-wrap gap-4">
            {project.videos.map((video, index) => (
              <FadeInVideo key={`video-${index}`} src={video.src} className="w-full h-auto" />
            ))}
            {project.images.map((image, index) => (
              <img
                key={`image-${index}`}
                src={image.src}
                alt={image.alt}
                className="max-w-full h-auto"
              />
            ))}
          </div>
        </section>
      )}

      {/* Project Navigation */}
      <nav className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-16">
        <div className="flex justify-between">
          {prevProject ? (
            <Link
              to={`/project/${prevProject.slug}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              &larr; {prevProject.title}
            </Link>
          ) : (
            <span />
          )}
          {nextProject && (
            <Link
              to={`/project/${nextProject.slug}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {nextProject.title} &rarr;
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default ProjectPage;
