import React, { Fragment, useEffect, useState } from "react";
import {
  Header,
  Grid,
  Button,
  Divider,
  Card,
  Image,
  Modal,
  Form,
} from "semantic-ui-react";
import DropzoneInput from "../../stop/media/DropzoneInput";
import CropperInput from "../../stop/media/CropperInput";
//import { uploadStopFile } from "../../media/mediaActions";
import { setMainPhoto } from "../../tour/tourAction";
import { toastr } from "react-redux-toastr";
import { connect } from "react-redux";
import squarePic from "../../../images/square.png";
import verticalPic from "../../../images/vertical.png";
import horizontalPic from "../../../images/horizontal.png";

const actions = {
  setMainPhoto,
  //uploadStopFile,
};

const PhotoComponent = (props) => {
  const {
    setMainPhoto,
    loading,
    handleDeletePhoto,
    open,
    onClose,
    objectId,
    all_media,

    generalUploadFile,
  } = props;

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState();
  const [aspectRation, setAspectRation] = useState(0.65);
  const [cropState, setCropState] = useState("square");

  let all_picture = all_media
    ? all_media.filter((media) => media.type.includes("image"))
    : [];

  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);
  useEffect(() => {
    if (cropState.includes("square")) {
      setAspectRation(1);
    } else if (cropState.includes("vertical")) {
      setAspectRation(0.65);
    } else if (cropState.includes("horizontal")) {
      setAspectRation(1.35);
    }
  }, [cropState]);

  /* const handleUploadImageOld = async () => {
    try {
      console.log("handle stop", all_media, objectId, tourId);
      await uploadStopFile(
        image,
        `${objectId}/stopMedia/`,
        objectId,
        all_media,
        "stops",
        tourId
      );
      all_picture = all_media.filter((media) => media.type.includes("image"));
      handleCancleCrop();
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Something went wrong");
    }
  };
 */
  const handleUploadImage = () => {
    generalUploadFile(image, title);
  };

  const [title, setTitle] = useState("");
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleCancleCrop = () => {
    setFiles([]);
    setImage(null);
    setTitle("");
  };

  let style = {
    width: "50px",
    height: "50px",
    margin: "7px",
  };
  return (
    <Modal size="large" open={open} onClose={onClose}>
      <Modal.Header>Your Photos</Modal.Header>
      <Modal.Content>
        <Grid>
          <Grid.Row />
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <DropzoneInput setFiles={setFiles} acceptedFile="image/*" />
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {files.length > 0 && (
              <Fragment>
                <CropperInput
                  setImage={setImage}
                  imagePreview={files[0].preview}
                  aspectRation={aspectRation}
                />
                <div className="selectCropState">
                  <button>
                    <img
                      src={squarePic}
                      alt="square"
                      onClick={() => setCropState("square")}
                      style={style}
                    />
                  </button>
                  <button>
                    <img
                      src={horizontalPic}
                      alt="horizontal"
                      onClick={() => setCropState("horizontal")}
                      style={style}
                    />
                  </button>
                  <button>
                    <img
                      src={verticalPic}
                      alt="vertical"
                      onClick={() => setCropState("vertical")}
                      style={style}
                    />
                  </button>
                </div>
              </Fragment>
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview" />
            {files.length > 0 && (
              <Fragment>
                <div
                  className="img-preview"
                  style={{ minWidth: 200, minHeight: 200, overflow: "hidden" }}
                />
              </Fragment>
            )}
          </Grid.Column>
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 4 - Set title & Upload" />
            {files.length > 0 && (
              <Fragment>
                <input
                  placeholder="Photo title"
                  onChange={(e) => handleTitle(e)}
                  type="text"
                  style={{
                    width: "200px",
                    height: "30px",
                    marginBottom: "8px",
                  }}
                />
                <Button.Group>
                  <Button
                    loading={loading}
                    onClick={() => handleUploadImage()}
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
              </Fragment>
            )}
          </Grid.Column>
        </Grid>
        <Divider />
        <Card.Group itemsPerRow={5}>
          {all_picture &&
            all_picture.map((photo) => (
              <Card key={photo.name}>
                <Image src={photo.url} />
                <div className="ui two buttons">
                  <Button
                    onClick={() => setMainPhoto(photo)}
                    basic
                    color="green"
                  >
                    Main
                  </Button>
                  <Button
                    onClick={() => handleDeletePhoto(photo)}
                    basic
                    icon="trash"
                    color="red"
                  />
                </div>
              </Card>
            ))}
        </Card.Group>
      </Modal.Content>
    </Modal>
  );
};

export default connect(null, actions)(PhotoComponent);
