import groupsConstants from '../constants/groups.constants';

const groups = (state = {}, action) => {
  switch (action.type) {
    case groupsConstants.GET_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case groupsConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.list,
      };
    case groupsConstants.GET_ALL_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case groupsConstants.ADD_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case groupsConstants.ADD_SUCCESS:
      return {
        ...state,
        fetching: false,
      };
    case groupsConstants.ADD_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case groupsConstants.REMOVE_REQUEST:
      return {
        ...state,
        fetchig: true,
      };
    case groupsConstants.REMOVE_SUCCESS:
      return {
        ...state,
        fetching: false,
      };
    case groupsConstants.REMOVE_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
};

export default groups;
