import locationsConstants from '../constants/locations.constants';

const locations = (state = {}, action) => {
  switch (action.type) {
    case locationsConstants.GET_ALL_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case locationsConstants.GET_ALL_SUCCESS:
      return {
        ...state,
        fetching: false,
        list: action.list,
      };
    case locationsConstants.GET_ALL_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case locationsConstants.GET_BY_ID_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case locationsConstants.GET_BY_ID_SUCCESS:
      return {
        ...state,
        fetching: false,
        location: action.location,
      };
    case locationsConstants.GET_BY_ID_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case locationsConstants.ADD_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case locationsConstants.ADD_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.location],
        fetching: false,
      };
    case locationsConstants.ADD_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case locationsConstants.EDIT_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case locationsConstants.EDIT_SUCCESS:
      return {
        ...state,
        fetching: false,
      };
    case locationsConstants.EDIT_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    case locationsConstants.REMOVE_REQUEST:
      return {
        ...state,
        removedLocationId: action.id,
        fetching: true,
      };
    case locationsConstants.REMOVE_SUCCESS:
      return {
        ...state,
        /* eslint-disable */
        list: state.list.filter(
          location => location.id !== state.removedLocationId
        ),
        fetching: false
      };
    case locationsConstants.REMOVE_FAILURE:
      return {
        ...state,
        fetching: false
      };
    default:
      return state;
  }
};

export default locations;
