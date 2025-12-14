import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getAllProjects } from '../data/projects';

// Scroll-based image component with parallax panning
const ScrollImage = ({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the viewport the element is (0 = top, 1 = bottom)
      const progress = 1 - (rect.top + rect.height) / (windowHeight + rect.height);
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // Scale from 1.0 to 1.05 based on scroll progress
      const newScale = 1 + clampedProgress * 0.05;
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="overflow-hidden w-full h-full">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.1s ease-out',
        }}
      />
    </div>
  );
};

// Layout patterns: each row is either [1] for full width or [flex1, flex2] for two images
const rowPatterns = [
  [[1], [6, 4]],           // full, then 60/40
  [[5.5, 4.5], [1]],       // 55/45, then full
  [[1], [4, 6]],           // full, then 40/60
  [[6.5, 3.5], [1]],       // 65/35, then full
  [[1], [5, 5]],           // full, then 50/50
  [[4.5, 5.5], [1]],       // 45/55, then full
  [[1], [3.5, 6.5]],       // full, then 35/65
  [[5, 5], [1]],           // 50/50, then full
  [[1], [5.5, 4.5]],       // full, then 55/45
  [[6, 4], [1]],           // 60/40, then full
];

const Home = () => {
  const projects = getAllProjects();

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Hero Section */}
      <section className="px-4 py-16 mb-8">
        <h1
          className="font-bold text-black dark:text-white"
          style={{
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
            fontSize: '16px',
            fontWeight: 400,
          }}
        >
          San Francisco based creative offering Industrial Design, 3D Rendering, and 3D Animation services.
        </p>
      </section>

      {/* Projects - Full Width Vertical Layout */}
      <section className="px-4">
        {projects.length > 0 ? (
          <div>
            {projects.map((project, projectIndex) => {
              // Get up to 4 images
              const displayImages = project.images.slice(0, 4);
              // Get row pattern for this project
              const pattern = rowPatterns[projectIndex % rowPatterns.length];

              // Distribute images into rows based on pattern
              const rows: { images: typeof displayImages; layout: number[] }[] = [];
              let imageIndex = 0;

              for (const rowLayout of pattern) {
                if (imageIndex >= displayImages.length) break;
                const imagesInRow = rowLayout.length === 1 ? 1 : 2;
                const rowImages = displayImages.slice(imageIndex, imageIndex + imagesInRow);
                if (rowImages.length > 0) {
                  rows.push({ images: rowImages, layout: rowLayout });
                  imageIndex += imagesInRow;
                }
              }

              return (
                <div key={project.slug} className="mb-16">
                  {/* Project Header - inline */}
                  <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-2">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                      {project.shortDescription}
                    </p>
                  </div>

                  <Link
                    to={`/project/${project.slug}`}
                    className="group block"
                  >
                    {/* Image Rows with gaps */}
                    <div className="flex flex-col gap-4">
                      {rows.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-4">
                          {row.images.map((image, imgIdx) => {
                            const flexValue = row.layout.length === 1
                              ? 1
                              : row.layout[imgIdx] || row.layout[0];
                            return (
                              <div
                                key={imgIdx}
                                style={{ flex: `${flexValue} 1 0%` }}
                              >
                                <ScrollImage
                                  src={image.src}
                                  alt={image.alt}
                                  className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover"
                                />
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </Link>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-xl">
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
