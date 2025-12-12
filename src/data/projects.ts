import type { Project } from './types';

// Sample project structure - replace with actual projects
export const projects: Project[] = [
  // {
  //   slug: 'example-project',
  //   title: 'Example Project',
  //   category: 'industrial-design',
  //   shortDescription: 'A brief description for the card',
  //   fullDescription: 'Full project description goes here...',
  //   thumbnail: {
  //     src: '/images/projects/example/thumbnail.webp',
  //     alt: 'Example project thumbnail',
  //   },
  //   heroImage: {
  //     src: '/images/projects/example/hero.webp',
  //     alt: 'Example project hero',
  //   },
  //   images: [],
  //   videos: [],
  //   skills: ['SolidWorks', 'KeyShot'],
  //   year: 2024,
  //   featured: true,
  //   order: 1,
  // },
];

export const getFeaturedProjects = () =>
  projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: Project['category']) =>
  projects.filter((p) => p.category === category);

export const getAllProjects = () =>
  [...projects].sort((a, b) => a.order - b.order);
