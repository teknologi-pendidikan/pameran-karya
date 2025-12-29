interface ConferenceSectionProps {
  id?: string;
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  overlayOpacity?: number;
  textPosition?: "left" | "center" | "right";
  contentAlignment?: "start" | "center" | "end";
}

export default function ConferenceSection({
  id = "conference",
  imageSrc = "/placeholder-foto-praktikum-lego-16x9.webp",
  imageAlt = "Conference Banner",
  title = "Konferensi Teknologi Pendidikan 2025",
  subtitle = "Bergabunglah dengan para ahli dan mahasiswa",
  buttonText = "Daftar Sekarang",
  buttonLink = "/conference",
  overlayOpacity = 50,
  textPosition = "left",
  contentAlignment = "end",
}: ConferenceSectionProps) {
  const getTextAlignment = () => {
    switch (textPosition) {
      case "center":
        return "text-center justify-center";
      case "right":
        return "text-right justify-end";
      default:
        return "text-left justify-start";
    }
  };

  const getContentAlignment = () => {
    switch (contentAlignment) {
      case "center":
        return "items-center";
      case "start":
        return "items-start";
      default:
        return "items-end";
    }
  };

  return (
    <section id={id} className="relative w-full h-[75vh] group">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div
        className={`absolute inset-0 bg-black/${overlayOpacity} transition-all duration-700 group-hover:bg-black/60 group-hover:scale-105`}
      ></div>

      <div
        className={`absolute inset-0 flex ${getContentAlignment()} ${getTextAlignment()} text-white p-6 md:p-12`}
      >
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed text-white/90">
            {subtitle}
          </p>
          <a
            href={buttonLink}
            className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white rounded-xl font-medium transition-all duration-300 hover:transform hover:scale-105 hover:shadow-lg"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
