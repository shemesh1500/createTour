import React, { useState } from "react";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Form } from "semantic-ui-react";
import placeInput from "../../../app/common/form/placeInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import TextInput from "../../../app/common/form/textInput";
import textAreaInput from "../../../app/common/form/textAreaInput";
import PhotoComponent from "../../stop/media/PhotoComponent";
import { generalUploadFile } from "../../media/mediaActions";

const actions = {
  generalUploadFile,
};

const mapState = (state) => {
  let formValues = {};

  if (state.form.businessForm) {
    formValues = state.form.businessForm.values;
  }
  return {
    initialValues: formValues,
    loading: state.async.loading,
  };
};
const PeakLocation = (props) => {
  const {
    invalid,
    submitting,
    loading,
    initialValues,
    onFormSubmit,
    generalUploadFile,
  } = props;
  const [photoOpen, setPhotoModal] = useState(false);
  let loc_pics = initialValues.loc_pics ? initialValues.loc_pics : [];

  const handleAddress = (address) => {
    geocodeByAddress(address).then((result) =>
      getLatLng(result[0]).then((latlng) => {
        let location = { longitude: latlng.lng, latitude: latlng.lat };
        props.change("stop_location", location);
      })
    );
  };

  const deleteFile = () => {};
  const uploadFile = async (file) => {
    if (!initialValues.id) {
      onFormSubmit(initialValues);
    }

    let new_media = await generalUploadFile(file, initialValues.id, "business");
    new_media = {
      ...new_media,
      order: initialValues.loc_pics ? initialValues.loc_pics.lenght : 0,
    };
    let new_all_media = initialValues.loc_pics
      ? [...initialValues.loc_pics, new_media]
      : [new_media];
    let update_stop = {
      ...initialValues,
      loc_pics: new_all_media,
    };

    onFormSubmit(update_stop);
  };

  return (
    <div className="allLocationForm">
      <Form onSubmit={props.handleSubmit(onFormSubmit)}>
        <div className="innerLocatioForm">
          <div className="peakLocationArea">
            <div className="peakLocationInput">
              <div className="inputLocationHeader">Address</div>
              <Field
                component={placeInput}
                className="locationInput"
                onSelect={handleAddress}
                name="location"
                placeholder="Business location"
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
              rows={2}
              className="locationInput"
            />
          </div>
          <div className="photoLocation">
            <div className="inputLocationHeader">Picture of the location</div>
            <button
              className="addLocPicButton"
              onClick={() => setPhotoModal(true)}
            >
              + Add pictures to be more precise
            </button>
            <PhotoComponent
              loading={loading}
              objectId={initialValues.id}
              all_media={loc_pics}
              //handleSetMainFile={handleSetMainFile}
              handleDeletePhoto={deleteFile}
              open={photoOpen}
              onClose={() => setPhotoModal(false)}
              generalUploadFile={uploadFile}
            />
          </div>

          <div>
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
        <button
          className="saveBusinessButton"
          disabled={invalid || submitting}
          positive
          type="submit"
        >
          save & continue
        </button>
      </Form>
    </div>
  );
};

export default withFirestore(
  connect(
    mapState,
    actions
  )(
    reduxForm({
      form: "businessForm",
      //validate,
      enableReinitialize: true,
      destroyOnUnmount: false,
      forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    })(PeakLocation)
  )
);
