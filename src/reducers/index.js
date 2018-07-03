import { combineReducers } from 'redux';
import { UPLOAD_DELETE, UPLOAD_REQUEST, UPLOAD_FAILURE, UPLOAD_SUCCESS, UPLOAD_LIST } from '../actions';

export const items = (state = [], action) => {
  switch(action.type) {
    case UPLOAD_LIST:
      return [...state, ...action.data];

    case UPLOAD_SUCCESS:
      return [...state, action.data];

    case UPLOAD_DELETE:
      return state.filter(file => file.key !== action.key);

    default:
      return state
  }
}

export const isFetching = (state, action) => action.type === UPLOAD_REQUEST;

export const isError = (state, action) => action.type === UPLOAD_FAILURE;

export default combineReducers({
  items,
  isFetching,
  isError,
});
