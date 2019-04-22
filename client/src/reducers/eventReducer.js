import { GET_EVENT, UPDATE_EVENT, EVENT_LOADING
       } from '../actions/types';

const initialState = {
  event: {name: "My Party",
          date: null},
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
  case GET_EVENT:
    return {
      ...state,
      event: action.payload,
      loading: false
    }
  case UPDATE_EVENT:
    return {
      ...state,
      event: action.payload
    }
  case EVENT_LOADING:
    return {
      ...state,
      loading: true
    }

  default:
    return state;
  }
}
