import { CREATE_TOUR, UPDATE_TOUR, DELETE_TOUR, FETCH_TOUR } from "./tourConstarnts"
import { asyncActionStart, asyncActionFinish, asyncActionError } from "../async/asyncActions"
import { fetchSampleData } from "../../app/data/mockApi"
import { toastr } from "react-redux-toastr"

export const createTour = (tour) => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_TOUR,
                payload: {
                    tour
                }
            });
            toastr.success('Success!', 'Tour has been created');
        } catch (error) {
            toastr.error('Oops', 'Somthing went wrong!')       
        }
    }
}

export const updateTour = (tour) => {
    return async dispatch => {
        try {
            dispatch({
                type: UPDATE_TOUR,
                payload: {
                    tour
                }
            });
            toastr.success('Success!', 'Tour has been updated');
        } catch (error) {
            toastr.error('Oops', 'Somthing went wrong!')       
        }
    }
}

export const deleteTour = (tourId) => {
    return {
        type: DELETE_TOUR,
        payload: {
            tourId
        }
    }
}

export const loadTour = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart())
            const tours = await fetchSampleData()
            dispatch({ type : FETCH_TOUR, payload: {tours}})
            dispatch(asyncActionFinish())
        } catch (error) {
            console.log(error)
            dispatch(asyncActionError())
        }
    }
}