// Explicit separated category set for /work filtering.
export const WORK_CATEGORIES = [
  { id: 'ALL', label: 'ALL' },
  { id: 'EXTERIOR CGI', label: 'EXTERIOR CGI' },
  { id: 'INTERIOR CGI', label: 'INTERIOR CGI' },
  { id: 'ANIMATION', label: 'ANIMATION' },
  { id: '360', label: '360° TOURS' },
  { id: 'BROCHURE', label: 'BROCHURE' },
  { id: 'LOGO', label: 'LOGO' },
  { id: 'DRONE', label: 'DRONE' },
  { id: 'FLOOR PLAN', label: 'FLOOR PLAN / ISOMETRIC' },
];

// kind: image | video | 360 | floorplan | brochure | logo | drone
// Every path is a real demo asset; swap src/gallery values for final FLO VISUAL media.
export const PROJECTS = [
  /* ---------------- ANIMATION ---------------- */
  {
    slug: 'france-walkthrough',
    title: 'France Residence Walkthrough',
    subtitle: 'Full-motion architectural film',
    category: 'ANIMATION',
    kind: 'video',
    client: 'Private Residence — France',
    year: '2025',
    poster: '/assets/exterior/14.jpg',
    videoUrl: '/assets/videos/France.mp4',
    gallery: ['/assets/exterior/14.jpg', '/assets/exterior/15.jpg', '/assets/exterior/1.jpg'],
    description:
      'A cinematic walkthrough sequence choreographed around the sun — exterior massing, interior light, and material reflection edited into a single continuous shot.',
    technicalDetails: {
      deliverable: '4K Walkthrough Film',
      format: 'High-Bitrate MP4, 16:9',
      motion: 'Cinematic Camera Path',
    },
    featured: true,
  },

  /* ---------------- EXTERIOR CGI ---------------- */
  {
    slug: 'exterior-perspectives-series',
    title: 'Exterior Perspectives Series',
    subtitle: 'Multi-angle exterior studies (Views 1–6)',
    category: 'EXTERIOR CGI',
    kind: 'image',
    client: 'Residential Development',
    year: '2025',
    poster: '/assets/exterior/View-1.jpg',
    gallery: [
      '/assets/exterior/View-1.jpg',
      '/assets/exterior/View-3.jpg',
      '/assets/exterior/View-4.jpg',
      '/assets/exterior/View-5.jpg',
      '/assets/exterior/View-6.jpg',
      '/assets/exterior/view 2.jpeg',
    ],
    description:
      'A camera tour around the volume — street level to elevated context — under shifting daylight conditions, matching the site photography of the region.',
    technicalDetails: {
      deliverable: 'Ultra-Res Exterior Renders',
      lighting: 'Daylight Simulation',
      views: '6 Camera Angles',
    },
    featured: true,
  },
  {
    slug: 'exterior-mnf-corner-facade',
    title: 'MNF Corner & Facade Study',
    subtitle: 'Street presence and rear facade resolution',
    category: 'EXTERIOR CGI',
    kind: 'image',
    client: 'MNF Development',
    year: '2024',
    poster: '/assets/exterior/MNF_AA_Street_Corner_03.jpg',
    gallery: [
      '/assets/exterior/MNF_AA_Street_Corner_03.jpg',
      '/assets/exterior/MNF_AB_Back_03_Final.jpg',
    ],
    description:
      'Precision massing study of a corner site — the public street face and the private rear face examined as one continuous architectural argument.',
    technicalDetails: {
      deliverable: 'Elevation & Corner CGI',
      context: 'Urban Streetscape',
    },
  },
  {
    slug: 'exterior-terrace-pool',
    title: 'Terrace & Pool Seating',
    subtitle: 'Outdoor living — twilight atmosphere',
    category: 'EXTERIOR CGI',
    kind: 'image',
    client: 'Luxury Villa',
    year: '2025',
    poster: '/assets/exterior/Terrace View.jpg',
    gallery: [
      '/assets/exterior/Terrace View.jpg',
      '/assets/exterior/Pool Seating view.jpg',
      '/assets/exterior/A_House.jpg',
    ],
    description:
      'Water caustics, landscape lighting, and the warm transition into evening — an exterior rendered as an experience rather than a facade.',
    technicalDetails: {
      deliverable: 'Exterior Residential Stills',
      features: 'Water Simulation, Landscape Lighting',
    },
  },
  {
    slug: 'exterior-facade-volumes',
    title: 'Modern Villa Facade Volumes',
    subtitle: 'Cantilevers, massing and texture',
    category: 'EXTERIOR CGI',
    kind: 'image',
    client: 'Private Client',
    year: '2024',
    poster: '/assets/exterior/Visual_4.jpg',
    gallery: [
      '/assets/exterior/Visual_4.jpg',
      '/assets/exterior/GI_1.jpg',
      '/assets/exterior/12.jpg',
      '/assets/exterior/3.jpg',
      '/assets/exterior/1.jpg',
    ],
    description:
      'Geometric cantilevers and textured render finishes studied across midday and late-afternoon light in a high-contrast facade series.',
    technicalDetails: {
      deliverable: 'Exterior Renderings',
      lighting: 'Midday & Late Afternoon',
    },
  },
  {
    slug: 'exterior-roadside-final',
    title: 'Roadside Final View',
    subtitle: 'Composited aerial and street context',
    category: 'EXTERIOR CGI',
    kind: 'image',
    client: 'Mixed-Use Site',
    year: '2024',
    poster: '/assets/exterior/Final Road Side View.jpg',
    gallery: [
      '/assets/exterior/Final Road Side View.jpg',
      '/assets/exterior/Cam_7.jpg',
      '/assets/exterior/21.jpg',
    ],
    description:
      'The building dropped into its real environment — camera-matched street elevations and aerial context reinforcing the final approved view.',
    technicalDetails: {
      deliverable: 'Contextual Exterior CGI',
      context: 'Drone Camera Match',
    },
  },
  {
    slug: 'exterior-twilight-cinema',
    title: 'Twilight Cinema Frames',
    subtitle: 'Golden-hour flagship frames',
    category: 'EXTERIOR CGI',
    kind: 'image',
    client: 'Flagship Development',
    year: '2025',
    poster: '/assets/exterior/14.jpg',
    gallery: ['/assets/exterior/14.jpg', '/assets/exterior/15.jpg'],
    description:
      'Hero marketing frames composed with a filmmaker’s eye — minimal sky, maximum structure, color graded to feel like a still from a film.',
    technicalDetails: {
      deliverable: 'Flagship Exterior Stills',
      grade: 'Cinematic Color Grade',
    },
    featured: true,
  },

  /* ---------------- INTERIOR CGI ---------------- */
  {
    slug: 'interior-grand-lobby',
    title: 'Grand Lobby Interior',
    subtitle: 'Double-height lobby — stone, bronze, slat',
    category: 'INTERIOR CGI',
    kind: 'image',
    client: 'Commercial Development',
    year: '2025',
    poster: '/assets/interior/Grand lobby_05_HR.jpg',
    gallery: [
      '/assets/interior/Grand lobby_05_HR.jpg',
      '/assets/interior/Entrance Lobby.jpg',
      '/assets/interior/Lobby.jpg',
    ],
    description:
      'A double-height arrival sequence where bespoke lighting and natural stone define the handshake between structure and hospitality.',
    technicalDetails: {
      deliverable: 'Interior CGI Master Set',
      materiality: 'Natural Stone, Bronze, Wood Slats',
      resolution: '4K Print Quality',
    },
    featured: true,
  },
  {
    slug: 'interior-living-dining',
    title: 'Living & Dining Sequence',
    subtitle: 'Open-plan residential interiors',
    category: 'INTERIOR CGI',
    kind: 'image',
    client: 'Private Residence',
    year: '2025',
    poster: '/assets/interior/Living&Dining Cam.jpg',
    gallery: [
      '/assets/interior/Living&Dining Cam.jpg',
      '/assets/interior/Dining-V-2.jpg',
      '/assets/interior/Kitchen Cam 2.jpg',
      '/assets/interior/Kitchen-V-2.jpg',
      '/assets/interior/jodi living room .jpeg',
    ],
    description:
      'A fluid open-plan sequence — dining, kitchen, and living volumes composed like a single continuous photograph with family-scale intimacy.',
    technicalDetails: {
      deliverable: 'Interior View Series',
      styling: 'Luxury Stage & Styling',
      materiality: 'Custom Millwork, Italian Marble',
    },
    featured: true,
  },
  {
    slug: 'interior-master-suites',
    title: 'Master Suite Options',
    subtitle: 'Bedroom variants and first-floor studies',
    category: 'INTERIOR CGI',
    kind: 'image',
    client: 'Private Residence',
    year: '2024',
    poster: '/assets/interior/Master Bedroom.jpg',
    gallery: [
      '/assets/interior/Master Bedroom.jpg',
      '/assets/interior/Master Bedroom Cam 2.jpg',
      '/assets/interior/Masterbedroom_Option.jpg',
      '/assets/interior/FirstFloor_MBed_Option1_FinalDraft.jpg',
      '/assets/interior/FirstFloor_MBed_Option2_FinalDraft.jpg',
    ],
    description:
      'Design options shown side by side — two master-suite directions rendered with equivalent fidelity so the decision is about taste, not guesswork.',
    technicalDetails: {
      deliverable: 'Option Study Renders',
      scenario: '2 Design Directions',
    },
  },
  {
    slug: 'interior-bedrooms-v2',
    title: 'Bedroom Suite V2 Series',
    subtitle: 'Individual room atmospheres',
    category: 'INTERIOR CGI',
    kind: 'image',
    client: 'Private Residence',
    year: '2024',
    poster: '/assets/interior/Son_s Bed-V-2.jpg',
    gallery: [
      '/assets/interior/Son_s Bed-V-2.jpg',
      '/assets/interior/Daughter_s Bed-V-2.jpg',
      '/assets/interior/M Bed-V-2.jpg',
      '/assets/interior/GuestBedroom1.jpg',
      '/assets/interior/Daughter_s Bed-2-V-2.jpg',
    ],
    description:
      'Each bedroom given its own light and material rhythm — from a son’s compressed energy to a daughter’s soft wash of morning light.',
    technicalDetails: {
      deliverable: 'Bedroom CGI Series',
      lighting: 'Single-Source Window Light',
    },
  },
  {
    slug: 'interior-bath-retreat',
    title: 'Bath & Wellness Retreat',
    subtitle: 'Stone, steam, and sealed calm',
    category: 'INTERIOR CGI',
    kind: 'image',
    client: 'Private Residence',
    year: '2024',
    poster: '/assets/interior/M-Bath-V-2.jpg',
    gallery: [
      '/assets/interior/M-Bath-V-2.jpg',
      '/assets/interior/Master toilet_1.jpg',
      '/assets/interior/Den Bath-V-2.jpg',
      '/assets/interior/Powder-V-2.jpg',
      '/assets/interior/Son_s Bath-V-2.jpg',
    ],
    description:
      'Bathrooms composed as quiet, sculptural rooms — material continuity from vanity to ceiling, with fixtures drawn to a photographic standard.',
    technicalDetails: {
      deliverable: 'Bath CGI Series',
      materiality: 'Stone, Vein-matched Slabs',
    },
  },
  {
    slug: 'interior-gym-wellness',
    title: 'Gym & Wellness Floor',
    subtitle: 'Private fitness amenity spaces',
    category: 'INTERIOR CGI',
    kind: 'image',
    client: 'Residential Tower',
    year: '2025',
    poster: '/assets/interior/Gym.jpg',
    gallery: [
      '/assets/interior/Gym.jpg',
      '/assets/interior/Recharge HR Render.jpg',
      '/assets/interior/123.jpg',
      '/assets/interior/02.jpg',
      '/assets/interior/33.jpg',
      '/assets/interior/11.jpg',
    ],
    description:
      'Wellness as amenity — a private gym and recharge floor rendered to feel high-performance and calm at the same time.',
    technicalDetails: {
      deliverable: 'Amenity CGI Set',
      environment: 'Indoor + Wellness',
    },
  },

  /* ---------------- BROCHURE ---------------- */
  {
    slug: 'brochure-marketing-design',
    title: 'Editorial Marketing Brochure',
    subtitle: 'Print and digital sales publication',
    category: 'BROCHURE',
    kind: 'brochure',
    client: 'Real Estate Developer',
    year: '2025',
    poster: '/assets/home/brochure design.jpg',
    gallery: ['/assets/home/brochure design.jpg'],
    description:
      'A unified sales publication — architectural photography, floor plans, finishes and narrative set in an editorial grid that sells the space.',
    technicalDetails: {
      deliverable: 'Print + Digital Lookbook',
      medium: 'Pre-Press Masters & Interactive PDF',
    },
  },

  /* ---------------- LOGO ---------------- */
  {
    slug: 'logo-identity-flo',
    title: 'FLO Visual Identity Mark',
    subtitle: 'Minimal geometric wordmark system',
    category: 'LOGO',
    kind: 'logo',
    client: 'Internal Brand',
    year: '2025',
    poster: '/assets/branding/flo-logo.svg',
    gallery: ['/assets/branding/flo-logo.svg'],
    description:
      'A clean geometric wordmark built on architectural proportion — the mark behaves like a floor plan at small scale and a facade at large scale.',
    technicalDetails: {
      deliverable: 'Wordmark + System Specs',
      geometry: 'Constructed Grid System',
    },
  },

  /* ---------------- DRONE ---------------- */
  {
    slug: 'drone-aerial-composite',
    title: 'Drone Aerial Composite',
    subtitle: 'Site survey and CGI integration',
    category: 'DRONE',
    kind: 'drone',
    client: 'Masterplan Site',
    year: '2024',
    poster: '/assets/home/Drone.jpg',
    gallery: ['/assets/home/Drone.jpg', '/assets/exterior/Cam_7.jpg'],
    description:
      'High-altitude drone survey with photoreal CGI dropped into the real landscape — masterplan proofs that show a site’s full potential.',
    technicalDetails: {
      deliverable: 'Aerial Survey & Compositing',
      elevation: 'High-Altitude Perspective',
    },
  },

  /* ---------------- FLOOR PLAN / ISOMETRIC ---------------- */
  {
    slug: 'floor-plans-multilevel',
    title: 'Multi-Level Floor Plans',
    subtitle: 'Ground, first and typical levels',
    category: 'FLOOR PLAN',
    kind: 'floorplan',
    client: 'Residential Tower',
    year: '2024',
    poster: '/assets/floor-plans/GROUND FLOOR.jpg',
    gallery: [
      '/assets/floor-plans/GROUND FLOOR.jpg',
      '/assets/floor-plans/FIRST FLOOR.jpg',
      '/assets/floor-plans/TYPICALE  FLOOR.jpg',
    ],
    description:
      'Presentation-grade plans with precise zoning, circulation, and furniture placement — drawn to be sold at a glance.',
    technicalDetails: {
      deliverable: '2D / 3D Marketing Plans',
      levels: 'Ground, First & Typical',
    },
  },
  {
    slug: 'isometric-site-massing',
    title: '3D Isometric & Site Plan',
    subtitle: 'Massing, landscape and amenity study',
    category: 'FLOOR PLAN',
    kind: 'floorplan',
    client: 'Development Site',
    year: '2024',
    poster: '/assets/floor-plans/3D site plan .jpg',
    gallery: [
      '/assets/floor-plans/3D site plan .jpg',
      '/assets/floor-plans/GF, FF-Model.jpg',
      '/assets/floor-plans/Merushikhar_Plan POOL.jpg',
      '/assets/floor-plans/8b3b5ed0-132c-47be-9067-e58a806abc68-2.jpg',
      '/assets/floor-plans/b4795aca-02be-4b23-b5f3-584301c57221.jpg',
    ],
    description:
      'The building unfolded — footprint, cutaway model, pool amenity and site massing made legible in one isometric language.',
    technicalDetails: {
      deliverable: 'Isometric Plan Renders',
      features: 'Site Plan, Cutaway Model, Pool Amenity',
    },
  },
];

export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug) || null;

export const getRelatedProjects = (project, count = 3) => {
  if (!project) return [];
  const sameCategory = PROJECTS.filter((p) => p.category === project.category && p.slug !== project.slug);
  const fillers = PROJECTS.filter((p) => p.category !== project.category && p.slug !== project.slug);
  return [...sameCategory, ...fillers].slice(0, count);
};

export const getAdjacentProjects = (project) => {
  const list = PROJECTS;
  const index = list.findIndex((p) => p.slug === project?.slug);
  if (index === -1) return { prev: null, next: null };
  const next = list[(index + 1) % list.length];
  const prev = list[(index - 1 + list.length) % list.length];
  return { prev, next };
};