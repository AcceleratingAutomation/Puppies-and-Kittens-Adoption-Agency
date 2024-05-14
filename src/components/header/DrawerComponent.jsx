import React from "react";
import {
  IconButton,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";

function DrawerComponent({
  tabs,
  handleHamburgerClick,
  mobileOpen,
  handleDrawerToggle,
}) {
  return (
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
}

DrawerComponent.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      route: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
  handleHamburgerClick: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default DrawerComponent;
