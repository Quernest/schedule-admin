import groupsConstants from '../constants/groups.constants';
import LS from '../helpers/localStorage';

const initialState = {
  list: LS.get('groups') || [],
};

const groups = (state = initialState, action) => {
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
        list: ((list, group) => {
          const newList = [...list, group];
          LS.set('groups', newList);

          return newList;
        })(state.list, action.group),
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
        removedGroupId: action.id,
        fetching: true,
      };
    case groupsConstants.REMOVE_SUCCESS:
      return {
        ...state,
        // remove group object from groups list
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
