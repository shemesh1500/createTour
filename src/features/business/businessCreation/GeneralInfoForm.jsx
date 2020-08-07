import React, { useState } from "react";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Form, Header, Checkbox } from "semantic-ui-react";
import TextInput from "../../../app/common/form/textInput";
import SelectInput from "../../../app/common/form/selectInput";
import InputRange from "react-input-range";
import textAreaInput from "../../../app/common/form/textAreaInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const businessType = [
  { key: "Food", text: "Food", value: "Food" },
  { key: "Bar", text: "Bar", value: "Bar" },
  { key: "Store", text: "Store", value: "Store" },
];

const businessLanguage = [
  { key: "Hebrew", text: "Hebrew", value: "Hebrew" },
  { key: "English", text: "English", value: "English" },
  { key: "Spanish", text: "Spanish", value: "Spanish" },
];
const actions = {};

const mapState = (state) => {
  let formValues = {};

  if (state.form.businessForm) {
    formValues = state.form.businessForm.values;
  }
  return {
    initialValues: formValues,
  };
};
const GeneralInfoForm = (props) => {
  const { invalid, submitting, initialValues } = props;
  const [age, setAge] = useState(
    initialValues.age_range ? initialValues.age_range : { min: 18, max: 60 }
  );
  const [hours, setHours] = useState(
    initialValues.hours_range
      ? initialValues.hours_range
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

  return (
    <div>
      <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
        <div className="businessForm">
          <div className="formOne">
            <Header size="small" content="Business name" />
            <Field
              name="business_name"
              component={TextInput}
              placeholder="Business name"
            />
          </div>
          <div className="formOne">
            <Header size="small" content="Business type" />
            <Field
              name="business_type"
              component={SelectInput}
              options={businessType}
              value="business_type.text"
              multiple={true}
              placeholder="Business type"
            />
          </div>
          <div className="formOne">
            <Header size="small" content="Business language" />
            <Field
              name="business_language"
              component={SelectInput}
              options={businessLanguage}
              value="business_language.text"
              multiple={true}
              placeholder="Business language"
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
            <Header size="small" content="Business number" />
            <Field
              name="business_number"
              component={TextInput}
              placeholder="Business number"
            />
          </div>

          <div className="formOne">
            <Header size="small" content="Restrictions" />
            <Checkbox label="Kosher" />
            <Checkbox label="Accessibility" />
          </div>
          <div className="formOne">
            <Header size="small" content="Full description" />
            <Field
              name="description"
              type="textarea"
              component={textAreaInput}
              placeholder="Tell us more, what to expect? Min of 25 words"
              rows={3}
            />
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
    })(GeneralInfoForm)
  )
);
