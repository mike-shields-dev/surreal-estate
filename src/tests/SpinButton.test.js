import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SpinButton from "../components/SpinButton";

const props = {
  label: "Bedrooms",
  name: "bedrooms",
  value: 0,
  step: 1,
  onChange: jest.fn(),
};

const renderSpinButton = () => render(<SpinButton {...props} />);

describe("SpinButton", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderSpinButton();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a label with the given label prop", () => {
    renderSpinButton();

    expect(screen.getByLabelText(props.label)).toBeInTheDocument();
  });

  it("renders a number input", () => {
    renderSpinButton();

    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });

  it("invokes the onChange callback", async () => {
    renderSpinButton();

    fireEvent.change(screen.getByRole("spinbutton"), {
      target: { value: props.value + 1 },
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
