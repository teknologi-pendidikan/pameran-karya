import ConferenceSection from "@/components/sections/ConferenceSection";
import ExploreSection from "@/components/sections/ExploreSection";
import FeaturedUniversity from "@/components/sections/FeaturedUniversity";
import StudentPhotography from "@/components/sections/StudentPhotography";
import InstagramFollow from "@/components/sections/InstagramFollow";
import SponsorSection from "@/components/sections/SponsorSection";
import BlogReleaseSection from "@/components/sections/BlogReleaseSection";
import LeaderboardSection from "@/components/sections/LeaderboardSection";
import EasterEgg from "@/components/EasterEgg";

export default function Page() {
  return (
    <main>
      <EasterEgg />
      <ExploreSection />
      <ConferenceSection />
      <LeaderboardSection />
      <FeaturedUniversity />
      <BlogReleaseSection />
      <StudentPhotography />
      <SponsorSection />
      <InstagramFollow />
    </main>
  );
}
