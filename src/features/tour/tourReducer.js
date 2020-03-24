import { CREATE_TOUR, UPDATE_TOUR, DELETE_TOUR, FETCH_TOUR } from "./tourConstarnts"
import { createReducer } from "../../app/common/util/reducerUtils"

const demoTours = []

const createTour = (state, payload) => {
  return [...state, payload.tour]
}

const updateTour = (state, payload) => {
  return [
    ...state.filter(tour => tour.id !== payload.tour.id), payload.tour
  ]
}

const deleteTour = (state, payload) => {
  return [
    ...state.filter(tour => tour.id !== payload.tourId)
  ]
}

const fetchTour = (state, payload) => {
  return payload.tours
}

export default createReducer(demoTours, {
  [CREATE_TOUR]: createTour,
  [UPDATE_TOUR]: updateTour,
  [DELETE_TOUR]: deleteTour,
  [FETCH_TOUR] : fetchTour
})