import MainPanelButtonPrimary from "@components/molecules/mainpanel-button-primary";
import MainPanelButtonShortHalf from "@components/molecules/mainpanel-button-shorthalf";
import MainPanelButtonSmall from "@components/molecules/mainmenu-button-small";

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
      <div id="panel-left" className="wrapper-pers">
        <div className="flex flex-col rotator space-y-2">
          <MainPanelButtonPrimary
            id={content[0].id}
            title={content[0].title}
            desc={content[0].desc}
            link={content[0].link}
          />
          <div className="flex flex-row justify-between">
            <MainPanelButtonShortHalf
              id={content[1].id}
              title={content[1].title}
              desc={content[1].desc}
              link={content[1].link}
            />
            <div className="flex flex-col justify-between">
              <MainPanelButtonSmall
                link={content[2].link}
                title={content[2].title}
              />
              <MainPanelButtonSmall
                link={content[3].link}
                title={content[3].title}
              />
            </div>
          </div>
          <MainPanelButtonPrimary
            id={content[4].id}
            title={content[4].title}
            desc={content[4].desc}
            link={content[4].link}
          />
        </div>
      </div>
    </>
  );
};

export default LeftPanel;
