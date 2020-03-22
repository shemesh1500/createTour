import { combineReducers } from "redux";
import {reducer as FormRedux} from 'redux-form';
import testReducer from "../../features/testerea/testReducer";
import tourReducer from "../../features/tour/tourReducer";
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";

const rootReducer = combineReducers({
    test  : testReducer,
    tours : tourReducer,
    form  : FormRedux,
    modals: modalReducer,
    auth : authReducer
})

export default rootReducer;