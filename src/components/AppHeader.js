import React, { useReducer } from "react";
import "../styles.css";
import {
  AppBar,
  Tab,
  Tabs,
  MenuItem,
  IconButton,
  Menu,
  Toolbar,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { constructHeader, isMember } from "../util";
const url = "http://localhost:5000/v1/logout";

const initialState = {
  anchorEl: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setAnchorEl':
      return { ...state, anchorEl: action.value };
    default:
      throw new Error();
  }
}

export const AppHeader = ({ tabValue }) => {
  const tabs = ["/favorite", "/pets", "/pet", "/canidates", "/fosters", "/vets", "/users"];
  const [state, dispatch] = useReducer(reducer, initialState);
  const open = Boolean(state.anchorEl);
  const history = useHistory();
  const shouldDisable = isMember();

  const handleClick = (event, newValue) => history.push(tabs[newValue]);

  const handleMenu = (event) => dispatch({ type: 'setAnchorEl', value: event.currentTarget });

  const handleClose = () => {
    dispatch({ type: 'setAnchorEl', value: null });
  };

  const onClickLogout = () => {
    fetch(url, { headers: constructHeader() }).then((res) => {
      localStorage.clear();
      history.push("/login");
    });
  };

  return (
    <header style={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Tabs value={tabValue} onChange={handleClick} aria-label="Navigation tabs">
            <Tab label="Favorite" />
            <Tab label="Pets" />
            <Tab label="Add Pet" disabled={shouldDisable} />
            <Tab label="Canidates" />
            <Tab label="Fosters" />
            <Tab label="Vets" />
            <Tab label="Users" disabled={shouldDisable} />
          </Tabs>
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
};
