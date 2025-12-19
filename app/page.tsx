import ConferenceSection from "@/app/components/sections/ConferenceSection";
import ExploreSection from "@/app/components/sections/ExploreSection";
import FeaturedUniversity from "@/app/components/sections/FeaturedUniversity";
import StudentPhotography from "@/app/components/sections/StudentPhotography";
import InstagramFollow from "@/app/components/sections/InstagramFollow";

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
