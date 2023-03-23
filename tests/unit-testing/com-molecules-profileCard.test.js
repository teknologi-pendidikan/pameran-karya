// make sure the profule card accept props and render them inside the component

import React from "react";
import { getByRole, render } from "@testing-library/react";
import ProfileCard from "src/components/molecules/profile-card";
import "@testing-library/jest-dom";

const NAME = "Rengga Prakoso Nugroho";
const TITLE = "Pengembangan Situs Web";
const DESCRIPTION = "Tim Teknis Pengembangan Sistem Informasi";
const IMAGE = "/test-image.png";
const UUID = "ded4ade7-782c-4251-8c17-66f86cf51c1e";

const { getByText } = render(
  <ProfileCard
    name={NAME}
    title={TITLE}
    description={DESCRIPTION}
    image={IMAGE}
    id={UUID}
  />
);

describe("Profile Card component", () => {
  test("Check the name are correct", () => {
    const name = getByText(NAME);
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass("font-semibold text-base");
    expect(name).toHaveAttribute("id", "name");
  });
});
