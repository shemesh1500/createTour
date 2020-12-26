import React, { useEffect, useReducer } from "react";
import { Menu } from "semantic-ui-react";
import { updateTabStatus, asyncTabStatus} from '../../async/asyncActions';
import { connect, useDispatch } from "react-redux";

const StopCreationNav = ({ activeTab, handleTabChange, updateTabStatus }) => {
 // const dispatch = useDispatch()
 //const [state, dispatch] = useReducer(reducer, initialState);

useEffect(() => {
  updateTabStatus(activeTab);
},[activeTab])

   const clickHandle =  (tagName) => {
    updateTabStatus(tagName);
    handleTabChange(tagName);
  }
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
          onClick={() =>  handleTabChange("General Info")}
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
const action = {updateTabStatus}

export default connect(null, action) (StopCreationNav);
