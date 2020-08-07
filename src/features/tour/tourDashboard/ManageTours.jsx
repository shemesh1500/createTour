import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { createTour, updateTour, deleteTour, approveTour } from "../tourAction";
import LoadingCompanent from "../../layout/LoadingCompanent";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import BusinessList from "../../business/businessList/BusinessList";
import TourList from "../tourList/TourList";
import { approveBusiness } from "../../business/businessActions.js";

const query = (props) => {
  return [
    {
      collection: "tours",
      //where: ["tour_guide.id", "==", props.auth.uid],
    },
    {
      collection: "business",
      // where: ["tourOwner", "==", props.auth.uid],
    },
  ];
};

const mapState = (state) => ({
  tours: state.firestore.ordered.tours,
  business: state.firestore.ordered.business,
  loading: state.async.loading,
  profile: state.firebase.profile,
  auth: state.firebase.auth,
});

const actions = {
  createTour,
  updateTour,
  deleteTour,
  approveTour,
  approveBusiness,
};
const ManageTours = (props) => {
  return (
    <Grid>
      <Grid.Column width={8}>
        {props.tours && (
          <TourList
            tours={props.tours}
            doApprov={true}
            approveTour={props.approveTour}
          />
        )}
      </Grid.Column>
      <Grid.Column width={8}>
        {props.business && (
          <BusinessList
            business={props.business}
            doApprov={true}
            approveBusiness={props.approveBusiness}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => query(props))
)(ManageTours);
