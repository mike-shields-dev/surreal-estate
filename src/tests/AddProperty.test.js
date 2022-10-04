import React from "react";
import { render, screen } from "@testing-library/react";
import AddProperty from "../components/AddProperty";

const renderAddProperty = () => render(<AddProperty />);

describe("AddProperty", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderAddProperty();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a form element", () => {
    renderAddProperty();

    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("renders a textbox for the 'title' field", () => {
    renderAddProperty();

    expect(screen.getByRole("textbox", { name: /title/i })).toBeInTheDocument();
  });

  it("renders a combobox for the 'type' field", () => {
    renderAddProperty();

    expect(screen.getByRole("combobox", { name: /type/i })).toBeInTheDocument();
  });

  it("renders a spinbutton for the 'bedrooms' field", () => {
    renderAddProperty();

    expect(
      screen.getByRole("spinbutton", { name: /bedrooms/i })
    ).toBeInTheDocument();
  });

  it("renders a spinbutton for the 'bathrooms' field", () => {
    renderAddProperty();

    expect(
      screen.getByRole("spinbutton", { name: /bathrooms/i })
    ).toBeInTheDocument();
  });

  it("renders a spinbutton for the 'price' field", () => {
    renderAddProperty();

    expect(
      screen.getByRole("spinbutton", { name: /price/i })
    ).toBeInTheDocument();
  });

  it("renders a combobox for the 'city' field", () => {
    renderAddProperty();

    expect(screen.getByRole("combobox", { name: /city/i })).toBeInTheDocument();
  });

  it("renders a email input for the 'email' field", () => {
    renderAddProperty();

    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  });

  it("renders a form submit button", () => {
    renderAddProperty();

    expect(
      screen.getByRole("button", { target: { type: "submit", name: /add/i } })
    ).toBeInTheDocument();
  });
});
