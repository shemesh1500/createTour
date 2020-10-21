import { createStore, applyMiddleware } from "redux";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";
import firebase from "../config/firebase";

const rrfConfig = {
  userProfile: "storeUsers",
  attachAuthIsReady: true,
  useFirestoreForProfile: true,
  updateProfileOnLogin: false,
};

export const configStore = () => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const compoedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, compoedEnhancer);

  return store;
};

export default configStore;
