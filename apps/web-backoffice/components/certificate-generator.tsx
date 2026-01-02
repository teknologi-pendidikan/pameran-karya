"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrinterIcon, DownloadIcon } from "lucide-react";
import QRCode from "react-qr-code";

interface Work {
  work_id: string;
  title: string;
  status: string;
}

interface Profile {
  id: string;
  full_name: string;
  email: string;
  slug?: string; // Person slug for profile URL
  affiliation?: string; // Affiliation name
}

interface CertificateGeneratorProps {
  profile: Profile;
  worksCount: number;
  works: Work[];
}

export default function CertificateGenerator({
  profile,
  worksCount,
  works,
}: CertificateGeneratorProps) {
  const [isPrintMode, setIsPrintMode] = useState(false);

  const handlePrint = () => {
    setIsPrintMode(true);
    setTimeout(() => {
      window.print();
      setIsPrintMode(false);
    }, 100);
  };

  const currentDate = new Date().toLocaleDateString("en-us", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate profile URL for QR code
  const profileUrl = `https://pamerankarya.teknologipendidikan.or.id/person/${
    profile.slug || profile.id
  }`;

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 1in;
          }

          /* Hide all page elements except letter */
          body * {
            visibility: hidden !important;
          }

          .letter-container,
          .letter-container * {
            visibility: visible !important;
          }

          /* Hide navigation, headers, and other layout elements */
          nav,
          header,
          .navbar,
          .navigation,
          .print-hidden,
          .sidebar,
          .footer {
            display: none !important;
          }

          body {
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
            print-color-adjust: exact;
            margin: 0;
            padding: 0;
          }

          .letter-container {
            position: fixed !important;
            top: 0;
            left: 0;
            width: 100vw !important;
            height: 100vh !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
            background: white !important;
            z-index: 9999;
          }

          .letter-content {
            background: white;
            color: #1a1a1a;
            padding: 60px 80px;
            width: 100%;
            height: 100%;
            line-height: 1.5;
          }
        }

        .letter-preview {
          transform: scale(0.8);
          transform-origin: top center;
          margin-bottom: -100px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }
      `}</style>

      <div className={isPrintMode ? "letter-container" : ""}>
        {!isPrintMode && (
          <div className="space-y-6 print-hidden">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">
                  Letter of Commendation Generator
                </h1>
                <p className="text-muted-foreground">
                  Generate your letter of commendation
                </p>
              </div>
              <Button onClick={handlePrint} className="flex items-center gap-2">
                <PrinterIcon className="w-4 h-4" />
                Print Letter
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Letter Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <strong>Participant:</strong> {profile.full_name}
                    </p>
                    <p>
                      <strong>Total Works:</strong> {worksCount} completed work
                      {worksCount > 1 ? "s" : ""}
                    </p>
                    <p>
                      <strong>Date:</strong> {currentDate}
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      Print Instructions:
                    </h4>
                    <ol className="text-sm text-blue-800 space-y-1">
                      <li>1. Click the "Print Letter" button above</li>
                      <li>2. In the print dialog, ensure you select:</li>
                      <li className="ml-4">• Paper size: A4</li>
                      <li className="ml-4">• Orientation: Portrait</li>
                      <li className="ml-4">
                        • Enable "Background graphics" or "Print backgrounds"
                      </li>
                      <li>3. Choose "Save as PDF" or print to your printer</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Letter Content */}
        <div
          className={`letter-content ${!isPrintMode ? "letter-preview bg-white text-black p-8 rounded-lg shadow-lg" : ""}`}
        >
          {/* Letterhead */}
          <div className="text-left mb-4  font-sans">
            <div className="flex items-center justify-between mb-4">
              <img
                src="/edtech-logo.svg"
                alt="Pameran Karya Logo"
                className={`${isPrintMode ? "w-auto h-12" : "w-auto h-9"} mr-4`}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://pamerankarya.teknologipendidikan.or.id/icon.svg";
                }}
              />
              <div className="text-right text-black">
                <p
                  className={`font-bold ${isPrintMode ? "text-lg" : "text-lg"} uppercase`}
                >
                  Teknologi Pendidikan ID (EDTECH-ID)
                </p>
                <p className={`${isPrintMode ? "text-base" : "text-sm"} `}>
                  Directorate of Academic and Education Programs
                </p>
                <p className={`${isPrintMode ? "text-base" : "text-sm"} `}>
                  Educational Technology Works Exhibition
                </p>
                <p className={`${isPrintMode ? "text-base" : "text-sm"} `}>
                  Indonesia
                </p>
              </div>
            </div>
          </div>
          {/* Letter Details */}
          <div className="font-sans">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p
                  className={`${isPrintMode ? "text-base" : "text-sm"} text-black mt-1`}
                >
                  {currentDate}
                </p>
              </div>
            </div>
          </div>
          {/* Letter Body */}
          <div className="space-y-6">
            <div className="text-center mb-6">
              <p
                className={`font-bold underline uppercase ${isPrintMode ? "text-2xl" : "text-xl"} text-black`}
              >
                LETTER OF COMMENDATION
              </p>
              <p
                className={`${isPrintMode ? "text-sm" : "text-xs"} text-black`}
              >
                citation-id: {profile.id}-{worksCount}-
                {new Date().getFullYear()}
              </p>
            </div>
            <div>
              <p
                className={`${isPrintMode ? "text-base" : "text-sm"} text-black font-semibold mb-2`}
              >
                To Whom It May Concern,
              </p>
            </div>

            <div className="space-y-4">
              <p
                className={`${isPrintMode ? "text-base" : "text-sm"} text-black leading-relaxed text-justify`}
              >
                This is to certify that <strong>{profile.full_name}</strong>
                {profile.affiliation && (
                  <>
                    {" "}
                    from <strong>{profile.affiliation}</strong>
                  </>
                )}{" "}
                has successfully participated in the Educational Technology
                Exhibition (Pameran Karya Teknologi Pendidikan) by contributing
                and publishing{" "}
                <strong>
                  {worksCount} work{worksCount > 1 ? "s" : ""}
                </strong>{" "}
                to our platform.
              </p>

              <p
                className={`${isPrintMode ? "text-base" : "text-sm"} text-black leading-relaxed text-justify`}
              >
                The participant has demonstrated commitment to sharing
                educational technology resources and contributing to the
                academic community. Their work
                {worksCount > 1 ? "s have" : " has"} been reviewed and approved
                for public exhibition, meeting our platform's quality standards.
              </p>

              <p
                className={`${isPrintMode ? "text-base" : "text-sm"} text-black leading-relaxed text-justify`}
              >
                We commend {profile.full_name.split(" ")[0]} for their valuable
                contribution to educational technology advancement and knowledge
                sharing within our community.
              </p>

              <p
                className={`${isPrintMode ? "text-base" : "text-sm"} text-black leading-relaxed text-justify`}
              >
                This letter serves as official recognition of their
                participation and can be used for professional and academic
                purposes.
              </p>
            </div>

            <div className="mt-8">
              <p
                className={`${isPrintMode ? "text-base" : "text-sm"} text-black`}
              >
                Sincerely,
              </p>

              {/* <div className="mt-12 mb-4">
                <div className="border-t border-gray-400 w-48"></div>
              </div> */}

              <div>
                <p
                  className={`${isPrintMode ? "text-base" : "text-sm"} text-black font-semibold`}
                >
                  Rengga Prakoso Nugroho, M.Ed.
                </p>
                <p
                  className={`${isPrintMode ? "text-sm" : "text-xs"} text-black`}
                >
                  Director of Operations, Pameran Karya Teknologi Pendidikan
                </p>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p
                  className={`${isPrintMode ? "text-xs" : "text-xs"} text-black`}
                >
                  This letter is digitally generated and valid without a
                  signature.
                </p>
                <p
                  className={`${isPrintMode ? "text-xs" : "text-xs"} text-black mt-1`}
                >
                  Verify at: {/* Verify at the users slug  */}
                  <a href={profileUrl} className="underline">
                    pamerankarya.teknologipendidikan.or.id/person/
                    {profile.slug || profile.id}
                  </a>
                </p>
                <p
                  className={`${isPrintMode ? "text-xs" : "text-xs"} text-black mt-2`}
                >
                  Learn more about us at:{" "}
                  <a
                    href="https://teknologipendidikan.or.id"
                    className="underline"
                  >
                    teknologipendidikan.or.id
                  </a>
                </p>
              </div>
              <div className="ml-4 text-right">
                <div className={`${isPrintMode ? "w-16 h-16" : "w-12 h-12"}`}>
                  <QRCode
                    value={profileUrl}
                    size={isPrintMode ? 64 : 48}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    viewBox="0 0 256 256"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
