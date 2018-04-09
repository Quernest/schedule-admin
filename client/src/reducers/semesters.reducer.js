import semestersConstants from '../constants/semesters.constants';

const semesters = (state = {}, action) => {
  switch (action.type) {
    case semestersConstants.GET_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case semestersConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.list,
      };
    case semestersConstants.GET_ALL_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case semestersConstants.GET_BY_ID_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case semestersConstants.GET_BY_ID_SUCCESS:
      return {
        ...state,
        fetching: false,
        semester: action.semester,
      };
    case semestersConstants.GET_BY_ID_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case semestersConstants.ADD_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case semestersConstants.ADD_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.semester],
        fetching: false,
      };
    case semestersConstants.ADD_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case semestersConstants.EDIT_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case semestersConstants.EDIT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.semester],
        fetching: false,
      };
    case semestersConstants.EDIT_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case semestersConstants.REMOVE_REQUEST:
      return {
        ...state,
        removedSemesterId: action.id,
        fetching: true,
      };
    case semestersConstants.REMOVE_SUCCESS:
      return {
        ...state,
        /* eslint-disable */
        list: state.list.filter(
          semester => semester.id !== state.removedSemesterId
        ),
        fetching: false
      };
    case semestersConstants.REMOVE_FAILURE:
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
  }
};

export default semesters;
