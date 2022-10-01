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

  describe("App client side routing", () => {
    it("renders Properties component as root path", () => {
      render(<AppWithBrowserRouter />);

      expect(screen.queryByText("Properties Page")).toBeInTheDocument();
    });

    it("selecting each hyperlink, renders the correct routed component", () => {
      const { getByRole } = render(<AppWithBrowserRouter />);

      const addPropertyLinkEl = getByRole("link", { name: "Add Property" });
      const viewPropertiesLinkEl = getByRole("link", {
        name: "View Properties",
      });

      expect(screen.queryByText("Properties Page")).toBeInTheDocument();
      expect(screen.queryByText("Add Property Page")).not.toBeInTheDocument();

      fireEvent.click(addPropertyLinkEl);

      expect(screen.queryByText("Add Property Page")).toBeInTheDocument();
      expect(screen.queryByText("Properties Page")).not.toBeInTheDocument();

      fireEvent.click(viewPropertiesLinkEl);

      expect(screen.queryByText("Properties Page")).toBeInTheDocument();
      expect(screen.queryByText("Add Property Page")).not.toBeInTheDocument();
    });
  });
});
