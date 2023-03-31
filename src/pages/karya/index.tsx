import JenisKarya from "@/components/organisms/section/JenisKarya";

export default function IndexKarya() {
  return (
    <div className="container mx-auto flex flex-col space-y-12 items-start justify-start px-4 lg:max-w-screen-3xl pb-12 mb-12">
      <JenisKarya />
      <h1 className="text-5xl md:text-7xl font-bold">
        Kenal lebih dekat dengan karya-karya yang dipamerkan.
      </h1>
    </div>
  );
}
