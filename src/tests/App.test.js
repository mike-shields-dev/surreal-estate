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
  it("renders a navigation", () => {
    renderApp();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  describe("client-side routing", () => {
    it("renders Properties component at root path", () => {
      renderApp();

      expect(screen.queryByTitle("properties")).toBeInTheDocument();
      expect(screen.queryByTitle("add property")).not.toBeInTheDocument();
    });

    xit("selecting each hyperlink, renders the correct routed component", () => {
      renderApp();

      const addPropertyLink = screen.getByRole("link", {
        name: "Add Property",
      });
      const viewPropertiesLink = screen.getByRole("link", {
        name: "View Properties",
      });

      fireEvent.click(addPropertyLink);

      expect(screen.queryByTitle("add property")).toBeInTheDocument();
      expect(screen.queryByTitle("properties")).not.toBeInTheDocument();

      fireEvent.click(viewPropertiesLink);

      expect(screen.queryByTitle("properties")).toBeInTheDocument();
      expect(screen.queryByTitle("add property")).not.toBeInTheDocument();
    });
  });
});
