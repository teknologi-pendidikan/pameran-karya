import Link from "next/link";
import ButtonPrimary from "@components/atoms/button-primary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

type MainPanelButtonPrimaryProps = {
  link: string;
  id: string;
  title: string;
  desc: string;
};

export default function MainPanelButtonPrimary(
  props: MainPanelButtonPrimaryProps,
): JSX.Element {
  return (
    <Link
      href={props.link}
      id={props.id}
      className="relative hover:border-red-500 hover:scale-110 grow-animation focus:scale-105"
    >
      <ButtonPrimary />
      <div id="konten-pengumuman" className="absolute top-0 left-0 px-4">
        <div>
          <p className="text-3xl font-bold text-blue-100 pt-5 pl-2">
            <FontAwesomeIcon icon={faInfoCircle} className="fa-sm" />{" "}
            {props.title}
          </p>
        </div>
        <p className="text-2xl font-bold text-blue-100 hover:text-blue-200 pt-2">
          {props.desc}
        </p>
      </div>
    </Link>
  );
}
