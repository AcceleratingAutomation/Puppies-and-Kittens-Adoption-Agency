import React, { useReducer, useCallback } from "react";
import { AppBar, MenuItem, IconButton, Menu, Toolbar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PropTypes from "prop-types";
import DrawerComponent from "./DrawerComponent";
import TabsComponent from "./TabsComponent";
import { handleLogout } from "../../server/apiService/authApi";

const initialState = {
  anchorEl: null,
  mobileOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "setAnchorEl":
      return { ...state, anchorEl: action.value };
    case "setMobileOpen":
      return { ...state, mobileOpen: action.value };
    default:
      throw new Error();
  }
}

export const tabs = [
  { route: "/v1/favorites", label: "Favorites" },
  { route: "/v1/rescues", label: "Rescues" },
  { route: "/v1/adopters", label: "Adopters" },
  { route: "/v1/fosters", label: "Fosters" },
  { route: "/v1/veterinarians", label: "Veterinarians" },
  { route: "/v1/users", label: "Users" },
];

export function AppHeader({ tabValue }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const open = Boolean(state.anchorEl);
  const history = useHistory();
  const shouldDisable = false; // Change to shouldHide

  const handleHamburgerClick = useCallback(
    (newValue) => {
      if (tabValue === newValue) {
        dispatch({ type: "setMobileOpen", value: false });
      } else {
        history.push(tabs[newValue].route);
      }
    },
    [tabValue, history],
  );

  const handleTabClick = useCallback(
    (event, newValue) => {
      history.push(tabs[newValue].route);
    },
    [history],
  );

  const handleDrawerToggle = useCallback(() => {
    dispatch({ type: "setMobileOpen", value: !state.mobileOpen });
  }, [state.mobileOpen]);

  const handleMenu = useCallback((event) => {
    dispatch({ type: "setAnchorEl", value: event.currentTarget });
  }, []);

  const handleClose = useCallback(() => {
    dispatch({ type: "setAnchorEl", value: null });
  }, []);

  const onClickLogout = useCallback(() => {
    handleLogout(history);
  }, [history]);

  return (
    <header style={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <DrawerComponent
            tabs={tabs}
            handleHamburgerClick={handleHamburgerClick}
            mobileOpen={state.mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
          <TabsComponent
            tabs={tabs}
            tabValue={tabValue}
            handleTabClick={handleTabClick}
            shouldDisable={shouldDisable}
          />
          <div style={{ flexGrow: 1 }} />
          <IconButton
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={state.anchorEl}
            open={open}
            onClose={handleClose}
            aria-label="User menu options"
          >
            <MenuItem>{localStorage.getItem("displayName")}</MenuItem>
            <MenuItem onClick={onClickLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </header>
  );
}

AppHeader.propTypes = {
  tabValue: PropTypes.number.isRequired,
};
