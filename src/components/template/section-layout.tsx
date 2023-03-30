import React from "react";
import SectionTitle from "@components/atoms/section-title";

type SectionLayoutProps = {
  children: React.ReactNode;
  id: string;
  ariaLabel: string;
  title: string;
  clasName?: string;
};

export default function SectionLayout(props: SectionLayoutProps) {
  return (
    <section
      className="container mx-auto"
      id={props.id}
      aria-label={props.ariaLabel}
    >
      <SectionTitle title={props.title} />
      {props.children}
    </section>
  );
}
