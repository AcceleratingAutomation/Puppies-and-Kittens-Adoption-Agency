import React from 'react';
import { Tab, Tabs, Hidden } from '@material-ui/core';
import PropTypes from 'prop-types';

function TabsComponent({
  tabs, tabValue, handleTabClick, shouldDisable,
}) {
  return (
    <Hidden mdDown implementation="css">
      <Tabs
        value={tabValue}
        onChange={handleTabClick}
        aria-label="Navigation tabs"
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.label}
            label={tab.label}
            disabled={index === 5 && shouldDisable}
            style={{ color: 'white' }}
          />
        ))}
      </Tabs>
    </Hidden>
  );
}

TabsComponent.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,
  tabValue: PropTypes.number.isRequired,
  handleTabClick: PropTypes.func.isRequired,
  shouldDisable: PropTypes.bool.isRequired,
};

export default TabsComponent;
