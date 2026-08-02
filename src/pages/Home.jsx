import Hero from "../components/Hero";
import ScrollARTransition from "../components/ScrollARTransition";
import HomeAbout from "../components/HomeAbout";
import FeaturedProjects from "../components/FeaturedProjects";
import TechStack from "../components/TechStack";
import DevelopmentPhilosophy from "../components/DevelopmentPhilosophy";
import ExperienceTimeline from "../components/ExperienceTimeline";
import FeaturedAchievements from "../components/FeaturedAchievements";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <div className="w-full flex flex-col">
      {/* Everything below is normal scroll */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <Hero />
        <ScrollARTransition />
        <HomeAbout />
      </div>
      <TechStack />
      {/* FeaturedProjects needs full width (100vw) */}
      <FeaturedProjects />

      <DevelopmentPhilosophy />
      <ExperienceTimeline />
      <FeaturedAchievements />
      <CTA />
    </div>
  );
};

export default Home;
