import axios from 'axios';
import { GET_EVENT, UPDATE_EVENT, EVENT_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getEvent = () => dispatch => {
  axios
    .get('/api/event')
    .then(res => dispatch({
      type: GET_EVENT,
      payload: res.data}))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const updateEvent = (event) => (dispatch, getState) => {
  const body = JSON.stringify(event);

  axios
    .post('/api/event', body, tokenConfig(getState))
    .then(res => dispatch({
      type: UPDATE_EVENT,
      payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  }
}
