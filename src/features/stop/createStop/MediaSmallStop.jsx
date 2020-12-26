import React, { Fragment } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { generalDeleteFile, deleteFile } from "../../media/mediaActions";
import { reduxForm } from "redux-form";
import "../../../style/form.css";
import defaultAudio from "../../../images/default-audio.png";
import defaultPic from "../../../images/default-profile.png";
import textAreaInput from "../../../app/common/form/textAreaInput";
import AudioComponent from "../media/AudioComponent";
import PhotoComponent from "../media/PhotoComponent";
import cuid from "cuid";

const actions = {
  generalDeleteFile,
  deleteFile,
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

const MediaSmallStop = (props) => {
  const {
    loading,
    generalDeleteFile,
    initialValues,
    saveChanges,
    all_media,
  } = props;
  const [audioOpen, setAudioOpen] = useState(false);
  const [photoOpen, setPhotoOpen] = useState(false);

  let stopAud = all_media
    ? all_media.filter((media) => media.type.includes("audio"))[0]
    : {};
  let stopPic = all_media
    ? all_media.filter((media) => media.type.includes("image"))[0]
    : {};
  let stopText = all_media
    ? all_media.filter((media) => media.type.includes("text"))[0]
    : {};

  const handleDeleteFile = async (file) => {
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

  const [text, setText] = useState(stopText ? stopText.context : "");
  const handleText = (event) => {
    setText(event.target.value);
  };

  const saveText = () => {
    let newText = {
      type: "text",
      name: cuid(),
      content: text,
    };
    let filterText = all_media.filter((media) => media.type !== "text");
    let update_stop = {
      ...initialValues,
      all_media: [...filterText, newText],
    };

    saveChanges(update_stop);
  };

  return (
    <Fragment>
      <div className="profilePicture">
        <div className="profileHeader">Notification text:</div>
        <div className="profileImgObj">
          <textarea
            rows="6"
            cols="33"
            name="notificationText"
            type="textarea"
            component={textAreaInput}
            placeholder={
              stopText
                ? stopText.content
                : "Here you write the text that display to the user at this location"
            }
            onChange={(e) => handleText(e)}
          />
          <button className="addButton" onClick={() => saveText()}>
            Save text
          </button>
        </div>
      </div>
      <hr />
      <div className="profileHeader">Add audio OR Add picture:</div>
      <div className="combineMedia">
        <div>
          {stopAud && stopAud.url ? (
            <div className="profileImgObj">
              <audio
                preload="auto"
                id="id12"
                controls="controls"
                onended="func12();"
                src={stopAud.url}
              ></audio>
              <button
                className="profileSave"
                onClick={() => handleDeleteFile(stopAud)}
              >
                Change Record
              </button>
            </div>
          ) : (
            <div
              className="profileImgObj"
              disabled={stopPic && stopPic.url ? true : false}
            >
              <img className="profileImg" src={defaultAudio} alt='profileAudio'/>
              <button className="addButton" onClick={() => setAudioOpen(true)}>
                + Record
              </button>
            </div>
          )}
        </div>
        <div class="vertical"></div>
        <div>
          {stopPic && stopPic.url ? (
            <div className="profileImgObj">
              <img className="profileImg" src={stopPic.url} alt='profileImg'/>

              <button
                className="profileSave"
                onClick={() => handleDeleteFile(stopPic)}
              >
                Change Media
              </button>
            </div>
          ) : (
            <div
              className="profileImgObj"
              disabled={stopAud && stopAud.url ? true : false}
            >
              <img className="profileImg" src={defaultPic} alt='default profile pic'/>
              <button className="addButton" onClick={() => setPhotoOpen(true)}>
                + Photo
              </button>
            </div>
          )}
        </div>
      </div>

      <AudioComponent
        open={audioOpen}
        onClose={() => setAudioOpen(false)}
        objectId={initialValues.id}
        tourId={initialValues.tour_owner}
        all_media={all_media}
        collectionName={"stops"}
        handleDeleteFile={handleDeleteFile}
        generalUploadFile={props.uploadFile}
      />
      <PhotoComponent
        loading={loading}
        objectId={initialValues.id}
        all_media={all_media}
        handleDeletePhoto={handleDeleteFile}
        open={photoOpen}
        onClose={() => setPhotoOpen(false)}
        generalUploadFile={props.uploadFile}
      />
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
  })(MediaSmallStop)
);
