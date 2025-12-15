import { Link } from 'react-router-dom';
import { getAllProjects } from '../data/projects';
import { ScrollVideo, ScrollImage, ScrollPanImage } from '../components/scroll/ScrollEffects';

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
            fontFamily: "'pragmatica', sans-serif",
            fontSize: '34px',
            lineHeight: '40.8px',
          }}
        >
          JACLYN LOWERY
        </h1>
        <p
          className="text-black dark:text-white mt-4"
          style={{
            fontFamily: '"adobe-garamond-pro", serif',
            fontSize: '20px',
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
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                      {project.shortDescription}
                    </p>
                  </div>

                  <Link
                    to={`/project/${project.slug}`}
                    className="group block"
                  >
                    {/* Video at top if available */}
                    {project.videos.length > 0 && (
                      <div className="mb-4">
                        <ScrollVideo
                          src={project.videos[0].src}
                          className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover"
                        />
                      </div>
                    )}

                    {/* Image Rows with gaps */}
                    {project.slug === 'arcsport' && project.images.length >= 4 ? (
                      // Custom Arc Sport layout: Asymmetric 70/30 split
                      <div className="flex gap-4" style={{ height: '65vh' }}>
                        <div style={{ flex: '70 1 0%' }}>
                          <ScrollImage
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div style={{ flex: '30 1 0%' }}>
                          <ScrollPanImage
                            src={project.images[3].src}
                            alt={project.images[3].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : project.slug === 'nice-hr40-remote' && project.images.length >= 6 ? (
                      // Custom Nice HR40 Remote layout: left column 30% (image 5), right column 70% (image 6)
                      <div className="flex gap-4 items-stretch" style={{ height: '65vh' }}>
                        <div style={{ flex: '30 1 0%' }} className="overflow-hidden">
                          <img
                            src={project.images[4].src}
                            alt={project.images[4].alt}
                            className="w-full h-full object-cover object-bottom"
                          />
                        </div>
                        <div style={{ flex: '70 1 0%' }}>
                          <ScrollImage
                            src={project.images[5].src}
                            alt={project.images[5].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : project.slug === 'arlo' && project.images.length >= 7 ? (
                      // Custom Arlo layout: left column 62% (image 1), right column 38% (images 4, 7)
                      <div className="flex gap-4 items-stretch" style={{ height: '62vh' }}>
                        <div style={{ flex: '62 1 0%' }}>
                          <ScrollImage
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-4" style={{ flex: '38 1 0%' }}>
                          <div className="flex-1">
                            <ScrollImage
                              src={project.images[3].src}
                              alt={project.images[3].alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <ScrollImage
                              src={project.images[6].src}
                              alt={project.images[6].alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ) : project.slug === 'auraglow' && project.images.length >= 8 ? (
                      // Custom AuraGlow layout: single row with images 7, 8, 4 equal width, no cropping
                      <div className="flex gap-4">
                        <div style={{ flex: '1 1 0%' }}>
                          <ScrollImage
                            src={project.images[6].src}
                            alt={project.images[6].alt}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                        <div style={{ flex: '1 1 0%' }}>
                          <ScrollImage
                            src={project.images[7].src}
                            alt={project.images[7].alt}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                        <div style={{ flex: '1 1 0%' }}>
                          <ScrollImage
                            src={project.images[3].src}
                            alt={project.images[3].alt}
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                    ) : project.slug === 'jabra-packaging' && project.images.length >= 7 ? (
                      // Custom Jabra layout: photos 3, 6, 7 stacked full width
                      <div className="flex flex-col gap-4">
                        <ScrollImage
                          src={project.images[2].src}
                          alt={project.images[2].alt}
                          className="w-full h-auto"
                        />
                        <ScrollImage
                          src={project.images[5].src}
                          alt={project.images[5].alt}
                          className="w-full h-auto"
                        />
                        <ScrollImage
                          src={project.images[6].src}
                          alt={project.images[6].alt}
                          className="w-full h-auto"
                        />
                      </div>
                    ) : (
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
                    )}
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
