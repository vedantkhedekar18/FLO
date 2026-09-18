// 360° Virtual Tour library.
//
// Each tour supports a configurable `tourUrl` / `iframeUrl`. Set it once a
// real host (any embeddable 360 provider) is confirmed. When null, the
// /360/:slug page renders a clearly-labelled DEMO state — no fake panning.
export const TOURS = [
  {
    slug: 'grand-lobby-tour',
    title: 'Grand Lobby — 360° Tour',
    location: 'Commercial Development',
    category: '360',
    year: '2025',
    tourUrl: null,
    embedTitle: 'Interactive 360° Virtual Tour',
    poster: '/assets/interior/Grand lobby_05_HR.jpg',
    gallery: [
      '/assets/interior/Grand lobby_05_HR.jpg',
      '/assets/interior/Entrance Lobby.jpg',
      '/assets/interior/Lobby.jpg',
    ],
    description:
      'An immersive spherical tour of the double-height lobby — drag to look around the ceiling, stone walls, and bronze detailing as if standing in the space.',
  },
  {
    slug: 'entrance-lobby-tour',
    title: 'Entrance Sequence — 360° Tour',
    location: 'Residential Tower',
    category: '360',
    year: '2025',
    tourUrl: null,
    embedTitle: 'Interactive 360° Virtual Tour',
    poster: '/assets/interior/Entrance Lobby.jpg',
    gallery: ['/assets/interior/Entrance Lobby.jpg', '/assets/interior/Lobby.jpg'],
    description:
      'A spherical walkway study of the arrival sequence — each step of the entrance rendered as navigable space rather than a single frame.',
  },
];

export const getTour = (slug) => TOURS.find((t) => t.slug === slug) || null;