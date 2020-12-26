import { firestore } from "firebase";
import { createReducer } from "../../app/common/util/reducerUtils";
import { CREATE_USER } from "./userConstant";

const initstate = {
  user: {
    displayName: "",
    creationTime: "",
    email: "",
    rating: {
      total: 0,
      votes: 0,
    },
    firstname: "",
    lastname: "",
    imageUrl: "",
    isNewUser: "",
    locale: "",
    tours: "",
    lastSignIn: "",
    uid: "",
    userType: "",
    questionAndAnswer: "",
  },
};

const createUser = (state, payload) => {
  let new_user = {
    displayName: payload.user.displayName,
    //imageUrl: user.profile.avatarUrl,
    creationTime: firestore.FieldValue.serverTimestamp(),
    email: payload.additionalUserInfo.profile.email,
    rating: {
      total: 0,
      votes: 0,
    },
    firstname: payload.additionalUserInfo.profile.given_name,
    lastname: payload.additionalUserInfo.profile.family_name,
    imageUrl: payload.additionalUserInfo.profile.picture,
    isNewUser: false,
    locale: payload.additionalUserInfo.profile.locale,
    tours: [],
    lastSignIn: firestore.FieldValue.serverTimestamp(),
    uid: payload.user.uid,
    userType: "guide",
    questionAndAnswer: [],
  };
  return { user: new_user };
};

export default createReducer(initstate, {
  [CREATE_USER]: createUser,
});

