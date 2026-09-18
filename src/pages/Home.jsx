import PageTransition from '../components/layout/PageTransition';
import IntroReveal from '../components/intro/IntroReveal';
import VideoHero from '../components/home/VideoHero';
import TaglineStatementSection from '../components/home/TaglineStatementSection';
import EditorialShowcaseSection from '../components/home/EditorialShowcaseSection';
import CapabilitiesSection from '../components/home/CapabilitiesSection';
import PinnedShowcaseSection from '../components/home/PinnedShowcaseSection';
import FeaturedWorksSection from '../components/home/FeaturedWorksSection';
import WalkthroughSection from '../components/home/WalkthroughSection';
import TourTeaserSection from '../components/home/TourTeaserSection';
import EnquirySection from '../components/home/EnquirySection';
import CareersTeaserSection from '../components/home/CareersTeaserSection';

export default function Home() {
  return (
    <PageTransition>
      <IntroReveal />

      {/* 01 — Hero */}
      <VideoHero />

      {/* 03 — Brand statement / about teaser */}
      <TaglineStatementSection />

      {/* 04 — Visual showcase */}
      <EditorialShowcaseSection />

      {/* 05 — Capabilities */}
      <CapabilitiesSection />

      {/* 06 — Pinned cinematic showcase */}
      <PinnedShowcaseSection />

      {/* 07 — Selected works */}
      <FeaturedWorksSection />

      {/* 08 — Animation & walkthrough */}
      <WalkthroughSection />

      {/* 09 — 360° virtual tours */}
      <TourTeaserSection />

      {/* 10 — Enquiry */}
      <EnquirySection />

      {/* 11 — Careers */}
      <CareersTeaserSection />
    </PageTransition>
  );
}