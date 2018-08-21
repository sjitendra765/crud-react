import { combineReducers } from 'redux';
import userReducer from './user_reducer';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer
});

export default rootReducer;
