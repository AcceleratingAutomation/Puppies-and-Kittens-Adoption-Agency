import React from "react";
import {
  IconButton,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const DrawerComponent = ({
  tabs,
  handleHamburgerClick,
  mobileOpen,
  handleDrawerToggle,
}) => (
  <Hidden lgUp implementation="css">
    <IconButton
      color="inherit"
      aria-label="open drawer"
      edge="start"
      onClick={handleDrawerToggle}
    >
      <MenuIcon />
    </IconButton>
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      PaperProps={{ style: { backgroundColor: "#3f51b5" } }}
    >
      <div>
        <List>
          {tabs.map((tab, index) => (
            <ListItem
              button
              key={tab.route}
              onClick={() => handleHamburgerClick(index)}
              style={{ color: "white" }}
            >
              <ListItemText primary={tab.label} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  </Hidden>
);

export default DrawerComponent;
