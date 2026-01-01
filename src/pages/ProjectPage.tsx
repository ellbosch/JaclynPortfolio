import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { getProjectBySlug, getAllProjects, formatCategories } from '../data/projects';
import { trackEvent } from '../utils/analytics';

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
    <div className="max-w-[1400px] mx-auto px-0 sm:px-2 lg:px-4 py-8">
      {/* Back Link */}
      <Link
        to="/"
        className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors px-2 sm:px-0"
        onClick={() => trackEvent('click_navigation', { action: 'back_to_work', project_slug: slug || '' })}
      >
        &larr; Back to Work
      </Link>

      {/* Project Header */}
      <header className="mb-12 px-2 sm:px-0">
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
      {project.fullDescription && (
        <section className="mb-8 px-2 sm:px-0">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p
              className="text-lg text-gray-900 dark:text-white whitespace-pre-line [&_a]:underline [&_a]:text-gray-900 dark:[&_a]:text-white"
              dangerouslySetInnerHTML={{ __html: project.fullDescription }}
            />
          </div>
        </section>
      )}

      {/* Credits */}
      {project.creditsDescription && (
        <section className="mb-12 px-2 sm:px-0">
          <p className="text-sm text-gray-500 dark:text-gray-500 whitespace-pre-line">
            {project.creditsDescription}
          </p>
        </section>
      )}

      {/* Skills */}
      {project.skills.length > 0 && (
        <section className="mb-12 px-2 sm:px-0">
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
          {/* Custom layout for Control4 - simple gallery with max height for portrait shots */}
          {slug === 'control4' ? (
            <div className="space-y-1 sm:space-y-2 lg:space-y-4">
              {/* First image full width */}
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                className="w-full h-auto max-h-[100vh] object-contain bg-white"
              />
              {/* Non-docked images in flex rows - 2 per row on md+ (exclude indices 5, 10, 15) */}
              <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-4">
                {project.images.slice(1).filter((_, i) => ![4, 9, 14].includes(i)).map((image, index) => (
                  <div key={`image-${index + 1}`} className="w-full md:basis-[calc(50%-0.5rem)] md:flex-1">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto max-h-[80vh] object-contain bg-white"
                    />
                  </div>
                ))}
              </div>
              {/* Docked photos in horizontal stack with single white background */}
              <div className="flex flex-row items-end gap-1 sm:gap-2 lg:gap-4 bg-white p-2 sm:p-4">
                {[project.images[5], project.images[10], project.images[15]].map((image, index) => (
                  <div key={`docked-${index}`} className="flex-1" style={{ transform: index > 0 ? 'scale(0.91)' : undefined, transformOrigin: 'bottom center' }}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : slug === 'mode' ? (
            <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-4">
              {/* First two videos at top */}
              {project.videos.slice(0, 2).map((video, index) => (
                <FadeInVideo key={`video-${index}`} src={video.src} className="w-full h-auto" />
              ))}
              {/* First image full width */}
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                className="max-w-full h-auto"
              />
              {/* 4th and 2nd images side by side on md+ */}
              <div className="w-full flex flex-col md:flex-row gap-1 sm:gap-2 lg:gap-4">
                <div className="flex-1">
                  <img
                    src={project.images[3].src}
                    alt={project.images[3].alt}
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <img
                    src={project.images[1].src}
                    alt={project.images[1].alt}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: '58% bottom' }}
                  />
                </div>
              </div>
              {/* Water brush video with constrained height */}
              <div className="w-full bg-black flex justify-center" style={{ maxHeight: '70vh' }}>
                <video
                  src={project.videos[2].src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full max-h-[70vh] w-auto object-contain"
                />
              </div>
              {/* Remaining images */}
              {[project.images[2], project.images[4], project.images[5]].map((image, index) => (
                <img
                  key={`image-${index}`}
                  src={image.src}
                  alt={image.alt}
                  className="max-w-full h-auto"
                />
              ))}
            </div>
          ) : slug === 'arlo' ? (
            <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-4">
              {project.videos.map((video, index) => (
                <FadeInVideo key={`video-${index}`} src={video.src} className="w-full h-auto" />
              ))}
              {/* 2nd and 3rd images side by side on md+ (right under video) */}
              <div className="w-full flex flex-col md:flex-row gap-1 sm:gap-2 lg:gap-4">
                <div className="flex-1">
                  <img
                    src={project.images[1].src}
                    alt={project.images[1].alt}
                    className="w-full h-auto"
                  />
                </div>
                <div className="flex-1">
                  <img
                    src={project.images[2].src}
                    alt={project.images[2].alt}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              {/* First image full width */}
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                className="max-w-full h-auto"
              />
              {/* Remaining images */}
              {project.images.slice(3).map((image, index) => (
                <img
                  key={`image-${index + 3}`}
                  src={image.src}
                  alt={image.alt}
                  className="max-w-full h-auto"
                />
              ))}
            </div>
          ) : slug === 'netgear-nighthawk' ? (
            <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-4">
              {project.videos.map((video, index) => (
                <FadeInVideo key={`video-${index}`} src={video.src} className="w-full h-auto" />
              ))}
              {/* All images except last two */}
              {project.images.slice(0, -2).map((image, index) => (
                <img
                  key={`image-${index}`}
                  src={image.src}
                  alt={image.alt}
                  className="max-w-full h-auto"
                />
              ))}
              {/* Last two images side by side - 33/67 split */}
              <div className="w-full flex flex-col md:flex-row gap-1 sm:gap-2 lg:gap-4">
                <div style={{ flex: '1 1 33%' }}>
                  <img
                    src={project.images[project.images.length - 2].src}
                    alt={project.images[project.images.length - 2].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div style={{ flex: '2 1 67%' }}>
                  <img
                    src={project.images[project.images.length - 1].src}
                    alt={project.images[project.images.length - 1].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ) : slug === 'starkey' ? (
            <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-4">
              {project.videos.map((video, index) => (
                <FadeInVideo key={`video-${index}`} src={video.src} className="w-full h-auto" />
              ))}
              {/* First image full width */}
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                className="max-w-full h-auto"
              />
              {/* 2nd, 3rd, and 4th images inline on lg+ */}
              <div className="w-full flex flex-col lg:flex-row gap-1 sm:gap-2 lg:gap-4">
                <div className="flex-1">
                  <img
                    src={project.images[1].src}
                    alt={project.images[1].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <img
                    src={project.images[2].src}
                    alt={project.images[2].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <img
                    src={project.images[3].src}
                    alt={project.images[3].alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Remaining images */}
              {project.images.slice(4).map((image, index) => (
                <img
                  key={`image-${index + 4}`}
                  src={image.src}
                  alt={image.alt}
                  className="max-w-full h-auto"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-4">
              {project.videos.map((video, index) => (
                <FadeInVideo key={`video-${index}`} src={video.src} className="w-full h-auto" />
              ))}
              {project.images.map((image, index) => (
                <img
                  key={`image-${index}`}
                  src={image.src}
                  alt={image.alt}
                  className={`max-w-full h-auto ${image.src.includes('02-green-taupe') ? 'bg-white' : ''}`}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* Project Navigation */}
      <nav className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-16 px-2 sm:px-0">
        <div className="flex justify-between">
          {prevProject ? (
            <Link
              to={`/project/${prevProject.slug}`}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              onClick={() => trackEvent('click_navigation', { action: 'prev_project', project_slug: prevProject.slug })}
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
              onClick={() => trackEvent('click_navigation', { action: 'next_project', project_slug: nextProject.slug })}
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
