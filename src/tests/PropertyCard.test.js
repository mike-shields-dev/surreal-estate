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

  it("renders the property title", () => {
    renderPropertyCard();

    expect(screen.getByText([props.title])).toBeInTheDocument();
  });

  it("renders the type of property", () => {
    renderPropertyCard();

    expect(screen.getByText(props.type)).toBeInTheDocument();
  });

  it("renders the city", () => {
    renderPropertyCard();

    expect(screen.getByText(props.city)).toBeInTheDocument();
  });

  it("renders the number of bathrooms", () => {
    renderPropertyCard();

    expect(screen.getByText(props.bathrooms)).toBeInTheDocument();
  });

  it("renders the number of bedrooms", () => {
    renderPropertyCard();

    expect(screen.getByText(props.bedrooms)).toBeInTheDocument();
  });

  it("renders the price", () => {
    renderPropertyCard();

    expect(screen.getByText(props.bedrooms)).toBeInTheDocument();
  });

  it("renders a 'mailto' link with the give email", () => {
    renderPropertyCard();
    const mailtoLink = screen.getByText(/email/i);

    expect(mailtoLink.closest("a")).toHaveAttribute(
      "href",
      `mailto:${props.email}`
    );
  });
});
