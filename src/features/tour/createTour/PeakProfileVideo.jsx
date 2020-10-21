import React, { Fragment } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import PhotoComponent from "./media/photos/PhotoComponentGeneric";
import { generalUploadFile, generalDeleteFile } from "../../media/mediaActions";
import { reduxForm } from "redux-form";

const actions = {
  generalUploadFile,
  generalDeleteFile,
};

const mapState = (state) => {
  let profilePic = {};
  if (state.form.tourForm.values_tour_image) {
    profilePic = state.form.tourForm.values_tour_image;
  }

  return {
    loading: state.async.loading,
    profile_pic: profilePic,
    initialValues: state.form.tourForm.values,
  };
};

const PeakProfileVideo = (props) => {
  const {
    loading,
    generalUploadFile,
    generalDeleteFile,
    initialValues,
    saveChanges,
  } = props;
  const [photoModal, setPhotoModal] = useState(false);
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
      tour_image: "",
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
      tour_image: new_media,
    };

    saveChanges(update_tour);
    setPhotoModal(false);
  };

  return (
    <Fragment>
      {initialValues.tour_image && initialValues.tour_image.url ? (
        <div>
          <img
            src={initialValues.tour_image.url}
            style={{ width: "150px", height: "150px" }}
          />
          {!loading && <i className="fa fa-spinner"></i>}
          <button
            className="saveButton"
            onClick={() => deleteFile(initialValues.tour_image)}
          >
            Change picture
          </button>
        </div>
      ) : (
        <div>
          {!loading && <i className="fa fa-spinner"></i>}
          <button className="addButton" onClick={() => setPhotoModal(true)}>
            + Photo
          </button>
        </div>
      )}
      <PhotoComponent
        loading={loading}
        handleDeletePhoto={deleteFile}
        generalUploadFile={uploadFile}
        open={photoModal}
        onClose={() => setPhotoModal(false)}
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
