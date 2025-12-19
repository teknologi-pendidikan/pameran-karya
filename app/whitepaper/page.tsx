import Whitepaper from "@/assets/whitepaper.mdx";
import LogoPameran from "@/assets/logo_pameran";

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="flex bg-gray-200 w-full py-16 mb-8">
        <div className="max-w-7xl container mx-auto px-4 lg:px-0">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            Whitepaper PameranKarya
          </h1>
        </div>
      </div>

      <div className="prose prose-lg prose-slate max-w-7xl mx-auto px-4 lg:px-0 pb-16">
        <Whitepaper />
      </div>
    </div>
  );
}
