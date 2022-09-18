import React from "react";
import { render } from "@testing-library/react";
import NavBar from "../components/NavBar";

describe("Navbar", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<NavBar />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the company logo", () => {
    const { getByTestId } = render(<NavBar />);
    const logoEl = getByTestId("company-logo");

    expect(logoEl).toBeInTheDocument();
  });

  it("renders a 'View Properties' hyperlink", () => {
    const { getByText } = render(<NavBar />);

    expect(getByText("View Properties")).toBeInTheDocument();
  });

  it("renders an 'Add Property' hyperlink", () => {
    const { getByText } = render(<NavBar />);

    expect(getByText("Add Property")).toBeInTheDocument();
  });
});
