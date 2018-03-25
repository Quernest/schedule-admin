import alertConstants from '../constants/alert.constants';

const alert = (state = {}, action) => {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'success',
        id: action.id,
      };
    case alertConstants.ERROR:
      return {
        type: 'error',
        id: action.id,
      };
    case alertConstants.WARN:
      return {
        type: 'warning',
        id: action.id,
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
};

export default alert;
