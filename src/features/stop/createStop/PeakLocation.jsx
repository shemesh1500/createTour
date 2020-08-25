import React, { useState, useEffect } from "react";
import { Form, Divider } from "semantic-ui-react";
import placeInput from "../../../app/common/form/placeInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import TextInput from "../../../app/common/form/textInput";
import { combineValidators, isRequired } from "revalidate";
import { createStop, updateStop } from "../stopAction";
import textAreaInput from "../../../app/common/form/textAreaInput";
import DropzoneInput from "../../stop/media/DropzoneInput";
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
      props.change("location", "custom");
    }
  }, [clickLocation]);

  const handleAddressPeak = (values) => {
    console.log("values", values);
  };

  const deleteFile = async (file) => {
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
        initialValues.loc_pics.lenght === 0 ? initialValues.loc_pics.lenght : 0,
    };
    let new_all_media = [...initialValues.loc_pics, new_media];
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
  return (
    <div className="allLocationForm">
      <Form onSubmit={handleSubmit(saveChanges)}>
        <div className="innerLocatioForm">
          <div className="locationInput">
            <div className="inputLocationHeader">Address</div>
            <Field
              component={placeInput}
              className="locationInput"
              onSelect={handleAddress}
              name="location"
              placeholder="Stop location"
            />
          </div>
          <div className="textLocation">
            <div className="inputLocationHeader">Diractions by words</div>
            <Field
              name="diraction_text"
              type="textarea"
              component={textAreaInput}
              placeholder="Diraction in text"
              rows={2}
              className="locationInput"
            />
          </div>
          <div className="photoLocation">
            <div className="inputLocationHeader">Picture of the location</div>
            <button className="addButton" onClick={() => setPhotoModal(true)}>
              {initialValues.loc_pics.lenght === 0
                ? "Add stop picture"
                : "Add more pictures"}
            </button>

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
          <div>
            <Divider horizontal>Or</Divider>
            <div className="locationFooter">
              <div className="cordInput">
                <h4>Latitude</h4>
                <Field
                  component={TextInput}
                  className="cordInput"
                  placeholder="Latitude"
                  name="stop_location.latitude"
                />
              </div>
              <div className="cordInput">
                <h4>Longitude</h4>
                <Field
                  component={TextInput}
                  className="cordInput"
                  placeholder="Longitude"
                  name="stop_location.longitude"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
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
