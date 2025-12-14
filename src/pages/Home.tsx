import { Link } from 'react-router-dom';
import { personalInfo } from '../data/personal';
import { getAllProjects } from '../data/projects';

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
    <div>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          {personalInfo.name}
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl">
          {personalInfo.title}
        </p>
      </section>

      {/* Projects - Full Width Vertical Layout */}
      <section>
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
                <div key={project.slug}>
                  <Link
                    to={`/project/${project.slug}`}
                    className="group block"
                  >
                    {/* Image Rows */}
                    {rows.map((row, rowIndex) => (
                      <div key={rowIndex} className="flex">
                        {row.images.map((image, imgIdx) => {
                          const flexValue = row.layout.length === 1
                            ? 1
                            : row.layout[imgIdx] || row.layout[0];
                          return (
                            <div
                              key={imgIdx}
                              className="overflow-hidden"
                              style={{ flex: `${flexValue} 1 0%` }}
                            >
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-[50vh] md:h-[60vh] lg:h-[70vh] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                              />
                            </div>
                          );
                        })}
                      </div>
                    ))}

                    {/* Project Info */}
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                      <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                        {project.shortDescription}
                      </p>
                    </div>
                  </Link>

                  {/* Divider */}
                  {projectIndex < projects.length - 1 && (
                    <div className="border-t border-gray-200 dark:border-gray-800" />
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-xl">
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
