import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import VideoComponent from "./media/VideoComponent";
import PhotoComponent from "./media/PhotoComponent";
import AudioComponent from "./media/AudioComponent";
import { generalDeleteFile } from "../../media/mediaActions";
import { setMainPhoto } from "../tourAction";
import { toastr } from "react-redux-toastr";
import MediaList from "../../media/MediaList";
import "../../../style/media.css";

const actions = {
  generalDeleteFile,
  setMainPhoto,
};

const mapState = (state) => {
  return {
    firestore: state.firestore,
    initialValues: state.form.tourForm.values,
    loading: state.async.loading,
  };
};

const TourMedia = (props) => {
  const {
    initialValues,
    saveChanges,
    loading,
    generalDeleteFile,
    setMainPhoto,
  } = props;

  const [photoOpen, setPhotoModal] = useState(false);
  const [videoOpen, setVideoModal] = useState(false);
  const [audioOpen, setAudioModal] = useState(false);

  let all_media = initialValues.all_media ? initialValues.all_media : [];

  const deleteFile = async (file) => {
    if (
      file.type.includes("image") ||
      file.type.includes("audio") ||
      file.type.includes("video")
    ) {
      await generalDeleteFile(file, initialValues.id, "toursMedia");
    }
    let new_all_media = all_media.filter((media) => media.name !== file.name);
    let update_stop = {
      ...initialValues,
      all_media: new_all_media,
    };

    saveChanges(update_stop);
  };

  const handleSetMainFile = async (photo, stop) => {
    try {
      await setMainPhoto(photo, stop);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  const setMediaList = (updatedList) => {
    updatedList.map((item, index) => (item.order = index));
    props.change("all_media", updatedList);
  };

  if (!initialValues.id) {
    return <Fragment>Please fill all the details first</Fragment>;
  }

  return (
    <Fragment>
      <button className="addButton" onClick={() => setPhotoModal(true)}>
        + Photo
      </button>
      {/* <button className="addButton" onClick={() => setVideoModal(true)}>
        + Video
      </button>
      <button className="addButton" onClick={() => setAudioModal(true)}>
        + Audio
      </button>
 */}
      <PhotoComponent
        loading={loading}
        objectId={initialValues.id}
        all_media={all_media}
        handleSetMainFile={handleSetMainFile}
        handleDeletePhoto={deleteFile}
        open={photoOpen}
        onClose={() => setPhotoModal(false)}
      />
      <VideoComponent
        open={videoOpen}
        onClose={() => setVideoModal(false)}
        objectId={initialValues.id}
        all_media={all_media}
        collectionName={"tours"}
        handleDeleteFile={deleteFile}
      />

      <AudioComponent
        open={audioOpen}
        onClose={() => setAudioModal(false)}
        objectId={initialValues.id}
        all_media={all_media}
        collectionName={"tours"}
        handleDeleteFile={deleteFile}
      />

      {initialValues.all_media && (
        <MediaList
          all_media={initialValues.all_media.filter((media) =>
            media.type.includes("image")
          )}
          setMediaList={setMediaList}
          deleteFuncSwitch={deleteFile}
        />
      )}
      <button className="saveButton" onClick={() => saveChanges(initialValues)}>
        Save changes
      </button>
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
  })(TourMedia)
);
