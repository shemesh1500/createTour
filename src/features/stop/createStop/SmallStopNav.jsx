import React from "react";
import { Menu } from "semantic-ui-react";

const SmallStopNav = ({ activeTab, handleTabChange }) => {
  return (
    <div>
      <div>
        <Menu attached="top" tabular>
          <Menu.Item
            name="Location"
            active={activeTab === "Location"}
            onClick={() => handleTabChange("Location")}
          />
          <Menu.Item
            name="Context"
            active={activeTab === "Content"}
            onClick={() => handleTabChange("Context")}
          />
          <div style={{ paddingLeft: "52%", paddingTop: "18px" }}>
            Small stop
          </div>
        </Menu>
      </div>
    </div>
  );
};

export default SmallStopNav;
