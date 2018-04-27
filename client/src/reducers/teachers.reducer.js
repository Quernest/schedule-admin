import teachersConstants from '../constants/teachers.constants';

const teachers = (state = {}, action) => {
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
    case teachersConstants.GET_BY_ID_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case teachersConstants.GET_BY_ID_SUCCESS:
      return {
        ...state,
        fetching: false,
        teacher: action.teacher,
      };
    case teachersConstants.GET_BY_ID_FAILURE:
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
        list: [...state.list, action.teacher],
        fetching: false,
      };
    case teachersConstants.ADD_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case teachersConstants.EDIT_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case teachersConstants.EDIT_SUCCESS:
      return {
        ...state,
        fetching: false,
      };
    case teachersConstants.EDIT_FAILURE:
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
        /* eslint-disable */
        list: state.list.filter(
          teacher => teacher.id !== state.removedTeacherId
        ),
        fetching: false
      };
    case teachersConstants.REMOVE_FAILURE:
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
  }
};

export default teachers;
