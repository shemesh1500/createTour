import React, { useState, useEffect, Fragment } from "react";
import {
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Image,
  Modal,
  Progress,
} from "semantic-ui-react";
import DropzoneInput from "./DropzoneInput";
import { setMainPhoto } from "../../tourAction";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { uploadVideo } from "../../../media/mediaActions";

const actions = {
  setMainPhoto,
  uploadVideo,
};

const mapState = (state) => ({
  //initialValiues: state.form.stopForm.values, 
  loading: state.async.loading,
  complete_precent: state.async.complete_precent,
  //stop: state.firestore.ordered[0],
  //all_media: state.form.stopForm.values.all_media
});

const VideoComponenet = (props) => {
  const {
    uploadVideo,
    setMainPhoto,
    loading,
    all_media,
    open,
    onClose,
    objectId,
    collectionName,
    handleDeleteFile,
    profileVideo,
  } = props;
  const [files, setFiles] = useState([]);
  const [poster, setPoster] = useState(null);

  let all_video = all_media
    ? all_media.filter((media) => media.type.includes("video"))
    : [];

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleUploadVideo = async () => {
    try {
      console.log("handleUploadVideo", `${objectId}/${collectionName}Media/`);
      /* const new_media =  */await uploadVideo(
        files[0].file,
        `${objectId}/${collectionName}Media/`,
        objectId,
        all_media,
        poster[0].file,
        collectionName,
        profileVideo
      );
      all_video = all_media.filter((media) => media.type.includes("video"));

      handleCancleCrop();
      toastr.success("Success", "Photo has been uploaded");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Somethingwent wrong");
    }
  };

  const handleCancleCrop = () => {
    setFiles([]);
    setPoster(null);
  };

  const handleSetMainPhoto = async (photo, stop) => {
    try {
      await setMainPhoto(photo, stop);
    } catch (error) {
      toastr.error("Oops", error.message);
    }
  };

  return (
    <Modal size="large" open={open} onClose={onClose}>
      <Modal.Header>Video Zone</Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Video" />
            <DropzoneInput setFiles={setFiles} acceptedFile="video/*" />
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={6}>
            <Header sub color="teal" content="Step 2 - Preview video" />
            {files.length > 0 && (
              <video width="320" height="240" controls>
                <source src={files[0].preview} type={files[0].type} />
              </video>
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header
              sub
              color="teal"
              content="Step 3 - Upload a poster picture for the video"
            />
            {files.length > 0 && (
              <Fragment >
                {poster && poster.length > 0 ? (
                  <Fragment>
                    <Image src={poster[0].preview} />
                    <Button.Group>
                      <Button
                        loading={loading}
                        onClick={() => handleUploadVideo()}
                        style={{ width: "100px" }}
                        positive
                        icon="check"
                      />
                      <Button
                        disabled={loading}
                        onClick={handleCancleCrop}
                        style={{ width: "100px" }}
                        icon="close"
                      />
                    </Button.Group>
                    {props.complete_precent > 0 && (
                      <Progress percent={props.complete_precent} progress />
                    )}
                  </Fragment>
                ) : (
                  <DropzoneInput setFiles={setPoster} acceptedFile="image/*" />
                )}
              </Fragment>
            )}
          </Grid.Column>
        </Grid>
        <Divider />
        <Card.Group itemsPerRow={5}>
          {!profileVideo &&
            all_video &&
            all_video.map((video, index) => (
              <Fragment>
                <Card key={index}>
                  <video
                    poster={video.poster_url}
                    width="260"
                    hight="180"
                    controls
                  >
                    <source src={video.url} type={video.type} />
                  </video>
                  <div className="ui two buttons">
                    <Button
                      onClick={() => handleSetMainPhoto(video)}
                      basic
                      color="green"
                    >
                      Main
                    </Button>
                    <Button
                      onClick={() => handleDeleteFile(video)}
                      basic
                      icon="trash"
                      color="red"
                    />
                  </div>
                </Card>
              </Fragment>
            ))}
        </Card.Group>
      </Modal.Content>
    </Modal>
  );
};

export default connect(
  mapState,
  actions
)(
  /*(reduxForm({
        form: 'stopForm',
        enableReinitialize: true,
        destroyOnUnmount: false,
        forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    })*/ VideoComponenet
);
