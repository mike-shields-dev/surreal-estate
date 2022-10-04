import React from "react";
import { render, screen } from "@testing-library/react";
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
    render(<NavBarWithBrowserRouter />);
    const logoEl = screen.getByTitle("surreal estate logo");

    expect(logoEl).toBeInTheDocument();
  });

  it("renders a 'View Properties' hyperlink with a path of 'properties'", () => {
    const { getByRole } = render(<NavBarWithBrowserRouter />);
    const linkEl = getByRole("link", { name: "View Properties" });

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute("href", "/properties");
  });

  it("renders an 'Add Property' hyperlink with a href of '/add-property'", () => {
    const { getByRole } = render(<NavBarWithBrowserRouter />);
    const linkEl = getByRole("link", { name: "Add Property" });

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute("href", "/add-property");
  });
});
