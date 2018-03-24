import { combineReducers } from 'redux';
import user from './user.reducer';
import locale from './locale.reducer';

const rootReducer = combineReducers({
  user,
  locale,
});

export default rootReducer;
