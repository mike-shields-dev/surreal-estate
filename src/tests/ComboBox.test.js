import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import ComboBox from "../components/ComboBox";

const options = ["Manchester", "Leeds", "Sheffield", "Liverpool"];
const props = {
  field: "city",
  onChange: jest.fn(),
  value: options[0],
  options,
};

const renderComboBox = () => render(<ComboBox {...props} />);

describe("ComboBox", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderComboBox();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders select input with associated label and given props", () => {
    renderComboBox();

    const selectInput = screen.getByRole("combobox", { name: props.field });

    expect(selectInput).toHaveAttribute("id", props.field);
    expect(selectInput).toHaveAttribute("name", props.field);
    expect(selectInput).toHaveValue(props.value);
  });

  it("forces the user to choose an valid option", () => {
    renderComboBox();
    const selectInput = screen.getByRole("combobox", { name: props.field });
    const placeholderOption = screen.getAllByRole("option")[0];

    expect(selectInput).toHaveAttribute("required");

    expect(placeholderOption).toHaveValue("");
    expect(placeholderOption).toHaveAttribute("disabled");
  });

  it("renders the given values as options", () => {
    renderComboBox();
    const selectInput = screen.getByRole("combobox", { name: props.field });

    options.forEach((option) => {
      expect(within(selectInput).getByText(option)).toBeInTheDocument();
    });
  });

  it("invokes the onChange callback", async () => {
    renderComboBox();

    fireEvent.change(screen.getByRole("combobox", { name: props.field }), {
      target: { value: options[3] },
    });

    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
