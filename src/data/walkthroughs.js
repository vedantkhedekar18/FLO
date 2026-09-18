// Dedicated cinematic walkthrough experiences.
// Add entries as new films are produced — the /walkthroughs/:slug page
// adapts automatically. videoUrl/poster are the real source assets.
export const WALKTHROUGHS = [
  {
    slug: 'france-walkthrough',
    title: 'France Residence Walkthrough',
    client: 'Private Residence — France',
    category: 'ANIMATION',
    year: '2025',
    videoUrl: '/assets/videos/France.mp4',
    poster: '/assets/exterior/14.jpg',
    aspect: '16:9',
    description:
      'One continuous cinematic camera move across a French residence — exterior dawn through interior dusk. Choreographed around natural light and material reflection, this walkthrough demonstrates how a building is best understood in motion.',
    gallery: ['/assets/exterior/15.jpg', '/assets/exterior/1.jpg', '/assets/exterior/3.jpg'],
    credits: [
      { role: 'Visualization', name: 'FLO VISUAL Studio' },
      { role: 'Camera Direction', name: 'Cinematic Path IV' },
      { role: 'Grade', name: 'Editorial Warm' },
    ],
  },
];

export const getWalkthrough = (slug) => WALKTHROUGHS.find((w) => w.slug === slug) || null;

export const getAdjacentWalkthroughs = (slug) => {
  const index = WALKTHROUGHS.findIndex((w) => w.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const next = WALKTHROUGHS[(index + 1) % WALKTHROUGHS.length];
  const prev = WALKTHROUGHS[(index - 1 + WALKTHROUGHS.length) % WALKTHROUGHS.length];
  return { prev, next };
};