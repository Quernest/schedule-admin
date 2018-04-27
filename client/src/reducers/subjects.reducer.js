import subjectsConstants from '../constants/subjects.constants';

const subjects = (state = {}, action) => {
  switch (action.type) {
    case subjectsConstants.GET_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case subjectsConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.list,
      };
    case subjectsConstants.GET_ALL_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case subjectsConstants.GET_BY_ID_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case subjectsConstants.GET_BY_ID_SUCCESS:
      return {
        ...state,
        fetching: false,
        subject: action.subject,
      };
    case subjectsConstants.GET_BY_ID_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case subjectsConstants.ADD_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case subjectsConstants.ADD_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.subject],
        fetching: false,
      };
    case subjectsConstants.ADD_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case subjectsConstants.REMOVE_REQUEST:
      return {
        ...state,
        removedSubjectId: action.id,
        fetching: true,
      };
    case subjectsConstants.REMOVE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(subject => subject.id !== state.removedSubjectId),
        fetching: false,
      };
    case subjectsConstants.REMOVE_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default subjects;
