import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  createTour,
  updateTour,
  deleteTour,
  approveTour,
  unApproveTour,
} from "../tourAction";
import { createSeller } from "../../user/userActions";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import BusinessList from "../../business/businessList/BusinessList";
import TourList from "../tourList/TourList";
import { approveBusiness } from "../../business/businessActions.js";
import UserTable from "../../auth/UserTable";

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
    {
      collection: "users",
      // where: ["tourOwner", "==", props.auth.uid],
    },
  ];
};

const mapState = (state) => {
  const allow_user = ['shemesh1500@gmail.com', 'idand93@gmail.com']
  const check_user = allow_user.find(user => user === state.firebase.auth.email)
  let isAllowed = false
  if(check_user){
    isAllowed = true
  }

  return {
  tours: state.firestore.ordered.tours,
  business: state.firestore.ordered.business,
  loading: state.async.loading,
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  users: state.firestore.ordered.users,
  isAllowed : isAllowed
}};

const actions = {
  createTour,
  updateTour,
  deleteTour,
  approveTour,
  approveBusiness,
  unApproveTour,
  createSeller,
};
const ManageTours = (props) => {
  return (
   <div>
      {" "}
      {props.isAllowed &&<div>
      <Grid>
        <Grid.Column width={8}>
          {props.tours && (
            <TourList
              tours={props.tours}
              doApprov={true}
              approveTour={props.approveTour}
              unApproveTour={props.unApproveTour}
              deleteTour={props.deleteTour}
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
      {props.users && (
        <UserTable users={props.users} createSeller={props.createSeller} />
      )}
      </div>}
    </div>
  );
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => query(props))
)(ManageTours);
