import { useRef, useState } from 'react';
import { Maximize2, Loader2, Globe } from 'lucide-react';

/**
 * TourViewer360 — reusable embed-based 360 viewer.
 *
 * Reads a configurable `tour.tourUrl` / `tour.iframeUrl` from data. When a
 * URL is present: loads it in a responsive, fullscreen-capable iframe with a
 * loading state (the embed host handles drag/touch/zoom). When absent:
 * renders an honest, clearly-labelled DEMO state — it never fakes panning.
 */
export default function TourViewer360({ tour, className = '' }) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const embedUrl = tour?.tourUrl || tour?.iframeUrl || null;
  const poster = tour?.poster || tour?.gallery?.[0];

  const enterFullscreen = () => {
    containerRef.current?.requestFullscreen?.().catch(() => {});
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: '100%', aspectRatio: '16/8.5', background: '#0c0c0c', overflow: 'hidden' }}
    >
      {embedUrl ? (
        <>
          {!loaded && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.9rem',
                color: 'rgba(245,244,240,0.75)',
                zIndex: 2,
              }}
            >
              <Loader2 size={26} style={{ animation: 'spin 1.4s linear infinite' }} />
              <span className="mono-meta" style={{ fontSize: '0.66rem', letterSpacing: '0.22em' }}>
                LOADING 360° ENVIRONMENT
              </span>
            </div>
          )}
          <iframe
            src={embedUrl}
            title={tour?.title || 'Interactive 360° Tour'}
            allow="autoplay; fullscreen; xr-spatial-tracking; gyroscope; accelerometer; vr"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setLoaded(true)}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              background: '#0c0c0c',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.5s ease',
            }}
          />
          <button
            aria-label="View tour fullscreen"
            title="Fullscreen"
            onClick={enterFullscreen}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '0.9rem',
              zIndex: 6,
              width: 42,
              height: 42,
              display: 'grid',
              placeItems: 'center',
              background: 'rgba(12,12,12,0.55)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(12,12,12,0.85)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(12,12,12,0.55)')}
          >
            <Maximize2 size={16} />
          </button>
        </>
      ) : (
        <DemoState poster={poster} tour={tour} />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function DemoState({ poster, tour }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.45) saturate(0.85)', pointerEvents: 'none' }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.8rem',
          padding: '2rem',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Globe size={30} style={{ color: '#c8a97e' }} />
        <span
          className="mono-meta"
          style={{ fontSize: '0.64rem', letterSpacing: '0.22em', color: '#c8a97e' }}
        >
          DEMO STATE — 360 SOURCE PENDING
        </span>
        <p
          className="mono-meta"
          style={{
            fontSize: '0.62rem',
            color: 'rgba(245,244,240,0.8)',
            maxWidth: '560px',
            lineHeight: 1.8,
            textTransform: 'none',
            letterSpacing: '0.04em',
          }}
        >
          This placeholder wraps the <code style={{ color: '#c8a97e' }}>TourViewer360</code> component.
          The real spherical tour loads here automatically once a host URL is set in
          <code style={{ color: '#c8a97e' }}> data/tours.js → tourUrl</code>. It does not fake panning with a still image.
        </p>
        <div className="mono-meta" style={{ display: 'flex', gap: '1.6rem', marginTop: '0.4rem', fontSize: '0.6rem', letterSpacing: '0.14em', color: 'rgba(245,244,240,0.7)' }}>
          <span>DRAG TO LOOK</span>
          <span>ZOOM</span>
          <span>FULLSCREEN</span>
        </div>
        <div className="mono-meta" style={{ marginTop: '0.3rem', fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(245,244,240,0.55)' }}>
          {tour?.location || 'FLO VISUAL STUDIO'}
        </div>
      </div>
    </div>
  );
}