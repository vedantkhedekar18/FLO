import { useEffect } from 'react';
import { useVideoVisibility, usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

/**
 * ArchiveVideo — muted ambient loop used inside the Animation archive grid.
 * Unlike background ambience it DOES pause when the frame leaves the viewport
 * (useVideoVisibility active=true), so an archive of many films stays cheap.
 * Reduced-motion renders the poster flat instead of the moving image.
 */
export default function ArchiveVideo({ src, poster, className = '' }) {
  const { containerRef, videoRef, isVisible } = useVideoVisibility(true);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    if (isVisible) video.play().catch(() => {});
    else video.pause();
  }, [isVisible, reduced]);

  return (
    <div
      ref={containerRef}
      className={`archive-video ${className}`}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: '#0c0c0c' }}
    >
      {reduced && poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="tone-image"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      {!reduced && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          tabIndex={-1}
          aria-hidden="true"
          style={{ position: 'relative', width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
        />
      )}
    </div>
  );
}