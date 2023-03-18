/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";

import MainPanelButtonPrimary from "@components/molecules/mainpanel-button-primary";

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
          {content.slice(5, 8).map((item) => (
            <MainPanelButtonPrimary
              key={item.id}
              link={item.link}
              id={item.id}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RightPanel;
