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
  { key: "full battery", text: "full battery", value: "full battery" },
  {
    key: "Comfortable shoes",
    text: "Comfortable shoes",
    value: "Comfortable shoes",
  },
  { key: "Towel", text: "Towel", value: "Towel" },
  { key: "Swimsuit", text: "Swimsuit", value: "Swimsuit" },
  { key: "Water", text: "Water", value: "Water" },
  { key: "Modest clothes", text: "Modest clothes", value: "Modest clothes" },
  { key: "Warm clothing", text: "Warm clothing", value: "Warm clothing" },
];

const tourType = [
  { key: "Culinary", text: "Culinary", value: "Culinary" },
  { key: "Religion", text: "Religion", value: "Religion" },
  { key: "Historic", text: "Historic", value: "Historic" },
  { key: "Artistic", text: "Artistic", value: "Artistic" },
  { key: "Nightlife", text: "Nightlife", value: "Nightlife" },
  { key: "Classic", text: "Classic", value: "Classic" },
  { key: "Culture", text: "Culture", value: "Culture" },
  { key: "Special event", text: "Special event", value: "Special event" },
];

const difficulty = [
  {
    key: "Everyone can do it",
    text: "Everyone can do it",
    value: "Everyone can do it",
  },
  {
    key: "There is some walking and stairs",
    text: "There is some walking and stairs",
    value: "There is some walking and stairs",
  },
  {
    key: "It's not that easy",
    text: "It's not that easy",
    value: "It's not that easy",
  },
  {
    key: "You need to be a little fit",
    text: "You need to be a little fit",
    value: "You need to be a little fit",
  },
  {
    key: "For adventure tourist",
    text: "For adventure tourist",
    value: "For adventure tourist",
  },
];

const TourForm = (props) => {
  /*   const [difficulty, setDifficulty] = useState(
    props.initialValues.difficulty
      ? props.initialValues.difficulty
      : { min: 1, max: 9 }
  ); */
  const [hours, setHours] = useState(
    props.initialValues.hours_range
      ? props.initialValues.hours_range
      : { min: 21600, max: 79200 }
  );

  const [duration, setDuration] = useState(
    props.initialValues.duration &&
      props.initialValues.duration < 24 &&
      props.initialValues.duration > 0
      ? props.initialValues.duration
      : 3
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
          {/* <InputRange
            name="difficulty"
            maxValue={10}
            minValue={0}
            value={difficulty}
            draggableTrack
            onChange={(value) => (
              setDifficulty(value), props.change("difficulty", value)
            )}
          /> */}
          <Field
            name="difficulty"
            component={SelectInput}
            options={difficulty}
            value="difficulty.text"
            multiple={false}
            placeholder="tell us about the difficulty of tour"
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
          <Header size="small" content="Duration " />
          <InputRange
            name="duration"
            maxValue={24}
            minValue={0}
            value={duration}
            draggableTrack
            step={0.5}
            onChange={(value) => (
              setDuration(value), props.change("duration", value)
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
          <Header size="small" content="Tour description" />
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
