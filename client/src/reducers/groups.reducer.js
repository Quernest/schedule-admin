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
    case groupsConstants.GET_BY_ID_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case groupsConstants.GET_BY_ID_SUCCESS:
      return {
        ...state,
        fetching: false,
        group: action.group,
      };
    case groupsConstants.GET_BY_ID_FAILURE:
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
        list: [...state.list, action.group],
        fetching: false,
      };
    case groupsConstants.ADD_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case groupsConstants.EDIT_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case groupsConstants.EDIT_SUCCESS:
      return {
        ...state,
        fetching: false,
      };
    case groupsConstants.EDIT_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case groupsConstants.REMOVE_REQUEST:
      return {
        ...state,
        removedGroupId: action.id,
        fetching: true,
      };
    case groupsConstants.REMOVE_SUCCESS:
      return {
        ...state,
        list: state.list.filter(group => group.id !== state.removedGroupId),
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
