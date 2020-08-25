import React, { useState, useEffect } from "react";
import { Menu, Segment, Image, Icon } from "semantic-ui-react";
import { updatePassword } from "../../auth/authActions";
import { connect } from "react-redux";
import { updateProfile } from "../userActions";
import "../../../style/settings.css";
import BasicPage from "./BasicPage";
import PersonalQuestion from "./PersonalQuestion";
import { uploadProfileImage } from "../../user/userActions";
import { toastr } from "react-redux-toastr";
import { reduxForm } from "redux-form";

const actions = {
  updatePassword,
  updateProfile,
  uploadProfileImage,
};

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile,
  // initialValues: state.form.userProfile ? state.form.userProfile.values : []
});

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
    console.log("NEW IMAGEEEEEEEEE");
    if (e.target.files.length) {
      setprofileImg({
        //preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      uploadProfileImage(e.target.files[0], user);
    }
  };

  const switchContent = (activeTab) => {
    console.log("user", user);
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
      <div className="contextArea">
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

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(connect(mapState, actions)(UserSettings));
