import { useEffect, useState } from "react";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  title: string;
  image: string;
  description: string;
  uuid: string;
  role: string;
  totalKarya: string;
}

export default function ProfileCard(
  profileInfo: ProfileCardProps,
): JSX.Element {
  // Fall back to the default image if the image is not found
  const [imgSrc, setImgSrc] = useState(profileInfo.image);

  let roleTag = "bg-green-400";

  if (profileInfo.role === "Ketua") {
    roleTag = "bg-red-500";
  }

  if (profileInfo.role === "Wakil Ketua") {
    roleTag = "bg-red-500";
  }

  if (profileInfo.role === "Kurator") {
    roleTag = "bg-blue-500";
  }

  if (profileInfo.role === "System Engineer") {
    roleTag = "bg-neutral-700";
  }

  if (profileInfo.role === "Datalake") {
    roleTag = "bg-fuschia-500";
  }

  if (profileInfo.role === "Bughunter") {
    roleTag = "bg-amber-500";
  }

  if (profileInfo.role === "Virtual Exhibition") {
    roleTag = "bg-violet-600";
  }

  if (profileInfo.role === "Design") {
    roleTag = "bg-cyan-500";
  }

  if (profileInfo.role === "Logistic") {
    roleTag = "bg-purple-500";
  }

  if (profileInfo.role === "Documentation") {
    roleTag = "bg-sky-500";
  }

  if (profileInfo.role === "Events") {
    roleTag = "bg-orange-500";
  }

  if (profileInfo.role === "Public Relation") {
    roleTag = "bg-indigo-500";
  }

  if (profileInfo.role === "Fundraiser") {
    roleTag = "bg-rose-500";
  }

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
            <div className={`text-sm px-4 rounded-full py-1`}>
              <span>{`Karya terunggah: ${profileInfo.totalKarya}`}</span>
            </div>
            <div
              className={` ${roleTag} text-sm px-4 bg-indigo-700 rounded-full py-1 text-white`}
            >
              <span>{profileInfo.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
