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

    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  describe("App routing", () => {
    it("renders Properties component as root path", () => {
      renderApp();

      expect(screen.queryByTitle("properties")).toBeInTheDocument();
    });

    it("selecting each hyperlink, renders the correct routed component", () => {
      const { getByRole } = renderApp();

      const addPropertyLink = getByRole("link", { name: "Add Property" });
      const viewPropertiesLink = getByRole("link", {
        name: "View Properties",
      });

      expect(screen.queryByTitle("properties")).toBeInTheDocument();
      expect(screen.queryByTitle("add property")).not.toBeInTheDocument();

      fireEvent.click(addPropertyLink);

      expect(screen.queryByTitle("add property")).toBeInTheDocument();
      expect(screen.queryByTitle("properties")).not.toBeInTheDocument();

      fireEvent.click(viewPropertiesLink);

      expect(screen.queryByTitle("properties")).toBeInTheDocument();
      expect(screen.queryByTitle("add property")).not.toBeInTheDocument();
    });
  });
});
