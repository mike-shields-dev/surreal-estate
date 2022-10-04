import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import ComboBox from "../components/ComboBox";

const values = ["Manchester", "Leeds", "Sheffield", "Liverpool"];
const props = {
  field: "city",
  onChange: jest.fn(),
  value: values[0],
  values,
};

const renderComboBox = () => render(<ComboBox {...props} />);

describe("ComboBox", () => {
  it("matches snapshot", () => {
    const { asFragment } = renderComboBox();

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders select input with associated label and given props", () => {
    renderComboBox();

    const selectInput = screen.getByLabelText(props.field);

    expect(selectInput.getAttribute("id")).toEqual(props.field);
    expect(selectInput.getAttribute("name")).toEqual(props.field);
    expect(selectInput).toHaveValue(props.value);
  });

  it("renders the given values as options", () => {
    renderComboBox();

    values.forEach((value) => {
      expect(
        within(screen.getByRole("combobox", { name: props.field })).getByText(
          value
        )
      ).toBeInTheDocument();
    });
  });

  it("invokes the onChange callback", async () => {
    renderComboBox();

    fireEvent.change(screen.getByRole("combobox", { name: props.field }), {
      target: { value: values[3] },
    });

    expect(props.onChange).toHaveBeenCalled();
  });
});
