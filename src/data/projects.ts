import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'nocturne',
    title: 'Nocturne',
    categories: ['3d-visualization'],
    shortDescription: '',
    fullDescription: '',
    thumbnail: { src: '', alt: 'Nocturne thumbnail' },
    images: [],
    videos: [{ src: 'https://storage.googleapis.com/jaclyn-portfolio-media/nocturne_optimized.mp4', alt: 'Nocturne video' }],
    skills: [],
    year: 2024,
    featured: true,
    order: 1,
  },
  {
    slug: 'arlo',
    title: 'Arlo',
    categories: ['industrial-design', '3d-visualization'],
    shortDescription: 'Security camera system design and launch video renders',
    fullDescription: `I worked alongside my colleagues to design the Arlo Go, Arlo Ultra, Arlo Pro, and the Arlo Pro Floodlight. I created the following renders and animations for a launch video of the Arlo Pro.`,
    creditsDescription: `3D Visualization: Jaclyn Lowery (Arlo Pro video renders)

Industrial Design: Dayne Tanner (Direction), Tyler Anderson (Project Lead), Kyle Savarese (Support), Jaclyn Lowery (Support)`,
    thumbnail: { src: '/images/projects/arlo/01-cover.png', alt: 'Arlo thumbnail' },
    images: [
      { src: '/images/projects/arlo/01-cover.png', alt: 'Arlo cover' },
      { src: '/images/projects/arlo/02-sketchwall.jpg', alt: 'Arlo sketchwall' },
      { src: '/images/projects/arlo/03-mockups.jpg', alt: 'Arlo mockups' },
      { src: '/images/projects/arlo/04-floating.jpg', alt: 'Arlo floating' },
      { src: '/images/projects/arlo/05-footshot.jpg', alt: 'Arlo footshot' },
      { src: '/images/projects/arlo/06-cmf-cases.jpg', alt: 'Arlo CMF cases' },
      { src: '/images/projects/arlo/07-ceiling-mount.jpg', alt: 'Arlo ceiling mount' },
      { src: '/images/projects/arlo/08-legacy.jpg', alt: 'Arlo legacy' },
    ],
    videos: [{ src: 'https://storage.googleapis.com/jaclyn-portfolio-media/Arlo/ArloUltra_OctaneRenders_optimized.mp4', alt: 'Arlo Ultra Octane renders video' }],
    skills: [],
    year: 2024,
    featured: true,
    order: 2,
  },
  {
    slug: 'control4',
    title: 'Control4',
    categories: ['3d-visualization'],
    shortDescription: 'Smart home remote design with multiple SKU variants',
    fullDescription: '',
    thumbnail: {
      src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/220722_Control4_Remotes_Marketing%20Renders_3%20for%20Print_Opt9_R1v2.jpg',
      alt: 'Control4 remotes',
    },
    images: [
      // Cover image
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/220722_Control4_Remotes_Marketing%20Renders_3%20for%20Print_Opt9_R1v2.jpg', alt: 'Control4 remotes cover' },
      // Tactile Dark angles: DR -> Front -> DL -> Ortho
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Tactile%20Dark/Control4_Remotes_Marketing%20Renders_Tactile%20Dark_DR_R1v1.png', alt: 'Tactile Dark DR' },
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Tactile%20Dark/Control4_Remotes_Marketing%20Renders_Tactile%20Dark_Front%20Ortho_R1v1.png', alt: 'Tactile Dark front' },
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Tactile%20Dark/Control4_Remotes_Marketing%20Renders_Tactile%20Dark_DL_R1v1.png', alt: 'Tactile Dark DL' },
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Tactile%20Dark/Control4_Remotes_Marketing%20Renders_Tactile%20Dark_Ortho%20Right_R1v1.png', alt: 'Tactile Dark right' },
      // Touch Dark angles: DR -> Front -> LR -> Right
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Touch%20Dark/Control4_Remotes_Marketing%20Renders_Touch%20Dark_DR_R1v1.png', alt: 'Touch Dark DR' },
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Touch%20Dark/Control4_Remotes_Marketing%20Renders_Touch%20Dark_Front_R1v1.png', alt: 'Touch Dark front' },
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Touch%20Dark/Control4_Remotes_Marketing%20Renders_Touch%20Dark_LR_R1v1.png', alt: 'Touch Dark LR' },
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Touch%20Dark/Control4_Remotes_Marketing%20Renders_Touch%20Dark_Right_R1v1.png', alt: 'Touch Dark right' },
      // Touch Light angles: DR -> Front -> DL -> Right Ortho
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Touch%20Light/Control4_Remotes_Marketing%20Renders_Touch%20Light%20DR_R1v1.png', alt: 'Touch Light DR' },
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Touch%20Light/Control4_Remotes_Marketing%20Renders_Touch%20Light%20Front%20Ortho_R1v1.png', alt: 'Touch Light front' },
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Touch%20Light/Control4_Remotes_Marketing%20Renders_Touch%20Light%20DL_R1v1.png', alt: 'Touch Light DL' },
      { src: 'https://storage.googleapis.com/jaclyn-portfolio-media/control4/Touch%20Light/Control4_Remotes_Marketing%20Renders_Touch%20Light%20Right%20Ortho_R1v1.png', alt: 'Touch Light right' },
    ],
    videos: [],
    skills: [],
    year: 2024,
    featured: true,
    order: 4,
  },
  {
    slug: 'mode',
    title: 'Mode',
    categories: ['industrial-design', '3d-visualization'],
    shortDescription: 'Refined electric toothbrush design and website visuals',
    fullDescription: `Mode was an exciting opportunity to design a refined electric toothbrush that I now use everyday. My main role was creating a scrolling video for Mode's website to walk through the design details and unique features.`,
    creditsDescription: `3D Visualization: Jaclyn Lowery (3D Lead, Video Editor), Kieran Moriarty (Direction)

Industrial Design: Kieran Moriarty (Direction), Jaclyn Lowery (Support), John Nam (Support), Tyler Anderson (Support)`,
    thumbnail: { src: '/images/projects/mode/01-landscape.jpg', alt: 'Mode thumbnail' },
    images: [
      { src: '/images/projects/mode/01-landscape.jpg', alt: 'Mode landscape' },
      { src: '/images/projects/mode/02-brush-full.jpg', alt: 'Mode brush full' },
      { src: '/images/projects/mode/03-brushhead.png', alt: 'Mode brushhead' },
      { src: '/images/projects/mode/04-mode-01.jpg', alt: 'Mode product' },
      { src: '/images/projects/mode/05-website-visual.png', alt: 'Mode website visual' },
      { src: '/images/projects/mode/06-scroll.jpg', alt: 'Mode scroll' },
      { src: '/images/projects/mode/07-charger.png', alt: 'Mode charger' },
    ],
    videos: [{ src: 'https://storage.googleapis.com/jaclyn-portfolio-media/MODE/MODE_Website_Scroll_optimized.mp4', alt: 'Mode website scroll video' }],
    skills: [],
    year: 2024,
    featured: true,
    order: 5,
  },
  {
    slug: 'nice-hr40-remote',
    title: 'Nice HR40 Remote',
    categories: ['industrial-design', '3d-visualization'],
    shortDescription: 'Next generation smart home remote design',
    fullDescription: `Our team was tasked with re-imagining the previous generation Nice smart home remote into the next generation HR40. We upgraded the design to match the existing modern aesthetics of the Nice product portfolio, along with enhancing the experience of the extensive control.`,
    creditsDescription: `Industrial Design: Jaclyn Lowery (Project Lead), Kieran Moriarty (Direction), John Nam (Support)`,
    thumbnail: { src: '/images/projects/nice-hr40-remote/01-remote-outro.png', alt: 'Nice HR40 Remote thumbnail' },
    images: [
      { src: '/images/projects/nice-hr40-remote/01-remote-outro.png', alt: 'Nice HR40 Remote outro' },
      { src: '/images/projects/nice-hr40-remote/02-prototypes.jpg', alt: 'Nice HR40 Remote prototypes' },
      { src: '/images/projects/nice-hr40-remote/03-button-layout.png', alt: 'Nice HR40 Remote button layout' },
      { src: '/images/projects/nice-hr40-remote/04-elan-remote.png', alt: 'Elan remote previous generation' },
      { src: '/images/projects/nice-hr40-remote/05-remote-float.png', alt: 'Nice HR40 Remote floating' },
      { src: '/images/projects/nice-hr40-remote/06-buttons-closeup.png', alt: 'Nice HR40 Remote buttons closeup' },
      { src: '/images/projects/nice-hr40-remote/07-docked-closeup.jpg', alt: 'Nice HR40 Remote docked closeup' },
    ],
    videos: [{ src: 'https://storage.googleapis.com/jaclyn-portfolio-media/Nice/Nice_Remote_optimized.mp4', alt: 'Nice HR40 Remote promo video' }],
    skills: [],
    year: 2024,
    featured: true,
    order: 7,
  },
  {
    slug: 'jabra-packaging',
    title: 'Jabra Packaging',
    categories: ['industrial-design', '3d-visualization'],
    shortDescription: '3D on-package renders for multiple Jabra product lines',
    fullDescription: `I created 3D on-package renders for multiple Jabra product lines, collaborating with the graphic design team. I sketched render concept ideas, rendered, reviewed and made edits to pre-press color proofs. I served as the primary 3D visualizer for numerous color variations across various products.

Products Featured: Evolve 2 85, Evolve 2 65, Elite 85t, Elite Active 75t, Elite 2, Elite 3, Elite 4, Elite 4 Active, Elite 5, and Elite 7.`,
    creditsDescription: `3D Visualization: Jaclyn Lowery (Lead on-package renders), Jasmine Schubert (Support), Kieran Moriarty (Panacast renders), Matt Hanzly (Support), Tyler Anderson (Package context renders)

Industrial Design: Jaclyn Lowery (Panacast 50 Packaging)`,
    thumbnail: { src: '/images/projects/jabra-packaging/01-elite7-active.jpg', alt: 'Jabra Packaging thumbnail' },
    images: [
      { src: '/images/projects/jabra-packaging/01-elite7-active.jpg', alt: 'Jabra Elite 7 Active' },
      { src: '/images/projects/jabra-packaging/02-render.png', alt: 'Jabra render' },
      { src: '/images/projects/jabra-packaging/03-render-2.png', alt: 'Jabra render' },
      { src: '/images/projects/jabra-packaging/04-elite7-pro.jpg', alt: 'Jabra Elite 7 Pro' },
      { src: '/images/projects/jabra-packaging/05-photo.jpg', alt: 'Jabra photo' },
      { src: '/images/projects/jabra-packaging/06-elite-family.jpg', alt: 'Jabra Elite family' },
      { src: '/images/projects/jabra-packaging/07-panacast-exploded.jpg', alt: 'Jabra Panacast exploded' },
      { src: '/images/projects/jabra-packaging/08-panacast-box.jpg', alt: 'Jabra Panacast box' },
    ],
    videos: [],
    skills: [],
    year: 2024,
    featured: true,
    order: 8,
  },
  {
    slug: 'netgear-nighthawk',
    title: 'Netgear Nighthawk',
    categories: ['3d-visualization'],
    shortDescription: '',
    fullDescription: '',
    thumbnail: { src: '', alt: 'Netgear Nighthawk thumbnail' },
    images: [],
    videos: [{ src: 'https://storage.googleapis.com/jaclyn-portfolio-media/Netgear/Night-Hawk_optimized.mp4', alt: 'Netgear Nighthawk video' }],
    skills: [],
    year: 2024,
    featured: true,
    order: 3,
  },
  {
    slug: 'arcsport',
    title: 'Arc Sport',
    categories: ['3d-visualization'],
    shortDescription: 'Electric boat visualization showcasing speed and versatility',
    fullDescription: `I was tasked with visualizing the Arc Sport, a beautiful electric boat designed by my colleagues. My main role was to demonstrate the speed and versatility of the boat through inspirational context visuals. Below is a sample of the renders Tyler and I created.`,
    creditsDescription: `3D Visualization: Jaclyn Lowery (Lead Context Shots) + Tyler Anderson (Lead Studio/Context Shots)

Industrial Design: Anders Flem (Support), Dayne Tanner (Direction), Dylan Anderson (Support), Jack Marple (Direction) + Tyler Anderson (Support)`,
    thumbnail: { src: '/images/projects/arcsport/01-boat-at-speed.jpg', alt: 'Arc Sport thumbnail' },
    images: [
      { src: '/images/projects/arcsport/01-boat-at-speed.jpg', alt: 'Arc Sport boat at speed' },
      { src: '/images/projects/arcsport/02-arc-sport-advanced.png', alt: 'Arc Sport advanced render' },
      { src: '/images/projects/arcsport/03-arc-sport-social.jpg', alt: 'Arc Sport social' },
      { src: '/images/projects/arcsport/04-aerial-wake.png', alt: 'Arc Sport aerial wake' },
      { src: '/images/projects/arcsport/05-modern-dark.jpg', alt: 'Arc Sport modern dark' },
    ],
    videos: [],
    skills: [],
    year: 2024,
    featured: true,
    order: 9,
  },
  {
    slug: 'auraglow',
    title: 'Auraglow',
    categories: ['3d-visualization'],
    shortDescription: 'LED Whitener promo videos and product renders',
    fullDescription: `Tyler and I created promo videos and stills to showcase the Auraglow LED Whitener and case designed by our colleagues, along with several other Auraglow products. I also created on-package renders for several of the Auraglow products.`,
    creditsDescription: `3D Visualization: Jaclyn Lowery (3D Support, 2D animator, Video Editor), Kieran Moriarty (Direction), Tyler Anderson (3D Support)

Industrial Design: Dayne Tanner (Direction), Jack Marple (Lead)`,
    thumbnail: { src: '/images/projects/auraglow/01-led-whitener.png', alt: 'Auraglow thumbnail' },
    images: [
      { src: '/images/projects/auraglow/01-led-whitener.png', alt: 'Auraglow LED Whitener' },
      { src: '/images/projects/auraglow/02-toothpaste.jpg', alt: 'Auraglow toothpaste' },
      { src: '/images/projects/auraglow/03-complete-package.jpg', alt: 'Auraglow complete package' },
      { src: '/images/projects/auraglow/04-image.jpg', alt: 'Auraglow product' },
      { src: '/images/projects/auraglow/05-front-view.png', alt: 'Auraglow front view' },
      { src: '/images/projects/auraglow/06-trays-foil.png', alt: 'Auraglow trays with foil' },
      { src: '/images/projects/auraglow/07-image-11.jpg', alt: 'Auraglow product' },
      { src: '/images/projects/auraglow/08-closeup.png', alt: 'Auraglow closeup' },
      { src: '/images/projects/auraglow/09-image-9.jpg', alt: 'Auraglow product' },
      { src: '/images/projects/auraglow/10-whitening-pen.png', alt: 'Auraglow whitening pen' },
      { src: '/images/projects/auraglow/11-in-case.jpg', alt: 'Auraglow in case' },
    ],
    videos: [{ src: 'https://storage.googleapis.com/jaclyn-portfolio-media/Auraglow/Auraglow_optimized.mp4', alt: 'Auraglow promo video' }],
    skills: [],
    year: 2024,
    featured: true,
    order: 10,
  },
  {
    slug: 'whistle',
    title: 'Whistle Go + Whistle Pro',
    categories: ['industrial-design'],
    shortDescription: 'GPS-enabled health and activity trackers for pets',
    fullDescription: `GPS-enabled health and activity trackers for pets with emphasis on durability, removability, material finishes, and color considerations.`,
    creditsDescription: `3D Visualization: Dayne Tanner (Lead)

Industrial Design: Dayne Tanner (Direction), Jaclyn Lowery (Lead/Support), Kieran Moriarty (Support)`,
    thumbnail: { src: '/images/projects/whistle/01-collars.jpg', alt: 'Whistle thumbnail' },
    images: [
      { src: '/images/projects/whistle/01-collars.jpg', alt: 'Whistle collars' },
      { src: '/images/projects/whistle/02-green-taupe.png', alt: 'Whistle green and taupe' },
      { src: '/images/projects/whistle/03-product.jpg', alt: 'Whistle product' },
      { src: '/images/projects/whistle/04-photo.jpg', alt: 'Whistle photo' },
      { src: '/images/projects/whistle/05-dog.jpg', alt: 'Whistle on dog' },
      { src: '/images/projects/whistle/06-exploded.jpg', alt: 'Whistle exploded view' },
    ],
    videos: [],
    skills: [],
    year: 2024,
    featured: true,
    order: 13,
  },
  {
    slug: 'spansive',
    title: 'Spansive',
    categories: ['industrial-design', '3d-visualization'],
    shortDescription: 'Premium multi-device wireless charger',
    fullDescription: `Our team was given the task to re-imagine a standard wireless charger into a premium and multi-device compatible experience.

Jaclyn Lowery also directed the packaging design (OBX), with emphasis on device protection and the unboxing experience.`,
    creditsDescription: `3D Visualization: Jaclyn Lowery (Lead Studio Shots), John Nam (Lead In-Context Packaging Renders)

Photography: Enlisted

Industrial Design: August Simmons (ID Support), Dayne Tanner (ID Direction), Jaclyn Lowery (ID Support/Packaging Lead), Kieran Moriarty (ID Support/Lead), Luis Velazquez (ID Support)`,
    thumbnail: { src: '/images/projects/spansive/01-lifestyle-bedroom.jpg', alt: 'Spansive thumbnail' },
    images: [
      { src: '/images/projects/spansive/01-lifestyle-bedroom.jpg', alt: 'Spansive lifestyle bedroom' },
      { src: '/images/projects/spansive/02-photo-1.jpg', alt: 'Spansive photo' },
      { src: '/images/projects/spansive/03-photo-2.jpg', alt: 'Spansive photo' },
      { src: '/images/projects/spansive/04-no-cases.jpg', alt: 'Spansive no cases' },
      { src: '/images/projects/spansive/05-packaging-sleeve.jpg', alt: 'Spansive packaging sleeve' },
      { src: '/images/projects/spansive/06-packaging-open.jpg', alt: 'Spansive packaging open' },
      { src: '/images/projects/spansive/07-aframe.jpg', alt: 'Spansive A-frame' },
    ],
    videos: [],
    skills: [],
    year: 2024,
    featured: true,
    order: 12,
  },
  {
    slug: 'starkey',
    title: 'Starkey',
    categories: ['industrial-design'],
    shortDescription: 'Hearing aid design developed through user interviews',
    fullDescription: `As someone who grew up going into my parent's office to do hearing tests (for fun? My parents are doctors), it was a very exciting opportunity to help design a Starkey hearing aid.

The team designed hearing aids and their cases through user interviews and close collaboration with Starkey's engineering department to develop the most considered solution.`,
    creditsDescription: `3D Visualization: Tyler Anderson (Lead)

Photography: Starkey

Industrial Design: Dayne Tanner (Direction), Jack Marple (Support), Jaclyn Lowery (Support)`,
    thumbnail: { src: '/images/projects/starkey/01-website.png', alt: 'Starkey thumbnail' },
    images: [
      { src: '/images/projects/starkey/01-website.png', alt: 'Starkey website' },
      { src: '/images/projects/starkey/02-sketch-01.jpg', alt: 'Starkey sketch workshop' },
      { src: '/images/projects/starkey/03-sketch-03.jpg', alt: 'Starkey sketch workshop' },
      { src: '/images/projects/starkey/04-screenshot.jpg', alt: 'Starkey screenshot' },
      { src: '/images/projects/starkey/05-process.jpg', alt: 'Starkey process' },
      { src: '/images/projects/starkey/06-website-2.png', alt: 'Starkey website' },
      { src: '/images/projects/starkey/07-website-3.png', alt: 'Starkey website' },
      { src: '/images/projects/starkey/08-lifestyle.png', alt: 'Starkey lifestyle' },
    ],
    videos: [],
    skills: [],
    year: 2024,
    featured: true,
    order: 14,
  },
  {
    slug: 'q-egg',
    title: 'Q-Egg',
    categories: ['3d-visualization'],
    shortDescription: 'UVC light contact lens cleaner 3D animation',
    fullDescription: `This was my first 3D animated project. The work showcases technology developed by Q-Egg that kills 99.999% of harmful pathogens with UVC light through their contact lens cleaner/case product.

I led storytelling and 3D visuals/animation efforts on the project, collaborating with a copywriter, voice actor, and motion designer.`,
    creditsDescription: `3D Visualization: Jaclyn Lowery (3D Vis. Lead) + Lauren Konig (3D Vis. Support, 2D Animator + Video Editor)`,
    thumbnail: { src: '/images/projects/q-egg/01-exploded.jpg', alt: 'Q-Egg thumbnail' },
    images: [
      { src: '/images/projects/q-egg/01-exploded.jpg', alt: 'Q-Egg exploded view' },
      { src: '/images/projects/q-egg/02-case-slide.jpg', alt: 'Q-Egg case slide' },
      { src: '/images/projects/q-egg/03-marble.jpg', alt: 'Q-Egg marble' },
      { src: '/images/projects/q-egg/04-contact-case.jpg', alt: 'Q-Egg contact case' },
    ],
    videos: [{ src: 'https://storage.googleapis.com/jaclyn-portfolio-media/Q-Egg/Q-Egg_optimized.mp4', alt: 'Q-Egg UVC animation video' }],
    skills: [],
    year: 2024,
    featured: true,
    order: 6,
  },
];

export const getFeaturedProjects = () =>
  projects.filter((p) => p.featured).sort((a, b) => a.order - b.order);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: Project['categories'][number]) =>
  projects.filter((p) => p.categories.includes(category));

export const getAllProjects = () =>
  [...projects].sort((a, b) => a.order - b.order);

export const formatCategories = (categories: Project['categories']) => {
  const labels: Record<Project['categories'][number], string> = {
    'industrial-design': 'Industrial Design',
    '3d-visualization': '3D Visualization',
  };
  return categories.map((c) => labels[c]).join(', ');
};
