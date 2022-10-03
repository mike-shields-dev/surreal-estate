import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../components/App";

const renderApp = () =>
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

describe("App", () => {
  it("renders NavBar", () => {
    renderApp();
    const navBarEl = screen.getByTestId("navbar");

    expect(navBarEl).toBeInTheDocument();
  });

  describe("App client side routing", () => {
    it("renders Properties component as root path", () => {
      renderApp();

      expect(screen.queryByTestId("properties")).toBeInTheDocument();
    });

    it("selecting each hyperlink, renders the correct routed component", () => {
      const { getByRole } = renderApp();

      const addPropertyLinkEl = getByRole("link", { name: "Add Property" });
      const viewPropertiesLinkEl = getByRole("link", {
        name: "View Properties",
      });

      expect(screen.queryByTestId("properties")).toBeInTheDocument();
      expect(screen.queryByTestId("add-property")).not.toBeInTheDocument();

      fireEvent.click(addPropertyLinkEl);

      expect(screen.queryByTestId("add-property")).toBeInTheDocument();
      expect(screen.queryByTestId("properties")).not.toBeInTheDocument();

      fireEvent.click(viewPropertiesLinkEl);

      expect(screen.queryByTestId("properties")).toBeInTheDocument();
      expect(screen.queryByTestId("add-property")).not.toBeInTheDocument();
    });
  });
});
