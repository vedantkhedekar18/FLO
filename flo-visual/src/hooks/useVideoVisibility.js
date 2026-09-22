import { useEffect, useRef, useState } from 'react';

// Attaches an IntersectionObserver to a container and pauses the inner
// <video> when it scrolls out of view (or the tab is hidden). Keeps
// playback cheap and battery-friendly. Returns refs to attach.
export function useVideoVisibility(active = true) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  // When no observer is attached (active=false, e.g. background ambience),
  // the video is always considered in view so the consumer never pauses it.
  const [isVisible, setIsVisible] = useState(!active);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!active) {
      setIsVisible(true);
      return;
    }
    if (!container || !video) return;

    const resume = () => {
      if (video && !video.paused && !document.hidden) {
        video.play().catch(() => {});
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          resume();
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );

    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else resume();
    };

    observer.observe(container);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [active]);

  return { containerRef, videoRef, isVisible };
}

// Respects prefers-reduced-motion: true means animations should be skipped.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}