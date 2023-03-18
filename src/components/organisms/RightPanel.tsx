/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "@components/atoms/button-primary";

type Frontcontent = {
  id: string;
  title: string;
  desc: string;
  link: string;
};

interface RightPanelProps {
  content: Frontcontent[];
}

const RightPanel: NextPage<RightPanelProps> = ({ content }) => {
  return (
    <>
      <div id="panel-right" className="wrapper-pers">
        <div className="flex flex-col rotator-left space-y-2">
          <Link
            href={content[5].link} id={content[5].id}
            className="relative hover:border-red-500 hover:scale-110 grow-animation focus:scale-105"
          >
            <ButtonPrimary />
            <div id="konten-pengumuman" className="absolute top-0 left-0 px-4">
              <div>
                <h2 className="text-4xl font-bold text-white pt-2">
                  <FontAwesomeIcon icon={faInfoCircle} className="fa-sm" />{" "}
                  {content[5].title}
                </h2>
              </div>
              <p className="text-2xl font-bold text-blue-800 hover:text-blue-600 pt-2">
                {content[5].desc}
              </p>
            </div>
          </Link>
          <Link
            href={content[6].link} id={content[6].id}
            className="relative hover:border-red-500 hover:scale-110 grow-animation focus:scale-105"
          >
            <ButtonPrimary />
            <div id="konten-pengumuman" className="absolute top-0 left-0 px-4">
              <div>
                <h2 className="text-4xl font-bold text-white pt-2">
                  <FontAwesomeIcon icon={faInfoCircle} className="fa-sm" />{" "}
                  {content[6].title}
                </h2>
              </div>
              <p className="text-2xl font-bold text-blue-800 hover:text-blue-600 pt-2">
                {content[6].desc}
              </p>
            </div>
          </Link>
          <Link
            href={content[7].link} id={content[7].id}
            className="relative hover:border-red-500 hover:scale-110 grow-animation focus:scale-105"
          >
            <ButtonPrimary />
            <div id="konten-pengumuman" className="absolute top-0 left-0 px-4">
              <div>
                <h2 className="text-4xl font-bold text-white pt-2">
                  <FontAwesomeIcon icon={faInfoCircle} className="fa-sm" />{" "}
                  {content[7].title}
                </h2>
              </div>
              <p className="text-2xl font-bold text-blue-800 hover:text-blue-600 pt-2">
                {content[7].desc}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RightPanel;
