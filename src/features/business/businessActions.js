import { createNewBusiness } from "../../app/common/helpers";
import { toastr } from "react-redux-toastr";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError,
} from "../async/asyncActions";

export const createBusiness = (business) => {
  return async (dispatch, gesState, { getFirestore, getFirebase }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const newTour = createNewBusiness(user, business);
    try {
      let createdTour = await firestore.add("business", newTour);
      toastr.success("Success!", "Tour has been created");
      return createdTour;
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Somthing went wrong!");
    }
  };
};

export const updateBusiness = (business) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      await firestore.update(`business/${business.id}`, business);
      toastr.success("Success!", "Tour has been updated");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", "Somthing went wrong!");
    }
  };
};

export const approveBusiness = (business) => async (
  dispatch,
  getState,
  { getFirestore }
) => {
  const firestore = getFirestore();

  let dateHash = new Date().getMilliseconds() / 100 - 1;
  let update_business = {
    ...business,
    approval_time: new Date(),
    approval_index: dateHash,
  };
  try {
    dispatch(asyncActionStart());
    //await firestore.add("approval_tours", update_tour);
    await firestore.set(
      `approval_business/${business.id}`,
      { ...update_business }
      //{ merge: true }
    );

    //await firestore.set(`approval_tours/${tour.id}`, update_tour);
    toastr.success("Success!", "Business has been updated");
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    toastr.error("Oops", "Somthing went wrong!");
    dispatch(asyncActionError());
  }
};
