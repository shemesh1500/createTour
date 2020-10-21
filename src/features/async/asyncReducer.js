import { createReducer } from "../../app/common/util/reducerUtils";
import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
} from "./asyncConstants";

const initialState = {
  loading: false,
  elementName: null,
  complete_precent: 0,
};

const asyncActionStarted = (state, payload = { complete_precent: 0 }) => {
  return {
    ...state,
    loading: true,
    elementName: payload,
    complete_precent: payload.complete_precent,
  };
};

const asyncActionFinished = (state) => {
  return {
    ...state,
    loading: false,
    elementName: null,
  };
};

const asyncActionError = (state) => {
  return {
    ...state,
    loading: false,
    elementName: null,
  };
};

export default createReducer(initialState, {
  [ASYNC_ACTION_START]: asyncActionStarted,
  [ASYNC_ACTION_FINISH]: asyncActionFinished,
  [ASYNC_ACTION_ERROR]: asyncActionError,
});
