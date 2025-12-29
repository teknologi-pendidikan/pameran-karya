import { YouTubeEmbed } from "@next/third-parties/google";
import { getYouTubeVideoId } from "@/lib/youtubeEmbed";
import { conferenceData, sessions } from "@/assets/data/conference.data";

export default function ConferencePage() {
  const videoId = getYouTubeVideoId(conferenceData.livestreamUrl);

  return (
    <div>
      {/* Header */}
      <header className="bg-gray-200 w-full py-16 mb-8">
        <div className="max-w-7xl container mx-auto px-4 lg:px-0">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4">
            {conferenceData.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {conferenceData.subtitle}
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <span>📅 {conferenceData.date}</span>
            <span>🕘 {conferenceData.time}</span>
            {conferenceData.isLive && (
              <span className="text-red-600 font-semibold">🔴 LIVE</span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 py-8 max-w-7xl container mx-auto lg:px-0">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video */}
          <div className="lg:col-span-2">
            <div className="bg-white border overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Live Stream</h2>
              </div>
              <div className="aspect-video">
                {videoId ? (
                  <YouTubeEmbed
                    videoid={videoId}
                    height={480}
                    width={854}
                    params="controls=1&rel=0"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <p className="text-gray-500">Video not available</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <div className="bg-white border  overflow-hidden">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold">Schedule</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-4 border-b last:border-b-0"
                  >
                    <div className="text-sm text-blue-600 font-medium mb-1">
                      {session.time}
                    </div>
                    <div className="font-medium text-sm mb-1">
                      {session.title}
                    </div>
                    {session.speaker && (
                      <div className="text-sm text-gray-600">
                        {session.speaker}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
