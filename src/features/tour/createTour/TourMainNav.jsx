import React, { Fragment } from "react";
import { Menu } from "semantic-ui-react";

const TourMainNav = ({ activeTab, handleTabChange }) => {
  return (
    <Fragment>
      <Menu fluid tabula="true">
        <Menu.Item
          name="Tour Summary"
          active={activeTab === "Tour Summary"}
          onClick={() => handleTabChange("Tour Summary")}
        />
        <Menu.Item
          name="Create Route"
          active={activeTab === "Create Route"}
          onClick={() => handleTabChange("Create Route")}
        />
      </Menu>
    </Fragment>
  );
};

export default TourMainNav;
