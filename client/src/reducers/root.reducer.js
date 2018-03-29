import { combineReducers } from 'redux';
import user from './user.reducer';
import locale from './locale.reducer';
import alert from './alert.reducer';
import sidebar from './sidebar.reducer';

const rootReducer = combineReducers({
  user,
  locale,
  alert,
  sidebar,
});

export default rootReducer;
