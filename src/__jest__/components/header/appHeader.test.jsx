import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import { AppHeader } from "../../../components/header/AppHeader";
import DrawerComponent from "../../../components/header/DrawerComponent";
import { handleLogout } from "../../../server/apiService/authApi";

jest.mock("../../../server/apiService/authApi", () => ({
  handleLogout: jest.fn(),
}));

describe("App Header", () => {
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it("calls handle logout and pushes to login on logout click", () => {
    const { getByText, getByLabelText } = render(
      <Router history={history}>
        <AppHeader tabValue={0} />
      </Router>,
    );

    fireEvent.click(getByLabelText("account of current user"));
    fireEvent.click(getByText("Logout"));

    expect(handleLogout).toHaveBeenCalled();
    expect(history.location.pathname).toBe("/");
  });

  it("pushes to add rescue on add rescue click", () => {
    const { getByText, getByLabelText } = render(
      <Router history={history}>
        <AppHeader tabValue={0} />
      </Router>,
    );

    fireEvent.click(getByLabelText("account of current user"));
    fireEvent.click(getByText("Add Rescue"));

    expect(history.location.pathname).toBe("/v1/rescues/add");
  });

  it("toggles mobile open state on hamburger icon click", async () => {
    const { getByLabelText, queryByRole } = render(
      <Router history={history}>
        <AppHeader tabValue={0} />
      </Router>,
    );

    // Initially, the DrawerComponent should not be open
    expect(queryByRole("presentation")).not.toBeInTheDocument();

    // Click on the IconButton to open the DrawerComponent
    fireEvent.click(getByLabelText("open drawer"));

    // Now the DrawerComponent should be open
    await wait(() => {
      const drawer = queryByRole("presentation");
      expect(drawer).toBeInTheDocument();
    });

    // Click on the IconButton again to close the DrawerComponent
    fireEvent.click(getByLabelText("open drawer"));

    // The DrawerComponent should be closed again
    await wait(() => {
      expect(queryByRole("presentation")).not.toBeInTheDocument();
    });
  });
});

describe("Drawer Component", () => {
  it("calls handle hamburger click with correct index on list item click", async () => {
    const handleHamburgerClick = jest.fn();
    const tabs = [
      { route: "/route1", label: "Tab 1" },
      { route: "/route2", label: "Tab 2" },
    ];

    const history = createMemoryHistory();
    history.push = jest.fn();

    const { findByText } = render(
      <Router history={history}>
        <DrawerComponent
          tabs={tabs}
          handleHamburgerClick={handleHamburgerClick}
          mobileOpen
          handleDrawerToggle={() => {}}
        />
      </Router>,
    );

    const tab1 = await findByText("Tab 1");
    fireEvent.click(tab1);

    expect(handleHamburgerClick).toHaveBeenCalledWith(0);
  });
});
