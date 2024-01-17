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
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { constructHeader, isMember } from "../utils";
const url = "http://localhost:5000/v1/logout";

const initialState = {
  anchorEl: null,
  mobileOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'setAnchorEl':
      return { ...state, anchorEl: action.value };
    case 'setMobileOpen':
      return { ...state, mobileOpen: action.value };
    default:
      throw new Error();
  }
}

export const AppHeader = ({ tabValue }) => {
  const tabs = [
    { route: "/v1/favorites", label: "Favorites" },
    { route: "/v1/rescues", label: "Rescues" },
    { route: "/v1/forms", label: "Forms" },
    { route: "/v1/canidates", label: "Canidates" },
    { route: "/v1/fosters", label: "Fosters" },
    { route: "/v1/vets", label: "Vets" },
    { route: "/v1/users", label: "Users" },
  ];
  const [state, dispatch] = useReducer(reducer, initialState);
  const open = Boolean(state.anchorEl);
  const history = useHistory();
  const shouldDisable = isMember();

  const handleHamburgerClick = (newValue) => {
    if (tabValue === newValue) {
      dispatch({ type: 'setMobileOpen', value: false });
    } else {
      history.push(tabs[newValue].route);
    }
  };
  const handleTabClick = (event, newValue) => history.push(tabs[newValue].route);

  const handleDrawerToggle = () => {
    dispatch({ type: 'setMobileOpen', value: !state.mobileOpen });
  };

  const handleMenu = (event) => dispatch({ type: 'setAnchorEl', value: event.currentTarget });

  const handleClose = () => {
    dispatch({ type: 'setAnchorEl', value: null });
  };

  const onClickLogout = () => {
    fetch(url, { headers: constructHeader() }).then((res) => {
      localStorage.clear();
      history.push("/v1/login");
    });
  };

  const drawer = (
    <div>
      <List>
        {tabs.map((tab, index) => (
          <ListItem
            button
            key={tab.route}
            onClick={() => handleHamburgerClick(index)}
            style={{ color: 'white' }}
          >
            <ListItemText primary={tab.label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <header style={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Hidden lgUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp implementation="css">
            <Drawer
              variant="temporary"
              open={state.mobileOpen}
              onClose={handleDrawerToggle}
              PaperProps={{ style: { backgroundColor: '#3f51b5' } }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden mdDown implementation="css">
            <Tabs value={tabValue} onChange={handleTabClick} aria-label="Navigation tabs">
              {tabs.map((tab, index) => (
                <Tab
                  key={index}
                  label={tab.label}
                  disabled={index === 6 && shouldDisable}
                  style={{ color: 'white' }}
                />
              ))}
            </Tabs>
          </Hidden>
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