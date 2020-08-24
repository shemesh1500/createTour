/*global google*/
import React, { useState } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Button, Form, Header } from "semantic-ui-react";
import { createTour, updateTour, cancelToggle } from "../tourAction";
import TextInput from "../../../app/common/form/textInput";
import TextAreaInput from "../../../app/common/form/textAreaInput";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
} from "revalidate";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import SelectInput from "../../../app/common/form/selectInput";
import { withFirestore } from "react-redux-firebase";
import InputRange from "react-input-range";
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
const equipment = [
  { key: "Water", text: "Water", value: "Water" },
  { key: "Towel", text: "Towel", value: "Towel" },
  { key: "Warm clothing", text: "Warm clothing", value: "Warm clothing" },
];

const tourType = [
  { key: "Culinary", text: "Culinary", value: "Culinary" },
  { key: "Religen", text: "Religen", value: "Religen" },
  { key: "Historic", text: "Historic", value: "Historic" },
  { key: "Artistic", text: "Artistic", value: "Artistic" },
  { key: "Nightlife", text: "Nightlife", value: "Nightlife" },
  { key: "Classic", text: "Classic", value: "Classic" },
  { key: "Culture", text: "Culture", value: "Culture" },
  { key: "Special event", text: "Special event", value: "Special event" },
];

const TourForm = (props) => {
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
          <Header size="small" content="Price " />
          <Field
            name="price"
            type="number"
            component={TextInput}
            placeholder="Price"
          />
        </div>

        <div className="formOne">
          <Header size="small" content="Difficulty meter" />
          <InputRange
            name="difficulty"
            maxValue={10}
            minValue={0}
            value={difficulty}
            draggableTrack
            onChange={(value) => (
              setDifficulty(value), props.change("difficulty", value)
            )}
          />
        </div>
        <div className="formOne">
          <Header size="small" content="Hours range" />
          <InputRange
            name="hours_range"
            maxValue={86400}
            minValue={0}
            value={hours}
            draggableTrack
            step={1800}
            formatLabel={(value) => formatLabel(value)}
            onChange={(value) => (
              setHours(value), props.change("hours_range", value)
            )}
          />
        </div>

        <div className="formOne">
          <Header size="small" content="Recommened audience" />
          <Field
            name="audience"
            component={SelectInput}
            options={audience}
            value="audience.text"
            multiple={true}
            placeholder="Recommened audience"
          />
        </div>
        <div className="formOne">
          <Header size="small" content="Equipment list" />
          <Field
            name="equipment"
            component={SelectInput}
            options={equipment}
            value="equipment.text"
            multiple={true}
            placeholder="Equipment list"
          />
        </div>

        <div className="formOne">
          <Header size="small" content="Tour type" />
          <Field
            name="type"
            component={SelectInput}
            options={tourType}
            value="tourType.text"
            multiple={true}
            placeholder="Tour type"
          />
        </div>

        <div className="formOne">
          <Header size="small" content="Main sentense" />
          <Field
            name="main_sentense"
            component={TextInput}
            placeholder="Kicking sentence about your tour"
          />
        </div>

        <div className="formOne">
          <Header size="small" content="Full description" />
          <Field
            name="description"
            type="textarea"
            component={TextAreaInput}
            placeholder="Tell us more, what to expect? Min of 25 words"
            rows={3}
          />
        </div>

        <div className="formOne">
          <Header size="small" content="Specific notes" />
          <Field
            name="notes"
            type="textarea"
            component={TextAreaInput}
            placeholder="Important notes for your touries about the tour"
            rows={3}
          />
        </div>

        <button
          className="saveFormButton"
          disabled={invalid || submitting}
          positive
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
    })(TourForm)
  )
);
