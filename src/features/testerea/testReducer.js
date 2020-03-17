import { INC_COUNTER, DEC_COUNTER } from "./testContent";
import { createReducer } from "../../app/common/util/reducerUtils";

const initState = {
    data :42
}

const incCounter = (state) => {
    return {...state, data:(state.data + 1)};
}

const decCounter = (state) => {
    return {...state, data:(state.data - 1)};
}

export default createReducer(initState, {
    [INC_COUNTER] : incCounter,
    [DEC_COUNTER] : decCounter
});