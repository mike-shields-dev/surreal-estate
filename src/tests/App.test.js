import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../components/App";

const AppWithBrowserRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

describe("App", () => {
  it("renders NavBar", () => {
    render(<AppWithBrowserRouter />);
    const navBarEl = screen.getByTestId("navbar");

    expect(navBarEl).toBeInTheDocument();
  });

  it("clicking the 'View Properties' link, renders the Properties component", async () => {
    const { getByRole } = render(<AppWithBrowserRouter />);
    const linkEl = getByRole("link", { name: "View Properties" });

    expect(screen.queryByText("Properties Page")).not.toBeInTheDocument();

    fireEvent.click(linkEl);

    expect(screen.queryByText("Properties Page")).toBeInTheDocument();
  });

  it("clicking the 'Add Property' link, renders the AddProperty component", async () => {
    const { getByRole } = render(<AppWithBrowserRouter />);
    const linkEl = getByRole("link", { name: "Add Property" });

    expect(screen.queryByText("Add Property Page")).not.toBeInTheDocument();

    fireEvent.click(linkEl);

    expect(screen.queryByText("Add Property Page")).toBeInTheDocument();
  });
});
