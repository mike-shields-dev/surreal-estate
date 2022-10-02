import React from "react";
import { render, screen } from "@testing-library/react";
import Alert from "../components/Alert";

const successProps = {
  message: "Success!",
  isSuccess: true,
};

const errorProps = {
  message: "Error!",
  isSuccess: false,
};

describe("Alert", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<Alert {...successProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the provided message", () => {
    render(<Alert {...successProps} />);

    expect(screen.getByText(successProps.message)).toBeInTheDocument();
  });

  it("has the correct class name when given success prop equal to true", () => {
    render(<Alert {...successProps} />);
    const alert = screen.getByText(successProps.message);

    expect(alert).toHaveClass("alert--success");
  });

  it("has the correct class name when given success prop equal to false", () => {
    render(<Alert {...errorProps} />);
    const alert = screen.getByText(errorProps.message);

    expect(alert).toHaveClass("alert--error");
  });
});
