import Image from "next/image";
import Link from "next/link";
import { sponsors, tierConfig, Sponsor } from "@/assets/data/sponsor.data";

export default function SponsorSection() {
  const sponsorsByTier = sponsors.reduce(
    (acc, sponsor) => {
      if (!acc[sponsor.tier]) acc[sponsor.tier] = [];
      acc[sponsor.tier].push(sponsor);
      return acc;
    },
    {} as Record<string, Sponsor[]>
  );

  return (
    <section className="container mx-auto px-4 my-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
            Sponsor & Partner
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Terima kasih kepada sponsor dan partner yang mendukung Pameran Karya
            Teknologi Pendidikan Indonesia
          </p>
        </div>

        {/* Sponsor Tiers */}
        <div className="space-y-8 md:space-y-12">
          {(Object.keys(tierConfig) as Array<keyof typeof tierConfig>).map(
            (tier) => {
              const sponsorsInTier = sponsorsByTier[tier];
              if (!sponsorsInTier || sponsorsInTier.length === 0) return null;

              const config = tierConfig[tier];

              return (
                <div key={tier} className="text-center">
                  {/* Tier Title */}
                  <div className="mb-4 md:mb-6">
                    <div className={`badge ${config.badgeClass} badge-lg mb-2`}>
                      {config.title}
                    </div>
                  </div>

                  {/* Sponsors Grid */}
                  <div className="flex justify-center items-center gap-4 md:gap-6 flex-wrap">
                    {sponsorsInTier.map((sponsor) => (
                      <div
                        key={sponsor.name}
                        className="group hover:scale-105 transition-transform duration-300"
                      >
                        {sponsor.website ? (
                          <Link
                            href={sponsor.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
                              <div
                                className={`${config.logoSize} flex items-center justify-center`}
                              >
                                <img
                                  src={sponsor.logo}
                                  alt={sponsor.name}
                                  className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                              </div>
                            </div>
                            <div className="mt-2 text-xs md:text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                              {sponsor.name}
                            </div>
                          </Link>
                        ) : (
                          <div>
                            <div className="bg-white rounded-lg p-3 md:p-4 shadow-sm border border-gray-100">
                              <div
                                className={`${config.logoSize} flex items-center justify-center`}
                              >
                                <img
                                  src={sponsor.logo}
                                  alt={sponsor.name}
                                  className="max-h-full max-w-full object-contain filter grayscale"
                                />
                              </div>
                            </div>
                            <div className="mt-2 text-xs md:text-sm text-gray-600">
                              {sponsor.name}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 md:p-8">
          <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">
            Tertarik Menjadi Sponsor?
          </h3>
          <p className="text-base md:text-xl mb-4 md:mb-6 text-blue-100">
            Bergabunglah dengan kami dalam mendukung perkembangan teknologi
            pendidikan di Indonesia
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Link
              href="/blog/informasi-sponsor-pameran-karya-tep"
              className="btn btn-outline btn-white border-white text-white hover:bg-white hover:text-blue-600"
            >
              Informasi Sponsor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
