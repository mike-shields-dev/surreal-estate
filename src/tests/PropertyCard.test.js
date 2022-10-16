import React from "react";
import { render, screen } from "@testing-library/react";
import PropertyCard from "../components/PropertyCard";

const props = {
  property: {
    _id: "12345",
    title: "2 bedroom period property",
    type: "Flat",
    bedrooms: "2",
    bathrooms: "3",
    price: "1000",
    city: "Liverpool",
    email: "example@example.com",
  },
  favourites: [],
  requestFavourites: jest.fn(),
  userId: "23ibdoj5otij24",
};

const renderPropertyCard = () => render(<PropertyCard {...props} />);

describe("PropertyCard", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderPropertyCard();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the brand logo", () => {
    renderPropertyCard();

    expect(screen.getByTitle("brand logo")).toBeInTheDocument();
  });

  it("renders the title prop", () => {
    renderPropertyCard();

    expect(screen.getByText([props.property.title])).toBeInTheDocument();
  });

  it("renders the type prop", () => {
    renderPropertyCard();

    expect(screen.getByText(props.property.type)).toBeInTheDocument();
  });

  it("renders the city prop", () => {
    renderPropertyCard();

    expect(screen.getByText(props.property.city)).toBeInTheDocument();
  });

  it("renders the bathrooms prop", () => {
    renderPropertyCard();

    expect(screen.getByText(props.property.bathrooms)).toBeInTheDocument();
  });

  it("renders a bath icon", () => {
    renderPropertyCard();

    expect(screen.getByTitle("bath icon")).toBeInTheDocument();
  });

  it("renders the bedrooms prop", () => {
    renderPropertyCard();

    expect(screen.getByText(props.property.bedrooms)).toBeInTheDocument();
  });

  it("renders a bed icon", () => {
    renderPropertyCard();

    expect(screen.getByTitle("bed icon")).toBeInTheDocument();
  });

  it("renders price prop", () => {
    renderPropertyCard();

    expect(screen.getByText(props.property.bedrooms)).toBeInTheDocument();
  });

  it(`renders a 'mailto' link: 
      - with the given email prop
      - that securely opens a new tab
    `, () => {
    renderPropertyCard();
    const mailtoLink = screen.getByText(/email/i);

    expect(mailtoLink.closest("a")).toHaveAttribute(
      "href",
      `mailto:${props.property.email}`
    );
    expect(mailtoLink.closest("a")).toHaveAttribute("target", "_blank");
    expect(mailtoLink.closest("a")).toHaveAttribute("rel", "noreferrer");
  });
});
