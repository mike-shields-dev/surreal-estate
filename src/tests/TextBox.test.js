import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextBox from "../components/TextBox";

const props = {
  onChange: jest.fn(),
  field: "title",
  type: "text",
  value: "",
};

const renderTextBox = () => render(<TextBox {...props} />);

describe("TextBox", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderTextBox();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders text input with associated label and given props", () => {
    renderTextBox();

    const textInput = screen.getByLabelText(props.field);

    expect(textInput.getAttribute("id")).toEqual(props.field);
    expect(textInput.getAttribute("name")).toEqual(props.field);
    expect(textInput.getAttribute("type")).toEqual(props.type);
    expect(textInput).toHaveValue(props.value);
  });

  it("invokes the onChange callback", () => {
    renderTextBox();
    const textInput = screen.getByRole("textbox", { name: props.field });

    fireEvent.change(textInput, {
      target: { value: "Test" },
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
