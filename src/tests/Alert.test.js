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
  it("renders the provided message", () => {
    const { asFragment } = render(<Alert {...successProps} />);

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(successProps.message)).toBeInTheDocument();
  });

  it("renders nothing if no message is provided", () => {
    const { asFragment } = render(<Alert message="" isSuccess />);

    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByTitle("alert")).toBeFalsy();
  });

  it("has the correct class name when given success prop equal to true", () => {
    const { asFragment } = render(<Alert {...successProps} />);

    expect(asFragment()).toMatchSnapshot();
    expect(
      screen.getByText(successProps.message).getAttribute("class")
    ).toMatch(/success/i);
  });

  it("has the correct class name when given success prop equal to false", () => {
    const { asFragment } = render(<Alert {...errorProps} />);

    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(errorProps.message).getAttribute("class")).toMatch(
      /error/i
    );
  });
});
