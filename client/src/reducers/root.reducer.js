import { combineReducers } from 'redux';
import user from './user.reducer';
import locale from './locale.reducer';
import alert from './alert.reducer';

const rootReducer = combineReducers({
  user,
  locale,
  alert,
});

export default rootReducer;
