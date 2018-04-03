import teachersConstants from '../constants/teachers.constants';
import LS from '../helpers/localStorage';

const initialState = {
  list: LS.get('teachers') || [],
};

const teachers = (state = initialState, action) => {
  switch (action.type) {
    case teachersConstants.GET_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case teachersConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.list,
      };
    case teachersConstants.GET_ALL_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case teachersConstants.ADD_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case teachersConstants.ADD_SUCCESS:
      return {
        ...state,
        // merge added teacher with list and save to localStorage
        list: ((list, teacher) => {
          const newList = [...list, teacher];
          LS.set('teachers', newList);

          return newList;
        })(state.list, action.teacher),
        fetching: false,
      };
    case teachersConstants.ADD_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case teachersConstants.REMOVE_REQUEST:
      return {
        ...state,
        removedTeacherId: action.id,
        fetching: true,
      };
    case teachersConstants.REMOVE_SUCCESS:
      return {
        ...state,
        // remove teacher object from teachers list
        list: ((list, id) => {
          const newList = list.filter(teacher => teacher.id !== id);
          LS.set('teachers', newList);

          return newList;
        })(state.list, state.removedTeacherId),
        fetching: false,
      };
    case teachersConstants.REMOVE_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default teachers;
