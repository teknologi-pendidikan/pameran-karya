import ConferenceSection from "@/components/sections/ConferenceSection";
import ExploreSection from "@/components/sections/ExploreSection";
import FeaturedUniversity from "@/components/sections/FeaturedUniversity";
import StudentPhotography from "@/components/sections/StudentPhotography";
import InstagramFollow from "@/components/sections/InstagramFollow";

export default function Page() {
  return (
    <main>
      <ExploreSection />
      <ConferenceSection />
      <FeaturedUniversity />
      <StudentPhotography />
      <InstagramFollow />
    </main>
  );
}
