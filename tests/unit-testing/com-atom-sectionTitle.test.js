// make a test using jest to make sure Section Title component is rendering and have a h2 tag with id of section-title

import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SectionTitle from "src/components/atoms/section-title";

test("renders Section Title component", () => {
  // make sure the component accept a title prop and render it inside the h2 tag with id of section-title
  const { getByText } = render(<SectionTitle title="test title" />);
  expect(getByText(/test title/i)).toBeInTheDocument();
  expect(getByText(/test title/i)).toHaveAttribute("id", "section-title");
  expect(getByText(/test title/i)).toHaveClass("text-center font-bold text-4xl");
});

