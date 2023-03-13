/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import Image from "next/image";
import ButtonPrimary1 from "@/components/modules/button-primary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export default function LeftPanel() {
  return (
    <>
      <div className="wrapper">
        <div className="flex flex-col rotator space-y-2">
          <Link
            href="/about"
            className="relative hover:border-red-500 hover:scale-110 grow-animation focus:scale-"
          >
            <ButtonPrimary1 />
            <div id="konten-pengumuman" className="absolute top-0 left-0 px-4">
              <div>
                <h1 className="text-4xl font-bold text-white pt-2">
                  <FontAwesomeIcon icon={faInfoCircle} className="fa-sm"/> Pengumuman
                </h1>
              </div>
              <p className="text-2xl font-bold text-blue-800 hover:text-blue-600 pt-2">
                This is the content of the block system from the API data, it
                could fit about 200 characters, not more than that. It maybe
                more, but NO!
              </p>
            </div>
            {/* <FontAwesomeIcon icon={faInfoCircle} className="absolute z-10 opacity-30 top-0 left-0 fa-10x"/> */}
          </Link>
          <div className="flex flex-row justify-between">
            <Link
              href="/about"
              className="relative border hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 opacity-75 hover:opacity-100"
            >
              <Image src="/A2.png" width={344} height={189} alt="about" />
              <div
                id="konten-weekly"
                className="absolute top-0 left-0 px-4 py-2"
              >
                <h1 className="text-2xl text-yellow-300 font-bold">
                  Pengumuman
                </h1>
                <p className="text-xl text-yellow-300 font-bold ">
                  This is the content of the block system from the API data, it
                  could fit about 200 characters, not more than that. It maybe
                  more, but NO!
                </p>
              </div>
            </Link>
            <div className="flex flex-col justify-evenly">
              <Link
                href="/about"
                className="border hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 opacity-75 hover:opacity-100"
              >
                <Image src="/A3.png" width={201} height={86} alt="about" />
              </Link>
              <Link
                href="/about"
                className="border hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 opacity-75 hover:opacity-100"
              >
                <Image src="/A3.png" width={201} height={86} alt="about" />
              </Link>
            </div>
          </div>
          <Link
            href="/about"
            className="relative border hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 opacity-75 hover:opacity-100"
          >
            <Image src="/A1.png" width={574} height={167} alt="about" />
            <div id="konten-pengumuman" className="absolute top-0 left-0 p-4">
              <h1 className="text-4xl text-yellow-300 font-bold">Pengumuman</h1>
              <p className="text-2xl text-yellow-300 font-bold ">
                This is the content of the block system from the API data, it
                could fit about 200 characters, not more than that. It maybe
                more, but NO!
              </p>
            </div>
          </Link>
        </div>
      </div>
      <style jsx>
        {`
          .wrapper {
            perspective: 1000px;
          }

          .rotator {
            transform: rotatey(20deg);
          }
        `}
      </style>
    </>
  );
}
