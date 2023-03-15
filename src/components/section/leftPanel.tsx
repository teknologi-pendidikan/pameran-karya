import Link from "next/link";
import Image from "next/image";
import ButtonPrimary1 from "@/components/modules/button-primary";
import ButtonShortHalf from "../modules/button-short-half";
import ButtonShortThird from "../modules/button-short-third";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { NextPage } from "next";

type Frontcontent = {
  id: string;
  title: string;
  desc: string;
  link: string;
};

interface LeftPanelProps {
  content: Frontcontent[];
}

const LeftPanel: NextPage<LeftPanelProps> = ({ content }) => {
  return (
    <>
      <div id="panel-left" className="wrapper">
        <div className="flex flex-col rotator space-y-2">
          <Link
            href={content[0].link} id={content[0].id}
            className="relative hover:border-red-500 hover:scale-110 grow-animation focus:scale-105"
          >
            <ButtonPrimary1 />
            <div id="konten-pengumuman" className="absolute top-0 left-0 px-4">
              <div>
                <h1 className="text-4xl font-bold text-white pt-2">
                  <FontAwesomeIcon icon={faInfoCircle} className="fa-sm" />{" "}
                  {content[0].title}
                </h1>
              </div>
              <p className="text-2xl font-bold text-blue-800 hover:text-blue-600 pt-2">
                {content[0].desc}
              </p>
            </div>
          </Link>
          <div className="flex flex-row justify-between">
            <Link
              href="/about" id={content[1].id}
              className="relative hover:border-red-500 hover:scale-110 grow-animation focus:scale-105"
            >
              <ButtonShortHalf />
              <div
                id="konten-weekly"
                className="absolute top-0 left-0 px-8 py-2"
              >
                <h1 className="text-2xl text-blue-800 font-bold">
                  {content[1].title}
                </h1>
                <p className="text-2xl font-bold text-blue-800 hover:text-blue-600 pt-2">
                  {content[1].desc}
                </p>
              </div>
            </Link>
            <div className="flex flex-col justify-between">
              <Link
                href="/about" 
                className=" hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 "
              >
                <ButtonShortThird />
                {/* <Image src="/A3.png" width={201} height={86} alt="about" /> */}
              </Link>
              <Link
                href="/about"
                className=" hover:border-red-500 hover:scale-110 grow-animation focus:scale-105"
              >
                <ButtonShortThird />
                {/* <Image src="/A3.png" width={201} height={86} alt="about" /> */}
              </Link>
            </div>
          </div>
          <Link
            href={content[4].link} id={content[4].id}
            className="relative hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 hover:opacity-100"
          >
            <ButtonPrimary1 />
            <div id="konten-pengumuman" className="absolute top-0 left-0 px-4">
              <div>
                <h1 className="text-4xl font-bold text-white pt-2">
                  <FontAwesomeIcon icon={faInfoCircle} className="fa-sm" />{" "}
                  {content[4].title}
                </h1>
              </div>
              <p className="text-2xl font-bold text-blue-800 hover:text-blue-600 pt-2">
                {content[4].desc}
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
};

export default LeftPanel;
