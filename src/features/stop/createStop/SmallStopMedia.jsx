import React, { Fragment, useState } from "react";
import { Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PhotoComponent from "../media/PhotoComponent";
import AudioComponent from "../media/AudioComponent";
import { setMainPhoto } from "../../tour/tourAction";
import { toastr } from "react-redux-toastr";
import TextComponent from "../media/TextComponent";
import {
  deleteStopFile,
  deleteStopText,
  removeQuestion,
  generalDeleteFile,
} from "../../media/mediaActions";

//import MediaList from './media/MediaList';

const actions = {
  deleteStopFile,
  setMainPhoto,
  deleteStopText,
  removeQuestion,
  generalDeleteFile,
};

const mapState = (state, props) => {
  let stop = {};
  if (props.initialValues) {
    stop = props.initialValues;
  }

  const all_media = stop ? stop.all_media : [];
  return {
    all_media: all_media,
    initialValues: props.initialValues,
    loading: state.async.loading,
  };
};

const SmallStopMedia = (props) => {
  const {
    initialValues,
    saveChanges,
    loading,
    deleteStopFile,
    setMainPhoto,
    tourId,
    all_media,
    generalDeleteFile,
  } = props;

  const [photoOpen, setPhotoModal] = useState(false);
  const [audioOpen, setAudioModal] = useState(false);
  const [textOpen, setTextModal] = useState(false);
  //let all_media = initialValues.all_media ? initialValues.all_media : []

  const handleDeleteFile = async (file) => {
    try {
      await deleteStopFile(file, initialValues, "stops", tourId);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  const handleSetMainFile = async (photo, stop) => {
    try {
      await setMainPhoto(photo, stop);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  const tagByType = (item) => {
    console.log("medis is", item);
    if (item.type.includes("image")) {
      return (
        <Image src={item.url} style={{ height: "250px", width: "250px" }} />
      );
    } else if (item.type.includes("audio")) {
      return (
        <audio
          preload="auto"
          id="id12"
          controls="controls"
          onended="func12();"
          src={item.url}
        ></audio>
      );
    } else if (item.type.includes("video")) {
      return (
        <video poster={item.poster_url} width="180" hight="120" controls>
          <source src={item.url} type={item.type} />
        </video>
      );
    } else if (item.type.includes("text")) {
      console.log("text item", item);
      return <div>{item.content}</div>;
    }
  };

  const deleteFile = async (file) => {
    if (
      file.type.includes("image") ||
      file.type.includes("audio") ||
      file.type.includes("video")
    ) {
      await generalDeleteFile(file, initialValues.id, "stopMedia");
    }
    let new_all_media = all_media.filter((media) => media.name !== file.name);
    let update_stop = {
      ...initialValues,
      all_media: new_all_media,
    };

    saveChanges(update_stop);
  };

  return (
    <Fragment>
      {initialValues.all_media.length === 0 && (
        <div>
          <button className="addButton" onClick={() => setPhotoModal(true)}>
            + Photo
          </button>
          <button className="addButton" onClick={() => setAudioModal(true)}>
            + Audio
          </button>
          <button className="addButton" onClick={() => setTextModal(true)}>
            + Text
          </button>
        </div>
      )}
      {initialValues.all_media.length === 1 &&
        initialValues.all_media[0].type.includes("audio") && (
          <button className="addButton" onClick={() => setTextModal(true)}>
            + Text
          </button>
        )}
      {initialValues.all_media.length === 1 &&
        initialValues.all_media[0].type.includes("text") && (
          <button className="addButton" onClick={() => setAudioModal(true)}>
            + Audio
          </button>
        )}
      <PhotoComponent
        loading={loading}
        objectId={initialValues.id}
        tourId={tourId}
        all_media={all_media}
        handleSetMainFile={handleSetMainFile}
        handleDeletePhoto={handleDeleteFile}
        open={photoOpen}
        onClose={() => setPhotoModal(false)}
        generalUploadFile={props.uploadFile}
      />

      <AudioComponent
        open={audioOpen}
        onClose={() => setAudioModal(false)}
        objectId={initialValues.id}
        tourId={initialValues.tour_owner}
        all_media={all_media}
        collectionName={"stops"}
        handleDeleteFile={handleDeleteFile}
        generalUploadFile={props.uploadFile}
      />

      <TextComponent
        open={textOpen}
        onClose={() => setTextModal(false)}
        objectId={initialValues.id}
        tourId={initialValues.tour_owner}
        all_media={all_media}
        collectionName={"stops"}
        handleDeleteFile={handleDeleteFile}
        uploadText={props.uploadWithoutFile}
      />

      {initialValues.all_media &&
        initialValues.all_media.map((media) => tagByType(media))}
      {initialValues.all_media && initialValues.all_media[0] && (
        <div>
          <button
            className="saveButton"
            onClick={() =>
              initialValues.all_media.map((media) => deleteFile(media))
            }
          >
            Change context
          </button>
        </div>
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
    form: "smallStopForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  })(SmallStopMedia)
);
