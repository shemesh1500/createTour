import React, { Component } from "react";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import DateInput from "../../../app/common/form/dateInput";
import PlaceInput from "../../../app/common/form/placeInput";
import TextInput from "../../../app/common/form/textInput";
import RadioInput from "../../../app/common/form/RadioInput";
import { addYears } from "date-fns";
import { connect } from "react-redux";

/*
const mapState = (state) => ({
    initialValues: state.form.userProfile ? state.form.userProfile.values : []
})
*/

const BasicPage = ({ pristine, submitting, handleSubmit, updateProfile }) => {
  return (
    <Segment>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <Header dividing size="small" content="name" />
        <Field
          width={8}
          name="displayName"
          type="text"
          component={TextInput}
          placeholder="Known As"
        />
        <Header dividing size="small" content="Address" />
        <Field
          width={8}
          name="Address"
          type="text"
          component={TextInput}
          placeholder="Current address"
        />
        <Header dividing size="small" content="Language" />
        <Field
          width={8}
          name="Language"
          type="text"
          component={TextInput}
          placeholder="Language"
        />
        <Form.Group inline>
          <Header size="small" content="Age " />
          <Field
            name="Age"
            type="number"
            component={TextInput}
            placeholder="Age"
          />
          <Header size="small" content="Phone " />
          <Field
            name="Phone"
            type="number"
            component={TextInput}
            placeholder="Phone"
          />
        </Form.Group>
        <Form.Group inline>
          <label>Gender: </label>
          <Field
            name="gender"
            type="radio"
            value="male"
            label="Male"
            component={RadioInput}
          />
          <Field
            name="gender"
            type="radio"
            value="female"
            label="Female"
            component={RadioInput}
          />
        </Form.Group>
        <Header dividing size="small" content="Birth Date" />
        <Field
          width={8}
          name="dateOfBirth"
          component={DateInput}
          placeholder="Date of Birth"
          dateFormat="dd LLL yyyy"
          showYearDropdown={true}
          showMonthDropdown={true}
          dropdownMode="select"
          maxDate={addYears(new Date(), -18)}
        />
        <Divider />

        <button disabled={pristine || submitting} className="saveFormButton">
          Update profile
        </button>
      </Form>
    </Segment>
  );
};

export default reduxForm({
  form: "userProfile",
  enableReinitialize: true,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(BasicPage);
