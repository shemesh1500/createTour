import React, { Component } from "react";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import TextInput from "../../../app/common/form/textInput";
import { connect } from "react-redux";

/*
const mapState = (state) => ({
    initialValues: state.form.userProfile.values
})
*/

const PersonalQuestion = ({
  pristine,
  submitting,
  handleSubmit,
  updateProfile,
}) => {
  return (
    <Segment>
      <Form onSubmit={handleSubmit(updateProfile)}>
        <div className="questionText">When do you start to guide and why?</div>
        <Field
          width={8}
          name="question1"
          type="text"
          component={TextInput}
          placeholder="Answer"
        />
        <div className="questionText">
          What do you like about being a guide?
        </div>
        <Field
          width={8}
          name="question2"
          type="text"
          component={TextInput}
          placeholder="Answer"
        />
        <div className="questionText">Quete from a favorite movie\book?</div>
        <Field
          width={8}
          name="question3"
          type="text"
          component={TextInput}
          placeholder="Answer"
        />
        <div className="questionText">
          What historical period would you like to return to?
        </div>
        <Field
          width={8}
          name="question4"
          type="text"
          component={TextInput}
          placeholder="Answer"
        />
        <div className="questionText">
          If you could choose one person to have dinner with, who would it be?
        </div>
        <Field
          width={8}
          name="question5"
          type="text"
          component={TextInput}
          placeholder="Answer"
        />
        <div className="questionText">
          What in your life are you grateful for?
        </div>
        <Field
          width={8}
          name="question6"
          type="text"
          component={TextInput}
          placeholder="Answer"
        />
        <div className="questionText">
          If you could wake up tomorrow with a new feature or ability, what
          would it be?
        </div>
        <Field
          width={8}
          name="question7"
          type="text"
          component={TextInput}
          placeholder="Answer"
        />
        <div className="questionText">Sweet or salty?</div>
        <Field
          width={8}
          name="question8"
          type="text"
          component={TextInput}
          placeholder="Answer"
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
})(PersonalQuestion);
