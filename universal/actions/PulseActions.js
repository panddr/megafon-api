import * as types from '../constants/ActionTypes';
import request from 'superagent';
// import { getOrSetUserLogin } from '../client/UserId';

const serverUrl = '';
const eventsUrl = `${serverUrl}/api/0/events`;
const stateUrl = `${serverUrl}/api/0/state`;
const quizesUrl = `${serverUrl}/api/0/quizes`;
const helpUrl = `${serverUrl}/api/0/help`;
const imagesUrl = `${serverUrl}/api/0/images`;

//init state
export function initState() {
  const quizState = {
    isAnswering: false,
    isHelping: false,
    questions: [],
    slug: 0
  }

  return dispatch => {
    return request
      .post(stateUrl)
      .send(quizState)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err) {
          dispatch(initStateSuccess(res.body));
        }
      });
  };
}

export function initStateSuccess(quizState) {
  return {
    type: types.INIT_STATE_SUCCESS,
    quizState
  };
}


//start answering
export function startAnswering(quizState) {
  return dispatch => {
    return request
      .post(quizesUrl)
      .send(quizState)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err) {
          dispatch(startAnsweringSuccess(res.body));
        }
      });
  };
}

export function startAnsweringSuccess(quizState) {
  return {
    type: types.START_ANSWERING_SUCCESS,
    quizState
  };
}

//helping
export function startHelping(quizState) {
  return dispatch => {
    return request
      .post(helpUrl)
      .send(quizState)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (!err) {
          dispatch(startHelpingSuccess(res.body));
        }
      });
  };
}

export function startHelpingSuccess(quizState) {
  return {
    type: types.START_HELPING_SUCCESS,
    quizState
  };
}



//answer question
export function answerQuestion(answeredQuestion) {
  return {
    type: types.ANSWER_QUESTION,
    answeredQuestion
  };
}

//login

export function getLogin(isLoggedIn) {
  return {
    type: types.GET_LOGIN,
    isLoggedIn
  };
}

export function submitLogin(isLoggedIn) {
  window.localStorage.setItem('isLoggedIn', isLoggedIn);
  return {
    type: types.SUBMIT_LOGIN,
    isLoggedIn
  };
}

//load events

export function loadEvents() {
  return dispatch => {
    dispatch(loadEventsRequest());
    return request
      .get(eventsUrl)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(loadEventsFailure(err));
        } else {
          dispatch(loadEventsSuccess(res.body));
        }
      });
  };
}

export function loadEventsRequest() {
  return {
    type: types.LOAD_EVENTS_REQUEST
  };
}

export function loadEventsSuccess(events) {
  return {
    type: types.LOAD_EVENTS_SUCCESS,
    events
  };
}

export function loadEventsFailure(error) {
  return {
    type: types.LOAD_EVENTS_FAILURE,
    error
  };
}


// upload images

export function addImagesToStore(event) {
  return {
    type: types.ADD_IMAGES_TO_STORE,
    event
  };
}

export function removeImagesFromStore(event) {
  return {
    type: types.REMOVE_IMAGES_FROM_STORE,
    event
  };
}

export function uploadImage(event) {
  return dispatch => {
    dispatch(uploadImageRequest(event));

    const req = request
      .post(imagesUrl)
    event.files.forEach((file)=> {
      req.attach('file', file);
    });

    return req.end((err, res) => {
      if (err) {
        dispatch(uploadImageFailure(err, event));
        console.log(err)
      } else {
        dispatch(uploadImageSuccess(res.body));
      }
    });
  };
}

export function uploadImageRequest(event) {
  return {
    type: types.UPLOAD_IMAGE_REQUEST,
    event
  };
}

export function uploadImageSuccess(event) {
  return {
    type: types.UPLOAD_IMAGE_SUCCESS,
    event
  };
}

export function uploadImageFailure(error, event) {
  return {
    type: types.UPLOAD_IMAGE_FAILURE,
    event
  };
}


// add event


export function addEvent(event) {
  return dispatch => {
    dispatch(addEventRequest(event));

    return request
      .post(eventsUrl)
      .send(event)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(addEventFailure(err, event));
        } else {
          dispatch(addEventSuccess(res.body));
        }
      });
  };
}

export function addEventRequest(event) {
  return {
    type: types.ADD_EVENT_REQUEST,
    event
  };
}

export function addEventSuccess(event) {
  return {
    type: types.ADD_EVENT_SUCCESS,
    event
  };
}

export function addEventFailure(error, event) {
  return {
    type: types.ADD_EVENT_FAILURE,
    error
  };
}

export function deleteEvent(event) {
  return dispatch => {
    dispatch(deleteEventRequest(event));

    return request
      .del(eventsUrl + '/' + event.id)
      .set('Accept', 'application/json')
      .set('images', event.images)
      .end((err, res) => {
        if (err) {
          dispatch(deleteEventFailure(err, event));
        } else {
          dispatch(deleteEventSuccess(res.body));
        }
      });
  };
}

export function deleteEventRequest(event) {
  return {
    type: types.DELETE_EVENT_REQUEST,
    event
  };
}

export function deleteEventSuccess(event) {
  return {
    type: types.DELETE_EVENT_SUCCESS,
    event
  };
}

export function deleteEventFailure(error, event) {
  return {
    type: types.DELETE_EVENT_FAILURE,
    error,
    event
  };
}

export function editEvent(event) {
  return dispatch => {
    dispatch(editEventRequest(event));

    return request
      .post(eventsUrl + '/' + event.id)
      .send(event)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch(editEventFailure(err, event));
        } else {
          dispatch(editEventSuccess(res.body));
        }
      });
  };
}

export function editEventRequest(event) {
  return {
    type: types.EDIT_EVENT_REQUEST,
    event
  };
}

export function editEventSuccess(event) {
  return {
    type: types.EDIT_EVENT_SUCCESS,
    event
  };
}

export function editEventFailure(error, event) {
  return {
    type: types.EDIT_EVENT_FAILURE,
    error,
    event
  };
}
