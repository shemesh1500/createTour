import React from "react";
import { withFirebase } from "react-redux-firebase";
import { connect } from "react-redux";
import newTourIcon from "../../images/addNewTourIcon.svg";
import newBusinessIcon from "../../images/addNewBusinessIcon.svg";
import allAssetsIcon from "../../images/allAssetsIcon.svg";
import personalDetailsIcon from "../../images/prsonalDetails.svg";
import "../../style/mainPage.css";

const mapState = (state) => ({
  profile: state.firebase.profile,
});

const MainPage = ({ profile }) => {
  return (
    <div className="mainZone">
      <div className="headers">
        <div className="mainHeader">
          Hello {profile.displayName}, <br />
          Your are in you personal zone!
        </div>
        <div className="subHeader">Here you can do different actions</div>
      </div>

      <a href="/tourControl" className="mainZoneButtun">
        <img className="icon" src={newTourIcon} />
        <div className="buttonText">Create new tour</div>
        <div></div>
      </a>
      <a href="/tourControl" className="mainZoneButtun">
        <img className="icon" src={newBusinessIcon} />
        <div className="buttonText">Create new business stop</div>
        <div></div>
      </a>
      <a href="/settings" className="mainZoneButtun">
        <img className="icon" src={personalDetailsIcon} />
        <div className="buttonText">Edit personal details</div>
        <div></div>
      </a>
      <a href="/tours" className="mainZoneButtun">
        <img className="icon" src={allAssetsIcon} />
        <div className="buttonText">All your assets</div>
        <div></div>
      </a>
    </div>
  );
};

export default withFirebase(connect(mapState)(MainPage));
