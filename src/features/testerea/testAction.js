import { INC_COUNTER, DEC_COUNTER } from "./testContent";
import {  asyncActionFinish } from "../async/asyncActions";
import { ASYNC_ACTION_START } from "../async/asyncConstants";

export const inc_counter = () => {
    return {
        type: INC_COUNTER   
    }
}

export const dec_counter = () => {
    return {
        type: DEC_COUNTER   
    }
}

const delay = (ms) => {
    return new Promise(res => setTimeout(res , ms))
}

export const incrementAsync = (name) => {
    return async dispatch => {
        dispatch({type : ASYNC_ACTION_START, payload: name})
        await delay(1000)
        dispatch( inc_counter() )
        dispatch(asyncActionFinish())
    }
}

export const decramentAsync = (name) => {
    return async dispatch => {
        dispatch({type: ASYNC_ACTION_START, payload: name})
        await delay(1000)
        dispatch( {type : DEC_COUNTER})
        dispatch(asyncActionFinish())
    }
}
