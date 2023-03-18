import Image from "next/image";

interface ProfileCardProps {
  name: string;
  title: string;
  image: string;
  description: string;
  uuid: string;
}

export default function ProfileCard(
  profileInfo: ProfileCardProps
): JSX.Element {
  return (
    <div id={profileInfo.uuid} className="bg-white rounded-lg border-2 hover:border-black px-3">
      <div className="flex flex-col items-center py-6 space-y-6">
        <div>
          <Image
            className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover"
            src={profileInfo.image}
            alt={profileInfo.name}
            width={200}
            height={200}
          />
        </div>
        <div className="w-full space-y-6 text-center">
          <div className="space-y-1">
            <h1 className="text-base sm:text-lg font-semibold text-gray-700">
              {profileInfo.name}
            </h1>
            {profileInfo.title && (
              <div className="text-gray-500 text-sm space-y-1">
                <div>{profileInfo.title}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
