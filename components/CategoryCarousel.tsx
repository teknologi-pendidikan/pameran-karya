"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface CategoryItem {
  id: number;
  title: string;
  description: string;
  link: string;
  type: string;
  image: string;
}

interface CategoryCarouselProps {
  items: CategoryItem[];
}

export default function CategoryCarousel({ items }: CategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(2);

  // Set initial value and listen for resize
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth >= 1024) {
          setItemsPerView(4); // lg and above
        } else if (window.innerWidth >= 640) {
          setItemsPerView(3); // sm to lg
        } else {
          setItemsPerView(2); // mobile
        }
      }
    };

    updateItemsPerView();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateItemsPerView);
      return () => window.removeEventListener("resize", updateItemsPerView);
    }
  }, []);

  const maxIndex = Math.max(0, items.length - itemsPerView);

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
          className="flex gap-2 sm:gap-3 lg:gap-4 transition-transform duration-300"
          style={{
            transform: `translateX(-${
              currentIndex *
              (100 / itemsPerView +
                (itemsPerView === 2 ? 1 : itemsPerView === 3 ? 1.2 : 1.5))
            }%)`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex-none w-[calc(100%/2-4px)] sm:w-[calc(100%/3-8px)] lg:w-[calc(100%/4-12px)] transition-all duration-300"
            >
              <Link href={item.link} className="block">
                <div className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 mb-3">
                  <img
                    src="/placeholder-16x9.jpg"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt={item.title}
                  />
                </div>
                <div className="text-gray-800">
                  <h3 className="text-base font-semibold mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-tight line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {items.length > itemsPerView && (
        <>
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
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
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-md transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4"
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
