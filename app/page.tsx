import ExploreSection from "@/app/components/sections/ExploreSection";
import FeaturedUniversity from "@/app/components/sections/FeaturedUniversity";
import StudentPhotography from "@/app/components/sections/StudentPhotography";
import InstagramFollow from "@/app/components/sections/InstagramFollow";

export default function Page() {
  return (
    <main>
      <ExploreSection />
      <FeaturedUniversity />
      <StudentPhotography />
      <InstagramFollow />
    </main>
  );
}