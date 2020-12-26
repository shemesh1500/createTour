import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import VideoComponent from "../media/VideoComponent";
import PhotoComponent from "../media/PhotoComponent";
import AudioComponent from "../media/AudioComponent";
import { setMainPhoto } from "../../tour/tourAction";
import { toastr } from "react-redux-toastr";
import MediaList from "../../media/MediaList";
import TextComponent from "../media/TextComponent";
import QuestionComponent from "../media/QuestionComponent";
import {
  deleteStopFile,
  deleteStopVideo,
  deleteStopText,
  removeQuestion,
  generalUploadFile,
  generalDeleteFile,
} from "../../media/mediaActions";

//import MediaList from './media/MediaList';

const actions = {
  deleteStopFile,
  deleteStopVideo,
  setMainPhoto,
  deleteStopText,
  removeQuestion,
  generalUploadFile,
  generalDeleteFile,
};

const mapState = (state, props) => {
  let all_media = [];
  if (props.stop.all_media) {
    all_media = props.stop.all_media;
  }

  return {
    all_media: all_media,
    firestore: state.firestore,
    initialValues: state.form.stopForm.values,
    loading: state.async.loading,
  };
};

const StopMedia = (props) => {
  const {
    initialValues,
    saveChanges,
    loading,
    setMainPhoto,
    tourId,
    all_media,
    generalUploadFile,
    generalDeleteFile,
    stop,
  } = props;

  const [photoOpen, setPhotoModal] = useState(false);
  const [videoOpen, setVideoModal] = useState(false);
  const [audioOpen, setAudioModal] = useState(false);
  const [textOpen, setTextModal] = useState(false);
  const [questionOpen, setQuestionModal] = useState(false);

  const handleSetMainFile = async (photo, stop) => {
    try {
      await setMainPhoto(photo, stop);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  const setMediaList = (updatedList) => {
    updatedList.map((item, index) => (item.order = index));
    console.log("updated list", updatedList);
  };

  const deleteFile = async (file) => {
    if (file.type.includes("video")) {
      await generalDeleteFile(file, stop.id, "stopMedia");
    } else if (
      file.type.includes("image") ||
      file.type.includes("audio") ||
      file.type.includes("video")
    ) {
      await generalDeleteFile(file, stop.id, "stopMedia");
    }
    let new_all_media = all_media.filter((media) => media.name !== file.name);
    let update_stop = {
      ...stop,
      all_media: new_all_media,
    };

    saveChanges(update_stop);
  };

  const uploadFile = async (file, fileTitle = "file", poster = {}) => {
    let new_media = await generalUploadFile(
      file,
      stop.id,
      "stop",
      fileTitle,
      poster
    );
    new_media = {
      ...new_media,
      order: all_media ? all_media.length : 0,
    };
    let new_all_media = [...all_media, new_media];
    let update_stop = {
      ...stop,
      all_media: new_all_media,
    };

    saveChanges(update_stop);
  };

  const uploadWithoutFile = (question) => {
    let new_media = {
      ...question,
      order: all_media ? all_media.length : 0,
    };
    let new_all_media = [...all_media, new_media];
    let update_stop = {
      ...stop,
      all_media: new_all_media,
    };

    saveChanges(update_stop);
  };
  

  return (
    <Fragment>
      <button className="addButton" onClick={() => setPhotoModal(true)}>
        + Photo
      </button>
      <button className="addButton" onClick={() => setVideoModal(true)}>
        + Video
      </button>
      <button className="addButton" onClick={() => setAudioModal(true)}>
        + Audio
      </button>
      <button className="addButton" onClick={() => setTextModal(true)}>
        + Text
      </button>
      <button className="addButton" onClick={() => setQuestionModal(true)}>
        + Question
      </button>

      <PhotoComponent
        loading={loading}
        objectId={initialValues.id}
        tourId={tourId}
        all_media={all_media}
        handleSetMainFile={handleSetMainFile}
        handleDeletePhoto={deleteFile}
        open={photoOpen}
        onClose={() => setPhotoModal(false)}
        generalUploadFile={uploadFile}
      />
      <VideoComponent
        open={videoOpen}
        onClose={() => setVideoModal(false)}
        objectId={initialValues.id}
        all_media={all_media}
        collectionName={"stops"}
        tourId={initialValues.tour_owner}
        handleDeleteFile={deleteFile}
        generalUploadFile={uploadFile}
      />

      <AudioComponent
        open={audioOpen}
        onClose={() => setAudioModal(false)}
        objectId={initialValues.id}
        tourId={initialValues.tour_owner}
        all_media={all_media}
        collectionName={"stops"}
        handleDeleteFile={deleteFile}
        generalUploadFile={uploadFile}
      />

      <TextComponent
        open={textOpen}
        onClose={() => setTextModal(false)}
        objectId={initialValues.id}
        tourId={initialValues.tour_owner}
        all_media={all_media}
        collectionName={"stops"}
        handleDeleteFile={deleteFile}
        uploadText={uploadWithoutFile}
      />

      <QuestionComponent
        open={questionOpen}
        onClose={() => setQuestionModal(false)}
        objectId={initialValues.id}
        tourId={initialValues.tour_owner}
        all_media={all_media}
        collectionName={"stops"}
        uploadQuestion={uploadWithoutFile}
      />

      {initialValues.all_media && (
        <MediaList
          listItems={initialValues.all_media}
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
    form: "stopForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  })(StopMedia)
);
