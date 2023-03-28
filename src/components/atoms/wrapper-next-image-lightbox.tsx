// @ts-nocheck

import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from "yet-another-react-lightbox/core";

export default function NextJsImageLightbox({ slide, rect }) {
  const { imageFit } = useLightboxProps().carousel;
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        placeholder="blur"
        draggable={false}
        sizes={`100vw`}
      />
    </div>
  );
}
