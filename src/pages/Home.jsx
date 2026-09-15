import { lazy, Suspense } from "react";
import Hero from "../components/Hero";
import ScrollARTransition from "../components/ScrollARTransition";
import HomeAbout from "../components/HomeAbout";

// ── Below-the-fold: lazy-loaded so they are excluded from the initial bundle ──
const TechStack = lazy(() => import("../components/TechStack"));
const FeaturedProjects = lazy(() => import("../components/ProjectShowcase"));
const DevelopmentPhilosophy = lazy(() => import("../components/DevelopmentPhilosophy"));
const ExperienceTimeline = lazy(() => import("../components/ExperienceTimeline"));
const FeaturedAchievements = lazy(() => import("../components/FeaturedAchievements"));
const CTA = lazy(() => import("../components/CTA"));

// Minimal, invisible height-reservation skeletons — prevent CLS while chunks load.
const Skeleton = ({ height }) => (
  <div style={{ minHeight: height, width: "100%" }} aria-hidden="true" />
);

const Home = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Everything below is normal scroll */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Hero />
        <ScrollARTransition />
        <HomeAbout />
      </div>

      <Suspense fallback={<Skeleton height="600px" />}>
        <TechStack />
      </Suspense>

      {/* FeaturedProjects needs full width (100vw) */}
      <Suspense fallback={<Skeleton height="100vh" />}>
        <FeaturedProjects />
      </Suspense>

      <Suspense fallback={<Skeleton height="500px" />}>
        <DevelopmentPhilosophy />
      </Suspense>

      <Suspense fallback={<Skeleton height="700px" />}>
        <ExperienceTimeline />
      </Suspense>

      <Suspense fallback={<Skeleton height="400px" />}>
        <FeaturedAchievements />
      </Suspense>

      <Suspense fallback={<Skeleton height="300px" />}>
        <CTA />
      </Suspense>
    </div>
  );
};

export default Home;
