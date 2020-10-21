/*global google*/
import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Button, Form, Header } from "semantic-ui-react";
import { createTour, updateTour, cancelToggle } from "../tourAction";
import TextInput from "../../../app/common/form/textInput";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import SelectInput from "../../../app/common/form/selectInput";
import { withFirestore } from "react-redux-firebase";
import "../../../style/form.css";
import "react-input-range/lib/css/index.css";
import placeInput from "../../../app/common/form/placeInput";

const actions = {
  createTour,
  updateTour,
  cancelToggle,
};

const mapState = (state) => {
  let formValues = {};
  if (state.form.tourForm) {
    formValues = state.form.tourForm.values;
  }
  return {
    initialValues: formValues,
  };
};

const validate = combineValidators({
  title: isRequired({ message: 'The tour "Title" is required' }),
  language: isRequired({ message: 'The tour "Language" is required' }),
  main_sentense: isRequired({
    message: 'The tour "Main sentence" is required',
  }),
  description: composeValidators(
    isRequired({ message: 'The tour "Description" is required' }),
    hasLengthGreaterThan(5)({
      message: "Description must have at least 5 chars",
    })
  )(),
  Address: isRequired("Starting point tour"),
  rec_start_h: isRequired("Starting hour"),
  rec_end_h: isRequired("Until hour"),
  city: isRequired({ message: 'The tour "City" is required' }),
  street: isRequired("Street"),
  house_number: isRequired("House number"),
});

const audience = [
  { key: "Singles", text: "Singles", value: "Singles" },
  { key: "Couples", text: "Couples", value: "Couples" },
  { key: "Kids friendly", text: "Kids friendly", value: "Kids friendly" },
  { key: "Above 18", text: "Above 18", value: "Above 18" },
  { key: "Pet friendly", text: "Pet friendly", value: "Pet friendly" },
];
const language = [
  { key: "English", text: "English", value: "English" },
  { key: "Hebrew", text: "Hebrew", value: "Hebrew" },
  { key: "Spanish", text: "Spanish", value: "Spanish" },
];

const TourFirstForm = (props) => {
  const [difficulty, setDifficulty] = useState(
    props.initialValues.difficulty
      ? props.initialValues.difficulty
      : { min: 1, max: 9 }
  );
  const [hours, setHours] = useState(
    props.initialValues.hours_range
      ? props.initialValues.hours_range
      : { min: 21600, max: 64800 }
  );

  const formatLabel = (secs) => {
    if (secs === 86400) secs = 86360;
    var minutes = Math.floor(secs / 60);
    var hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    /*
    var amPm = hours > 11 ? "PM" : "AM";
    if (secs < 3600) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
    }
    return `${hours}:${("0" + minutes).slice(-2)} ${amPm}`;
    */
    return `${hours}:${("0" + minutes).slice(-2)}`;
  };

  const handleAddress = (address) => {
    props.change("location", address);
  };

  const { invalid, submitting, initialValues, cancelToggle } = props;
  return (
    <div className="allForm">
      <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
        <div className="formOne">
          <Header size="small" content="Tour name" />
          <Field name="title" component={TextInput} placeholder="Tour name" />
        </div>
        <div className="formOne">
          <Header size="small" content="General location" />
          <Field
            component={placeInput}
            className="locationInput"
            onSelect={handleAddress}
            name="location"
            placeholder="General location"
            options={{ types: ["(cities)"] }}
          />
        </div>
        <div className="formOne">
          <Header size="small" content="Language" />
          <Field
            name="language"
            component={SelectInput}
            options={language}
            value="language.text"
            multiple={false}
            placeholder="Language"
          />
        </div>

        <button
          className="saveFormButton"
          disabled={invalid || submitting}
          type="submit"
        >
          Save & Continue
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
      form: "tourForm",
      validate,
      enableReinitialize: true,
      destroyOnUnmount: false,
      forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    })(TourFirstForm)
  )
);
