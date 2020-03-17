import { CREATE_TOUR, UPDATE_TOUR, DELETE_TOUR } from "./tourConstarnts"

export const createTour = (tour) => {
    return {
        type: CREATE_TOUR,
        payload: {
            tour
        }
    }
}

export const updateTour = (tour) => {
    return {
        type: UPDATE_TOUR,
        payload: {
            tour
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