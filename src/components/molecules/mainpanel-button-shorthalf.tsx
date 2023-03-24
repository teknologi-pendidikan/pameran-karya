import Link from "next/link";
import ButtonShortHalf from "@components/atoms/button-short-half";

interface MainPanelButtonShortHalfProps {
  link?: any;
  id: string;
  title: string;
  desc: string;
}

export default function MainPanelButtonShortHalf(
  props: MainPanelButtonShortHalfProps,
): JSX.Element {
  return (
    <Link
      href="/about"
      id={props.id}
      className="relative hover:border-red-500 hover:scale-110 grow-animation focus:scale-105"
    >
      <ButtonShortHalf />
      <div id="konten-weekly" className="absolute top-0 left-0 px-8 py-2">
        <h2 className="text-2xl text-blue-800 font-bold">{props.title}</h2>
        <p className="text-2xl font-bold text-blue-800 hover:text-blue-600 pt-2">
          {props.desc}
        </p>
      </div>
    </Link>
  );
}
