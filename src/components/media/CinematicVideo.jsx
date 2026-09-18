import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, Loader2 } from 'lucide-react';
import { useVideoVisibility, usePrefersReducedMotion } from '../../hooks/useVideoVisibility';

/**
 * CinematicVideo — the single video engine for the site.
 *
 * mode="background"  : fill-frame ambient film, no controls, subtle ken-burns scale.
 * mode="player"      : full cinema player with progress + controls + fullscreen.
 *
 * Always: autoplay muted loop playsInline poster, pause-while-offscreen,
 * motion overrides / reduced-motion → static poster.
 */
export default function CinematicVideo({
  src,
  poster,
  title = '',
  mode = 'background',
  loop = true,
  className = '',
  containerClassName = '',
  onPlayStateChange,
}) {
  const { containerRef, videoRef, isVisible } = useVideoVisibility(mode !== 'background');
  const reduced = usePrefersReducedMotion();

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControlsBar, setShowControlsBar] = useState(false);

  const playingRef = useRef(true);
  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const play = () => {
      const p = video.play();
      if (p !== undefined) {
        p.then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    };

    if (reduced || mode === 'background') {
      // Background: play when visible and motion allowed.
      if (reduced) {
        video.pause();
        setIsPlaying(false);
        return;
      }
      play();
    } else {
      play();
    }

    const onLoaded = () => setIsLoaded(true);
    video.addEventListener('loadeddata', onLoaded);
    return () => video.removeEventListener('loadeddata', onLoaded);
  }, [src, reduced, mode]);

  // Background video: resume playback when scrolled back into view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduced) return;
    if (isVisible && mode === 'background') {
      if (playingRef.current) video.play().catch(() => {});
    } else if (!isVisible) {
      video.pause();
    }
  }, [isVisible, reduced, mode]);

  const onTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isFinite(video.duration)) return;
    setProgress((video.currentTime / video.duration) * 100);
  }, []);

  const onLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (video && isFinite(video.duration)) setDuration(video.duration);
  }, []);

  const seekTo = useCallback(
    (e) => {
      const video = videoRef.current;
      if (!video) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
      video.currentTime = ratio * (isFinite(video.duration) ? video.duration : duration);
    },
    [duration]
  );

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
    setIsPlaying(!video.paused);
    onPlayStateChange?.(!video.paused);
  }, [onPlayStateChange]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  }, []);

  const formatTime = (s) => {
    if (!isFinite(s) || s <= 0) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  return (
    <div
      ref={containerRef}
      className={`video-shell ${containerClassName}`}
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        background: '#0c0c0c',
      }}
      onMouseEnter={mode === 'player' ? () => setShowControlsBar(true) : undefined}
      onMouseLeave={mode === 'player' ? () => setShowControlsBar(false) : undefined}
    >
      {!isLoaded && poster && (
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="tone-image"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      )}

      <video
        ref={videoRef}
        className={`media-video ${className}`}
        style={
          mode === 'background' && !reduced
            ? { transform: 'scale(1.06)', animation: 'kenburns 40s ease-in-out infinite alternate' }
            : undefined
        }
        src={src}
        poster={poster}
        autoPlay
        muted
        loop={loop}
        playsInline
        preload={mode === 'background' ? 'auto' : 'metadata'}
        disablePictureInPicture
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onCanPlay={() => setIsLoaded(true)}
        onPlaying={() => {
          setIsLoaded(true);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
      />

      {/* Loading shimmer */}
      {!isLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            color: 'rgba(255,255,255,0.6)',
            pointerEvents: 'none',
          }}
        >
          <Loader2 size={28} style={{ animation: 'spin 1.4s linear infinite' }} />
        </div>
      )}

      {mode === 'player' && (
        <div
          className="cinema-controls"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            padding: '2rem 1.5rem 1.25rem',
            background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.72))',
            opacity: showControlsBar || !isPlaying ? 1 : 0.25,
            transition: 'opacity 0.35s ease',
            color: '#fff',
            zIndex: 5,
          }}
        >
          {/* Progress */}
          <div
            role="slider"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Video progress"
            onClick={seekTo}
            style={{
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: '0.5rem',
              touchAction: 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '3px',
                background: 'rgba(255,255,255,0.28)',
                borderRadius: 2,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${progress}%`,
                  background: 'var(--accent-light)',
                  borderRadius: 2,
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
            <IconButton label={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay}>
              {isPlaying ? <Pause size={17} /> : <Play size={17} />}
            </IconButton>
            <IconButton label={isMuted ? 'Unmute' : 'Mute'} onClick={toggleMute}>
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </IconButton>
            <span
              className="mono-meta"
              style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.75)' }}
            >
              {formatTime((progress / 100) * duration)} / {formatTime(duration)}
            </span>
            <span
              className="mono-meta"
              style={{ marginLeft: 'auto', fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)' }}
            >
              {title || ''}
            </span>
            <IconButton label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'} onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </IconButton>
          </div>
        </div>
      )}

      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1.06) translate(0, 0); }
          100% { transform: scale(1.14) translate(1.2%, -0.8%); }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          .video-shell video { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function IconButton({ label, onClick, children }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 34,
        height: 34,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.22)',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
    >
      {children}
    </button>
  );
}