"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface ExploreItem {
  id: number;
  title: string;
  description: string;
  link: string;
  type: string;
  image: string;
}

interface ExploreCarouselProps {
  items: ExploreItem[];
}

export default function ExploreCarousel({ items }: ExploreCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Set initial value and listen for resize
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setItemsPerView(3); // lg and above
        } else if (window.innerWidth >= 640) {
          setItemsPerView(2); // sm to lg
        } else {
          setItemsPerView(1); // mobile
        }
      }
    };

    updateItemsPerView();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateItemsPerView);
      return () => window.removeEventListener("resize", updateItemsPerView);
    }
  }, []);

  const maxIndex = Math.max(0, (items || []).length - itemsPerView);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };

  return (
    <div className="relative w-full">
      <div className="overflow-hidden">
        <div
          className="flex gap-3 sm:gap-4 lg:gap-6 transition-transform duration-300"
          style={{
            transform: `translateX(-${
              currentIndex *
              (100 / itemsPerView +
                (itemsPerView === 1 ? 0 : itemsPerView === 2 ? 1 : 2))
            }%)`,
          }}
        >
          {(items || []).filter(Boolean).map((item, index) => (
            <Link
              key={item?.id || `item-${index}`}
              href={item?.link || "#"}
              className="group relative block flex-none w-full sm:w-[calc(100%/2-8px)] lg:w-[calc(100%/3-16px)] aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <img
                src={item?.image || "/placeholder-16x9.webp"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                alt={item?.title || "Explore item"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold mb-1 drop-shadow-md">
                  {item?.title || "Untitled"}
                </h3>
                <span className="text-sm opacity-90 bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                  {item?.type || "Unknown"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {(items || []).length > itemsPerView && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots indicator */}
          {/* <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-gray-700"
                    : "bg-gray-300 hover:bg-gray-500"
                }`}
              />
            ))}
          </div> */}
        </>
      )}
    </div>
  );
}
