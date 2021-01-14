import React, { useState, useEffect } from "react";
import { Form, Divider, Card, Image } from "semantic-ui-react";
import placeInput from "../../../app/common/form/placeInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Field, initialize, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextInput from "../../../app/common/form/textInput";
import { combineValidators, isRequired } from "revalidate";
import { createStop, updateStop } from "../stopAction";
import textAreaInput from "../../../app/common/form/textAreaInput";
import { generalUploadFile, generalDeleteFile } from "../../media/mediaActions";
import PhotoComponent from "../media/PhotoComponent";
//import '../../../style/stopCreation.css'

const actions = {
  createStop,
  updateStop,
  generalUploadFile,
  generalDeleteFile,
};

const mapState = (state) => {
  let initVal = {};
  if (state.form.stopForm) {
    initVal = state.form.stopForm.values;
  }

  return {
    initialValues: initVal,
    loading: state.async.loading,
    //values: getFormValues('stopForm')(state)
  };
};

const validate = combineValidators({
  stop_location: isRequired({ message: "Specific location is required" }),
});

const PeakLocation = (props) => {
  //get the current location of the user
  const [stopLocation, setLocation] = useState({});
  const {
    createStop,
    updateStop,
    saveChanges,
    handleSubmit,
    setMarker,
    setCenter,
    setRouteStatus,
    clickLocation,
    setClickLocation,
    loading,
    initialValues,
    generalUploadFile,
    generalDeleteFile,
  } = props;

  const [photoOpen, setPhotoModal] = useState(false);
  const [origLocation, setOrigLocation] = useState(
    initialValues.stop_location
      ? initialValues.stop_location.latitude
        ? initialValues.stop_location
        : undefined
      : { latitude: 0, longitude: 0 }
  );
  const [files, setFiles] = useState([]);
  useEffect(() => {
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const handleAddress = (address) => {
    geocodeByAddress(address).then((result) =>
      getLatLng(result[0]).then((latlng) => {
        setLocation(latlng);
        let stop_location = { latitude: latlng.lat, longitude: latlng.lng };
        props.change(
          "stop_location",
          stop_location,
          setMarker(latlng),
          setCenter(latlng),
          setClickLocation(null)
        );
      })
    );
  };

  useEffect(() => {
    if (clickLocation) {
      const newLocation = {
        latitude: clickLocation.lat,
        longitude: clickLocation.lng,
      };
      props.change("stop_location", newLocation);
      props.change("location", "");
    }
  }, [clickLocation]);

  const handleAddressPeak = (values) => {
    console.log("values", values);
  };

  const deleteFile = async (file) => {
    console.log("delete file", file);
    if (
      file.type.includes("image") ||
      file.type.includes("audio") ||
      file.type.includes("video")
    ) {
      await generalDeleteFile(file, initialValues.id, "stopMedia");
    }
    let new_all_media = initialValues.loc_pics.filter(
      (media) => media.name !== file.name
    );
    let update_stop = {
      ...initialValues,
      loc_pics: new_all_media,
    };

    saveChanges(update_stop);
  };

  const uploadFile = async (file) => {
    let new_id = null;
    if (!initialValues.id) {
      new_id = await saveChanges(initialValues);
    }

    let new_media = await generalUploadFile(
      file,
      new_id ? new_id : initialValues.id,
      "stop"
    );
    new_media = {
      ...new_media,
      order:
        initialValues.loc_pics && initialValues.loc_pics.lenght
          ? initialValues.loc_pics.lenght
          : 0,
    };
    let new_all_media = initialValues.loc_pics
      ? [...initialValues.loc_pics, new_media]
      : [new_media];

    let update_stop = {
      ...initialValues,
      loc_pics: new_all_media,
    };
    saveChanges(update_stop);
  };

  const onSaveClick = async (values) => {
    try {
      if (props.initialValues.id) {
        await updateStop(values);
      } else {
        await createStop(values);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancleManual = () => {
    console.log("calncle peak", clickLocation);
    props.change("stop_location", origLocation);
    setClickLocation(null);

    console.log("calncle peak", clickLocation);
  };
  console.log("loc_pics", initialValues.loc_pics);
  return (
    <div className="allLocationForm">
      <Form onSubmit={handleSubmit(saveChanges)}>
        <div className="innerLocatioForm">
          <div className="locationInput">
            {clickLocation === null ? (
              <div>
                <div className="inputLocationHeader">Address</div>
                <Field
                  component={placeInput}
                  className="locationInput"
                  onSelect={handleAddress}
                  name="location"
                  placeholder="Stop location"
                />
              </div>
            ) : (
              <div>
                <div className="inputLocationHeader">Address</div>
                <Field
                  component={TextInput}
                  className="locationInput"
                  placeholder="Stop location"
                  name="location"
                />
              </div>
            )}
          </div>
          <div className="latLngArea">
            <div className="locationFooter">
              <div className="cordInput">
                <h4>Latitude</h4>
                <Field
                  component={TextInput}
                  className="cordInput"
                  placeholder="Latitude"
                  name="stop_location.latitude"
                  type="number"
                />
              </div>
              <div className="cordInput">
                <h4>Longitude</h4>
                <Field
                  component={TextInput}
                  className="cordInput"
                  placeholder="Longitude"
                  name="stop_location.longitude"
                  type="number"
                />
              </div>
            </div>
            {clickLocation && (
              <div className="locationButtons">
                <button
                  className="saveLocationButton"
                  disabled={props.invalid}
                  positive
                  type="submit"
                >
                  Update location
                </button>
                <button
                  className="cancleLocationButton"
                  disabled={props.invalid}
                  positive
                  onClick={() => cancleManual()}
                >
                  Cancle manual peak
                </button>
              </div>
            )}
          </div>
          <hr />
          <div className="diractionArea">
            <div className="photoLocation">
              <div className="inputLocationHeader">Picture of the location</div>
              <div className="locPicArea">
                <div>
                  <Card.Group itemsPerRow={4}>
                    {initialValues.loc_pics &&
                      initialValues.loc_pics.length > 0 &&
                      initialValues.loc_pics.map((photo) => (
                        <Card key={photo.name}>
                          <Image src={photo.url} />
                        </Card>
                      ))}
                  </Card.Group>
                </div>
                {initialValues.loc_pics &&
                initialValues.loc_pics.length === 0 ? (
                  <button
                    className="addButton"
                    onClick={() => setPhotoModal(true)}
                  >
                    {" "}
                    Add a picture
                  </button>
                ) : (
                  <button
                    className="addButton"
                    onClick={() =>
                      window.confirm("Do you want to remove location picture?")
                        ? deleteFile(initialValues.loc_pics[0])
                        : null
                    }
                  >
                    {" "}
                    Remove picture
                  </button>
                )}
                {/*  <button
                  className="addButton"
                  onClick={() => setPhotoModal(true)}
                >
                  {initialValues.loc_pics && initialValues.loc_pics.length === 0
                    ? "Add stop picture"
                    : "Add more pictures"}
                </button> */}

                <PhotoComponent
                  loading={loading}
                  objectId={initialValues.id}
                  all_media={initialValues.loc_pics}
                  //handleSetMainFile={handleSetMainFile}
                  handleDeletePhoto={deleteFile}
                  open={photoOpen}
                  onClose={() => setPhotoModal(false)}
                  generalUploadFile={uploadFile}
                />
              </div>
            </div>
            <div className="textLocation">
              <div className="inputLocationHeader">Diractions by words</div>
              <Field
                name="diraction_text"
                type="textarea"
                component={textAreaInput}
                placeholder="Diraction in text"
                rows={1}
                className="locationInput"
              />
            </div>
          </div>
        </div>
        <div className="saveNcancleButton">
          <button
            className="saveButton"
            onClick={() => setRouteStatus("Stops List")}
          >
            Cancel
          </button>
          <button
            className="saveButton"
            disabled={props.invalid}
            positive
            type="submit"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default connect(
  mapState,
  actions
)(
  reduxForm({
    form: "stopForm",
    validate,
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  })(PeakLocation)
);
