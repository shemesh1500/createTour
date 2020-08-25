import { SubmissionError, reset } from "redux-form";
import { closeModal } from "../modals/modalActions";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";

const createUser = (user) => {
  let new_user = {
    email: user.email,
    creationTime: user.date,
    first_name: user.displayName,
    last_name: user.displayName,
    imageUrl: user.profile.avatarUrl,
    lastSignIn: "",
    locale: "",
    token: "",
  };
  return new_user;
};

export const login = (creds) => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      //dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: error.message,
      });
    }
  };
};

export const registerUser = (user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    await createdUser.user.updateProfile({
      displayName: user.displayName,
    });
    console.log("Register USER", user);
    let newUser = {
      displayName: user.displayName,
      creationTime: firestore.FieldValue.serverTimestamp(),
      rating: {
        total: 0,
        votes: 0,
      },
      fisrtname: "",
      lastname: "",
      imageUrl: "",
      isNewUser: false,
      locale: "",
      tours: [],
      email: user.email ? user.email : "",
      uid: cuid(),
      userType: "guide",
    };
    await firestore.set(`users/${createdUser.user.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message,
    });
  }
};

export const socialLogin = (selectedProvider) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    //dispatch(closeModal());
    let user = await firebase.login({
      provider: selectedProvider,
      type: "popup",
    });
    console.log("social", user, user.getIdToken(true));
    if (user.additionalUserInfo.isNewUser) {
      await firestore.set(`users/${user.user.uid}`, {
        displayName: user.user.displayName,
        imageUrl: user.profile.avatarUrl,
        creationTime: firestore.FieldValue.serverTimestamp(),
        email: user.additionalUserInfo.profile.email,
        rating: {
          total: 0,
          votes: 0,
        },
        fisrtname: user.additionalUserInfo.profile.given_name,
        lastname: user.additionalUserInfo.profile.family_name,
        imageUrl: user.additionalUserInfo.profile.picture,
        isNewUser: false,
        locale: user.additionalUserInfo.profile.locale,
        tours: [],
        lastSignIn: firestore.FieldValue.serverTimestamp(),
        uid: user.user.uid,
        userType: "guide",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = (creds) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await user.updatePassword(creds.newPassword1);
    await dispatch(reset("account"));
    toastr.success("Success", "Your password has been updated");
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: error.message,
    });
  }
};

export const CheckType = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;

  if (user) {
    if (
      user.uid === "tLnbyrAN3XSFaQXv6dJdUjxgY0F2" ||
      user.uid === "HH6St4cQa2UpCGdc2zO62r2EHDg2" ||
      user.uid === "Nnq5qCRzfHbg6UzmSWQcRzghvpv1"
    ) {
      console.log("checkType TRUE", user);
      return true;
    }
  }
  console.log("checkType FALSE", user);
  return false;
};
