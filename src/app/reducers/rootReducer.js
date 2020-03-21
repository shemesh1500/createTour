import { combineReducers } from "redux";
import {reducer as FormRedux} from 'redux-form';
import testReducer from "../../features/testerea/testReducer";
import tourReducer from "../../features/tour/tourReducer";

const rootReducer = combineReducers({
    test  : testReducer,
    tours : tourReducer,
    form  : FormRedux
})

export default rootReducer;