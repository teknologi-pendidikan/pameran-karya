import { useEffect, useState } from "react";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  title: string;
  image: string;
  description: string;
  uuid: string;
}

export default function ProfileCard(
  profileInfo: ProfileCardProps,
): JSX.Element {
  // Fall back to the default image if the image is not found
  const [imgSrc, setImgSrc] = useState(profileInfo.image);

  useEffect(() => {
    setImgSrc(profileInfo.image);
  }, [profileInfo.image]);
  return (
    <div
      id={profileInfo.uuid}
      className="bg-white rounded-lg border-2 hover:border-black px-3 grow"
    >
      <div className="flex flex-col items-center py-6 space-y-6">
        <div>
          <Image
            className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover"
            src={imgSrc ? imgSrc : "/assets/placeholder.webp"}
            onError={() => {
              setImgSrc("/assets/placeholder.webp");
            }}
            alt={profileInfo.name}
            width={200}
            height={200}
            id={`img-${profileInfo.uuid}`}
          />
        </div>
        <div className="w-full space-y-6 text-center">
          <div className="space-y-1">
            <p
              id="name"
              className="text-base sm:text-lg font-semibold text-gray-700"
            >
              {profileInfo.name}
            </p>
            <div className="text-gray-500 text-sm space-y-1">
              <span>{profileInfo.title}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
