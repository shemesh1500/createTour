import React from "react";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Form, Header } from "semantic-ui-react";
import TextInput from "../../../app/common/form/textInput";
import textAreaInput from "../../../app/common/form/textAreaInput";

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
const OfferForm = (props) => {
  const { invalid, submitting } = props;
  return (
    <div>
      <Form onSubmit={props.handleSubmit(props.onFormSubmit)}>
        <div className="businessForm">
          <div className="formOne">
            <Header size="small" content="Offer price" />
            <Field
              name="offer_price"
              component={TextInput}
              placeholder="Offer price"
              type="number"
            />
          </div>
          <div className="formOne">
            <Header size="small" content="Offer in details" />
            <Field
              name="offer_in_details"
              type="textarea"
              component={textAreaInput}
              placeholder="What the is your offer includs? Min of 25 words"
              rows={3}
            />
          </div>
          <div className="formOne">
            <Header size="small" content="More details" />
            <Field
              name="more_details"
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
    })(OfferForm)
  )
);
