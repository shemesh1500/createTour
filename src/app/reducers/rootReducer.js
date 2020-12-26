import { combineReducers } from "redux";
import { reducer as FormRedux } from "redux-form";
import { reducer as ToasterReducer } from "react-redux-toastr";
import testReducer from "../../features/testerea/testReducer";
import tourReducer from "../../features/tour/tourReducer";
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
/* import userReducer from "../../features/user/userReducer"; */

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  test: testReducer,
  tours: tourReducer,
  form: FormRedux, 
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer,
  toastr: ToasterReducer,
  /*  user: userReducer,  */
});

export default rootReducer;
