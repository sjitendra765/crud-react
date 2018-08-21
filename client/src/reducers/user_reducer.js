import { FETCH_USER, ERROR_RESPONSE, FETCH_DETAIL } from '../actions/types';

const INITIAL_STATE = { user: [], message: '',detail:{}, error: '' };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_USER:{
      return { ...state, user: action.payload };
    }
    case FETCH_DETAIL:{
    	return { ...state, detail: action.payload };
    }
    case ERROR_RESPONSE:
      return { ...state, error: action.payload };
  }

  return state;
}