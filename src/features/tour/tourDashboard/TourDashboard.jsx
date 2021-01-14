import React from "react";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { createTour, updateTour, deleteTour, applyAproval } from "../tourAction";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import BusinessList from "../../business/businessList/BusinessList";
import TourList from "../tourList/TourList";
import "../../../style/lists.css";

const query = (props) => {
  return [
    {
      collection: "tours",
      //where: ["tour_guide.id", "==", props.auth.uid],
      where: ["tour_guide.email", "==", props.auth.email],
    },
    {
      collection: "business",
      //where: ["tourOwner", "==", props.auth.uid],
      where: ["owner.email", "==", props.auth.email],
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
  applyAproval
};
const TourDashboard = (props) => {
  return (
    <div className='allAssets'> 
      <div className='tourAssets'>
      {props.tours && <TourList tours={props.tours} applyAproval={props.applyAproval} />} 
      </div>
      <div className='tourAssets'>
      {props.business && <BusinessList business={props.business} />}
      </div>
    </div>
   /*  <Grid>
      <Grid.Column width={8}>
        {props.tours && <TourList tours={props.tours} />}
      </Grid.Column>
      <Grid.Column width={8}>
        {props.business && <BusinessList business={props.business} />}
      </Grid.Column>
    </Grid> */
  );
};

export default compose(
  connect(mapState, actions),
  firestoreConnect((props) => query(props))
)(TourDashboard);
