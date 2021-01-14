import React, { useState, useEffect } from "react";
import { Menu, Segment, Image, Icon } from "semantic-ui-react";
import { updatePassword } from "../../auth/authActions";
import { connect } from "react-redux";
import { updateProfile } from "../userActions";
import "../../../style/settings.css";
import BasicPage from "./BasicPage";
import PersonalQuestion from "./PersonalQuestion";
import { uploadProfileImage } from "../../user/userActions";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const actions = {
  updatePassword,
  updateProfile,
  uploadProfileImage,
};

const query = (props) => {
  //console.log("PROPS", props);
  if (props.profile.email) {
    return [
      { collection: "users", where: ["email", "==", props.profile.email] },
    ];
  } else {
    return [];
  }
};

const mapState = (state) => {
  //console.log("STATE", state);
  let fetch_user = {};
  if (state.firestore.ordered.users) {
    fetch_user = state.firestore.ordered.users[0];
  } /* else {
    fetch_user = state.firebase.profile;
  } */

  return {
    providerId: state.firebase.auth.providerData[0].providerId,
    profile: state.firebase.profile,
    user: fetch_user,

    // initialValues: state.form.userProfile ? state.form.userProfile.values : []
  };
};

const UserSettings = ({ user, uploadProfileImage, updateProfile }) => {
  const [ActiveTab, setActiveTab] = useState("personal details");
  const [profileImg, setprofileImg] = useState({ preview: "", raw: "" });

  useEffect(() => {
    return () => {
      if (profileImg.preview !== "") {
        URL.revokeObjectURL(profileImg.preview);
      }
    };
  }, [profileImg]);

  const chooseImg = (e) => {
    if (e.target.files.length) {
      setprofileImg({
        //preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      uploadProfileImage(e.target.files[0], user);
    }
  };

  const switchContent = (activeTab) => {
    switch (activeTab) {
      case "personal details":
        return <BasicPage initialValues={user} updateProfile={updateProfile} />;
      case "questions":
        return (
          <PersonalQuestion
            initialValues={user}
            updateProfile={updateProfile}
          />
        );
      default:
        break;
    }
  };
  return (
    <div className="generalArea">
      <div className="contextSettingsArea">
        <div className="settingHeader">
          <div>
            <h2 className="header">
              Hello, <br />
              this is your pesonal area
            </h2>
            <h4>Fill the details so we can know moew about you</h4>
          </div>
          <div className="profileImg">
            <label htmlFor="upload-button" className="uploadFile">
              <Image
                avatar
                size="small"
                src={user.imageUrl || "/assets/user.png"}
              />
              <Icon name="plus" />
            </label>
            <input
              type="file"
              id="upload-button"
              style={{ display: "none" }}
              onChange={chooseImg}
            />
          </div>
        </div>
        <Menu attached="top" tabular>
          <Menu.Item
            name="personal details"
            active={ActiveTab === "personal details"}
            onClick={() => setActiveTab("personal details")}
          />
          <Menu.Item
            name="questions"
            active={ActiveTab === "questions"}
            onClick={() => setActiveTab("questions")}
          />
        </Menu>
        <Segment attached="bottom">{switchContent(ActiveTab)}</Segment>
      </div>
    </div>
  );
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => query(props)),
  reduxForm({
    form: "userProfile",
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  })
)(UserSettings);

/*


export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(connect(mapState, actions)(UserSettings));
*/
