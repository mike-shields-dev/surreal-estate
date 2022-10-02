import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import ComboBox from "../components/ComboBox";

const values = ["Manchester", "Leeds", "Sheffield", "Liverpool"];
const props = {
  value: values[0],
  label: "City",
  name: "city",
  onChange: jest.fn(),
  values,
};

const renderComboBox = () => render(<ComboBox {...props} />);

describe("ComboBox", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderComboBox();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders label with given label prop", () => {
    renderComboBox();

    expect(screen.getByLabelText(props.label)).toBeInTheDocument();
  });

  it("renders a select input", () => {
    renderComboBox();

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders the given values as options", () => {
    renderComboBox();

    const combobox = screen.getByRole("combobox");

    values.forEach((value) => {
      expect(within(combobox).getByText(value)).toBeInTheDocument();
    });
  });

  it("invokes the onChange callback", async () => {
    renderComboBox();

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: values[3] },
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
