import alertConstants from '../constants/alert.constants';

const success = id => ({
  type: alertConstants.SUCCESS,
  id,
});

const error = id => ({
  type: alertConstants.ERROR,
  id,
});

const warn = id => ({
  type: alertConstants.WARN,
  id,
});

const clear = () => ({
  type: alertConstants.CLEAR,
});

const alertActions = {
  success,
  error,
  warn,
  clear,
};

export default alertActions;
