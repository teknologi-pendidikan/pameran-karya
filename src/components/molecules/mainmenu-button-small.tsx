import Link from "next/link";
import ButtonShortThird from "@components/atoms/button-short-third";

type MainPanelButtonSmallProps = {
  link: string;
  id?: string;
  title: string;
  desc?: string;
};

export default function MainPanelButtonSmall(
  props: MainPanelButtonSmallProps,
): JSX.Element {
  return (
    <Link
      href={props.link}
      className=" hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 "
    >
      <p className="sr-only">{props.title}</p>
      <ButtonShortThird />
    </Link>
  );
}
