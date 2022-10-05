import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

const renderNavBar = () =>
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

describe("Navbar", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderNavBar();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a navigation", () => {
    renderNavBar();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("renders the company branding", () => {
    renderNavBar();

    expect(screen.getByTitle(/brand logo/i)).toBeInTheDocument();
    expect(screen.getByTitle(/brand name/i)).toBeInTheDocument();
  });

  it("renders a 'View Properties' hyperlink with a path of 'properties'", () => {
    renderNavBar();
    const linkEl = screen.getByRole("link", { name: "View Properties" });

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute("href", "/properties");
  });

  it("renders an 'Add Property' hyperlink with a href of '/add-property'", () => {
    renderNavBar();
    const linkEl = screen.getByRole("link", { name: "Add Property" });

    expect(linkEl).toBeInTheDocument();
    expect(linkEl).toHaveAttribute("href", "/add-property");
  });
});
