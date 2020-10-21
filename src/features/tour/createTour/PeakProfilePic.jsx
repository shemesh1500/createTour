import React, { Fragment } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import PhotoComponent from "./media/photos/PhotoComponentGeneric";
import VideoComponent from "./media/VideoComponent";
import { generalUploadFile, generalDeleteFile } from "../../media/mediaActions";
import { reduxForm } from "redux-form";
import "../../../style/form.css";
import defaultPic from "../../../images/default-profile.png";
import defaultVideo from "../../../images/default-profile-video.png";

const actions = {
  generalUploadFile,
  generalDeleteFile,
};

const mapState = (state) => {
  let profilePic = {};
  let profileVid = {};
  if (state.form.tourForm.values.tour_image) {
    profilePic = state.form.tourForm.values.tour_image;
  }
  if (state.form.tourForm.values.all_media) {
    profileVid = state.form.tourForm.values.all_media.filter(
      (media) => media.profile === true && media.type.includes("video")
    )[0];
  }

  return {
    loading: state.async.loading,
    profile_pic: profilePic,
    initialValues: state.form.tourForm.values,
    video_profile: profileVid,
  };
};

const PeakProfilePic = (props) => {
  const {
    loading,
    generalUploadFile,
    generalDeleteFile,
    initialValues,
    saveChanges,
    fileType,
    video_profile,
  } = props;
  const [photoModal, setPhotoModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);
  const tourID = initialValues.id;

  const deleteFile = async (file) => {
    if (file.type.includes("video")) {
      await generalDeleteFile(file, tourID, "toursMedia");
    } else if (
      file.type.includes("image") ||
      file.type.includes("audio") ||
      file.type.includes("video")
    ) {
      await generalDeleteFile(file, tourID, "toursMedia");
    }

    let update_tour = {
      ...initialValues,
      tour_image: {},
    };

    saveChanges(update_tour);
  };

  const deleteVideo = async (file) => {
    if (file.type.includes("video")) {
      await generalDeleteFile(file, tourID, "toursMedia");
    } else if (
      file.type.includes("image") ||
      file.type.includes("audio") ||
      file.type.includes("video")
    ) {
      await generalDeleteFile(file, tourID, "toursMedia");
    }

    let new_all_media = initialValues.all_media.filter(
      (media) => media.name !== file.name
    );
    let update_tour = {
      ...initialValues,
      all_media: new_all_media,
    };

    saveChanges(update_tour);
  };

  const uploadFile = async (file, fileTitle = "file", poster = {}) => {
    let new_media = await generalUploadFile(
      file,
      tourID,
      "tours",
      fileTitle,
      poster
    );
    new_media = {
      ...new_media,
      //    order: all_media ? all_media.length : 0,
    };
    //    let new_all_media = [...all_media, new_media];
    let update_tour = {
      ...initialValues,
      [fileType.toString()]: new_media,
    };
    saveChanges(update_tour);
    setPhotoModal(false);
  };

  console.log("profile_video", video_profile);

  return (
    <Fragment>
      <div className="profilePicture">
        <div className="profileHeader">Tour profile picture</div>
        {initialValues.tour_image && initialValues.tour_image.url ? (
          <div className="profileImgObj">
            <img
              className="profileImg"
              src={initialValues.tour_image.url}
              //style={{ width: "150px", height: "150px" }}
            />
            <button
              className="profileSave"
              onClick={() => deleteFile(initialValues.tour_image)}
            >
              Change picture
            </button>
          </div>
        ) : (
          <div className="profileImgObj">
            <img
              className="profileImg"
              src={defaultPic}
              //style={{ width: "150px", height: "150px" }}
            />
            <button className="addButton" onClick={() => setPhotoModal(true)}>
              + Photo
            </button>
          </div>
        )}
      </div>
      <hr />
      <div className="profilePicture">
        <div className="profileHeader">Tour main video</div>
        {video_profile && video_profile.url ? (
          <div>
            <video
              poster={video_profile.poster_url}
              style={{ width: "300px", height: "250px" }}
              controls
            >
              <source src={video_profile.url} type={video_profile.type} />
            </video>
            <button
              className="saveButton"
              onClick={() => deleteVideo(video_profile)}
            >
              Change video
            </button>
          </div>
        ) : (
          <div className="profileImgObj">
            <img
              className="profileImg"
              src={defaultVideo}
              style={{ width: "300px" }}
            />
            <button className="addButton" onClick={() => setVideoModal(true)}>
              + Video
            </button>
          </div>
        )}
      </div>
      <PhotoComponent
        loading={loading}
        handleDeletePhoto={deleteFile}
        generalUploadFile={uploadFile}
        open={photoModal}
        onClose={() => setPhotoModal(false)}
        constAspectRation="square"
      />

      <VideoComponent
        open={videoModal}
        onClose={() => setVideoModal(false)}
        objectId={initialValues.id}
        collectionName={"tours"}
        handleDeleteFile={deleteFile}
        all_media={initialValues.all_media}
        profileVideo={true}
      />
    </Fragment>
  );
};

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "tourForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  })(PeakProfilePic)
);
