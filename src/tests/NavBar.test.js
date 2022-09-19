import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

const NavBarWithBrowserRouter = () => (
  <BrowserRouter>
    <NavBar />
  </BrowserRouter>
);

describe("Navbar", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<NavBarWithBrowserRouter />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the company logo", () => {
    const { getByTestId } = render(<NavBarWithBrowserRouter />);
    const logoEl = getByTestId("company-logo");

    expect(logoEl).toBeInTheDocument();
  });

  it("renders a 'View Properties' hyperlink with a href of '/'", () => {
    const { getByRole } = render(<NavBarWithBrowserRouter />);
    const linkEl = getByRole("link", { name: "View Properties" });

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute("href", "/");
  });

  it("renders an 'Add Property' hyperlink with a href of '/add-property'", () => {
    const { getByRole } = render(<NavBarWithBrowserRouter />);
    const linkEl = getByRole("link", { name: "Add Property" });

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute("href", "/add-property");
  });
});
