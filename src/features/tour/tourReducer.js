import { CREATE_TOUR, UPDATE_TOUR, DELETE_TOUR } from "./tourConstarnts"
import { createReducer } from "../../app/common/util/reducerUtils"

const demoTours = [
    {
      id: '1',
      title: 'Trip to Tower of London',
      language: 'hebrew',
      rec_start_h: '',
      rec_end_h: '',
      c_date: '2018-03-27T11:00:00+00:00',
      category: 'culture',
      audience: [], //[{singleAud: true}, {kidfriendlyAud : true}],
      main_sentense: 'Join me to the revele the secret of Tower of London',
      profile_pic: '/assets/tourPic1.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      city: 'London, UK',
      theGuide: 'Bob',
      stops: [
        {
          id: 'a',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        },
        {
          id: 'b',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        }
      ]
    },
    {
      id: '2',
      title: 'Trip to Punch and Judy Pub',
      language: 'hebrew',
      rec_start_h: '',
      rec_end_h: '',
      c_date: '2018-03-28T14:00:00+00:00',
      category: 'drinks',
      audience: [],//['single Aud', 'kidfriendlyAud'],
      main_sentense: 'Join me to the revele the secret of Punch and Judy Pub',
      profile_pic: '/assets/tourPic2.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
      city: 'London, UK',
      theGuide: 'Tom',
      stops: [
        {
          id: '1',
          name: 'Tom',
          photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        {
          id: '2',
          name: 'Bob',
          photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
        }
      ]
    }
]

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

export default createReducer(demoTours, {
    [CREATE_TOUR] : createTour,
    [UPDATE_TOUR] : updateTour,
    [DELETE_TOUR] : deleteTour
})