import React from "react";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SideBar from "../components/SideBar";

const cities = ["Leeds", "Liverpool", "Manchester", "Sheffield"];
const props = {
  cities,
};

const renderSideBar = () =>
  render(
    <BrowserRouter>
      <SideBar {...props} />
    </BrowserRouter>
  );

describe("SideBar", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderSideBar();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders menu button", () => {
    renderSideBar();
    const menuButton = screen.getByRole("button", { name: /menu/i });

    expect(menuButton).toBeInTheDocument();
  });

  it("menu button opens and closes the sidebar", async () => {
    renderSideBar();
    const menuButtonEl = screen.getByRole("button", { name: /menu/i });
    const sideBarEl = await screen.findByRole("complementary");

    expect(sideBarEl.getAttribute("class")).toMatch(/closed/i);

    fireEvent.click(menuButtonEl);

    expect(sideBarEl.getAttribute("class")).toMatch(/open/i);

    fireEvent.click(menuButtonEl);

    expect(sideBarEl.getAttribute("class")).toMatch(/closed/i);
  });

  it("renders a heading of city for the city links", () => {
    renderSideBar();

    expect(screen.getByRole("heading", { name: /city/i })).toBeInTheDocument();
  });

  it("renders a link for each of the given cities", () => {
    renderSideBar();

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

  it("applies active class ONLY to the city link that was clicked", () => {
    renderSideBar();

    const cityLinks = screen
      .getAllByRole("link")
      .filter((link) => link.href.match(/city/i));

    cityLinks.forEach(async (cityLink) => {
      fireEvent.click(cityLink);

      expect(cityLink.getAttribute("class")).toMatch(/active/i);

      const inactiveCityLinks = cityLinks.filter(
        (link) => !link.className.match(/active/i)
      );

      expect(inactiveCityLinks).toHaveLength(cityLinks.length - 1);
      expect(inactiveCityLinks.includes(cityLink)).toBeFalsy();
    });
  });

  it("renders a heading of pric for the price sorting links", () => {
    renderSideBar();

    expect(screen.getByRole("heading", { name: /price/i })).toBeInTheDocument();
  });

  it("renders links for sorting by price", () => {
    renderSideBar();

    expect(
      screen.getByRole("link", { name: /ascending/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /descending/i })
    ).toBeInTheDocument();
  });

  it("applies active class ONLY to the city link that was clicked", async () => {
    renderSideBar();

    const sortPriceLinkAsc = screen.getByRole("link", { name: /ascending/i });
    const sortPriceLinkDesc = screen.getByRole("link", { name: /descending/i });

    fireEvent.click(sortPriceLinkAsc);

    expect(sortPriceLinkAsc.getAttribute("class")).toMatch(/active/i);
    expect(sortPriceLinkDesc.getAttribute("class")).not.toMatch(/active/i);

    fireEvent.click(sortPriceLinkDesc);

    expect(sortPriceLinkDesc.getAttribute("class")).toMatch(/active/i);
    expect(sortPriceLinkAsc.getAttribute("class")).not.toMatch(/active/i);
  });
});
