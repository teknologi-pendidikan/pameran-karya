interface PhotoItem {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  image: string;
  studentName: string;
  university: string;
  studentAvatar?: string;
}

interface StudentPhotographyProps {
  title?: string;
  description?: string;
  photos?: PhotoItem[];
  ctaLink?: string;
  ctaText?: string;
}

const defaultPhotos: PhotoItem[] = [
  {
    id: "1",
    title: "Learning Center TEP",
    category: "Education",
    categoryColor: "bg-purple-600",
    image: "/placeholder-foto-umdrone-lego-16x9.webp",
    studentName: "Rengga Prakoso Nugroho",
    university: "Universitas Negeri Malang",
    studentAvatar: "/placeholder-16x9.webp",
  },
  {
    id: "2",
    title: "Learning Center TEP",
    category: "Education",
    categoryColor: "bg-purple-600",
    image: "/placeholder-foto-labtepum-lego-16x9.webp",
    studentName: "Rengga Prakoso Nugroho",
    university: "Universitas Negeri Malang",
    studentAvatar: "/placeholder-16x9.webp",
  },
  {
    id: "3",
    title: "Learning Center TEP",
    category: "Education",
    categoryColor: "bg-purple-600",
    image: "/placeholder-foto-a20-16x9.webp",
    studentName: "Rengga Prakoso Nugroho",
    university: "Universitas Negeri Malang",
    studentAvatar: "/placeholder-16x9.webp",
  },
  {
    id: "4",
    title: "Learning Center TEP",
    category: "Education",
    categoryColor: "bg-purple-600",
    image: "/placeholder-foto-praktikum-lego-16x9.webp",
    studentName: "Rengga Prakoso Nugroho",
    university: "Universitas Negeri Malang",
    studentAvatar: "/placeholder-16x9.webp",
  },
  {
    id: "5",
    title: "Learning Center TEP",
    category: "Education",
    categoryColor: "bg-purple-600",
    image: "/placeholder-foto-a20-16x9.webp",
    studentName: "Rengga Prakoso Nugroho",
    university: "Universitas Negeri Malang",
    studentAvatar: "/placeholder-16x9.webp",
  },
  {
    id: "6",
    title: "Learning Center TEP",
    category: "Education",
    categoryColor: "bg-purple-600",
    image: "/placeholder-foto-praktikum-lego-16x9.webp",
    studentName: "Rengga Prakoso Nugroho",
    university: "Universitas Negeri Malang",
    studentAvatar: "/placeholder-16x9.webp",
  },
];

export default function StudentPhotography({
  photos = defaultPhotos,
}: StudentPhotographyProps) {
  const getGridClasses = (index: number) => {
    const gridClasses = [
      "md:col-span-2 lg:row-span-2", // Photo 1 - Large
      "lg:col-span-2", // Photo 2 - Medium Landscape
      "", // Photo 3 - Square
      "lg:row-span-2", // Photo 4 - Tall Portrait
      "md:col-span-2", // Photo 5 - Wide Panoramic
      "", // Photo 6 - Small Square
    ];
    return gridClasses[index] || "";
  };

  const getHeightClasses = (index: number) => {
    const heightClasses = [
      "h-64 md:h-96 lg:h-[600px]", // Photo 1
      "h-48 md:h-64", // Photo 2
      "h-48 md:h-64", // Photo 3
      "h-64 md:h-96 lg:h-[500px]", // Photo 4
      "h-40 md:h-48", // Photo 5
      "h-48 md:h-64", // Photo 6
    ];
    return heightClasses[index] || "h-48 md:h-64";
  };

  return (
    <section className="container mx-auto px-4 my-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        {/* <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-gray-900 via-purple-800 to-indigo-900 bg-clip-text text-transparent px-4">
            {title}
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            {description}
          </p>
        </div> */}

        {/* Photography Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 auto-rows-auto px-4 md:px-0">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`${getGridClasses(index)} group cursor-pointer`}
            >
              <div
                className={`relative ${getHeightClasses(
                  index
                )} rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:scale-[1.02]`}
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2">
                    <span
                      className={`px-3 py-1 ${photo.categoryColor} rounded-full text-xs font-medium`}
                    >
                      {photo.category}
                    </span>
                  </div>
                  <p
                    className={`font-bold mb-2 ${
                      index === 0
                        ? "text-2xl"
                        : index === 1 || index === 3
                          ? "text-xl"
                          : "text-lg"
                    }`}
                  >
                    {photo.title}
                  </p>
                  <div
                    className={`flex items-center ${
                      index === 2 || index === 5 ? "space-x-2" : "space-x-3"
                    }`}
                  >
                    <img
                      src={photo.studentAvatar || "/placeholder-4x6.png"}
                      alt={photo.studentName}
                      className={`rounded-full object-cover ${
                        index === 2 || index === 5 ? "w-6 h-6" : "w-8 h-8"
                      }`}
                    />
                    <div>
                      <p
                        className={`font-medium ${
                          index === 2 || index === 5 ? "text-sm" : ""
                        }`}
                      >
                        {photo.studentName}
                      </p>
                      <p
                        className={`text-white/80 ${
                          index === 2 || index === 5 ? "text-xs" : "text-sm"
                        }`}
                      >
                        {photo.university}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-12 md:mt-16 px-4">
          <Link
            href={ctaLink}
            className="inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 space-x-2 md:space-x-3"
          >
            <span>{ctaText}</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div> */}
      </div>
    </section>
  );
}
