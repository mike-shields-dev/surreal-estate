import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../components/App";

describe("App", () => {
  it("renders the nav bar", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const navBarEl = screen.getByTestId("navbar");

    expect(navBarEl).toBeInTheDocument();
  });
});
