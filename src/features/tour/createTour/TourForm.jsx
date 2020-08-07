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
  const [age, setAge] = useState(
    props.initialValues.age_range
      ? props.initialValues.age_range
      : { min: 18, max: 60 }
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
          <Header size="small" content="Price " />
          <Field
            name="price"
            type="number"
            component={TextInput}
            placeholder="Price"
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

        <div className="formOne">
          <Header size="small" content="Age range" />
          <InputRange
            name="age_range"
            maxValue={100}
            minValue={0}
            value={age}
            onChange={(value) => (
              setAge(value), props.change("age_range", value)
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

        <Button disabled={invalid || submitting} positive type="submit">
          Submit
        </Button>
        <Button onClick={() => props.handleEditStat(false)}>Cancel</Button>
        <Button
          type="button"
          color={initialValues.cancelled ? "green" : "red"}
          floated="right"
          content={initialValues.cancelled ? "Reactivate tour" : "Cancel tour"}
          onClick={() =>
            cancelToggle(!initialValues.cancelled, initialValues.id)
          }
        />
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

/*
<Field name="title" component={TextInput} placeholder="Tour title" />
        <Field name="language" component={TextInput} placeholder="Language of the tour" />

        <Header sub color='teal' content="Tour description" />
        <Field name="main_sentense" component={TextInput} placeholder="Kicking sentence about your tour" />
        <Field name="description" component={TextAreaInput} placeholder="Tell us more, what to expect?" rows={3} />
        <Header sub color='teal' content="Tour location" />
        <Field
          name="city"
          component={PlaceInput}
          options={{ types: ['(cities)'] }}
          placeholder="City"
          onSelect={handleCitySelect} />
        <Field
          name="street"
          options={{
            location: new google.maps.LatLng(addLatlng),
            radius: 1000,
            types: ['address'],
          }}
          component={PlaceInput}
          placeholder="Street"
          onSelect={handleAddressSelect}
        />
        <Field
          name="house_number"
          component={TextInput}
          placeholder="Address number"
          required
        />
        <Header sub color='teal' content="Recommended hours to take that tour" />
        <Field name="rec_start_h" component={DateInput} placeholder="From..."
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
        <Field name="rec_end_h" component={DateInput} placeholder="Until..."
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
*/
