import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollProgress from './components/ui/ScrollProgress';
import ScrollToTop from './components/layout/ScrollToTop';

const Home = lazy(() => import('./pages/Home'));
const Work = lazy(() => import('./pages/Work'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));
const Walkthrough = lazy(() => import('./pages/Walkthrough'));
const WalkthroughsIndex = lazy(() => import('./pages/WalkthroughsIndex'));
const ToursIndex = lazy(() => import('./pages/ToursIndex'));
const TourDetail = lazy(() => import('./pages/TourDetail'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const location = useLocation();

  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/walkthroughs" element={<WalkthroughsIndex />} />
            <Route path="/walkthroughs/:slug" element={<Walkthrough />} />
            <Route path="/360" element={<ToursIndex />} />
            <Route path="/360/:slug" element={<TourDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
      <Footer />
    </MotionConfig>
  );
}

function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: 'var(--bg-primary)' }}>
      <span className="mono-meta" style={{ color: 'var(--text-muted)', fontSize: '0.62rem', letterSpacing: '0.24em' }}>
        FLO VISUAL — LOADING
      </span>
    </div>
  );
}