import { combineReducers } from "redux";
import testReducer from "../../features/testerea/testReducer";
import tourReducer from "../../features/tour/tourReducer";

const rootReducer = combineReducers({
    test  : testReducer,
    tours : tourReducer
})

export default rootReducer;