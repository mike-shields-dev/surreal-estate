import React from "react";
import { render, screen } from "@testing-library/react";
import PropertyCard from "../components/PropertyCard";

const props = {
  title: "2 bedroom period property",
  type: "Flat",
  bedrooms: 2,
  bathrooms: 3,
  price: 1000,
  city: "Liverpool",
  email: "example@example.com",
};

const renderPropertyCard = () => render(<PropertyCard {...props} />);

describe("PropertyCard", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderPropertyCard();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the surreal estate logo", () => {
    renderPropertyCard();

    expect(screen.getByTitle("surreal estate logo")).toBeInTheDocument();
  });

  it("renders the title prop", () => {
    renderPropertyCard();

    expect(screen.getByText([props.title])).toBeInTheDocument();
  });

  it("renders the type prop", () => {
    renderPropertyCard();

    expect(screen.getByText(props.type)).toBeInTheDocument();
  });

  it("renders the city prop", () => {
    renderPropertyCard();

    expect(screen.getByText(props.city)).toBeInTheDocument();
  });

  it("renders the bathrooms prop", () => {
    renderPropertyCard();

    expect(screen.getByText(props.bathrooms)).toBeInTheDocument();
  });

  it("renders a bath icon", () => {
    renderPropertyCard();

    expect(screen.getByTitle("bath icon")).toBeInTheDocument();
  });

  it("renders the bedrooms prop", () => {
    renderPropertyCard();

    expect(screen.getByText(props.bedrooms)).toBeInTheDocument();
  });

  it("renders a bed icon", () => {
    renderPropertyCard();

    expect(screen.getByTitle("bed icon")).toBeInTheDocument();
  });

  it("renders price prop", () => {
    renderPropertyCard();

    expect(screen.getByText(props.bedrooms)).toBeInTheDocument();
  });

  it("renders a 'mailto' link with the give email prop", () => {
    renderPropertyCard();
    const mailtoLink = screen.getByText(/email/i);

    expect(mailtoLink.closest("a")).toHaveAttribute(
      "href",
      `mailto:${props.email}`
    );
  });
});
