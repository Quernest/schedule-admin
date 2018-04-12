import scheduleConstants from '../constants/schedule.constants';
import scheduleService from '../services/schedule.service';
import alertActions from '../actions/alert.actions';
import history from '../helpers/history';

const add = (data) => {
  const request = () => ({
    type: scheduleConstants.ADD_REQUEST,
    data,
  });

  const success = subject => ({
    type: scheduleConstants.ADD_SUCCESS,
    subject,
  });

  const failure = error => ({
    type: scheduleConstants.ADD_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const subject = await scheduleService.add(data);
      dispatch(success(subject));
      history.push('/dashboard/schedule');
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

const getById = (id) => {
  const request = () => ({
    type: scheduleConstants.GET_BY_ID_REQUEST,
    id,
  });

  const success = list => ({
    type: scheduleConstants.GET_BY_ID_SUCCESS,
    list,
  });

  const failure = error => ({
    type: scheduleConstants.GET_BY_ID_FAILURE,
    error,
  });

  return async (dispatch) => {
    dispatch(request());

    try {
      const list = await scheduleService.getById(id);
      dispatch(success(list));
    } catch (error) {
      dispatch(failure(error));
      dispatch(alertActions.error(error));
    }
  };
};

export default {
  add,
  getById,
};
