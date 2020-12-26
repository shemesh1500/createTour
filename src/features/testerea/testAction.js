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

export const changeURL = (stopId, fileName) =>
    async (dispatch, ownState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
       /*  const firestore = getFirestore() */
        //let url = await firebase.storage().ref('ckgnyu13q000b3a5s8v62g02o/stopMedia/ckgqfclcm00042464d233guw5_compress.mp4').getDownloadURL();
        let url = await firebase.storage().ref(`${stopId}/stopMedia/${fileName}_compress.mp4`).getDownloadURL();
        console.log("REF FILE", url);
    }
    
