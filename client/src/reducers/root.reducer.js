import { combineReducers } from 'redux';
import user from './user.reducer';
import locale from './locale.reducer';
import alert from './alert.reducer';
import sidebar from './sidebar.reducer';
import groups from './groups.reducer';
import teachers from './teachers.reducer';
import semesters from './semesters.reducer';

const rootReducer = combineReducers({
  user,
  locale,
  alert,
  sidebar,
  groups,
  teachers,
  semesters,
});

export default rootReducer;
