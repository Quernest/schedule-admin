import groupsConstants from '../constants/groups.constants';

const groups = (state = {}, action) => {
  switch (action.type) {
    case groupsConstants.GET_ALL_GROUPS_REQUEST:
      return {
        fetching: true,
      };
    case groupsConstants.GET_ALL_GROUPS_SUCCESS:
      return {
        fetching: false,
        list: action.list,
      };
    case groupsConstants.GET_ALL_GROUPS_FAILURE:
      return {
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default groups;
