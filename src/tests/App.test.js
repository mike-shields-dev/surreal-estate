import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

describe("App", () => {
  it("renders the nav bar", () => {
    render(<App />);
    const navBarEl = screen.getByTestId("navbar");

    expect(navBarEl).toBeInTheDocument();
  });
});
