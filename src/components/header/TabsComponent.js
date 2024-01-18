import React from "react";
import {
    Tab,
    Tabs,
    Hidden,
} from "@material-ui/core";

const TabsComponent = ({ tabs, tabValue, handleTabClick, shouldDisable }) => (
    <Hidden mdDown implementation="css">
        <Tabs value={tabValue} onChange={handleTabClick} aria-label="Navigation tabs">
            {tabs.map((tab, index) => (
                <Tab
                    key={index}
                    label={tab.label}
                    disabled={index === 5 && shouldDisable}
                    style={{ color: 'white' }}
                />
            ))}
        </Tabs>
    </Hidden>
);

export default TabsComponent;