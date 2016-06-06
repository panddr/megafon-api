import {
  LOAD_EVENTS_REQUEST, LOAD_EVENTS_SUCCESS, LOAD_EVENTS_FAILURE,
  ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE,
  UPLOAD_IMAGE_REQUEST, UPLOAD_IMAGE_SUCCESS, UPLOAD_IMAGE_FAILURE,
  DELETE_EVENT_REQUEST, DELETE_EVENT_SUCCESS, DELETE_EVENT_FAILURE,
  EDIT_EVENT_REQUEST, EDIT_EVENT_SUCCESS, EDIT_EVENT_FAILURE,
  GET_LOGIN, SUBMIT_LOGIN, ADD_IMAGES_TO_STORE, REMOVE_IMAGES_FROM_STORE
} from '../constants/ActionTypes';
import {UPDATE_LOCATION} from 'redux-simple-router';

const initialState = {
  isWorking: false,
  userId: null,
  isLoggedIn: false,
  error: null,
  images: [],
  events: []
};

export default function pulses(state = initialState, action) {
  switch (action.type) {
    case GET_LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn
      });

    case UPDATE_LOCATION:
      return Object.assign({}, state, {
        images: []
      });

    case SUBMIT_LOGIN:
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn
      });

    case ADD_EVENT_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case ADD_EVENT_SUCCESS:
      let events = state.events;
      if (events.findIndex(evt => evt.id === action.event.id) === -1) {
        events = [action.event, ...state.events];
      }
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        events: events
      });

    case ADD_IMAGES_TO_STORE:
      return Object.assign({}, state, {
        images: action.event
      });

    case REMOVE_IMAGES_FROM_STORE:
      return Object.assign({}, state, {
        images: action.event
      });

    case UPLOAD_IMAGE_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case UPLOAD_IMAGE_SUCCESS:
      let images = action.event.concat(state.images);
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        images: images
      });

    case DELETE_EVENT_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case DELETE_EVENT_SUCCESS:
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        events: state.events.filter(event =>
        event.id !== action.event.id)
      });

    case EDIT_EVENT_REQUEST:
      return Object.assign({}, state, {
        isWorking: true,
        error: null
      });

    case EDIT_EVENT_SUCCESS:
      return Object.assign({}, state, {
        isWorking: false,
        error: null,
        events: state.events.map(event =>
          event.id === action.event.id ?
            action.event :
            event
        )
      });

    case ADD_EVENT_FAILURE:
    case DELETE_EVENT_FAILURE:
    case EDIT_EVENT_FAILURE:
    // case UPLOAD_IMAGE_FAILURE:
      return Object.assign({}, state, {
        isWorking: false,
        error: action.error,
      });

    default:
      return state;
  }
}
