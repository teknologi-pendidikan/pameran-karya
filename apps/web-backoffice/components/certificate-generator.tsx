"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrinterIcon, DownloadIcon } from "lucide-react";

interface Work {
  work_id: string;
  title: string;
  status: string;
}

interface Profile {
  id: string;
  full_name: string;
  email: string;
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

  const currentDate = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0.5in;
          }

          /* Hide all page elements except certificate */
          body * {
            visibility: hidden !important;
          }

          .certificate-container,
          .certificate-container * {
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

          .certificate-container {
            position: fixed !important;
            top: 0;
            left: 0;
            width: 100vw !important;
            height: 100vh !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
            background: linear-gradient(
              135deg,
              #1e3a8a 0%,
              #312e81 100%
            ) !important;
            color: white;
            font-family: "Times New Roman", Times, serif;
            z-index: 9999;
          }

          .certificate-content {
            background: white;
            color: #1a1a1a;
            padding: 40px 60px;
            text-align: center;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
            border: 12px solid #d4af37;
            border-radius: 15px;
            position: relative;
            background-image:
              radial-gradient(
                circle at 20px 50px,
                #f0f8ff 2px,
                transparent 2px
              ),
              radial-gradient(
                circle at 40px 100px,
                #f0f8ff 1px,
                transparent 1px
              ),
              radial-gradient(circle at 90px 30px, #e6f3ff 1px, transparent 1px);
            background-size:
              100px 100px,
              80px 80px,
              120px 120px;
          }

          .certificate-content::before {
            content: "";
            position: absolute;
            top: 15px;
            left: 15px;
            right: 15px;
            bottom: 15px;
            border: 3px solid #b8860b;
            border-radius: 8px;
          }

          .certificate-content::after {
            content: "";
            position: absolute;
            top: 25px;
            left: 25px;
            right: 25px;
            bottom: 25px;
            border: 1px solid #daa520;
            border-radius: 4px;
          }
        }

        .certificate-preview {
          transform: scale(0.6);
          transform-origin: top center;
          margin-bottom: -300px;
          border: 8px solid #d4af37;
          background-image:
            radial-gradient(circle at 20px 50px, #f0f8ff 2px, transparent 2px),
            radial-gradient(circle at 40px 100px, #f0f8ff 1px, transparent 1px),
            radial-gradient(circle at 90px 30px, #e6f3ff 1px, transparent 1px);
          background-size:
            100px 100px,
            80px 80px,
            120px 120px;
        }

        .ornament {
          background: linear-gradient(45deg, #d4af37, #ffd700, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 2rem;
          font-weight: bold;
        }
      `}</style>

      <div className={isPrintMode ? "certificate-container" : ""}>
        {!isPrintMode && (
          <div className="space-y-6 print-hidden">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">Certificate Generator</h1>
                <p className="text-muted-foreground">
                  Generate your participation certificate
                </p>
              </div>
              <Button onClick={handlePrint} className="flex items-center gap-2">
                <PrinterIcon className="w-4 h-4" />
                Print Certificate
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Certificate Preview</CardTitle>
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
                      <li>1. Click the "Print Certificate" button above</li>
                      <li>2. In the print dialog, ensure you select:</li>
                      <li className="ml-4">• Paper size: A4</li>
                      <li className="ml-4">• Orientation: Landscape</li>
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

        {/* Certificate Content */}
        <div
          className={`certificate-content ${!isPrintMode ? "certificate-preview bg-white text-black p-12 rounded-lg shadow-2xl" : ""}`}
        >
          <div className="space-y-6 w-full max-w-4xl relative z-10">
            {/* Decorative top ornament */}
            <div className="flex justify-center">
              <div className="ornament">❦</div>
            </div>

            {/* Header */}
            <div className="text-center space-y-3">
              <h1
                className={`font-serif font-bold ${isPrintMode ? "text-5xl" : "text-3xl"} text-blue-900 tracking-wide`}
              >
                SERTIFIKAT PENGHARGAAN
              </h1>
              <h2
                className={`font-serif ${isPrintMode ? "text-2xl" : "text-lg"} text-blue-700 tracking-wider`}
              >
                CERTIFICATE OF APPRECIATION
              </h2>
            </div>

            {/* Decorative line */}
            <div className="flex justify-center items-center space-x-4">
              <div className="ornament text-lg">❦</div>
              <div
                className={`bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 ${isPrintMode ? "h-1 w-80" : "h-0.5 w-48"}`}
              ></div>
              <div className="ornament text-lg">❦</div>
            </div>

            {/* Main content */}
            <div className="text-center space-y-5">
              <p
                className={`font-serif ${isPrintMode ? "text-xl" : "text-base"} text-gray-700 italic`}
              >
                Diberikan kepada / This certificate is presented to
              </p>

              <div
                className={`${isPrintMode ? "py-5" : "py-3"} px-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 rounded-xl border-2 border-blue-200 shadow-inner`}
              >
                <h3
                  className={`font-serif font-bold ${isPrintMode ? "text-4xl" : "text-2xl"} text-blue-900 tracking-wide uppercase`}
                >
                  {profile.full_name}
                </h3>
              </div>

              <div className="space-y-4">
                <p
                  className={`font-serif ${isPrintMode ? "text-lg" : "text-sm"} text-gray-700 leading-relaxed`}
                >
                  Atas partisipasinya dalam{" "}
                  <strong>Pameran Karya Teknologi Pendidikan</strong>
                  <br />
                  dengan telah mengunggah dan mempublikasikan
                </p>

                <div
                  className={`inline-flex items-center px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full border-2 border-yellow-600 shadow-lg`}
                >
                  <span
                    className={`font-bold ${isPrintMode ? "text-2xl" : "text-lg"} text-yellow-900`}
                  >
                    {worksCount} karya
                  </span>
                </div>

                <p
                  className={`font-serif ${isPrintMode ? "text-lg" : "text-sm"} text-gray-700 italic`}
                >
                  For participating in the Educational Technology Exhibition
                  <br />
                  with {worksCount} completed work{worksCount > 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex justify-center">
                <div className="ornament text-2xl">❦</div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end mt-12">
              <div className="text-left">
                <p
                  className={`font-serif ${isPrintMode ? "text-base" : "text-xs"} text-gray-600`}
                >
                  Diterbitkan pada
                </p>
                <p
                  className={`font-serif font-bold ${isPrintMode ? "text-lg" : "text-sm"} text-gray-800`}
                >
                  {currentDate}
                </p>
                <div className="mt-2 border-t border-gray-400 w-32"></div>
                <p
                  className={`font-serif ${isPrintMode ? "text-sm" : "text-xs"} text-gray-600 mt-1`}
                >
                  Tanggal Terbit
                </p>
              </div>

              <div className="text-center">
                <div
                  className={`${isPrintMode ? "w-40 h-20" : "w-28 h-14"} bg-gradient-to-br from-blue-700 to-indigo-800 rounded-xl flex items-center justify-center mb-2 shadow-lg`}
                >
                  <span
                    className={`text-white font-bold ${isPrintMode ? "text-lg" : "text-xs"} text-center leading-tight`}
                  >
                    PAMERAN
                    <br />
                    KARYA
                  </span>
                </div>
                <div className="border-t border-gray-400 w-32"></div>
                <p
                  className={`font-serif ${isPrintMode ? "text-sm" : "text-xs"} text-gray-600 mt-1`}
                >
                  Penyelenggara
                </p>
              </div>
            </div>

            {/* Bottom ornament */}
            <div className="flex justify-center">
              <div className="ornament">❦</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
