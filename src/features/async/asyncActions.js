import {
  ASYNC_ACTION_START,
  ASYNC_ACTION_FINISH,
  ASYNC_ACTION_ERROR,
  ASYNC_TAB_STATUS
} from "./asyncConstants";

export const asyncActionStart = (payload) => {
  return {
    type: ASYNC_ACTION_START,
    payload: payload,
  };
};

export const asyncActionFinish = () => {
  return {
    type: ASYNC_ACTION_FINISH,
  };
};

export const asyncActionError = () => {
  return {
    type: ASYNC_ACTION_ERROR,
  };
};

export const asyncTabStatus = (payload) => {
  console.log("asyncTabStatus", payload);
  return{
    type:ASYNC_TAB_STATUS,
    payload:payload
  }
}

export const updateTabStatus = (tabName) =>  (
  dispatch,
  getState,
  {}
) => {
  console.log("BEFORE");
  dispatch(asyncTabStatus(tabName))
  console.log("AFTER ");
}