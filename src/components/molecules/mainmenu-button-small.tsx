import Link from "next/link";
import ButtonShortThird from "@components/atoms/button-short-third";

interface MainPanelButtonSmallProps {
  link?: any;
  id?: string;
  title?: string;
  desc?: string;
}

export default function MainPanelButtonSmall(
  props: MainPanelButtonSmallProps,
): JSX.Element {
  return (
    <Link
      href={props.link}
      className=" hover:border-red-500 hover:scale-110 grow-animation focus:scale-105 "
    >
      <ButtonShortThird />
    </Link>
  );
}
