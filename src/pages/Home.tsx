import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllProjects, formatCategories } from '../data/projects';
import { ScrollVideo, ScrollImage, ScrollPanImage, ScrollPanImageTLBR, ScrollPanImageTRBL, ScrollPanImageLR, ScrollCrossfadeImages } from '../components/scroll/ScrollEffects';
import ClientLogos from '../components/ClientLogos';
import { useFilter } from '../context/FilterContext';

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
  const allProjects = getAllProjects();
  const { filter } = useFilter();
  const projects = filter === 'all'
    ? allProjects
    : allProjects.filter((p) => p.categories.includes(filter));
  const yearsExperience = Math.floor((Date.now() - new Date('2015-11-01').getTime()) / (1000 * 60 * 60 * 24 * 365));

  // Cascading fade-in animation state
  const [fadeStage, setFadeStage] = useState(0);

  useEffect(() => {
    // Stage 1: Name (after 200ms)
    const timer1 = setTimeout(() => setFadeStage(1), 200);
    // Stage 2: About text (after 500ms)
    const timer2 = setTimeout(() => setFadeStage(2), 500);
    // Stage 3: Logos (after 800ms) - ClientLogos handles its own cascade
    const timer3 = setTimeout(() => setFadeStage(3), 800);
    // Stage 4: Projects (after 1200ms)
    const timer4 = setTimeout(() => setFadeStage(4), 1200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto">
      {/* Hero Section - takes up 80vh so projects peek at bottom */}
      <section className="mt-15 md:mt-auto px-2 lg:px-4 h-auto md:h-[80vh] flex flex-col justify-center">
        <h1
          className={`font-bold text-black dark:text-white transition-opacity duration-500 ${fadeStage >= 1 ? 'opacity-100' : 'opacity-0'}`}
          style={{
            fontFamily: "'pragmatica', sans-serif",
            fontSize: 'clamp(65px, 8vw, 90px)',
            lineHeight: '1.1',
          }}
        >
          JACLYN LOWERY
        </h1>
        <p
          className="mt-8 md:mt-12 mb-4 md:mb-6 max-w-3xl text-2xl md:text-[32px]"
          style={{
            fontFamily: '"adobe-garamond-pro", serif',
            fontWeight: 400,
            lineHeight: '1.6',
          }}
        >
{/* Desktop version - single line, hidden on small screens */}
          <span
            className={`relative inline px-2 py-1 -ml-2 max-[568px]:hidden ${fadeStage >= 2 ? 'visible' : 'invisible'}`}
            style={{
              backgroundColor: 'rgba(107, 114, 128, 0.3)',
              borderRadius: '0.2em',
            }}
          >
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: '0.2em',
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                mixBlendMode: 'overlay',
                opacity: 0.4,
              }}
            />
            <span className="relative text-gray-500 dark:text-gray-400">
              Industrial Design, 3D Rendering, and 3D Animation.
            </span>
          </span>
          {/* Mobile version - two lines, hidden on larger screens */}
          <span className={`hidden max-[568px]:block -ml-1 ${fadeStage >= 2 ? 'visible' : 'invisible'}`}>
            <span
              className="relative inline px-1 py-0"
              style={{
                backgroundColor: 'rgba(107, 114, 128, 0.3)',
                borderRadius: '0.2em',
              }}
            >
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: '0.2em',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'overlay',
                  opacity: 0.4,
                }}
              />
              <span className="relative text-gray-500 dark:text-gray-400">
                Industrial Design, 3D Rendering,
              </span>
            </span>
            <span className="block h-2" />
            <span
              className="relative inline px-1 py-0"
              style={{
                backgroundColor: 'rgba(107, 114, 128, 0.3)',
                borderRadius: '0.2em',
              }}
            >
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  borderRadius: '0.2em',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'overlay',
                  opacity: 0.4,
                }}
              />
              <span className="relative text-gray-500 dark:text-gray-400">
                and 3D Animation.
              </span>
            </span>
          </span>
        </p>
        <p
          className={`text-gray-500 dark:text-gray-400 mb-12 md:mb-20 transition-opacity duration-500 text-2xl md:text-[32px] ${fadeStage >= 2 ? 'opacity-100' : 'opacity-0'}`}
          style={{
            fontFamily: '"adobe-garamond-pro", serif',
            fontWeight: 400,
            lineHeight: '1.6',
          }}
        >
          Reach out by{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const url = ['https://www.linkedin.com/in', 'jaclyn-lowery-11670590'].join('/');
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="underline hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          {' '}or{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const email = ['jaclynl.inquiries', 'gmail.com'].join('@');
              window.location.href = `mailto:${email}`;
            }}
            className="underline hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Email
          </a>
          .
        </p>
        <div className={`transition-opacity duration-500 ${fadeStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <ClientLogos startAnimation={fadeStage >= 3} skipAnimation={false} />
        </div>
      </section>

      {/* Projects - Full Width Vertical Layout */}
      <section className={`px-0 sm:px-2 lg:px-4 transition-opacity duration-500 ${fadeStage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
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
                <Link
                  key={project.slug}
                  id={project.slug}
                  to={`/project/${project.slug}`}
                  className="block mb-8 lg:mb-16 group"
                >
                  {/* Project Header - inline */}
                  <div className="flex flex-col md:flex-row md:items-baseline md:gap-6 mb-1 sm:mb-2 px-2 sm:px-0">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
                      {formatCategories(project.categories)}
                    </p>
                  </div>
                    {/* Video at top if available */}
                    {project.videos.length > 0 && (
                      <div className="mb-1 sm:mb-2 lg:mb-4">
                        <ScrollVideo
                          src={project.videos[0].src}
                          className="w-full h-auto"
                        />
                      </div>
                    )}

                    {/* Image Rows with gaps */}
                    {project.slug === 'arcsport' && project.images.length >= 4 ? (
                      // Custom Arc Sport layout: Asymmetric 70/30 split
                      <div className="flex flex-col lg:flex-row gap-1 sm:gap-2 lg:gap-4 lg:h-[45vh]">
                        <div className="h-[40vh] md:h-[54vh] lg:h-full" style={{ flex: '70 1 0%' }}>
                          <ScrollImage
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="h-[40vh] md:h-[54vh] lg:h-full" style={{ flex: '30 1 0%' }}>
                          <ScrollPanImage
                            src={project.images[3].src}
                            alt={project.images[3].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : project.slug === 'nice-hr40-remote' && project.images.length >= 5 ? (
                      // Custom Nice HR40 Remote layout: left column 30% (image 4), right column 70% (image 5)
                      // First image hidden on mobile
                      <div className="flex flex-col md:flex-row gap-1 sm:gap-2 lg:gap-4 items-stretch h-auto md:h-[35vh] lg:h-[45vh]">
                        <div className="hidden md:block overflow-hidden" style={{ flex: '30 1 0%' }}>
                          <img
                            src={project.images[3].src}
                            alt={project.images[3].alt}
                            className="w-full h-full object-cover object-bottom"
                          />
                        </div>
                        <div style={{ flex: '70 1 0%' }}>
                          <ScrollImage
                            src={project.images[4].src}
                            alt={project.images[4].alt}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 80%' }}
                          />
                        </div>
                      </div>
                    ) : project.slug === 'arlo' && project.images.length >= 7 ? (
                      // Custom Arlo layout: left column 62% (image 1), right column 38% (images 4, 7)
                      // Second image in right column hidden on mobile
                      <div className="flex flex-col md:flex-row gap-1 sm:gap-2 lg:gap-4 lg:h-[55vh] md:h-[40vh]">
                        <div style={{ flex: '62 1 0%' }} className="overflow-hidden">
                          <ScrollImage
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col gap-1 sm:gap-2 lg:gap-4 overflow-hidden" style={{ flex: '38 1 0%', height: '100%' }}>
                          <div className="flex-1 overflow-hidden" style={{ minHeight: 0 }}>
                            <ScrollImage
                              src={project.images[3].src}
                              alt={project.images[3].alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="hidden md:block flex-1 overflow-hidden" style={{ minHeight: 0 }}>
                            <ScrollImage
                              src={project.images[6].src}
                              alt={project.images[6].alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ) : project.slug === 'control4' && project.images.length >= 16 ? (
                      // Control4 layout: 3 columns, each with crossfade between 4 angles (no docked)
                      <div className="flex justify-center items-center h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[85vh] bg-white">
                        {/* Column 1: Tactile Dark (images 1-4) - leading */}
                        <div className="flex-1 h-full ml-5 md:ml-10 lg:ml-10">
                          <ScrollCrossfadeImages
                            images={project.images.slice(1, 5)}
                            className="w-full h-full object-cover"
                            useParentScroll
                          />
                        </div>
                        {/* Column 2: Touch Dark (images 6-9) - middle, scaled 85% */}
                        <div className="flex-1 h-[85%]">
                          <ScrollCrossfadeImages
                            images={project.images.slice(6, 10)}
                            className="w-full h-full object-cover"
                            useParentScroll
                          />
                        </div>
                        {/* Column 3: Touch Light (images 11-14) - trailing, scaled 85% */}
                        <div className="flex-1 h-[85%] mr-5 md:mr-10 lg:mr-10">
                          <ScrollCrossfadeImages
                            images={project.images.slice(11, 15)}
                            className="w-full h-full object-cover"
                            useParentScroll
                          />
                        </div>
                      </div>
                    ) : project.slug === 'mode' && project.images.length >= 2 ? (
                      // Custom Mode layout: images 1 and 2 side by side, 1 takes 80% with diagonal pan
                      // Second image hidden on mobile
                      <div className="flex flex-col flex-row gap-1 sm:gap-2 lg:gap-4 h-auto md:h-[45vh]">
                        <div style={{ flex: '80 1 0%' }} className="overflow-hidden">
                          <ScrollPanImageTLBR
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            className="w-full h-full object-cover"
                            panSpeed={0.92}
                          />
                        </div>
                        <div className="hidden md:block" style={{ flex: '20 1 0%' }}>
                          <ScrollImage
                            src={project.images[1].src}
                            alt={project.images[1].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : project.slug === 'q-egg' && project.images.length >= 2 ? (
                      // Custom Q-Egg layout: images 1 and 2 in one row, 1 takes 20%
                      // First image hidden on mobile
                      <div className="flex flex-col md:flex-row gap-1 sm:gap-2 lg:gap-4 h-auto md:h-[25vh] lg:h-[45vh]">
                        <div className="hidden md:block overflow-hidden" style={{ flex: '20 1 0%' }}>
                          <img
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: '53% center' }}
                          />
                        </div>
                        <div style={{ flex: '80 1 0%' }}>
                          <ScrollImage
                            src={project.images[1].src}
                            alt={project.images[1].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : project.slug === 'auraglow' && project.images.length >= 3 ? (
                      // Custom AuraGlow layout: single image (3rd from subpage)
                      <div className="overflow-hidden h-[25vh] sm:h-[30vh] lg:h-[50vh]">
                        <img
                          src={project.images[2].src}
                          alt={project.images[2].alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : project.slug === 'jabra-packaging' && project.images.length >= 7 ? (
                      // Custom Jabra layout: top row 33/67 split, then full width pan image
                      <div className="flex flex-col gap-1 sm:gap-2 lg:gap-4">
                        <div className="flex flex-col md:flex-row gap-1 sm:gap-2 lg:gap-4 h-auto md:h-[35vh]">
                          <div className="h-[35vh] md:h-full overflow-hidden" style={{ flex: '40 1 0%' }}>
                            <ScrollPanImageTLBR
                              src={project.images[2].src}
                              alt={project.images[2].alt}
                              className="w-full h-full object-cover"
                              panSpeed={0.15}
                            />
                          </div>
                          <div className="h-[35vh] md:h-full overflow-hidden" style={{ flex: '60 1 0%' }}>
                            <ScrollPanImageLR
                              src={project.images[3].src}
                              alt={project.images[3].alt}
                              className="w-full h-full object-cover"
                              panSpeed={0.15}
                            />
                          </div>
                        </div>
                        <div className="w-full h-[35vh] md:h-[45vh] overflow-hidden">
                          <ScrollPanImageTRBL
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            className="w-full h-full object-cover"
                            panSpeed={0.15}
                          />
                        </div>
                      </div>
                    ) : project.slug === 'whistle' && project.images.length >= 5 ? (
                      // Custom Whistle layout: image 5 natural height, image 1 fills space, image 4 hidden on mobile
                      <div className="flex flex-col md:flex-row gap-1 sm:gap-2 lg:gap-4 items-start">
                        <div style={{ flex: '1 1 0%' }}>
                          <ScrollImage
                            src={project.images[4].src}
                            alt={project.images[4].alt}
                            className="w-full h-auto"
                          />
                        </div>
                        <div style={{ flex: '1 1 0%' }} className="self-stretch">
                          <ScrollImage
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div style={{ flex: '1 1 0%' }} className="hidden md:block overflow-hidden self-stretch">
                          <ScrollImage
                            src={project.images[3].src}
                            alt={project.images[3].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : project.slug === 'spansive' && project.images.length >= 5 ? (
                      // Custom Spansive layout: top image 1, then left 2/3 (image 4), right 1/3 (image 2 cropped)
                      <div className="flex flex-col gap-1 sm:gap-2 lg:gap-4">
                        <div className="w-full h-[60vh] overflow-hidden">
                          <ScrollImage
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col md:flex-row gap-1 sm:gap-2 lg:gap-4 h-auto md:h-[50vh]">
                          <div style={{ flex: '2 1 0%' }}>
                            <ScrollImage
                              src={project.images[3].src}
                              alt={project.images[3].alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div style={{ flex: '1 1 0%' }} className="hidden md:block">
                            <ScrollImage
                              src={project.images[1].src}
                              alt={project.images[1].alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ) : project.slug === 'starkey' && project.images.length >= 6 ? (
                      // Custom Starkey layout: images 6 and 1 in one row, 1 takes 2/3
                      // First image hidden on mobile
                      <div className="flex flex-row gap-1 sm:gap-2 lg:gap-4 h-auto md:h-[30vh]">
                        <div style={{ flex: '1 1 0%' }} className="hidden md:block overflow-hidden">
                          <img
                            src={project.images[5].src}
                            alt={project.images[5].alt}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'calc(50% + 20px) center' }}
                          />
                        </div>
                        <div style={{ flex: '2 1 0%' }}>
                          <ScrollImage
                            src={project.images[0].src}
                            alt={project.images[0].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ) : project.slug === 'nocturne' && project.images.length >= 3 ? (
                      // Nocturne: 2nd and 3rd images side by side (70/30 split)
                      <div className="flex flex-col lg:flex-row gap-1 sm:gap-2 lg:gap-4 h-auto lg:h-[55vh]">
                        <div className="hidden lg:block" style={{ flex: '40 1 0%' }}>
                          <ScrollImage
                            src={project.images[1].src}
                            alt={project.images[1].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div style={{ flex: '60 1 0%' }}>
                          <ScrollImage
                            src={project.images[2].src}
                            alt={project.images[2].alt}
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'left center' }}
                          />
                        </div>
                      </div>
                    ) : project.slug === 'netgear-nighthawk' ? (
                      // Netgear: video only on home page, images only on subpage
                      null
                    ) : (
                      <div className="flex flex-col gap-1 sm:gap-2 lg:gap-4">
                        {rows.map((row, rowIndex) => (
                          <div key={rowIndex} className="flex flex-col md:flex-row gap-1 sm:gap-2 lg:gap-4">
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
              );
            })}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto text-center py-20 bg-gray-50 dark:bg-black rounded-xl">
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
