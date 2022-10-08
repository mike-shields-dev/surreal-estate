import React from "react";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SideBar from "../components/SideBar";

const cities = ["Leeds", "Liverpool", "Manchester", "Sheffield"];
const props = {
  pathname: "/properties",
  search: '?query={"city":"Manchester"}',
  isSideBarOpen: false,
  setIsSideBarOpen: jest.fn(),
  cities,
};

const renderClosedSideBar = () =>
  render(
    <BrowserRouter>
      <SideBar {...props} />
    </BrowserRouter>
  );

const renderOpenSideBar = () => {
  render(
    <BrowserRouter>
      <SideBar {...props} isSideBarOpen />
    </BrowserRouter>
  );
};

describe("SideBar", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderClosedSideBar();

    expect(asFragment()).toMatchSnapshot();
  });

  it("is applied a 'closed' class if the given isSideBarOpen prop is false", () => {
    renderClosedSideBar();

    expect(
      screen.getByRole("complementary").getAttribute("class").includes("closed")
    ).toBeTruthy();
  });

  it("is applied an 'open' class if the given isSideBarOpen prop is true", () => {
    renderOpenSideBar();

    expect(
      screen.getByRole("complementary").getAttribute("class").includes("open")
    ).toBeTruthy();
  });

  it("renders menu button", () => {
    renderClosedSideBar();

    expect(screen.getByRole("button", { name: /menu/i })).toBeInTheDocument();
  });

  it("menu button opens the sidebar if it is closed", () => {
    renderClosedSideBar();

    fireEvent.click(screen.getByRole("button", { name: /menu/i }));

    expect(props.setIsSideBarOpen).toHaveBeenCalledTimes(1);
    expect(props.setIsSideBarOpen).toHaveBeenCalledWith(true);
  });

  it("menu button closes the sidebar if it is open", () => {
    renderOpenSideBar();

    fireEvent.click(screen.getByRole("button", { name: /menu/i }));

    expect(props.setIsSideBarOpen).toHaveBeenCalledTimes(1);
    expect(props.setIsSideBarOpen).toHaveBeenCalledWith(false);
  });

  it("renders a 'wildcard' link that does not filter", () => {
    renderClosedSideBar();
    const wildcardLink = screen.getByRole("link", { name: /all/i });

    expect(wildcardLink).toBeInTheDocument();
    expect(wildcardLink).toHaveAttribute("href", props.pathname);
  });

  it("renders a link for each of the given cities", () => {
    renderClosedSideBar();

    const cityLinks = screen
      .getAllByRole("link")
      .filter((cityLink) => !cityLink.hasAttribute("href", props.pathname));

    cityLinks.forEach((cityLink, i) => {
      expect(cities.includes(cityLink.value)).toBeTruthy();
      expect(cityLink).toHaveAttribute(
        "href",
        `${props.pathname}${props.cities[i]}`
      );
    });
  });

  it("the currently 'active' link is styled differently to the others", () => {
    renderClosedSideBar();
    const activeLink = screen
      .getAllByRole("link")
      .find(
        (link) =>
          link.getAttribute("href") === `${props.pathname}${props.search}`
      );

    expect(activeLink.getAttribute("class").includes("active")).toBeTruthy();
  });

  it("each link closes the SideBar when clicked", () => {
    renderClosedSideBar();
    const links = screen.getAllByRole("link");

    links.forEach((link) => fireEvent.click(link));

    expect(props.setIsSideBarOpen.mock.calls.length).toBe(links.length);
    expect(
      props.setIsSideBarOpen.mock.calls.every(
        ([argument]) => argument === false
      )
    );
  });
});
