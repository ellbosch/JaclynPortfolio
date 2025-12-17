export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface ProjectVideo {
  src: string;
  poster?: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  categories: ProjectCategory[];
  shortDescription: string;
  fullDescription: string;
  creditsDescription?: string;
  thumbnail: ProjectImage;
  heroImage?: ProjectImage;
  images: ProjectImage[];
  videos: ProjectVideo[];
  skills: string[];
  year: number;
  client?: string;
  featured: boolean;
  order: number;
}

export type ProjectCategory = 'industrial-design' | '3d-visualization';

export type CategoryFilter = 'all' | ProjectCategory;

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  linkedin?: string;
  behance?: string;
  instagram?: string;
  resumeUrl?: string;
  profileImage?: ProjectImage;
}
