import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SpinButton from "../components/SpinButton";

const props = {
  field: "bedrooms",
  min: "0",
  onChange: jest.fn(),
  step: "1",
  units: "$",
  value: "1",
};

const renderSpinButton = () => render(<SpinButton {...props} />);

describe("SpinButton", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderSpinButton();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a number input with the given props and an associated label", () => {
    renderSpinButton();
    const numberInput = screen.getByRole("spinbutton", {
      name: `${props.field} ${props.units}`,
    });

    expect(numberInput).toHaveAttribute("id", props.field);
    expect(numberInput).toHaveAttribute("name", props.field);
    expect(numberInput).toHaveAttribute("min", props.min);
    expect(numberInput).toHaveAttribute("step", props.step);
    expect(numberInput).toHaveAttribute("type", "number");
    expect(numberInput).toHaveAttribute("value", props.value);
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
