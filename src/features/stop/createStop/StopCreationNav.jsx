import React, { Fragment } from "react";
import { Menu } from "semantic-ui-react";

const StopCreationNav = ({ activeTab, handleTabChange }) => {
  return (
    <div>
      <Menu attached="top" tabular>
        <Menu.Item
          name="Location"
          active={activeTab === "Location"}
          onClick={() => handleTabChange("Location")}
        />
        <Menu.Item
          name="General Info"
          active={activeTab === "General Info"}
          onClick={() => handleTabChange("General Info")}
        />
        <Menu.Item
          name="Media"
          active={activeTab === "Media"}
          onClick={() => handleTabChange("Media")}
        />
        <div style={{ paddingLeft: "30%", paddingTop: "12px" }}>Big Stop</div>
      </Menu>
    </div>
  );
  //  }
};
export default StopCreationNav;
