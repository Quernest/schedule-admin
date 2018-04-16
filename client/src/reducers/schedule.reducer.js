import scheduleConstants from '../constants/schedule.constants';

const schedule = (state = {}, action) => {
  switch (action.type) {
    case scheduleConstants.ADD_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case scheduleConstants.ADD_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.list,
      };
    case scheduleConstants.ADD_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case scheduleConstants.GET_BY_ID_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case scheduleConstants.GET_BY_ID_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.list,
      };
    case scheduleConstants.GET_BY_ID_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default schedule;
