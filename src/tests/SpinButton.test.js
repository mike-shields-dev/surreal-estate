import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SpinButton from "../components/SpinButton";

const props = {
  field: "bedrooms",
  value: 0,
  step: 1,
  min: 0,
  onChange: jest.fn(),
};

const renderSpinButton = () => render(<SpinButton {...props} />);

describe("SpinButton", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderSpinButton();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders a number with the given props and and associated label", () => {
    renderSpinButton();
    const numberInput = screen.getByLabelText(props.field);

    expect(numberInput.getAttribute("id")).toEqual(props.field);
    expect(numberInput.getAttribute("name")).toEqual(props.field);
    expect(numberInput.getAttribute("min")).toEqual(`${props.min}`);
    expect(numberInput.getAttribute("step")).toEqual(`${props.step}`);
    expect(numberInput.getAttribute("type")).toEqual("number");
    expect(numberInput.getAttribute("value")).toEqual(`${props.value}`);
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
