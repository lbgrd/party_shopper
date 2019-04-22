import { combineReducers } from 'redux';
import itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  event: eventReducer
});
