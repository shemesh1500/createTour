import React, { useEffect } from "react";
import { useState } from "react";
import BusinessNavBar from "./businessNavBar";
import GeneralInfoForm from "./GeneralInfoForm";
import { createBusiness, updateBusiness } from "../businessActions";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { reduxForm } from "redux-form";
import OfferForm from "./OfferForm";
import BusinessMedia from "./BusinessMedia";
import PeakLocation from "./PeakLocation";
import "../../../style/businessCreation.css";
import Background from "../../../images/mapBG.png";
import InstractionController from "../../instractions/InstractionController";

const query = (props) => {
  let businessId;
  if (props.businessId) {
    businessId = props.businessId;
  } else if (props.initialValues && props.initialValues.businessId) {
    businessId = props.initialValues.businessId;
  }
  if (businessId) {
    return [{ collection: "business", doc: businessId }];
  } else {
    return [{ collection: "business" }];
  }
};

const actions = {
  createBusiness,
  updateBusiness,
};
const mapState = (state, ownProps) => {
  let businessId;

  if (ownProps.match.params.businessId) {
    businessId = ownProps.match.params.businessId;
  } else if (
    state.form &&
    state.form.businessForm &&
    state.form.businessForm.values.id
  ) {
    businessId = state.form.businessForm.values.id;
  }

  let business = {};
  if (
    state.firestore.ordered.business &&
    state.firestore.ordered.business.length > 0
  ) {
    business =
      state.firestore.ordered.business.filter(
        (business) => business.id === businessId
      )[0] || {};
  }

  return {
    initialValues: business,
    businessId: businessId,
  };
};

const BusinessCreation = (props) => {
  const [StatusNav, setStatusNav] = useState("Peak Location");

  /* useEffect functions */
  async function setListener(firestore) {
    await firestore.setListener({
      collection: "business",
      doc: props.businessId,
    });
  }
  async function unSetListener(firestore) {
    await firestore.unsetListener({
      collection: "business",
      doc: props.businessId,
    });
  }

  useEffect(() => {
    const { firestore } = props;
    if (props.businessId) {
      setListener(firestore);
    }

    return () => {
      unSetListener(firestore);
    };
  });

  const onFormSubmit = async (values) => {
    try {
      if (values.id) {
        props.updateBusiness(values);
      } else {
        let createdBusiness = await props.createBusiness(values);
        props.change("id", createdBusiness.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const switchContext = () => {
    switch (StatusNav) {
      case "Peak Location":
        return <PeakLocation onFormSubmit={onFormSubmit} />;
      case "General Info":
        if (!props.businessId) {
        }
        return <GeneralInfoForm onFormSubmit={onFormSubmit} />;
      case "Offer Details":
        return <OfferForm onFormSubmit={onFormSubmit} />;
      case "Business Content":
        return <BusinessMedia saveChanges={onFormSubmit} />;
      default:
        break;
    }
  };

  /*Start Instraction modal */
  const [showInstraction, setShowInstraction] = useState("");
  const [instractionStep, setInstractionStep] = useState(1);
  const onNext = () => {
    setInstractionStep(instractionStep + 1);
    //setShowInstraction(true);
  };
  const onPrevious = () => {
    setInstractionStep(instractionStep - 1);
  };
  const onHide = () => {
    setShowInstraction(false);
  };

  const renderInstractions = () => {
    if (StatusNav === "Peak Location") {
      setShowInstraction("BusinessPeakLocation");
    }
  };
  /*End Instraction modal */

  return (
    <div className="mainZoneBusiness">
      <div className="mainBusinessHeader">Create Business Stop</div>
      <div className="subBusinessHeader">
        Here you start to build your Business point
      </div>
      <div
        className="getInstraction"
        onClick={() =>
          /*(setInstractionStep(1), setShowInstraction(true))*/ renderInstractions()
        }
      >
        Get some help
      </div>
      <div className="mainAreaBusiness">
        <BusinessNavBar activeTab={StatusNav} handleTabChange={setStatusNav} />
        <div attached="bottom" className="businessForm">
          {switchContext()}
          {/*false && (
            <BusinessModalInstraction
              show={showInstraction}
              onHide={onHide}
              onNext={onNext}
              onPrevious={onPrevious}
              data={instractionStep}
            />
          )*/}
          <InstractionController
            showInstraction={showInstraction}
            setShowInstraction={setShowInstraction}
          />
        </div>
      </div>
      <div className="mapArea">
        <div style={{ backgroundImage: `url(${Background})` }}></div>
      </div>
    </div>
  );
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => query(props)),
  reduxForm({
    form: "businessForm",
    enableReinitialize: true,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  })
)(BusinessCreation);
