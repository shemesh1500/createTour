import React, { useState } from "react";
import { withFirestore } from "react-redux-firebase";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Form, Header, Image } from "semantic-ui-react";
import TextInput from "../../../app/common/form/textInput";
import textAreaInput from "../../../app/common/form/textAreaInput";
import PhotoComponent from "../../stop/media/PhotoComponent";
import {
  generalUploadFile,
  generalDeleteFile,
} from "../../media/mediaActions";

const actions = { generalUploadFile, generalDeleteFile };
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
const OfferForm = (props) => {
  const {
    invalid,
    submitting,
    initialValues,
    loading,
    generalUploadFile,
    generalDeleteFile,
  } = props;
  const [photoOpen, setPhotoModal] = useState(false);

  const uploadFile = async (file, fileTitle = "file") => {
    let new_media = await generalUploadFile(
      file,
      initialValues.id,
      "business",
      "Coupon pic"
    );

    props.change("coupon_pic", { ...new_media });
  };

  const deleteFile = async (file) => {
    await generalDeleteFile(file, initialValues.id, "businessMedia");

    props.change("coupon_pic", {});
  };
  console.log("initialValues", initialValues);
  return (
    <div>
      <Form /*onSubmit={props.handleSubmit(props.onFormSubmit)}*/>
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
          <div>
            <Header
              size="small"
              content="Coupon picture - this is what the customers will display to you to get their value "
            />

            <button
              className="addButton"
              style={{ width: "200px" }}
              onClick={() => setPhotoModal(true)}
            >
              Mangage Coupons
            </button>
            {initialValues.coupon_pic && initialValues.coupon_pic.url && (
              <Image
                src={initialValues.coupon_pic.url}
                style={{ height: "200px", width: "200px" }}
              />
            )}
            {
              <PhotoComponent
                loading={loading}
                objectId={initialValues.id}
                tourId={initialValues.id}
                all_media={
                  initialValues.coupon_pic ? [initialValues.coupon_pic] : []
                }
                handleSetMainFile={() => console.log("main")}
                handleDeletePhoto={deleteFile}
                open={photoOpen}
                onClose={() => setPhotoModal(false)}
                generalUploadFile={uploadFile}
              />
            }
          </div>
        </div>
        <button
          className="saveBusinessButton"
          disabled={invalid || submitting}
          positive
          type="submit"
          onClick={() => props.onFormSubmit(initialValues)}
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
