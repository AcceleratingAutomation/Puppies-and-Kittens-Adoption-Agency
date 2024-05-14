import React, { useReducer, useCallback } from "react";
import { AppBar, MenuItem, IconButton, Menu, Toolbar } from "@mui/material";
import { useHistory, useLocation } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DrawerComponent from "./DrawerComponent";
import TabsComponent from "./TabsComponent";
import { handleLogout } from "../../server/apiService/authApi";
import { getToken } from "../../utils/utils";
import {
  adoptersEndpoint,
  favoritesEndpoint,
  fostersEndpoint,
  rescueAddEndpoint,
  rescuesEndpoint,
  adminsEndpoint,
  veterinariansEndpoint,
} from "../../server/apiService/apiConfig";
import {
  adminsText,
  adoptersText,
  favoritesText,
  fostersText,
  rescuesText,
  veterinariansText,
} from "../../accessibility/accessibilityText";

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
  { route: favoritesEndpoint, label: favoritesText },
  { route: rescuesEndpoint, label: rescuesText },
  { route: adoptersEndpoint, label: adoptersText },
  { route: fostersEndpoint, label: fostersText },
  { route: veterinariansEndpoint, label: veterinariansText },
  { route: adminsEndpoint, label: adminsText },
];

export function AppHeader() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const open = Boolean(state.anchorEl);
  const history = useHistory();
  const location = useLocation();
  const shouldDisable = false; // Change to shouldHide
  /* Only show menu options when user is logged in. */
  const showMenuOptions = getToken();
  /* Set tab value to 0 if the current route is not in the tabs array. Only use when user is signed in. */
  const tabValue = showMenuOptions
    ? Math.max(
        0,
        tabs.findIndex((tab) => tab.route === location.pathname),
      )
    : false;

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

  const onAddRescue = useCallback(() => {
    history.push(rescueAddEndpoint);
  });

  return (
    <header style={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          {showMenuOptions && (
            <>
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
                <MenuItem onClick={onAddRescue}>Add Rescue</MenuItem>
                <MenuItem onClick={onClickLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
}
