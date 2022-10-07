import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TextBox from "../components/TextBox";

const props = {
  field: "title",
  onChange: jest.fn(),
  type: "text",
  value: "",
  maxLength: "64",
};

const renderTextBox = () => render(<TextBox {...props} />);

describe("TextBox", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderTextBox();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders text input with associated label and given props", () => {
    renderTextBox();

    const textInput = screen.getByRole("textbox", { name: props.field });

    expect(textInput).toHaveAttribute("id", props.field);
    expect(textInput).toHaveAttribute("maxLength", props.maxLength);
    expect(textInput).toHaveAttribute("name", props.field);
    expect(textInput).toHaveAttribute("type", props.type);
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
